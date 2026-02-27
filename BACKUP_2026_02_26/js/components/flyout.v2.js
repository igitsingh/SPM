import { catalogueApi } from '../services/catalogue-api.js';
import { store } from '../store.js';
import { getCoverImage, getUnitGradient } from '../utils/book-covers.js';

const youtubeVideos = [
    { "title": "Ch 12 | Suman Prakashan Mandir | Science | Class 02 | Moving Air  | For children", "id": "t5Y1JeutIYY" },
    { "title": "Ch 8 | Suman Prakashan Mandir | Science | Class 02 | Be Safe | For children", "id": "nA7CRaBJ0fw" },
    { "title": "Ch 13 | Suman Prakashan Mandir | Science | Class 02 | Water and Water Cycle | For children", "id": "u8-DlullI7o" },
    { "title": "Ch 10 | Suman Prakashan Mandir | Science | Class 02 | Rocks and Minerals  | For children", "id": "njxIsebEERU" },
    { "title": "Ch 14 | Suman Prakashan Mandir | Science | Class 02 | Sun, Moon and Shadow  | For children", "id": "F94XcCcVeZg" },
    { "title": "Ch 11 | Suman Prakashan Mandir | Science | Class 02 | Air Around Us | For children", "id": "ORmp_3XvAPM" },
    { "title": "Ch 9 | Suman Prakashan Mandir | Science | Class 02 | Things Around Us | For children", "id": "3AJFmfdCsC0" },
    { "title": "Ch 7 | Suman Prakashan Mandir | Science | Class 02 | Houses and Clothes | For children", "id": "724ean4bLts" },
    { "title": "Ch 6 | Suman Prakashan Mandir | Science | Class 02 | Food for Good Health | For children", "id": "bPlt4jiDwxQ" },
    { "title": "Ch 5 | Suman Prakashan Mandir | Science | Class 02 | Bonse and Muscles | For children", "id": "plnIEF02LRQ" },
    { "title": "Ch 4 | Suman Prakashan Mandir | Science | Class 02 |  Wild Animals | For children", "id": "jGXYUyp4d3Y" },
    { "title": "Ch 3 | Suman Prakashan Mandir | Science | Class 02 | Uses of Animals | For children", "id": "uza_ombTFBA" },
    { "title": "Ch 13 | Suman Prakashan Mandir | Science | Class 01 | Daily Weather | For children", "id": "thfbsjan6zs" },
    { "title": "Ch 14 | Suman Prakashan Mandir | Science | Class 01 | The Sun, Moon and Stars | For children", "id": "pAacClVRJmM" },
    { "title": "Ch 6 | Suman Prakashan Mandir | Hindi | Class 02 | Chatur Khargosh  | For children", "id": "Vevw0PnercM" },
    { "title": "Ch 2 | Suman Prakashan Mandir | Grammar | Class 05 | Nouns | For children", "id": "8omZ_kBtCeY" },
    { "title": "Ch 12 | Suman Prakashan Mandir | Science | Class 01 | Water  | For children", "id": "vjraQicjJXo" },
    { "title": "Ch 10 | Suman Prakashan Mandir | Science | Class 01 | Safty and First-Aid  | For children", "id": "gLZq6QrIgKI" },
    { "title": "Ch 11 | Suman Prakashan Mandir | Science | Class 01 |  Air Around Us | For children", "id": "Fn7Z4auFAWA" },
    { "title": "Ch 4 | Suman Prakashan Mandir | Hindi | Class 02 | Rang bIRANGA Full  | For children", "id": "2-LkZ1Jog_w" },
    { "title": "Ch 10 | Suman Prakashan Mandir | Hindi | Class 02 | Thrh Thrh ke Full | For children", "id": "a4ta1MxAEbw" },
    { "title": "Ch 5 | Suman Prakashan Mandir | Science | Class 01 | Homes of Food and Animals | For children", "id": "tuXahMmXFxY" },
    { "title": "Ch 7 | Suman Prakashan Mandir | Hindi | Class 02 | Shaabaash  Aman | For children", "id": "Dpt-VTzNMVU" },
    { "title": "Ch 1 | Suman Prakashan Mandir | Grammar | Class 05 | The Seatence | For children", "id": "Udj7e9Cp0_o" },
    { "title": "Ch 9 | Suman Prakashan Mandir | Science | Class 01 |  House and Clothes | For children", "id": "xhAvRxMvGtA" },
    { "title": "Ch 8 | Suman Prakashan Mandir | Science | Class 01 | Health is Wealth | For children", "id": "uV7zfG9b6fQ" },
    { "title": "Ch 5 | Suman Prakashan Mandir | Hindi | Class 02 | Titli Rani  | For children", "id": "0L3Ss_dlQSA" },
    { "title": "Ch 6 | Suman Prakashan Mandir | Science | Class 01 |  Konwing Our Body | For children", "id": "0dxl3is7YcQ" },
    { "title": "Ch 9 | Suman Prakashan Mandir | Hindi | Class 02 | Chidia ka Sansar  | For children", "id": "CZux6-13Pik" },
    { "title": "Ch 8 | Suman Prakashan Mandir | Hindi | Class 02 | Chulbul Boond | For children", "id": "blVeUowKvjs" },
    { "title": "Ch 7 | Suman Prakashan Mandir | Science | Class 01 | The Food We Eat  | For children", "id": "00XlF5_wybA" },
    { "title": "Ch 4 | Suman Prakashan Mandir | Science | Class 01 |  Animals Around Us | For children", "id": "8sF7DWqFn4c" },
    { "title": "Ch 2 | Suman Prakashan Mandir | Grammar | Class 02 |  Nouns ( Naming Words) | For children", "id": "3sXLNiPDke8" },
    { "title": "Ch 1 | Suman Prakashan Mandir | Grammar | Class 01 | Alphabet Family | For children", "id": "DuGmgHPFHz4" },
    { "title": "Ch 1 | Suman Prakashan Mandir | Grammar | Class 03 | The Sentances | For children", "id": "OD0iJ9myRTA" },
    { "title": "Ch 3 | Suman Prakashan Mandir | Science | Class 01 | Food Four Plants  | For children", "id": "MVKpjj7xEiE" },
    { "title": "Ch 2 | Suman Prakashan Mandir | Grammar | Class 03 |  Subject  and Predicate | For children", "id": "yM0HKc4K2eU" },
    { "title": "Ch 1 | Suman Prakashan Mandir | Grammar | Class 02 | The Sentence | For children", "id": "lT8QXxYjwIE" },
    { "title": "Ch 2 | Suman Prakashan Mandir | Grammar | Class 01 | The Sentence | For children", "id": "Hx9lFi1iz5I" },
    { "title": "Ch 2 | Suman Prakashan Mandir | Vyakaran | Class 04 | Orthography | For children", "id": "gTHOD_kxNT0" },
    { "title": "Ch 1 | Suman Prakashan Mandir | Vyakaran | Class 04 | Language And Grammar | For children", "id": "t3O9hskmrKE" },
    { "title": "Ch 2 | Suman Prakashan Mandir | Vyakaran | Class 02 | Phonolpgy | For children", "id": "j-91UDtmZhw" },
    { "title": "Ch 1 | Suman Prakashan Mandir | Vyakaran | Class 03 | Language And Grammar | For children", "id": "f5-XCysuIL8" },
    { "title": "Ch 1 | Suman Prakashan Mandir | Vyakaran | Class 02 | Language | For children", "id": "u-14lql0E-Y" },
    { "title": "Ch 2 | Suman Prakashan Mandir | Vyakaran |Class 01 | Language | For children", "id": "mHGV03izPQE" },
    { "title": "Ch 1 | Suman Prakashan Mandir | Vyakaran | Class 01 | Different Types of Sounds | For children", "id": "LPu6wf0Y9pU" },
    { "title": "Ch 2 | Suman Prakashan Mandir | SST | Class 05 | THE GLOBE , LATITUDES AND LONGITUDES | For childre", "id": "t81WMTYwyGU" },
    { "title": "Ch 1 | Suman Prakashan Mandir | SST | Class 05 | MAPS | For children", "id": "6PcNVRCZ3KU" },
    { "title": "Ch 2 | Suman Prakashan Mandir | SST | Class 04 | THE NORTHERN MOUNTAINS | For children", "id": "SjVVo1pVrAc" },
    { "title": "Ch 1 | Suman Prakashan Mandir | SST | Class 04 | INDIA: OUR MOTHERLAND | For children", "id": "TirIcYNrCPE" },
    { "title": "Ch 2 | Suman Prakashan Mandir | SST | Class 03 | THE EARTH, OUR HOME  | For children", "id": "H8CRUhngy50" },
    { "title": "Ch 2 | Suman Prakashan Mandir | SST | Class 02 | TYPES OF FOOD | For children", "id": "AP9QTb-w_3o" },
    { "title": "Ch 1 | Suman Prakashan Mandir | SST | Class 03 | OUR UNIVERSE | For children", "id": "4D71xCMPL14" },
    { "title": "Ch 1 | Suman Prakashan Mandir | SST | Class 02 | OUR FAMILIES | For children", "id": "JjfdV_ZlUuo" },
    { "title": "Ch 2 | Suman Prakashan Mandir | SST | Class 01 | CRAING AND SHARING | For children", "id": "oagF2np1A58" },
    { "title": "Ch 1 | Suman Prakashan Mandir | SST | Class 01 | MY FAMAILY | For children", "id": "re0bhxkD8ms" },
    { "title": "Ch 1 | Suman Prakashan Mandir | GK | Class 05 | Desert Life | For children", "id": "9hMWWj5sAk8" },
    { "title": "Ch 2 | Suman Prakashan Mandir | GK | Class 05 | Useful Trees | For children", "id": "OQ6dmUy44zg" },
    { "title": "Ch 2 | Suman Prakashan Mandir | GK | Class 04 | Eye Spy | For children", "id": "9vEsJrhkeZo" },
    { "title": "Ch 1 | Suman Prakashan Mandir | GK | Class 04 | The Wild World | For children", "id": "78vLOA3fFNs" },
    { "title": "Ch 2 | Suman Prakashan Mandir | GK | Class 03 | Let's Dive-Under thre Sea | For children", "id": "uSjnR5VZN7w" },
    { "title": "Ch 1 | Suman Prakashan Mandir | GK | Class 03 | Animals Berakdown | For children", "id": "73Kpko9U7w0" },
    { "title": "Ch 2 | Suman Prakashan Mandir | GK | Class 02 | Interesting Creatures | For children", "id": "6tAfEpVYFsI" },
    { "title": "Ch 1 | Suman Prakashan Mandir | GK | Class 02 | Indian Spices | For children", "id": "L9NjTwFr4fY" },
    { "title": "Ch 2 | Suman Prakashan Mandir | GK | Class 01 | At the Jungle | For children", "id": "iMe0KN0DljU" },
    { "title": "Ch 1 | Suman Prakashan Mandir | GK | Class 01 | The Water Animals | For children", "id": "8KBf_hAT3GU" },
    { "title": "Ch 2 | Suman Prakashan Mandir | Science | Class 05 | Food and Health | For children", "id": "i5zFLHBIjSU" },
    { "title": "Ch 2 | Suman Prakashan Mandir | Science | Class 04 | Dental Care and Our Digestive  | For children", "id": "WRzaBwnn5ms" },
    { "title": "Ch 1 | Suman Prakashan Mandir | Science | Class 05 | Plants | For children", "id": "qplZcTub9ws" },
    { "title": "Ch 1 | Suman Prakashan Mandir | Science | Class 04 | Food That We Eat | For children", "id": "y1ETVVXvVcc" },
    { "title": "Ch 2 | Suman Prakashan Mandir | Science | Class 03 | Living and Non-living Things | For children", "id": "GyusoFMofEU" },
    { "title": "Ch 1 | Suman Prakashan Mandir | Science | Class 03 | Feeding Habits of Animals | For children", "id": "A93t1dR6zyU" },
    { "title": "Ch 1 | Suman Prakashan Mandir | Science | Class 02 | Plants Around Us | For children", "id": "XqBa5fzvK6g" },
    { "title": "Ch 2 | Suman Prakashan Mandir | Science | Class 02 | Uses of Plants | For children", "id": "eNSPnnnw15M" },
    { "title": "Ch 2 | Suman Prakashan Mandir | Science | Class 01 | Plants Around Us | For children", "id": "9oALz-MgCxc" },
    { "title": "Ch 1 | Suman Prakashan Mandir | Science | Class 01 | Our Surroundings | For children", "id": "B7ngQIiYc68" },
    { "title": "Ch 3 | Suman Prakashan Mandir | Hindi | Class 01 |Swar or Unki Matra | For children", "id": "am9S-bMOYo8" },
    { "title": "Ch 3 | Suman Prakashan Mandir | Hindi | Class 05 | Wafadar Oont | For children", "id": "Sok3rQtOOf8" },
    { "title": "Ch 3 | Suman Prakashan Mandir | Hindi | Class 04 | Pasa Palat Gaya | For children", "id": "yS2F21gMVME" },
    { "title": "Ch 2 | Suman Prakashan Mandir | Hindi | Class 04 | Heera aur Moti | For children", "id": "rVcJSAKcyYU" },
    { "title": "Ch 1 | Suman Prakashan Mandir | Hindi | Class 04 | Giriraj Himalaya | For children", "id": "WWeegJe1yfg" },
    { "title": "Ch 1 | Suman Prakashan Mandir | Hindi | Class 05 | Hamaara Desh Bhaart | For children", "id": "I2UoXUnBtnc" },
    { "title": "Ch 2 | Suman Prakashan Mandir | Hindi | Class 05 | Manahoos  | For children", "id": "oiigK_xS3gY" },
    { "title": "Ch 5 | Suman Prakashan Mandir | English | Class 04 | Cinderella | For children", "id": "Sb9FZfNn5Zk" },
    { "title": "Ch 3 | Suman Prakashan Mandir | Hindi | Class 03 | Ped Podho Me Jevan | For children", "id": "iPEyEL3Qx_8" },
    { "title": "Ch 3 | Suman Prakashan Mandir | English | Class 04 | Seeking One's Fourtune | For children", "id": "7FBiGBKIk1k" },
    { "title": "Ch 2 | Suman Prakashan Mandir | Hindi | Class 03 | Bunny Rabbit | For children", "id": "F2Ny26thRF4" },
    { "title": "Ch 1 | Suman Prakashan Mandir | English | Class 05 | Old Moti | For children", "id": "W15I2uk6xKM" },
    { "title": "Ch 2 | Suman Prakashan Mandir | English | Class 04 | Cap 'O' Rushes | For children", "id": "jcOwi-IdYXo" },
    { "title": "Ch 2 | Suman Prakashan Mandir | English | Class 05 | ToM 'S Tooth | For children", "id": "y3eVkZPvqq4" },
    { "title": "Ch 3 | Suman Prakashan Mandir | English | Class 05 | Patriotism | For children", "id": "Qjnr5o2WIQM" },
    { "title": "Ch 1 | Suman Prakashan Mandir | Hindi | Class 03 | Aaya Basant | For children", "id": "aXLb3pzFpXY" },
    { "title": "Ch 4 | Suman Prakashan Mandir | English | Class 04 | Ashoka the Great | For children", "id": "Nw7EOH3kkHk" },
    { "title": "Ch 2 | Suman Prakashan Mandir | Hindi | Class 02 | Gulaabee Paree aur Chaand | For children", "id": "6Emy9Fnl2jA" },
    { "title": "Ch 6 | Suman Prakashan Mandir | English | Class 04 | Damon and Pythias | For children", "id": "G4Rksf3Fvtc" },
    { "title": "Ch 1 | Suman Prakashan Mandir | Hindi | Class 02 | Ek Kiran | For children", "id": "UFUFlq80Sis" },
    { "title": "Ch 2 | Suman Prakashan Mandir | English | Class 02 | The Clever Fox | For children", "id": "L8-cdVNTeNg" },
    { "title": "Ch 1 | Suman Prakashan Mandir | English | Class 03 | Panna Dai | For children", "id": "mCFOnNiPQtY" },
    { "title": "Ch 3 | Suman Prakashan Mandir | English | Class 02 | The Major Match | For children", "id": "LiCleOgk8M0" },
    { "title": "Ch 3 | Suman Prakashan Mandir | Hindi | Class 02 | Natkhat Manku | For children", "id": "M-aJ2DVexEg" },
    { "title": "Ch 3 | Suman Prakashan Mandir | English | Class 01 | What do l on a regular day? | For children", "id": "z3sX4BBu8Ug" },
    { "title": "Ch 1 | Suman Prakashan Mandir | English | Class 02 | Naghty Karan | For children", "id": "YGIDmBGR-KQ" },
    { "title": "Ch 2 | Suman Prakashan Mandir | Hindi | Class 01 | Amatrik Shabd | For children", "id": "_J-Qs4xD6oA" },
    { "title": "Ch 1 | Suman Prakashan Mandir | English | Class 01 | My Loving Family | For children", "id": "dj0UHHxmZgk" },
    { "title": "Ch 1 | Suman Prakashan Mandir | Hindi | Class 01 | chalo Picknil Chale | For children", "id": "FbnTFyZ4Sik" },
    { "title": "Ch 2 | Suman Prakashan Mandir | English | Class 01 | The Furry Home | For children", "id": "XzFjXNJlzoY" }
];

function getVideosForBook(book) {
    if (book.unit !== 'Disney Publication') return [];

    let expectedSubject = '';
    const t = book.title.toLowerCase();
    const cat = (book.subject || book.category || '').toLowerCase();

    if (t.includes('quantum') || cat.includes('science')) expectedSubject = 'Science';
    else if (t.includes('नवधा') || (cat.includes('hindi') && !cat.includes('vyakaran'))) expectedSubject = 'Hindi';
    else if (t.includes('dew drops') || cat.includes('grammar')) expectedSubject = 'Grammar';
    else if (t.includes('व्याकरण') || t.includes('vyakaran') || cat.includes('vyakaran')) expectedSubject = 'Vyakaran';
    else if (t.includes('exploring society') || cat.includes('sst') || cat.includes('social studies')) expectedSubject = 'SST';
    else if (t.includes('smart') || cat.includes('gk') || cat.includes('general knowledge')) expectedSubject = 'GK';
    else if (t.includes('ripple') || (cat.includes('english') && !cat.includes('grammar'))) expectedSubject = 'English';
    else return [];

    let bClass = book.class;
    if (!bClass || bClass === 'N/A') return [];

    return youtubeVideos.filter(v => {
        const titleLower = v.title.toLowerCase();
        let hasSubject = false;

        if (expectedSubject === 'Science' && titleLower.includes('science')) hasSubject = true;
        if (expectedSubject === 'Hindi' && titleLower.includes('hindi') && !titleLower.includes('vyakaran') && !titleLower.includes('grammar')) hasSubject = true;
        if (expectedSubject === 'Grammar' && titleLower.includes('grammar')) hasSubject = true;
        if (expectedSubject === 'Vyakaran' && titleLower.includes('vyakaran')) hasSubject = true;
        if (expectedSubject === 'SST' && (titleLower.includes('sst') || titleLower.includes('social studies'))) hasSubject = true;
        if (expectedSubject === 'GK' && (titleLower.includes('gk') || titleLower.includes('general knowledge'))) hasSubject = true;
        if (expectedSubject === 'English' && titleLower.includes('english') && !titleLower.includes('grammar')) hasSubject = true;

        if (!hasSubject) return false;

        const matchClass = v.title.match(/Class\s*(\d+)/i) || [];
        let cNum = matchClass[1] || '';
        if (cNum.startsWith('0')) cNum = cNum.substring(1);

        return cNum === bClass;
    }).map(v => {
        const matchChapter = v.title.match(/Ch\s*(\d+)/i) || [];
        const chapNum = matchChapter[1] || '?';
        const titleParts = v.title.split('|');
        let cleanTitle = titleParts.length >= 5 ? titleParts[4] : (titleParts[3] || v.title);
        cleanTitle = cleanTitle.replace(/For children/gi, '').trim();
        return { ...v, chapNum, cleanTitle };
    }).sort((a, b) => parseInt(a.chapNum) - parseInt(b.chapNum));
}

let books = [];

export function initFlyout() {
    const flyout = document.getElementById('book-detail-flyout');
    const overlay = document.getElementById('overlay');

    function closeFlyout() {
        flyout.classList.remove('active');
        overlay.classList.remove('active');
    }

    overlay.addEventListener('click', closeFlyout);

    window.addEventListener('openBookDetail', async (e) => {
        if (books.length === 0) {
            try {
                const raw = await catalogueApi.getAll();
                books = raw.map(b => ({
                    ...b,
                    id: b.id,
                    code: b.code || '',
                    title: b.title,
                    class: b.class || 'N/A',
                    subject: b.subject || '',
                    unit: b.unit || '',
                    category: b.category || '',
                    price: Number(b.priceRetail) || Number(b.price) || 0,
                    image: b.coverImage || '',
                }));
            } catch (e) { console.error("Flyout data error", e); }
        }

        const bookId = e.detail;
        const book = books.find(b => b.id === bookId);

        if (!book) return;

        const generatedCover = getCoverImage(book.unit, book.subject, book.category);
        const gradient = getUnitGradient(book.unit);
        let validImage = book.image;
        if (!validImage || validImage.includes('No+Cover') || validImage === '' || validImage.includes('undefined')) {
            validImage = generatedCover || '';
        }

        const bookVideos = getVideosForBook(book);

        flyout.innerHTML = `
            <style>
            .flyout-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid #f3f4f6; }
            .flyout-body { padding: 24px; overflow-y: auto; flex: 1; }
            .flyout-footer { padding: 24px; border-top: 1px solid #f3f4f6; background: #fafafa; }
            .book-vid-card { display:block; background:white; border-radius:12px; overflow:hidden; border:1px solid #e5e7eb; text-decoration:none; transition:transform 0.2s, box-shadow 0.2s;}
            .book-vid-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
            </style>
            <div class="flyout-header">
                <h3 style="margin: 0; font-size: 1.2rem; font-weight: 700;">Book Details</h3>
                <button onclick="document.getElementById('overlay').click()" style="font-size: 1.8rem; background: transparent; border: none; cursor: pointer; color: #111827; line-height: 1;">&times;</button>
            </div>
            <div class="flyout-body">
                <div style="text-align: center; margin-bottom: 24px;">
                    ${validImage
                ? `<img src="${validImage}" alt="${book.seo?.image_alt || book.title}" style="max-width: 220px; width:100%; margin: 0 auto; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.15);">`
                : `<div style="width: 200px; height: 260px; margin: 0 auto; background:${gradient}; display:flex; align-items:center; justify-content:center; border-radius:12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"><h3 style="color:white; font-size:1.4rem; padding:16px;">${book.title}</h3></div>`
            }
                </div>
                
                <div style="margin-bottom: 32px; text-align: center;">
                    <span style="background: rgba(255, 123, 0, 0.1); color: #ea580c; padding: 6px 16px; border-radius: 20px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase;">${book.category || book.subject || book.unit}</span>
                    <h2 style="margin: 16px 0 8px; font-size: 1.8rem; font-weight: 800; color: #111827; letter-spacing: -0.5px; line-height: 1.3;">${book.seo?.h1_title || book.title}</h2>
                    <div style="display: flex; justify-content: center; gap: 8px; align-items: center; color: #6b7280; font-size: 0.95rem; font-weight: 600;">
                        <span>Class <span style="color: #111827;">${book.class}</span></span>
                        <span>•</span>
                        <span>Code <span style="color: #111827;">${book.code}</span></span>
                    </div>
                </div>

            <div class="book-details-content">
                ${book.seo?.overview || book.description ? `
                <div class="detail-section" style="margin-bottom: 24px; padding: 20px; background: #f9fafb; border-radius: 12px; border: 1px solid #f3f4f6;">
                    <h3 style="font-size: 1.1rem; color: #111827; margin-bottom: 12px; font-weight: 700;">About this Book</h3>
                    <p style="color: #4b5563; line-height: 1.6; font-size: 0.95rem; margin: 0;">${book.seo?.overview || book.description}</p>
                </div>` : ''}

                ${bookVideos.length > 0 ? `
                <div style="margin-top: 32px; padding-top: 24px; border-top: 2px dashed #e5e7eb;">
                    <h3 style="display:flex; align-items:center; gap:8px; font-size:1.3rem; color:#111827; margin-bottom:16px; font-weight: 800;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="red"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg> 
                        Synchronized Video Lectures
                    </h3>
                    <p style="color: #6b7280; font-size: 0.9rem; margin-bottom: 20px;">Watch ${bookVideos.length} expert-taught video lessons directly mapped to the chapters of this book.</p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;">
                        ${bookVideos.map(v => `
                        <a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" class="book-vid-card">
                            <div style="position:relative; aspect-ratio:16/9; background:#000;">
                                <img src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" style="width:100%;height:100%;object-fit:cover;opacity:0.85;">
                                <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center;">
                                    <div style="width:40px; height:40px; background:rgba(255,0,0,0.9); border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; box-shadow: 0 4px 10px rgba(255,0,0,0.3);">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                    </div>
                                </div>
                                <span style="position:absolute; top:8px; left:8px; background:rgba(0,0,0,0.7); backdrop-filter: blur(4px); color:white; padding:4px 8px; font-size:0.75rem; border-radius:6px; font-weight:800; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">Ch ${v.chapNum}</span>
                            </div>
                            <div style="padding:14px;">
                                <p style="font-size:0.95rem; font-weight:800; color:#111827; margin:0; line-height:1.4; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${v.cleanTitle}</p>
                            </div>
                        </a>
                        `).join('')}
                    </div>
                </div>` : ''}

            </div>
            </div>
            <div class="flyout-footer">
                <button class="btn btn-primary" onclick="window.location.hash='#/students-corner'; document.getElementById('overlay').click()" style="width: 100%; background: linear-gradient(135deg, #7c3aed, #ec4899); border: none; font-size: 1rem; padding: 14px; font-weight: 700;">View All Resources 🚀</button>
            </div>
        `;

        flyout.classList.add('active');
        overlay.classList.add('active');
    });
}
