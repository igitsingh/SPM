const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cataloguePath = "/Users/isachinsingh/Desktop/SPM/catalogue_2026.json";
const destDirPrefix = "/public/images/books/disney/";

async function main() {
    // 1. Load JSON Catalogue
    let catalogue = JSON.parse(fs.readFileSync(cataloguePath, 'utf8'));

    // Books to add
    const science68 = [
        { code: "D-055", title: "Quantum - 6", class: "6", subject: "Science", category: "Science", price: 400, unit: "Disney Publication", image: "/public/images/books/disney/science__6-8-1.jpg" },
        { code: "D-056", title: "Quantum - 7", class: "7", subject: "Science", category: "Science", price: 415, unit: "Disney Publication", image: "/public/images/books/disney/science__6-8-2.jpg" },
        { code: "D-057", title: "Quantum - 8", class: "8", subject: "Science", category: "Science", price: 430, unit: "Disney Publication", image: "/public/images/books/disney/science__6-8-3.jpg" },
        { code: "D-058", title: "Quantum - 9", class: "9", subject: "Science", category: "Science", price: 445, unit: "Disney Publication", image: "/public/images/books/disney/science__6-8-4.jpg" },
        { code: "D-059", title: "Quantum - 10", class: "10", subject: "Science", category: "Science", price: 460, unit: "Disney Publication", image: "/public/images/books/disney/science__6-8-5.jpg" }
    ];

    // 2. Update JSON
    for (const book of science68) {
        const existing = catalogue.books.find(b => b.code === book.code);
        if (!existing) {
            catalogue.books.push({
                unit: book.unit,
                category: book.category,
                subject: book.subject,
                code: book.code,
                title: book.title,
                class: book.class,
                price: book.price,
                combo: false,
                nep_compliant: true,
                isActive: true,
                image: book.image
            });
            console.log(`Added JSON Entry: ${book.title}`);
        } else {
            console.log(`Already exists in JSON: ${book.code}`);
        }
    }

    // 3. Save JSON
    fs.writeFileSync(cataloguePath, JSON.stringify(catalogue, null, 2));

    // 4. Update Database
    for (const book of science68) {
        const data = {
            code: book.code,
            title: book.title,
            class: book.class,
            subject: book.subject,
            category: book.category,
            unit: book.unit,
            coverImage: book.image,
            priceRetail: book.price,
            pricePartner: book.price * 0.7, // Assume 30% discount
            stock: 100,
            isActive: true,
            board: "ALL"
        };

        try {
            await prisma.book.upsert({
                where: { code: book.code },
                update: data,
                create: data
            });
            console.log(`Upserted Database: ${book.title} (${book.code})`);
        } catch (e) {
            console.error(`Failed to upsert ${book.code}: ${e.message}`);
        }
    }

    console.log("Task Complete!");
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
