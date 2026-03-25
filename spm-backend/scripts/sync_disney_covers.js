const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const srcDir = "/Users/isachinsingh/Desktop/SPM/assets/DISNEY BOOK COVERS";
const destDir = "/Users/isachinsingh/Desktop/SPM/public/images/books/disney";
const cataloguePath = "/Users/isachinsingh/Desktop/SPM/catalogue_2026.json";

async function main() {
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    // Mapping of source filename to (subject/category, class)
    // We adjust it for the actual titles and classes
    const mapping = {
        "English - 1-5-1.jpg.jpeg": { subject: "English Reader", class: "1", target: "disney_english_1.jpg" },
        "English - 1-5-1.jpg (1).jpeg": { subject: "English Reader", class: "1", target: "disney_english_1.jpg" },
        "English - 1-5-2.jpg.jpeg": { subject: "English Reader", class: "2", target: "disney_english_2.jpg" },
        "English - 1-5-3.jpg.jpeg": { subject: "English Reader", class: "3", target: "disney_english_3.jpg" },
        "English - 1-5-4.jpg.jpeg": { subject: "English Reader", class: "4", target: "disney_english_4.jpg" },
        "English - 1-5-5.jpg.jpeg": { subject: "English Reader", class: "5", target: "disney_english_5.jpg" },
        
        "Hindi- 1-5-1.jpg.jpeg": { subject: "Hindi", class: "1", target: "disney_hindi_1.jpg" },
        "Hindi- 1-5-1.jpg (1).jpeg": { subject: "Hindi", class: "1", target: "disney_hindi_1.jpg" },
        "Hindi- 1-5-2.jpg.jpeg": { subject: "Hindi", class: "2", target: "disney_hindi_2.jpg" },
        "Hindi- 1-5-3.jpg.jpeg": { subject: "Hindi", class: "3", target: "disney_hindi_3.jpg" },
        "Hindi- 1-5-4.jpg.jpeg": { subject: "Hindi", class: "4", target: "disney_hindi_4.jpg" },
        "Hindi- 1-5-5.jpg.jpeg": { subject: "Hindi", class: "5", target: "disney_hindi_5.jpg" },
        
        "Maths  1-5-1.jpg.jpeg": { subject: "Mathematics", class: "1", target: "disney_maths_1.jpg" },
        "Science  1-5-1.jpg.jpeg": { subject: "Science", class: "1", target: "disney_science_1.jpg" },
        "Smart GK 1-5-1.jpg.jpeg": { subject: "General Knowledge", class: "1", target: "disney_gk_1.jpg" },
        "Social Studies 1-5-1.jpg.jpeg": { subject: "Social Studies", class: "1", target: "disney_social_1.jpg" },
        
        "Vyakaran 1-5-1.jpg.jpeg": { subject: "Hindi Grammar", class: "1", target: "disney_hindi_grammar_1.jpg" },
        "Grammar 1-5-1.jpg.jpeg": { subject: "English Grammar", class: "1", target: "disney_english_grammar_1.jpg" }
    };

    // Load JSON Catalogue
    let catalogue = JSON.parse(fs.readFileSync(cataloguePath, 'utf8'));
    let updatedCodes = [];

    // Process Files
    const files = fs.readdirSync(srcDir);
    for (const file of files) {
        const map = mapping[file];
        if (!map) continue;

        const srcPath = path.join(srcDir, file);
        const destPath = path.join(destDir, map.target);
        const imagePath = `/public/images/books/disney/${map.target}`;

        // Copy File
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${file} -> ${map.target}`);

        // Find in JSON
        for (let book of catalogue.books) {
            if (book.unit === "Disney Publication" && (book.subject === map.subject || book.category === map.subject) && book.class == map.class) {
                book.image = imagePath;
                if (!updatedCodes.includes(book.code)) updatedCodes.push(book.code);
            }
        }
    }

    // Save JSON
    fs.writeFileSync(cataloguePath, JSON.stringify(catalogue, null, 2));
    console.log(`Saved JSON: ${cataloguePath}`);

    // Update DB
    console.log("Updating Database...");
    for (let code of updatedCodes) {
        const book = catalogue.books.find(b => b.code === code);
        await prisma.book.update({
            where: { code: code },
            data: { coverImage: book.image }
        });
        console.log(`  Updated DB: ${book.title} (${code}) -> ${book.image}`);
    }

    console.log("Process Complete!");
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
