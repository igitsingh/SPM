import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSchemeDto } from './dto/create-scheme.dto';

@Injectable()
export class SchemesService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateSchemeDto) {
        return this.prisma.scheme.create({
            data: {
                name: dto.name,
                description: dto.description,
                type: dto.type,
                value: dto.value,
                minOrderValue: dto.minOrderValue,
                validFrom: new Date(dto.validFrom),
                validUntil: dto.validUntil ? new Date(dto.validUntil) : null
            }
        });
    }

    async findAll(activeOnly = false) {
        const where: any = {};
        if (activeOnly) {
            where.isActive = true;
            where.validFrom = { lte: new Date() };
            // Prisma doesn't support "OR: [validUntil: null, validUntil: gte: now]" well in simple object, need OR array
            where.OR = [
                { validUntil: null },
                { validUntil: { gte: new Date() } }
            ];
        }
        return this.prisma.scheme.findMany({
            where,
            orderBy: { validFrom: 'desc' }
        });
    }

    async toggleStatus(id: string) {
        const scheme = await this.prisma.scheme.findUnique({ where: { id } });
        if (!scheme) throw new NotFoundException('Scheme not found');
        return this.prisma.scheme.update({
            where: { id },
            data: { isActive: !scheme.isActive }
        });
    }

    async delete(id: string) {
        return this.prisma.scheme.delete({ where: { id } });
    }
}
