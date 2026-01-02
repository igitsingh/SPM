import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SystemConfigService {
    constructor(private prisma: PrismaService) { }

    async getAll() {
        return this.prisma.systemConfig.findMany();
    }

    async get(key: string) {
        return this.prisma.systemConfig.findUnique({ where: { key } });
    }

    async set(key: string, value: string, description?: string) {
        return this.prisma.systemConfig.upsert({
            where: { key },
            update: { value, description },
            create: { key, value, description }
        });
    }

    async seedDefaults() {
        const defaults = [
            { key: 'ACADEMIC_SESSION', value: '2025-2026', description: 'Current Academic Year' },
            { key: 'GST_PERCENT', value: '18', description: 'Global GST Percentage' },
            { key: 'SHIPPING_FEE', value: '50', description: 'Standard Shipping Fee (INR)' },
            { key: 'PORTAL_NOTICE', value: '', description: 'Banner message for all users' },
            { key: 'MAINTENANCE_MODE', value: 'false', description: 'Toggle maintenance mode' }
        ];

        for (const d of defaults) {
            const exists = await this.prisma.systemConfig.findUnique({ where: { key: d.key } });
            if (!exists) {
                await this.prisma.systemConfig.create({ data: d });
            }
        }
    }
}
