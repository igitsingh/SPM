import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
// import { PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreatePaymentDto) {
        // Validate Order
        const order = await this.prisma.order.findUnique({
            where: { id: dto.orderId },
            include: { placedBy: { include: { Partner: true } } }
        });
        if (!order) throw new NotFoundException('Order not found');

        // 1. Create Payment
        const payment = await this.prisma.payment.create({
            data: {
                orderId: dto.orderId,
                provider: dto.provider,
                method: dto.method,
                reference: dto.reference,
                amount: dto.amount,
                status: 'COMPLETED',
                notes: dto.notes,
                date: dto.date ? new Date(dto.date) : new Date(),
            }
        });

        // 2. Update Order Payment Status
        const allPayments = await this.prisma.payment.findMany({ where: { orderId: dto.orderId } });
        const totalPaid = allPayments.reduce((sum, p) => sum + Number(p.amount), 0);

        // Cast order.total to Number
        const orderTotal = Number(order.total);

        let status = 'partial';
        if (totalPaid >= orderTotal - 1) { // Tolerance of 1 rupee for float issues
            status = 'paid';
        } else if (totalPaid === 0) {
            status = 'unpaid';
        }

        await this.prisma.order.update({
            where: { id: dto.orderId },
            data: { paymentStatus: status }
        });

        // 3. Update Partner Credit Logic (Reduce Used Credit)
        const partner = order.placedBy?.Partner;
        if (partner) {
            const currentUsed = Number(partner.usedCredit);
            // Ensure we don't go below zero logic? Or just simple subtraction.
            // Usually usedCredit represents "Money Owed". Payment reduces it.
            await this.prisma.partner.update({
                where: { id: partner.id },
                data: { usedCredit: currentUsed - dto.amount }
            });
        }

        return payment;
    }

    async findAll(limit = 50) {
        return this.prisma.payment.findMany({
            take: Number(limit),
            orderBy: { date: 'desc' },
            include: {
                order: {
                    select: {
                        orderNumber: true,
                        total: true,
                        placedBy: {
                            select: {
                                name: true,
                                Partner: { select: { shopName: true } }
                            }
                        }
                    }
                }
            }
        });
    }

    async getStats() {
        // Total Outstanding (Sum of Partner usedCredit)
        const partners = await this.prisma.partner.findMany();
        const totalOutstanding = partners.reduce((sum, p) => sum + Number(p.usedCredit), 0);

        // Collected Today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const paymentsToday = await this.prisma.payment.findMany({
            where: { date: { gte: today } }
        });
        const collectedToday = paymentsToday.reduce((sum, p) => sum + Number(p.amount), 0);

        // Total Collected (All Time)
        const totalCollectedAgg = await this.prisma.payment.aggregate({ _sum: { amount: true } });

        return {
            totalOutstanding,
            collectedToday,
            totalCollected: Number(totalCollectedAgg._sum.amount || 0)
        };
    }
}
