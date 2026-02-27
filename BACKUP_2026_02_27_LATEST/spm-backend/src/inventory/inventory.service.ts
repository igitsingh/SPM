import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AdjustStockDto } from './dto/adjust-stock.dto';

@Injectable()
export class InventoryService {
    constructor(private prisma: PrismaService) { }

    async getLogs(limit = 20) {
        return this.prisma.inventoryLog.findMany({
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: { book: { select: { title: true, code: true } } }
        });
    }

    async getLowStock(threshold = 20) {
        return this.prisma.book.findMany({
            where: { stock: { lt: threshold } },
            orderBy: { stock: 'asc' }
        });
    }

    async adjustStock(dto: AdjustStockDto) {
        const book = await this.prisma.book.findUnique({ where: { id: dto.bookId } });
        if (!book) throw new NotFoundException('Book not found');

        let newStock = book.stock;
        const qty = Math.abs(dto.quantity); // Ensure positive input for IN/OUT

        if (dto.type === 'OUT') {
            newStock -= qty;
        } else if (dto.type === 'IN') {
            newStock += qty;
        } else if (dto.type === 'ADJUST') {
            // For explicit adjustment, we treat qty as the CHANGE (+/-)
            // If user sends -5, stock reduces.
            newStock += dto.quantity;
        }

        if (newStock < 0) newStock = 0; // Prevent negative stock

        const [updatedBook, log] = await this.prisma.$transaction([
            this.prisma.book.update({
                where: { id: dto.bookId },
                data: { stock: newStock }
            }),
            this.prisma.inventoryLog.create({
                data: {
                    bookId: dto.bookId,
                    type: dto.type,
                    quantity: dto.quantity,
                    reason: dto.reason
                }
            })
        ]);

        return { book: updatedBook, log };
    }
}
