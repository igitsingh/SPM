const fs = require('fs');

// ─── HELPER ────────────────────────────────────────────────────────────────
function books(unit, category, subject, combo, list) {
    return list.map(([code, title, cls, price]) => ({
        unit, category, subject, code, title,
        class: String(cls), price,
        combo: combo || false, nep_compliant: true, isActive: true
    }));
}

// ─── AROMA (read from old file, all J-codes) ────────────────────────────────
const oldRaw = fs.readFileSync('./catalogue_2026_old.json', 'utf8');
const oldData = JSON.parse(oldRaw);
const aromaBooks = [];
const subjectMap = {
    'Hindi': 'Hindi', 'Grammar (Hindi)': 'Hindi Grammar',
    'English Reader': 'English Reader', 'Science': 'Science',
    'Social Studies': 'Social Studies', 'Environmental Studies': 'EVS',
    'General Knowledge': 'General Knowledge', 'Moral Education': 'Moral Education',
    'Mathematics': 'Mathematics', 'Drawing': 'Drawing',
    'English Grammar': 'English Grammar', 'Computer': 'Computer'
};
for (const cat of oldData.catalogue) {
    for (const b of cat.books) {
        aromaBooks.push({
            unit: 'Aroma', category: cat.category,
            subject: subjectMap[cat.category] || cat.category,
            code: String(b.code), title: b.title,
            class: String(b.class), price: b.price,
            image: b.image || null, combo: false, nep_compliant: true, isActive: true
        });
    }
}

// ─── BLUEMOON SERIES ────────────────────────────────────────────────────────
const bluemoon = [
    ...books('Bluemoon Series', 'Hindi Writing', 'Hindi Writing', false, [
        ['M001', 'अक्षर बंदनी', 'Nursery', 170],
        ['M002', 'शब्द बंदनी', 'Nursery', 180],
        ['M003', 'स्वर बंदनी', 'Nursery', 190],
        ['M004', 'चंदनी अक्षर लेखन', 'Nursery', 190],
        ['M005', 'चंदनी शब्द लेखन', 'Nursery', 190],
        ['M006', 'चंदनी स्वर लेखन', 'Nursery', 200],
    ]),
    ...books('Bluemoon Series', 'English', 'English', false, [
        ['M007', 'My Alphabet Book', 'Nursery', 150],
        ['M008', 'English Reader Pre-primer', 'Nursery', 170],
        ['M009', 'English Reader Primer', 'Nursery', 180],
    ]),
    ...books('Bluemoon Series', 'English Writing', 'English Writing', false, [
        ['M010', 'Learning to Write Capital Letters', 'LKG', 180],
        ['M011', 'Learning to Write Small Letters', 'LKG', 180],
        ['M012', 'Learning to Write Cursive Writing (Capital & Small)', 'UKG', 190],
    ]),
    ...books('Bluemoon Series', 'Drawing', 'Drawing', false, [
        ['M013', 'Picture Album - A', 'Nursery', 160],
        ['M014', 'Picture Album - B', 'LKG', 170],
        ['M022', 'Drawing - A', 'Nursery', 135],
        ['M023', 'Drawing - B', 'LKG', 135],
        ['M024', 'Drawing - C', 'UKG', 135],
    ]),
    ...books('Bluemoon Series', 'Mathematics', 'Mathematics', false, [
        ['M015', 'Table Book', 'LKG', 150],
        ['M016', 'Number Book (1-100)', 'LKG', 185],
        ['M017', 'Mathematics Pre-Primer', 'Nursery', 265],
        ['M018', 'Mathematics Primer', 'LKG', 265],
    ]),
    ...books('Bluemoon Series', 'Rhymes', 'Rhymes', false, [
        ['M019', 'Joy of Nursery Rhymes - A', 'Nursery', 145],
        ['M020', 'Joy of Nursery Rhymes - B', 'Nursery', 145],
        ['M021', 'Joy of Nursery Rhymes - C', 'Nursery', 145],
    ]),
    ...books('Bluemoon Series', 'Science', 'Science', false, [
        ['M025', 'Universe Introductory (Science)', 'Introductory', 170],
        ['M026', 'Land Mark Introductory (Social Studies)', 'Introductory', 170],
        ['M027', 'My Green Planet-0 (E.V.S.)', 'Introductory', 170],
    ]),
    ...books('Bluemoon Series', 'Combo Bag', 'Combo', true, [
        ['M028', 'Kids Nursery Bag (7 books)', 'Nursery', 1155],
        ['M029', 'Kids LKG. Bag (8 books)', 'LKG', 1425],
        ['M030', 'Kids UKG. Bag (9 books)', 'UKG', 1625],
    ]),
];

// ─── DEEPANSHU GOLD ─────────────────────────────────────────────────────────
const deepanshu = [
    ...books('Deepanshu Gold', 'Hindi', 'Hindi', false, [
        ['DG-01', 'अक्षर माला', 'Nursery', 140], ['DG-02', 'शब्द माला', 'LKG', 140],
        ['DG-03', 'स्वर माला', 'UKG', 160], ['DG-09', 'अक्षर रचना', 'Nursery', 110],
        ['DG-10', 'शब्द रचना', 'LKG', 110], ['DG-11', 'स्वर रचना', 'UKG', 120],
        ['DG-04', 'पुष्पांजलि (हिंदी)-1', '1', 140], ['DG-05', 'पुष्पांजलि (हिंदी)-2', '2', 160],
        ['DG-06', 'पुष्पांजलि (हिंदी)-3', '3', 170], ['DG-07', 'पुष्पांजलि (हिंदी)-4', '4', 185],
        ['DG-08', 'पुष्पांजलि (हिंदी)-5', '5', 195],
    ]),
    ...books('Deepanshu Gold', 'Hindi Grammar', 'Hindi Grammar', false, [
        ['DG-53', 'व्याकरण वर्ष-1', '1', 140], ['DG-54', 'व्याकरण वर्ष-2', '2', 140],
        ['DG-55', 'व्याकरण वर्ष-3', '3', 160], ['DG-56', 'व्याकरण वर्ष-4', '4', 175],
        ['DG-57', 'व्याकरण वर्ष-5', '5', 195],
    ]),
    ...books('Deepanshu Gold', 'English', 'English', false, [
        ['DG-12', 'My ABC Book', 'Nursery', 140],
        ['DG-14', 'English Reader (Pre-Primer)', 'LKG', 140],
        ['DG-15', 'English Reader (Primer)', 'UKG', 150],
        ['DG-16', 'English Reader-1', '1', 120], ['DG-17', 'English Reader-2', '2', 140],
        ['DG-18', 'English Reader-3', '3', 150], ['DG-19', 'English Reader-4', '4', 165],
        ['DG-20', 'English Reader-5', '5', 175],
    ]),
    ...books('Deepanshu Gold', 'English Writing', 'English Writing', false, [
        ['DG-21', 'English Writing (Capital Letters)', 'Nursery', 120],
        ['DG-22', 'English Writing (Small Letters)', 'LKG', 110],
        ['DG-23', 'English Writing-1', '1', 100], ['DG-24', 'English Writing-2', '2', 100],
        ['DG-25', 'English Writing-3', '3', 100], ['DG-26', 'English Writing-4', '4', 100],
        ['DG-27', 'English Writing-5', '5', 100],
    ]),
    ...books('Deepanshu Gold', 'English Grammar', 'English Grammar', false, [
        ['DG-58', 'Eng. Gr. & Translation-1', '1', 140],
        ['DG-59', 'Eng. Gr. & Translation-2', '2', 160],
        ['DG-60', 'Eng. Gr. & Translation-3', '3', 170],
        ['DG-61', 'Eng. Gr. & Translation-4', '4', 175],
        ['DG-62', 'Eng. Gr. & Translation-5', '5', 190],
    ]),
    ...books('Deepanshu Gold', 'Mathematics', 'Mathematics', false, [
        ['DG-45', 'Basic Math (Introductory)', 'Nursery', 120],
        ['DG-46', 'Basic Math (Pre-Primer)', 'LKG', 140],
        ['DG-47', 'Basic Math (Primer)', 'UKG', 150],
        ['DG-44', 'Number Book (1-100)', 'LKG', 130],
        ['DG-43', 'Table Book', 'UKG', 110],
        ['DG-48', 'Basic Math-1', '1', 190], ['DG-49', 'Basic Math-2', '2', 195],
        ['DG-50', 'Basic Math-3', '3', 195], ['DG-51', 'Basic Math-4', '4', 210],
        ['DG-52', 'Basic Math-5', '5', 245],
    ]),
    ...books('Deepanshu Gold', 'Science', 'Science', false, [
        ['DG-38', 'प्रगतिशील विज्ञान-1', '1', 150],
        ['DG-39', 'प्रगतिशील विज्ञान-2', '2', 170],
        ['DG-40', 'प्रगतिशील विज्ञान-3', '3', 180],
        ['DG-41', 'प्रगतिशील विज्ञान-4', '4', 190],
        ['DG-42', 'प्रगतिशील विज्ञान-5', '5', 190],
    ]),
    ...books('Deepanshu Gold', 'EVS', 'EVS', false, [
        ['DG-33', 'Hamara Samaj Evam Paryavaran-1', '1', 150],
        ['DG-34', 'Hamara Samaj Evam Paryavaran-2', '2', 170],
        ['DG-35', 'Hamara Samaj Evam Paryavaran-3', '3', 180],
        ['DG-36', 'Hamara Samaj Evam Paryavaran-4', '4', 190],
        ['DG-37', 'Hamara Samaj Evam Paryavaran-5', '5', 195],
    ]),
    ...books('Deepanshu Gold', 'Sanskrit', 'Sanskrit', false, [
        ['DG-28', 'Sanskrit Parichay-1', '1', 120], ['DG-29', 'Sanskrit Parichay-2', '2', 140],
        ['DG-30', 'Sanskrit Parichay-3', '3', 150], ['DG-31', 'Sanskrit Parichay-4', '4', 150],
        ['DG-32', 'Sanskrit Parichay-5', '5', 165],
    ]),
    ...books('Deepanshu Gold', 'Moral Education & GK', 'Moral Education', false, [
        ['DG-63', 'नैतिक शिक्षा एवं सामान्य ज्ञान-1', '1', 130],
        ['DG-64', 'नैतिक शिक्षा एवं सामान्य ज्ञान-2', '2', 135],
        ['DG-65', 'नैतिक शिक्षा एवं सामान्य ज्ञान-3', '3', 150],
        ['DG-66', 'नैतिक शिक्षा एवं सामान्य ज्ञान-4', '4', 160],
        ['DG-67', 'नैतिक शिक्षा एवं सामान्य ज्ञान-5', '5', 166],
    ]),
    ...books('Deepanshu Gold', 'Drawing', 'Drawing', false, [
        ['DG-13', 'Picture Album', 'UKG', 100],
        ['DG-68', 'Fifty-Fifty Rhymes - A', 'Nursery', 110],
        ['DG-69', 'Fifty-Fifty Rhymes - B', 'LKG', 110],
        ['DG-70', 'Fifty-Fifty Rhymes - C', 'UKG', 110],
        ['DG-71', 'Kids \'n\' Colours - A', 'Nursery', 100],
        ['DG-72', 'Kids \'n\' Colours - B', 'LKG', 100],
        ['DG-73', 'Kids \'n\' Colours - C', 'UKG', 100],
        ['DG-74', 'Kids \'n\' Colours-1', '1', 120], ['DG-75', 'Kids \'n\' Colours-2', '2', 120],
        ['DG-76', 'Kids \'n\' Colours-3', '3', 130], ['DG-77', 'Kids \'n\' Colours-4', '4', 140],
        ['DG-78', 'Kids \'n\' Colours-5', '5', 140],
    ]),
    ...books('Deepanshu Gold', 'Combo Bag', 'Combo', true, [
        ['DG-NUR', 'Nursery Books (7 Books)', 'Nursery', 840],
        ['DG-LKG', 'L.K.G. Books (8 Books)', 'LKG', 980],
        ['DG-UKG', 'U.K.G. Books (9 Books)', 'UKG', 1000],
    ]),
];

// ─── DISNEY PUBLICATION ─────────────────────────────────────────────────────
const disney = [
    ...books('Disney Publication', 'Hindi', 'Hindi', false, [
        ['D-001', 'नवधा (हिंदी पाठ्य पुस्तक) - 1', '1', 280],
        ['D-002', 'नवधा (हिंदी पाठ्य पुस्तक) - 2', '2', 295],
        ['D-003', 'नवधा (हिंदी पाठ्य पुस्तक) - 3', '3', 325],
        ['D-004', 'नवधा (हिंदी पाठ्य पुस्तक) - 4', '4', 340],
        ['D-005', 'नवधा (हिंदी पाठ्य पुस्तक) - 5', '5', 350],
        ['D-006', 'नवधा (हिंदी पाठ्य पुस्तक) - 6', '6', 375],
        ['D-007', 'नवधा (हिंदी पाठ्य पुस्तक) - 7', '7', 385],
        ['D-008', 'नवधा (हिंदी पाठ्य पुस्तक) - 8', '8', 395],
    ]),
    ...books('Disney Publication', 'Hindi Grammar', 'Hindi Grammar', false, [
        ['D-009', 'व्याकरण दीक्षा - 1', '1', 240],
        ['D-010', 'व्याकरण दीक्षा - 2', '2', 250],
        ['D-011', 'व्याकरण दीक्षा - 3', '3', 270],
        ['D-012', 'व्याकरण दीक्षा - 4', '4', 280],
        ['D-013', 'व्याकरण दीक्षा - 5', '5', 290],
    ]),
    ...books('Disney Publication', 'English Reader', 'English Reader', false, [
        ['D-014', 'Ripple - 1', '1', 280], ['D-015', 'Ripple - 2', '2', 295],
        ['D-016', 'Ripple - 3', '3', 325], ['D-017', 'Ripple - 4', '4', 340],
        ['D-018', 'Ripple - 5', '5', 350], ['D-019', 'Ripple - 6', '6', 375],
        ['D-020', 'Ripple - 7', '7', 385], ['D-021', 'Ripple - 8', '8', 395],
    ]),
    ...books('Disney Publication', 'English Grammar', 'English Grammar', false, [
        ['D-022', 'Dew Drops of Grammar - 1', '1', 240],
        ['D-023', 'Dew Drops of Grammar - 2', '2', 250],
        ['D-024', 'Dew Drops of Grammar - 3', '3', 270],
        ['D-025', 'Dew Drops of Grammar - 4', '4', 280],
        ['D-026', 'Dew Drops of Grammar - 5', '5', 290],
    ]),
    ...books('Disney Publication', 'Science', 'Science', false, [
        ['D-027', 'Quantum - 1', '1', 280], ['D-028', 'Quantum - 2', '2', 295],
        ['D-029', 'Quantum - 3', '3', 320], ['D-030', 'Quantum - 4', '4', 330],
        ['D-031', 'Quantum - 5', '5', 350],
    ]),
    ...books('Disney Publication', 'Social Studies', 'Social Studies', false, [
        ['D-032', 'Exploring Society - 1', '1', 280],
        ['D-033', 'Exploring Society - 2', '2', 295],
        ['D-034', 'Exploring Society - 3', '3', 320],
        ['D-035', 'Exploring Society - 4', '4', 330],
        ['D-036', 'Exploring Society - 5', '5', 350],
    ]),
    ...books('Disney Publication', 'Mathematics', 'Mathematics', false, [
        ['D-037', 'Calculas (Math) - 1', '1', 415],
        ['D-038', 'Calculas (Math) - 2', '2', 435],
        ['D-039', 'Calculas (Math) - 3', '3', 460],
        ['D-040', 'Calculas (Math) - 4', '4', 475],
        ['D-041', 'Calculas (Math) - 5', '5', 490],
    ]),
    ...books('Disney Publication', 'General Knowledge', 'General Knowledge', false, [
        ['D-042', 'Smart G.K - 1', '1', 190], ['D-043', 'Smart G.K - 2', '2', 200],
        ['D-044', 'Smart G.K - 3', '3', 210], ['D-045', 'Smart G.K - 4', '4', 220],
        ['D-046', 'Smart G.K - 5', '5', 230], ['D-047', 'Smart G.K - 6', '6', 240],
        ['D-048', 'Smart G.K - 7', '7', 250], ['D-049', 'Smart G.K - 8', '8', 260],
    ]),
    ...books('Disney Publication', 'Computer', 'Computer', false, [
        ['D-050', 'Computer - 1', '1', 270], ['D-051', 'Computer - 2', '2', 295],
        ['D-052', 'Computer - 3', '3', 310], ['D-053', 'Computer - 4', '4', 320],
        ['D-054', 'Computer - 5', '5', 330],
    ]),
];

// ─── HARMONY PUBLICATIONS ───────────────────────────────────────────────────
const harmony = [
    ...books('Harmony Publications', 'Hindi', 'Hindi', false, [
        ['H007', 'निहारिका (हिंदी की पाठ्य पुस्तक)-1', '1', 280],
        ['H008', 'निहारिका (हिंदी की पाठ्य पुस्तक)-2', '2', 300],
        ['H009', 'निहारिका (हिंदी की पाठ्य पुस्तक)-3', '3', 315],
        ['H010', 'निहारिका (हिंदी की पाठ्य पुस्तक)-4', '4', 330],
        ['H011', 'निहारिका (हिंदी की पाठ्य पुस्तक)-5', '5', 350],
        ['H101', 'निहारिका (हिंदी की पाठ्य पुस्तक)-6', '6', 330],
        ['H102', 'निहारिका (हिंदी की पाठ्य पुस्तक)-7', '7', 345],
        ['H103', 'निहारिका (हिंदी की पाठ्य पुस्तक)-8', '8', 355],
    ]),
    ...books('Harmony Publications', 'Hindi Grammar', 'Hindi Grammar', false, [
        ['H012', 'मणिका (व्याकरण की पाठ्य-पुस्तक)-1', '1', 250],
        ['H013', 'मणिका (व्याकरण की पाठ्य-पुस्तक)-2', '2', 260],
        ['H014', 'मणिका (व्याकरण की पाठ्य-पुस्तक)-3', '3', 275],
        ['H015', 'मणिका (व्याकरण की पाठ्य-पुस्तक)-4', '4', 285],
        ['H016', 'मणिका (व्याकरण की पाठ्य-पुस्तक)-5', '5', 305],
    ]),
    ...books('Harmony Publications', 'English Reader', 'English Reader', false, [
        ['H027', 'Pearl (English Reader)-1', '1', 280],
        ['H028', 'Pearl (English Reader)-2', '2', 300],
        ['H029', 'Pearl (English Reader)-3', '3', 310],
        ['H030', 'Pearl (English Reader)-4', '4', 325],
        ['H031', 'Pearl (English Reader)-5', '5', 345],
        ['H104', 'Pearl (English Reader)-6', '6', 360],
        ['H105', 'Pearl (English Reader)-7', '7', 385],
        ['H106', 'Pearl (English Reader)-8', '8', 395],
    ]),
    ...books('Harmony Publications', 'Social Studies', 'Social Studies', false, [
        ['H032', 'Liberty (Social Studies)-1', '1', 295],
        ['H033', 'Liberty (Social Studies)-2', '2', 305],
        ['H034', 'Liberty (Social Studies)-3', '3', 330],
        ['H035', 'Liberty (Social Studies)-4', '4', 350],
        ['H036', 'Liberty (Social Studies)-5', '5', 365],
    ]),
    ...books('Harmony Publications', 'Science', 'Science', false, [
        ['H037', 'Gravity (Science)-1', '1', 310], ['H038', 'Gravity (Science)-2', '2', 325],
        ['H039', 'Gravity (Science)-3', '3', 345], ['H040', 'Gravity (Science)-4', '4', 355],
        ['H041', 'Gravity (Science)-5', '5', 365], ['H107', 'Gravity (Science)-6', '6', 400],
        ['H108', 'Gravity (Science)-7', '7', 415], ['H109', 'Gravity (Science)-8', '8', 425],
    ]),
    ...books('Harmony Publications', 'Mathematics', 'Mathematics', false, [
        ['H047', 'Vector (Mathematics)-1', '1', 425],
        ['H048', 'Vector (Mathematics)-2', '2', 465],
        ['H049', 'Vector (Mathematics)-3', '3', 475],
        ['H050', 'Vector (Mathematics)-4', '4', 490],
        ['H051', 'Vector (Mathematics)-5', '5', 495],
        ['H110', 'Vector (Mathematics)-6', '6', 560],
        ['H111', 'Vector (Mathematics)-7', '7', 570],
        ['H112', 'Vector (Mathematics)-8', '8', 590],
    ]),
    ...books('Harmony Publications', 'Drawing', 'Drawing', false, [
        ['H064', 'Crayons (A Book of Drawing)-1', '1', 165],
        ['H065', 'Crayons (A Book of Drawing)-2', '2', 165],
        ['H066', 'Crayons (A Book of Drawing)-3', '3', 165],
        ['H067', 'Crayons (A Book of Drawing)-4', '4', 165],
        ['H068', 'Crayons (A Book of Drawing)-5', '5', 165],
    ]),
    ...books('Harmony Publications', 'General Knowledge', 'General Knowledge', false, [
        ['H069', 'Quest (A Book of G.K.)-1', '1', 205],
        ['H070', 'Quest (A Book of G.K.)-2', '2', 215],
        ['H071', 'Quest (A Book of G.K.)-3', '3', 220],
        ['H072', 'Quest (A Book of G.K.)-4', '4', 230],
        ['H073', 'Quest (A Book of G.K.)-5', '5', 245],
    ]),
    ...books('Harmony Publications', 'Computer', 'Computer', false, [
        ['H074', 'Computer.Com-1', '1', 270], ['H075', 'Computer.Com-2', '2', 285],
        ['H076', 'Computer.Com-3', '3', 295], ['H077', 'Computer.Com-4', '4', 315],
        ['H078', 'Computer.Com-5', '5', 325], ['H113', 'Computer.Com-6', '6', 330],
        ['H114', 'Computer.Com-7', '7', 350], ['H115', 'Computer.Com-8', '8', 355],
    ]),
    ...books('Harmony Publications', 'Combo Bag', 'Combo', true, [
        ['Y079', 'All-in-One (Reading)-A', 'Nursery', 350],
        ['Y080', 'All-in-One (Reading)-B', 'LKG', 350],
        ['Y081', 'All-in-One (Reading)-C', 'UKG', 350],
        ['Y082', 'All-in-One (Writing)-A', 'Nursery', 350],
        ['Y083', 'All-in-One (Writing)-B', 'LKG', 350],
        ['Y084', 'All-in-One (Writing)-C', 'UKG', 350],
    ]),
];

// ─── PEARL (Coming Soon placeholder) ───────────────────────────────────────
const pearl = [{
    unit: 'Pearl', category: 'Coming Soon', subject: 'General',
    code: 'P001', title: 'Pearl Series - Coming Soon',
    class: 'N/A', price: 0, combo: false, nep_compliant: true, isActive: false
}];

// ─── MERGE ALL ──────────────────────────────────────────────────────────────
const allBooks = [
    ...aromaBooks,
    ...bluemoon,
    ...deepanshu,
    ...disney,
    ...harmony,
    ...pearl
];

fs.writeFileSync('./catalogue_2026.json', JSON.stringify({ books: allBooks }, null, 2));
console.log(`✅ catalogue_2026.json built with ${allBooks.length} books.`);
console.log(`   Aroma: ${aromaBooks.length}`);
console.log(`   Bluemoon: ${bluemoon.length}`);
console.log(`   Deepanshu Gold: ${deepanshu.length}`);
console.log(`   Disney: ${disney.length}`);
console.log(`   Harmony: ${harmony.length}`);
console.log(`   Pearl: ${pearl.length}`);
