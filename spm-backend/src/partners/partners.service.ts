import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PartnersService {
    constructor(private prisma: PrismaService) { }

    async findAll(search?: string) {
        const where: any = {};
        if (search) {
            where.OR = [
                { shopName: { contains: search, mode: 'insensitive' } },
                { user: { name: { contains: search, mode: 'insensitive' } } },
                { user: { email: { contains: search, mode: 'insensitive' } } }
            ];
        }
        return this.prisma.partner.findMany({
            where,
            include: { user: { select: { id: true, name: true, email: true, phone: true } } }
        });
    }

    async findOne(id: string) {
        return this.prisma.partner.findUnique({
            where: { id },
            include: { user: true }
        });
    }
}
