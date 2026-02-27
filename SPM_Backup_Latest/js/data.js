/**
 * Suman Prakashan Mandir Book Database
 * Exact 78 Books Dataset
 */

console.log("Data.js loaded v6");

import { seoData } from './seo_data.js';
import { bilingualBlurbs } from './seo_bilingual.js';

// Helper to find blurb
function getBilingualBlurb(title) {
    for (const [key, blurb] of Object.entries(bilingualBlurbs)) {
        if (title.includes(key)) {
            return blurb;
        }
    }
    return "";
}

export const books = [
    // Hindi Series
    { id: 'AL01', code: 'AL01', title: 'अक्षर सुमंगा', category: 'Hindi', price: 170, class: 'Nursery' },
    { id: 'AL02', code: 'AL02', title: 'शब्द सुमंगा', category: 'Hindi', price: 180, class: 'LKG' },
    { id: 'AL03', code: 'AL03', title: 'स्वर सुमंगा', category: 'Hindi', price: 190, class: 'UKG' },
    { id: 'AL04', code: 'AL04', title: 'सुमंगा (हिंदी)-1', category: 'Hindi', price: 175, class: 'Class 1' },
    { id: 'AL05', code: 'AL05', title: 'सुमंगा (हिंदी)-2', category: 'Hindi', price: 195, class: 'Class 2' },
    { id: 'AL06', code: 'AL06', title: 'सुमंगा (हिंदी)-3', category: 'Hindi', price: 210, class: 'Class 3' },
    { id: 'AL07', code: 'AL07', title: 'सुमंगा (हिंदी)-4', category: 'Hindi', price: 230, class: 'Class 4' },
    { id: 'AL08', code: 'AL08', title: 'सुमंगा (हिंदी)-5', category: 'Hindi', price: 250, class: 'Class 5' },
    { id: 'AL09', code: 'AL09', title: 'अक्षर रचना', category: 'Hindi', price: 140, class: 'Nursery' },
    { id: 'AL10', code: 'AL10', title: 'शब्द रचना', category: 'Hindi', price: 150, class: 'LKG' },
    { id: 'AL11', code: 'AL11', title: 'स्वर रचना', category: 'Hindi', price: 155, class: 'UKG' },
    { id: 'AL53', code: 'AL53', title: 'हिंदी व्याकरण-1', category: 'Hindi', price: 180, class: 'Class 1' },
    { id: 'AL54', code: 'AL54', title: 'हिंदी व्याकरण-2', category: 'Hindi', price: 195, class: 'Class 2' },
    { id: 'AL55', code: 'AL55', title: 'हिंदी व्याकरण-3', category: 'Hindi', price: 205, class: 'Class 3' },
    { id: 'AL56', code: 'AL56', title: 'हिंदी व्याकरण-4', category: 'Hindi', price: 220, class: 'Class 4' },
    { id: 'AL57', code: 'AL57', title: 'हिंदी व्याकरण-5', category: 'Hindi', price: 240, class: 'Class 5' },

    // English Series
    { id: 'AL12', code: 'AL12', title: 'My ABC Book', category: 'English', price: 170, class: 'Nursery' },
    { id: 'AL13', code: 'AL13', title: 'Picture Album', category: 'English', price: 170, class: 'Nursery' },
    { id: 'AL14', code: 'AL14', title: 'English Reader (Pre-Primer)', category: 'English', price: 170, class: 'LKG' },
    { id: 'AL15', code: 'AL15', title: 'English Reader (Primer)', category: 'English', price: 170, class: 'UKG' },
    { id: 'AL16', code: 'AL16', title: 'Tulip Reader-1', category: 'English', price: 175, class: 'Class 1' },
    { id: 'AL17', code: 'AL17', title: 'Tulip Reader-2', category: 'English', price: 195, class: 'Class 2' },
    { id: 'AL18', code: 'AL18', title: 'Tulip Reader-3', category: 'English', price: 210, class: 'Class 3' },
    { id: 'AL19', code: 'AL19', title: 'Tulip Reader-4', category: 'English', price: 230, class: 'Class 4' },
    { id: 'AL20', code: 'AL20', title: 'Tulip Reader-5', category: 'English', price: 250, class: 'Class 5' },
    { id: 'AL21', code: 'AL21', title: 'English Writing (Capital)', category: 'English', price: 150, class: 'Nursery' },
    { id: 'AL22', code: 'AL22', title: 'English Writing (Small)', category: 'English', price: 150, class: 'LKG' },
    { id: 'AL23', code: 'AL23', title: 'English Writing-1', category: 'English', price: 140, class: 'Class 1' },
    { id: 'AL24', code: 'AL24', title: 'English Writing-2', category: 'English', price: 140, class: 'Class 2' },
    { id: 'AL25', code: 'AL25', title: 'English Writing-3', category: 'English', price: 140, class: 'Class 3' },
    { id: 'AL26', code: 'AL26', title: 'English Writing-4', category: 'English', price: 140, class: 'Class 4' },
    { id: 'AL27', code: 'AL27', title: 'English Writing-5', category: 'English', price: 140, class: 'Class 5' },
    { id: 'AL58', code: 'AL58', title: 'Eng Grammar-1', category: 'English', price: 180, class: 'Class 1' },
    { id: 'AL59', code: 'AL59', title: 'Eng Grammar-2', category: 'English', price: 195, class: 'Class 2' },
    { id: 'AL60', code: 'AL60', title: 'Eng Grammar-3', category: 'English', price: 205, class: 'Class 3' },
    { id: 'AL61', code: 'AL61', title: 'Eng Grammar-4', category: 'English', price: 220, class: 'Class 4' },
    { id: 'AL62', code: 'AL62', title: 'Eng Grammar-5', category: 'English', price: 240, class: 'Class 5' },

    // Maths
    { id: 'AL44', code: 'AL44', title: 'Number Book', category: 'Maths', price: 160, class: 'Nursery' },
    { id: 'AL45', code: 'AL45', title: 'Math Intro', category: 'Maths', price: 140, class: 'LKG' },
    { id: 'AL46', code: 'AL46', title: 'Math Pre-Primer', category: 'Maths', price: 180, class: 'UKG' },
    { id: 'AL47', code: 'AL47', title: 'Math Primer', category: 'Maths', price: 180, class: 'UKG' },
    { id: 'AL48', code: 'AL48', title: 'Math-1', category: 'Maths', price: 245, class: 'Class 1' },
    { id: 'AL49', code: 'AL49', title: 'Math-2', category: 'Maths', price: 265, class: 'Class 2' },
    { id: 'AL50', code: 'AL50', title: 'Math-3', category: 'Maths', price: 285, class: 'Class 3' },
    { id: 'AL51', code: 'AL51', title: 'Math-4', category: 'Maths', price: 305, class: 'Class 4' },
    { id: 'AL52', code: 'AL52', title: 'Math-5', category: 'Maths', price: 325, class: 'Class 5' },

    // EVS
    { id: 'AL33', code: 'AL33', title: 'EVS-1', category: 'EVS', price: 190, class: 'Class 1' },
    { id: 'AL34', code: 'AL34', title: 'EVS-2', category: 'EVS', price: 205, class: 'Class 2' },
    { id: 'AL35', code: 'AL35', title: 'EVS-3', category: 'EVS', price: 230, class: 'Class 3' },
    { id: 'AL36', code: 'AL36', title: 'EVS-4', category: 'EVS', price: 245, class: 'Class 4' },
    { id: 'AL37', code: 'AL37', title: 'EVS-5', category: 'EVS', price: 265, class: 'Class 5' },

    // Science
    { id: 'AL38', code: 'AL38', title: 'Science-1', category: 'Science', price: 190, class: 'Class 1' },
    { id: 'AL39', code: 'AL39', title: 'Science-2', category: 'Science', price: 210, class: 'Class 2' },
    { id: 'AL40', code: 'AL40', title: 'Science-3', category: 'Science', price: 230, class: 'Class 3' },
    { id: 'AL41', code: 'AL41', title: 'Science-4', category: 'Science', price: 245, class: 'Class 4' },
    { id: 'AL42', code: 'AL42', title: 'Science-5', category: 'Science', price: 265, class: 'Class 5' },

    // Sanskrit
    { id: 'AL28', code: 'AL28', title: 'देववाणी-1', category: 'Sanskrit', price: 185, class: 'Class 1' },
    { id: 'AL29', code: 'AL29', title: 'देववाणी-2', category: 'Sanskrit', price: 195, class: 'Class 2' },
    { id: 'AL30', code: 'AL30', title: 'देववाणी-3', category: 'Sanskrit', price: 210, class: 'Class 3' },
    { id: 'AL31', code: 'AL31', title: 'देववाणी-4', category: 'Sanskrit', price: 225, class: 'Class 4' },
    { id: 'AL32', code: 'AL32', title: 'देववाणी-5', category: 'Sanskrit', price: 250, class: 'Class 5' },

    // GK
    { id: 'AL63', code: 'AL63', title: 'GK-1', category: 'GK', price: 170, class: 'Class 1' },
    { id: 'AL64', code: 'AL64', title: 'GK-2', category: 'GK', price: 190, class: 'Class 2' },
    { id: 'AL65', code: 'AL65', title: 'GK-3', category: 'GK', price: 205, class: 'Class 3' },
    { id: 'AL66', code: 'AL66', title: 'GK-4', category: 'GK', price: 210, class: 'Class 4' },
    { id: 'AL67', code: 'AL67', title: 'GK-5', category: 'GK', price: 215, class: 'Class 5' },

    // Rhymes
    { id: 'AL68', code: 'AL68', title: 'Rhymes-A', category: 'Rhymes', price: 140, class: 'Nursery' },
    { id: 'AL69', code: 'AL69', title: 'Rhymes-B', category: 'Rhymes', price: 140, class: 'LKG' },
    { id: 'AL70', code: 'AL70', title: 'Rhymes-C', category: 'Rhymes', price: 140, class: 'UKG' },

    // Activity
    { id: 'AL43', code: 'AL43', title: 'Table Book', category: 'Activity', price: 160, class: 'Nursery' },
    { id: 'AL71', code: 'AL71', title: 'Kids n Colours-A', category: 'Activity', price: 150, class: 'Nursery' },
    { id: 'AL72', code: 'AL72', title: 'Kids n Colours-B', category: 'Activity', price: 150, class: 'LKG' },
    { id: 'AL73', code: 'AL73', title: 'Kids n Colours-C', category: 'Activity', price: 150, class: 'UKG' },
    { id: 'AL74', code: 'AL74', title: 'Kids n Colours-1', category: 'Activity', price: 150, class: 'Class 1' },
    { id: 'AL75', code: 'AL75', title: 'Kids n Colours-2', category: 'Activity', price: 150, class: 'Class 2' },
    { id: 'AL76', code: 'AL76', title: 'Kids n Colours-3', category: 'Activity', price: 150, class: 'Class 3' },
    { id: 'AL77', code: 'AL77', title: 'Kids n Colours-4', category: 'Activity', price: 150, class: 'Class 4' },
    { id: 'AL78', code: 'AL78', title: 'Kids n Colours-5', category: 'Activity', price: 150, class: 'Class 5' }
].map(book => {
    let image = 'assets/images/cover_general.png';

    // Assign images based on category or class
    if (book.category === 'Hindi' || book.category === 'Sanskrit') {
        image = 'assets/images/cover_hindi.png';
    } else if (book.category === 'English' || book.category === 'Rhymes') {
        image = 'assets/images/cover_english.png';
    } else if (book.category === 'Maths' || book.category === 'Science' || book.category === 'EVS') {
        image = 'assets/images/cover_math.png';
    }

    // Class based override for Kindergarten
    if (book.class === 'Nursery' || book.class === 'LKG' || book.class === 'UKG') {
        image = 'assets/images/cover_kindergarten.png';
    }

    // Merge SEO data
    const seo = seoData[book.code] || {};
    const blurb = getBilingualBlurb(book.title);

    return {
        ...book,
        image: image,
        // Use SEO description if available, otherwise fallback
        description: seo.meta_description || `${book.title} is a premium quality book for ${book.class}, designed to enhance learning with NEP 2020 standards.`,
        seo: {
            ...seo,
            bilingual_blurb: blurb
        }
    };
});

export const categories = [...new Set(books.map(b => b.category))];
export const classList = [...new Set(books.map(b => b.class))];
