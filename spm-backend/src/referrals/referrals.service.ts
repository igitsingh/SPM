import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReferralDto } from './dto/create-referral.dto';
// import { ReferralStatus } from '@prisma/client';

@Injectable()
export class ReferralsService {
    constructor(private prisma: PrismaService) { }

    async create(partnerUserId: string, createReferralDto: CreateReferralDto) {
        // 1. Find Partner ID from User ID
        const partner = await this.prisma.partner.findUnique({
            where: { userId: partnerUserId },
        });

        if (!partner) {
            throw new BadRequestException('User is not a registered partner');
        }

        // 2. Check if email already referred
        const existing = await this.prisma.referral.findFirst({
            where: { referredEmail: createReferralDto.referredEmail },
        });

        if (existing) {
            throw new BadRequestException('This email has already been referred');
        }

        // 3. Generate Code (SPM-REF-XYZ)
        const code = 'SPM-REF-' + Math.random().toString(36).substring(2, 8).toUpperCase();

        // 4. Save
        return this.prisma.referral.create({
            data: {
                referrerPartnerId: partner.id,
                referredEmail: createReferralDto.referredEmail,
                referralCode: code,
                status: 'sent',
            },
        });
    }

    async findAllForPartner(partnerUserId: string) {
        const partner = await this.prisma.partner.findUnique({ where: { userId: partnerUserId } });
        if (!partner) return [];

        return this.prisma.referral.findMany({
            where: { referrerPartnerId: partner.id },
            orderBy: { createdAt: 'desc' },
        });
    }

    async validateCode(code: string) {
        const referral = await this.prisma.referral.findUnique({
            where: { referralCode: code },
            include: { referrer: { include: { user: true } } },
        });
        if (!referral) throw new NotFoundException('Invalid referral code');
        return referral;
    }

    async linkUserToReferral(email: string, userId: string) {
        // Called when user registers
        const referral = await this.prisma.referral.findFirst({
            where: { referredEmail: email, referredUserId: null }
        });

        if (referral) {
            await this.prisma.referral.update({
                where: { id: referral.id },
                data: {
                    referredUserId: userId,
                    status: 'registered'
                }
            });
        }
    }

    /**
     * CORE LOGIC: Check Qualification Logic
     * Rules: 
     * - >= 5,00,000 -> 5%
     * - >= 10,00,000 -> 10%
     */
    async processQualifyingOrder(userId: string, orderTotal: number) {
        // 1. Find referral for this user
        const referral = await this.prisma.referral.findUnique({
            where: { referredUserId: userId }
        });

        // If no referral or already rewarded, skip
        if (!referral || referral.status === 'rewarded' || referral.status === 'qualified') {
            return null;
        }

        // 2. Check Thresholds
        let rewardPercent = 0;
        if (orderTotal >= 1000000) {
            rewardPercent = 10;
        } else if (orderTotal >= 500000) {
            rewardPercent = 5;
        }

        // 3. If Qualified, Update Status & Reward
        if (rewardPercent > 0) {
            const rewardAmount = (orderTotal * rewardPercent) / 100;

            // Update Referral
            const updated = await this.prisma.referral.update({
                where: { id: referral.id },
                data: {
                    status: 'qualified', // Or 'rewarded' if auto-applied
                    qualifyingOrderTotal: orderTotal,
                    rewardPercent: rewardPercent,
                    rewardAmount: rewardAmount
                }
            });

            // Credit the Partner (Assumption: Increasing Credit Limit by reward amount)
            await this.prisma.partner.update({
                where: { id: referral.referrerPartnerId },
                data: {
                    creditLimit: { increment: rewardAmount }
                }
            });

            return updated;
        }

        return null;
    }
}
