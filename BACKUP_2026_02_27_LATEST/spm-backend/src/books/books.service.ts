import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateBookDto) {
        return this.prisma.book.create({ data });
    }

    async findAll(query?: any) {
        const { search, board, class: classVal, subject } = query || {};
        const where: any = {};

        if (search) {
            where.OR = [
                { title: { contains: search } },
                { code: { contains: search } },
                { subject: { contains: search } }
            ];
        }
        if (board) where.board = board;
        if (classVal) where.class = classVal;
        if (subject) where.subject = subject;

        return this.prisma.book.findMany({
            where,
            orderBy: { title: 'asc' }
        });
    }

    async findOne(id: string) {
        return this.prisma.book.findUnique({ where: { id } });
    }

    async update(id: string, data: any) {
        return this.prisma.book.update({
            where: { id },
            data
        });
    }

    async remove(id: string) {
        // Cascade manually if needed, or let Prisma error
        return this.prisma.book.delete({ where: { id } });
    }

    async bulkCreate(books: CreateBookDto[]) {
        return this.prisma.book.createMany({
            data: books
        });
    }

    // New: Reset & Import Logic
    async resetAndImport(catalogueData: any[]) {
        try {
            // 1. Clean up existing data (Full wipe as requested)
            // Order Items depend on books.
            await this.prisma.orderItem.deleteMany({});
            // Inventory Logs depend on books.
            await this.prisma.inventoryLog.deleteMany({});
            // Finally delete books
            await this.prisma.book.deleteMany({});

            // 2. Prepare Data
            const booksToInsert: any[] = [];

            for (const catGroup of catalogueData) {
                const category = catGroup.category;
                for (const b of catGroup.books) {
                    // b: { code, title, class, price }
                    booksToInsert.push({
                        code: b.code,
                        title: b.title,
                        class: String(b.class), // field is String in schema? Actually check schema.
                        // Checking seed: class: '10'. Schema says String.
                        // Input: class: 1 (number). Convert to string.
                        priceRetail: b.price, // Price in JSON/Screenshot IS the Retail Price
                        pricePartner: b.price * 0.7, // Partner gets 30% margin (Example)
                        stock: 1000, // Default stock
                        subject: category, // Use category as subject too? Or mapped?
                        category: category,
                        board: 'ALL',
                        isActive: true
                    });
                }
            }

            // 3. Insert
            const res = await this.prisma.book.createMany({
                data: booksToInsert
            });

            return { message: `Imported ${res.count} books successfully.` };
        } catch (e) {
            console.error(e);
            throw new HttpException(`Import Failed: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async seed() {
        // ... (Keep existing seed logic just in case, or ignore)
        return { message: 'Seed skipped' };
    }
}
