import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReferralsService } from '../referrals/referrals.service';
import { CreateOrderDto, UpdatestatusDto } from './dto/create-order.dto';
// import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
    constructor(
        private prisma: PrismaService,
        private referralsService: ReferralsService
    ) { }

    async create(authUser: any, dto: CreateOrderDto) {
        // Determine Buyer
        let buyerId = authUser.id;
        if (authUser.role === 'admin' && dto.buyerId) {
            buyerId = dto.buyerId;
        }

        if (!dto.items || dto.items.length === 0) {
            throw new BadRequestException('Order must contain items');
        }

        // 1. Fetch Books
        const bookIds = dto.items.map(i => i.bookId);
        const books = await this.prisma.book.findMany({ where: { id: { in: bookIds } } });
        if (books.length !== bookIds.length) throw new BadRequestException('Books not found');
        const bookMap = new Map(books.map(b => [b.id, b]));

        // 2. Calculate Totals
        let subtotal = 0;
        const itemsData = dto.items.map(item => {
            const book = bookMap.get(item.bookId);
            if (!book) throw new BadRequestException('Invalid book ID');

            const unitPrice = toNumber(book.pricePartner); // Default to Partner Price
            const lineTotal = unitPrice * item.qty;
            subtotal += lineTotal;
            return { bookId: item.bookId, qty: item.qty, unitPrice, lineTotal };
        });

        // 3. Apply Active Schemes (Simple Logic: Highest Value wins)
        // TODO: Integrate proper scheme engine. For now, fetch ALL active and verify.
        const today = new Date();
        const activeSchemes = await this.prisma.scheme.findMany({
            where: {
                isActive: true,
                validFrom: { lte: today },
                OR: [{ validUntil: null }, { validUntil: { gte: today } }],
                minOrderValue: { lte: subtotal }
            }
        });

        let discount = 0;
        let appliedScheme: any = null;

        // Find best scheme
        for (const s of activeSchemes) {
            let val = 0;
            if (s.type === 'FLAT') val = toNumber(s.value);
            else val = subtotal * (toNumber(s.value) / 100);

            if (val > discount) {
                discount = val;
                appliedScheme = s;
            }
        }

        // Tax (GST Config?) - Fetch from SystemConfig if possible, else 0 or 18% hardcoded?
        // Let's assume 0 for books usually (in India), or read from Config.
        // I will assume 0 for now as books are often exempt, but let's check config later.
        const tax = 0;
        const total = subtotal - discount + tax;

        // 4. Transaction: Create Order, Items, Update Credit, Log Inventory (TODO)
        const orderNumber = `SPM-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;

        const order = await this.prisma.$transaction(async (tx) => {
            // Credit Check
            const partner = await tx.partner.findUnique({ where: { userId: buyerId } });
            if (partner) {
                const used = toNumber(partner.usedCredit);
                const limit = toNumber(partner.creditLimit);
                // If total + used > limit -> Error? Or just warning?
                // Requirement says: "Cannot exceed credit limit unless override". 
                // We will block for now unless admin?
                if (authUser.role !== 'admin' && (used + total > limit)) {
                    throw new BadRequestException(`Credit Limit Exceeded. Available: ${limit - used}`);
                }

                // Update Credit
                await tx.partner.update({
                    where: { id: partner.id },
                    data: { usedCredit: { increment: total } }
                });
            }

            // Create Order
            const newOrder = await tx.order.create({
                data: {
                    orderNumber,
                    buyerUserId: buyerId,
                    placedById: authUser.id,
                    type: 'partner',
                    status: 'confirmed', // Default
                    subtotal,
                    discountTotal: discount,
                    taxTotal: tax,
                    total,
                    notes: dto.notes,
                    timeline: JSON.stringify([{ status: 'confirmed', date: new Date(), updatedBy: authUser.name }]),
                    items: { create: itemsData }
                },
                include: { items: true }
            });

            // Deduct Stock
            for (const i of itemsData) {
                await tx.book.update({
                    where: { id: i.bookId },
                    data: { stock: { decrement: i.qty } }
                });
                // Log Inventory? (Ideally yes, but let's skip strict InventoryLog for this step to avoid circular dependency if not careful, though we can import).
            }

            return newOrder;
        });

        // Referral logic
        if (total > 0) await this.referralsService.processQualifyingOrder(buyerId, total);

        return order;
    }

    async findAll(user: any, filters?: any) {
        const where: any = {};

        if (user.role !== 'admin') {
            where.buyerUserId = user.id;
        }

        if (filters) {
            if (filters.status) where.status = filters.status;
            if (filters.payment) where.paymentStatus = filters.payment; // Support payment filter
            if (filters.search) {
                where.OR = [
                    { orderNumber: { contains: filters.search, mode: 'insensitive' } },
                    { placedBy: { Partner: { shopName: { contains: filters.search, mode: 'insensitive' } } } }
                ];
            }
        }

        return this.prisma.order.findMany({
            where,
            include: {
                items: { include: { book: true } },
                placedBy: { include: { Partner: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async findOne(id: string) {
        return this.prisma.order.findUnique({
            where: { id },
            include: {
                items: { include: { book: true } },
                placedBy: { include: { Partner: true } },
                _count: { select: { items: true } } // Invoice/Payment relations if needed
            }
        });
    }

    async updateStatus(id: string, dto: UpdatestatusDto, user: any) {
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order) throw new NotFoundException('Order not found');

        // Append to timeline
        const timeline = JSON.parse((order.timeline as string) || '[]');
        timeline.push({ status: dto.status, date: new Date(), updatedBy: user.name, notes: dto.notes });

        return this.prisma.order.update({
            where: { id },
            data: {
                status: dto.status,
                timeline: JSON.stringify(timeline)
            }
        });
    }

    // Helper: Bulk Delete or specific admin ops could go here
}

function toNumber(val: any): number { return Number(val); }
