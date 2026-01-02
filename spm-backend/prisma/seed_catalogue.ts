import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
    const jsonPath = path.join(__dirname, '../../catalogue_2026.json');
    console.log(`Reading catalogue from ${jsonPath}`);

    if (!fs.existsSync(jsonPath)) {
        console.error("Catalogue file not found!");
        return;
    }

    const raw = fs.readFileSync(jsonPath, 'utf8');
    const data = JSON.parse(raw);

    const booksToInsert: any[] = [];

    // Iterate over categories
    if (data.catalogue && Array.isArray(data.catalogue)) {
        for (const cat of data.catalogue) {
            const categoryName = cat.category;
            if (cat.books && Array.isArray(cat.books)) {
                for (const book of cat.books) {
                    booksToInsert.push({
                        code: String(book.code), // Ensure string
                        title: book.title,
                        class: book.class !== undefined ? String(book.class) : null,
                        category: categoryName,
                        coverImage: book.image || null,
                        priceRetail: book.price || 0,
                        pricePartner: (book.price || 0) * 0.75, // Estimate partner price
                        stock: 100,
                        isActive: true
                    });
                }
            }
        }
    }

    console.log(`Found ${booksToInsert.length} books to insert.`);

    // Use transaction or createMany
    // Clean existing? Maybe.
    // await prisma.book.deleteMany({}); // Optional: Clear old data? The user said "remove previous catalogue". Yes.

    console.log("Clearing old books...");
    await prisma.book.deleteMany({});

    console.log("Inserting new books...");
    await prisma.book.createMany({
        data: booksToInsert
    });

    console.log("Seeding completed successfully.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
