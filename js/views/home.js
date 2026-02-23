import { catalogueApi } from '../services/catalogue-api.js';
import { renderBookCard } from '../components/book-card.js';

export async function renderHome() {
    let books = [];
    try {
        const data = await catalogueApi.getAll();
        books = data.map(b => ({
            ...b,
            id: b.id,
            code: b.code || '',
            title: b.title,
            category: b.category || 'General',
            subject: b.subject || '',
            unit: b.unit || 'Aroma',
            class: b.class || 'N/A',
            price: Number(b.priceRetail) || 0,
            image: b.coverImage || '',
            description: b.description || ''
        }));
    } catch (e) {
        console.error("Failed to load books for home:", e);
    }

    // fallback if empty
    if (books.length === 0) {
        // Just return a simplified view or continue with empty arrays to act as graceful degradation
    }

    // Data filtering
    const boardBooks = books.filter(b => b.category === 'Broad Book' || b.category === 'Board Book').slice(0, 4);
    // If no board books, just take first 4
    const displayBoardBooks = boardBooks.length > 0 ? boardBooks : books.slice(0, 4);

    const kindergartenBooks = books.filter(b => b.class && (b.class.includes('Nursery') || b.class.includes('KG'))).slice(0, 4);
    const displayKindergarten = kindergartenBooks.length > 0 ? kindergartenBooks : books.slice(5, 9);

    // Sort by some criteria or random for bestsellers if not explicitly marked
    const bestsellers = books.slice(10, 14);

    const bundleBook1 = books[15] || books[0] || {};
    const bundleBook2 = books[16] || books[1] || {};

    return `
        <!-- REDESIGNED HERO SLIDER --><div class="spm-hero-slider" id="spm-hero-slider">
            ${[
            {
                id: 'aroma',
                name: 'AROMA BOOKS',
                tagline: 'Building Bright Futures, One Book at a Time',
                bg: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80',
                color: '#FFD700',
                books: ['/public/images/books/aroma_hindi.png', '/public/images/books/aroma_english.png', '/public/images/books/aroma_maths.png'],
                link: '#/catalogue?unit=Aroma'
            },
            {
                id: 'bluemoon',
                name: 'BLUEMOON SERIES',
                tagline: 'Joyful Learning for Early Childhood',
                bg: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=80',
                color: '#3b82f6',
                books: ['/public/images/books/bluemoon_alphabet.png', '/public/images/books/bluemoon_drawing.png', '/public/images/books/bluemoon_alphabet.png'],
                link: '#/catalogue?unit=Bluemoon%20Series'
            },
            {
                id: 'deepanshu',
                name: 'DEEPANSHU GOLD',
                tagline: 'Excellence in Academic Publishing',
                bg: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80',
                color: '#b45309',
                books: ['/public/images/books/deepanshu_hindi.png', '/public/images/books/deepanshu_maths.png', '/public/images/books/deepanshu_hindi.png'],
                link: '#/catalogue?unit=Deepanshu%20Gold'
            },
            {
                id: 'disney',
                name: 'DISNEY PUBLICATION',
                tagline: 'Nurturing Young Minds Creatively',
                bg: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&w=1600&q=80',
                color: '#0891b2',
                books: ['/public/images/books/disney_hindi.png', '/public/images/books/disney_maths.png', '/public/images/books/disney_social.png'],
                link: '#/catalogue?unit=Disney%20Publication'
            },
            {
                id: 'harmony',
                name: 'HARMONY BOOKS',
                tagline: 'Comprehensive Learning for Classes 1-8',
                bg: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80',
                color: '#16a34a',
                books: ['/public/images/books/harmony_science.png', '/public/images/books/harmony_maths.png', '/public/images/books/harmony_english.png'],
                link: '#/catalogue?unit=Harmony%20Publications'
            }
        ].map((slide, i) => `
                <div class="spm-slide ${i === 0 ? 'active' : ''}" style="background-image: url('${slide.bg}');"><div class="spm-slide-overlay"></div><div class="container spm-slide-container"><div class="spm-slide-text"><span class="spm-series-label">Series</span><h1 class="spm-series-name">${slide.name}</h1><p class="spm-series-tagline">${slide.tagline}</p><a href="${slide.link}" class="spm-discover-btn" style="--btn-color: ${slide.color}">
                                Discover Now <span class="spm-btn-arrow">›</span></a></div><div class="spm-slide-visual">
                            ${slide.books.map((b, bi) => `
                                <div class="spm-hero-book-wrap" style="--book-index: ${bi}"><img src="${b}" alt="Book" onerror="this.src='https://via.placeholder.com/200x280?text=SPM+Book'"></div>
                            `).join('')}
                        </div></div></div>
            `).join('')}

            <!-- Social Icons Right --><div class="spm-hero-social"><a href="#"><img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="FB"></a><a href="#"><img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="IG"></a><a href="#"><img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" alt="TW"></a><a href="#"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LI"></a></div><!-- Slider Dots --><div class="spm-hero-dots"><span class="spm-dot active" data-index="0"></span><span class="spm-dot" data-index="1"></span><span class="spm-dot" data-index="2"></span><span class="spm-dot" data-index="3"></span><span class="spm-dot" data-index="4"></span></div></div><style>
        /* ─── Hero Slider Core Styles ─── */
        .spm-hero-slider {
            position: relative;
            height: 700px;
            width: 100%;
            overflow: hidden;
            background: #000;
        }
        .spm-slide {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            opacity: 0;
            visibility: hidden;
            background-size: cover;
            background-position: center;
            transition: all 1s ease-in-out;
            display: flex;
            align-items: center;
        }
        .spm-slide.active {
            opacity: 1;
            visibility: visible;
            z-index: 10;
        }
        .spm-slide-overlay {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%);
            z-index: 1;
        }
        .spm-slide-container {
            position: relative;
            z-index: 2;
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            align-items: center;
            gap: 40px;
            padding: 0 40px;
        }

        /* Text Layer */
        .spm-slide-text {
            color: white;
            animation: slideTextIn 0.8s ease-out forwards;
        }
        @keyframes slideTextIn {
            from { transform: translateX(-50px); opacity: 0; }
            to   { transform: translateX(0); opacity: 1; }
        }
        .spm-series-label {
            display: block;
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem;
            color: #FFD700;
            margin-bottom: 8px;
            font-style: italic;
        }
        .spm-series-name {
            font-size: 5rem;
            font-weight: 900;
            margin-bottom: 20px;
            color: #fff;
            line-height: 1;
            letter-spacing: -2px;
            text-transform: uppercase;
        }
        .spm-series-tagline {
            font-size: 1.4rem;
            color: rgba(255,255,255,0.8);
            margin-bottom: 40px;
            font-weight: 400;
        }
        .spm-discover-btn {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 16px 40px;
            background: #0084ff;
            color: white;
            text-decoration: none;
            font-weight: 700;
            border-radius: 50px;
            font-size: 1.1rem;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 10px 30px rgba(0,132,255,0.4);
            background: var(--btn-color);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .spm-discover-btn:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 15px 40px rgba(0,0,0,0.5);
            color: white;
        }
        .spm-btn-arrow { font-size: 1.6rem; transform: translateY(-1px); }

        /* Visual Layer (Floating Books) */
        .spm-slide-visual {
            position: relative;
            height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .spm-hero-book-wrap {
            position: absolute;
            width: 240px;
            aspect-ratio: 1 / 1.4;
            background: #fff;
            border-radius: 4px;
            box-shadow: -20px 20px 40px rgba(0,0,0,0.6);
            overflow: hidden;
            transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
            animation: bookFloat 4s ease-in-out infinite alternate;
            animation-delay: calc(var(--book-index) * 0.5s);
        }
        @keyframes bookFloat {
            from { transform: translateY(0) rotate(-15deg) skewY(10deg); }
            to   { transform: translateY(-20px) rotate(-15deg) skewY(10deg); }
        }

        /* Individual Book Positioning (Perspective Stack) */
        .spm-hero-book-wrap[style*="--book-index: 0"] { z-index: 5; margin-left: 0; }
        .spm-hero-book-wrap[style*="--book-index: 1"] { z-index: 4; margin-left: -120px; transform: scale(0.9) translate(-40px, 20px); opacity: 0.9; }
        .spm-hero-book-wrap[style*="--book-index: 2"] { z-index: 3; margin-left: -240px; transform: scale(0.8) translate(-80px, 40px); opacity: 0.8; }

        .spm-hero-book-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        /* Social Icons */
        .spm-hero-social {
            position: absolute;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 20px;
            z-index: 20;
        }
        .spm-hero-social a {
            width: 44px;
            height: 44px;
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(5px);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
            border: 1px solid rgba(255,255,255,0.2);
        }
        .spm-hero-social a:hover {
            background: #fff;
            transform: scale(1.1) rotate(10deg);
        }
        .spm-hero-social img { width: 22px; filter: invert(1); }
        .spm-hero-social a:hover img { filter: none; }

        /* Slider Dots */
        .spm-hero-dots {
            position: absolute;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 15px;
            z-index: 20;
        }
        .spm-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid #fff;
            cursor: pointer;
            transition: all 0.3s;
        }
        .spm-dot.active {
            background: #FFD700;
            border-color: #FFD700;
            width: 40px;
            border-radius: 10px;
        }

        @media (max-width: 991px) {
            .spm-slide-container { grid-template-columns: 1fr; text-align: center; }
            .spm-series-name { font-size: 3.5rem; }
            .spm-slide-visual { display: none; }
            .spm-hero-social { display: none; }
        </style><!-- ═══════════════════════════════════════════════════════
             EXPLORE OUR PUBLICATIONS — Dynamic Brand + Subject Browser
             ═══════════════════════════════════════════════════════ --><div class="spm-explore-section"><div class="spm-explore-inner"><!-- Section Header --><div class="text-center" style="margin-bottom: 48px;"><span class="spm-section-pill"> Our Learning World</span><h2 class="spm-explore-title">Building World of Learning</h2><p class="spm-explore-sub" style="max-width: 800px; margin: 0 auto; line-height: 1.6;">
                    From playful first steps to confident academic success —<br>
                    our thoughtfully designed books nurture curiosity, creativity, and strong foundations from Pre-Primary to Class 8.<br><br><strong>5 dynamic series • 299 engaging titles • NEP 2020 aligned • Session 2025–26</strong></p></div><!-- Publication Brand Tabs --><div class="spm-pub-tabs" id="spm-pub-tabs">
                ${[
            { id: 'Aroma', logo: './assets/images/Aroma Logo.png', rgb: '194, 65, 12', bg: './assets/images/aroma_bg.png', border: '#f59e0b', scale: 1, books: books.filter(b => b.unit === 'Aroma') },
            { id: 'Bluemoon Series', logo: './assets/images/Bluemoon Logo.png', rgb: '15, 23, 42', bg: './assets/images/bluemoon_bg.png', border: '#60a5fa', scale: 1.1, books: books.filter(b => b.unit === 'Bluemoon Series') },
            { id: 'Deepanshu Gold', logo: './assets/images/DeepanshuGold Logo.png', rgb: '38, 38, 38', bg: './assets/images/deepanshu_bg.png', border: '#fbbf24', scale: 1.45, books: books.filter(b => b.unit === 'Deepanshu Gold') },
            { id: 'Disney Publication', logo: './assets/images/Disney Logo.png', rgb: '126, 34, 206', bg: './assets/images/disney_bg.png', border: '#e879f9', scale: 1.1, books: books.filter(b => b.unit === 'Disney Publication') },
            { id: 'Harmony Publications', logo: './assets/images/Harmony Logo.png', rgb: '6, 78, 59', bg: './assets/images/harmony_bg.png', border: '#10b981', scale: 1.1, books: books.filter(b => b.unit === 'Harmony Publications') },
        ].map((pub, i) => `
                    <button class="spm-pub-tab ${i === 0 ? 'active' : ''}"
                            data-unit="${pub.id}"
                            style="--pub-rgb: ${pub.rgb}; --pub-bg: url('${pub.bg}'); --pub-border: ${pub.border}; --logo-scale: ${pub.scale || 1}; --hover-scale: ${(pub.scale || 1) * 1.05};">
                        <div class="spm-pub-tab-logo-wrap">
                            <img src="${pub.logo}" alt="${pub.id}" class="spm-pub-tab-logo" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
                            <span class="spm-pub-tab-text" style="display:none;">${pub.id}</span>
                        </div>
                        <span class="spm-pub-tab-count">${pub.books.length} BOOKS</span>
                    </button>
                `).join('')}
            </div><!-- Content Panel --><div class="spm-explore-panel" id="spm-explore-panel"><!-- Subject Filter Chips --><div class="spm-subject-chips" id="spm-subject-chips"></div><!-- Book Preview Grid --><div class="spm-preview-grid" id="spm-preview-grid"></div><!-- View All CTA --><div class="text-center" style="margin-top: 40px;"><a id="spm-view-all-link" href="#/catalogue" class="spm-view-all-btn">
                        View All Books in This Series →
                    </a></div></div></div></div><style>
        /* ═══ Explore Publications Section ═══ */
        .spm-explore-section {
            background: url('./assets/images/kids_abstract_bg.png') center/cover fixed;
            padding: 80px 40px;
            width: 100%;
        }
        .spm-explore-inner {
            max-width: 1400px;
            margin: 0 auto;
        }

        .spm-section-pill {
            display: inline-block;
            background: #0d3b8e;
            color: #FFD700;
            font-size: 0.8rem;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            padding: 6px 16px;
            border-radius: 20px;
            margin-bottom: 16px;
        }

        .spm-explore-title {
            font-size: clamp(1.8rem, 3vw, 2.8rem);
            font-weight: 900;
            color: #0f172a;
            margin-bottom: 12px;
            line-height: 1.2;
        }

        .spm-explore-sub {
            font-size: 1rem;
            color: #64748b;
            letter-spacing: 0.3px;
        }

        /* Publication Tabs */
        .spm-pub-tabs {
            display: flex;
            gap: 16px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 44px;
        }

        .spm-pub-tab {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            border: 2px solid transparent;
            border-radius: 8px;
            background: linear-gradient(rgba(var(--pub-rgb), 0.92), rgba(var(--pub-rgb), 0.92)), var(--pub-bg) center/cover;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 220px;
            height: 120px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            color: white;
            text-transform: uppercase;
        }
        
        .spm-pub-tab:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(var(--pub-rgb), 0.5);
            border-color: rgba(255,255,255,0.4);
        }

        .spm-pub-tab.active {
            border-color: var(--pub-border);
            background: linear-gradient(rgba(var(--pub-rgb), 0.75), rgba(var(--pub-rgb), 0.75)), var(--pub-bg) center/cover;
            box-shadow: 0 8px 25px rgba(var(--pub-rgb), 0.4);
        }

        .spm-pub-tab-logo-wrap {
            height: 95px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .spm-pub-tab-logo {
            max-height: 100%;
            max-width: 100%;
            object-fit: contain;
            transition: all 0.3s ease;
            transform: scale(var(--logo-scale, 1));
        }

        .spm-pub-tab:hover .spm-pub-tab-logo {
            transform: scale(var(--hover-scale, 1.05));
        }

        .spm-pub-tab-text {
            font-family: 'Inter', sans-serif;
            font-size: 1.05rem;
            font-weight: 800;
            letter-spacing: 2px;
            text-align: center;
        }

        .spm-pub-tab-count {
            position: absolute;
            bottom: 12px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 0.75rem;
            color: rgba(255,255,255,0.7);
            font-weight: 600;
            letter-spacing: 1px;
        }

        /* Panel */
        .spm-explore-panel {
            background: white;
            border-radius: 20px;
            padding: 32px;
            box-shadow: 0 4px 40px rgba(0,0,0,0.06);
            border: 1px solid #f1f5f9;
            animation: panelFadeIn 0.3s ease;
        }
        @keyframes panelFadeIn {
            from { opacity:0; transform:translateY(12px); }
            to   { opacity:1; transform:translateY(0); }
        }

        /* Subject chips */
        .spm-subject-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 28px;
        }
        .spm-chip {
            padding: 6px 16px;
            border-radius: 20px;
            border: 1.5px solid #e2e8f0;
            background: white;
            font-size: 0.8rem;
            font-weight: 600;
            color: #475569;
            cursor: pointer;
            transition: all 0.18s;
        }
        .spm-chip:hover, .spm-chip.active {
            border-color: var(--active-color, #1145a4);
            background: var(--active-light, #eff6ff);
            color: var(--active-color, #1145a4);
        }

        /* Book grid */
        .spm-preview-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 24px;
            min-height: 300px;
        }

        /* View all CTA */
        .spm-view-all-btn {
            display: inline-block;
            padding: 14px 44px;
            background: #0f172a;
            color: white;
            border-radius: 50px;
            font-weight: 700;
            font-size: 0.95rem;
            text-decoration: none;
            letter-spacing: 0.3px;
            transition: all 0.2s;
            box-shadow: 0 4px 16px rgba(15,23,42,0.2);
        }
        .spm-view-all-btn:hover {
            background: #1145a4;
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(17,69,164,0.3);
        }
        </style><!-- Kindergarten Section --><div class="section" style="background: linear-gradient(135deg,#e0f7fa,#b2ebf2); padding-top: 100px; padding-bottom: 100px;"><div class="container"><div class="text-center mb-12"><span style="display:inline-block;background:#0891b2;color:white;font-size:0.75rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:6px 16px;border-radius:20px;margin-bottom:14px;"> Bluemoon Series</span><h2 style="font-size: 2.8rem; margin-bottom: 16px; font-weight: 900; color:#0e3a52;">Pre-Primary & Kindergarten Books</h2><p class="text-muted" style="font-size: 1.05rem; letter-spacing: 0.5px;">Joyful, activity-based learning for Nursery · LKG · UKG — designed to make little minds curious!</p></div><div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 28px;">
                    ${displayKindergarten.map(book => renderBookCard(book)).join('')}
                </div><div class="text-center" style="margin-top:40px;"><a href="#/catalogue" class="spm-view-all-btn" style="background:#0891b2;">Browse All Kindergarten Books →</a></div></div></div><!-- Bestsellers / Featured Section --><div class="section container" style="padding-top: 80px; padding-bottom: 80px;"><div class="text-center mb-12"><span style="display:inline-block;background:#fef9c3;color:#854d0e;font-size:0.75rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:6px 16px;border-radius:20px;margin-bottom:14px;"> Most Popular</span><h2 style="font-size: 2.8rem; margin-bottom: 14px; font-weight: 900; color:#0f172a;">Top Picks Across All Publications</h2><p class="text-muted" style="font-size: 1.05rem;">Handpicked NEP 2020-aligned titles trusted by 1000+ schools — Session 2025-26</p></div><div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 28px;">
                ${bestsellers.map(book => renderBookCard(book)).join('')}
            </div><div class="text-center" style="margin-top: 50px;"><a href="#/catalogue" class="spm-view-all-btn">View Complete Catalogue →</a></div></div><!-- Reels Section --><div class="section container" style="padding-top: 40px; padding-bottom: 100px;"><div class="reels-container"><div class="reel-item"><video src="./assets/videos/reel.mp4" autoplay muted loop playsinline></video><div class="reel-overlay"><span>Sundar Kanda</span><p>Rs. 1,274.00</p></div></div><div class="reel-item"><video src="./assets/videos/reel.mp4" autoplay muted loop playsinline></video><div class="reel-overlay"><span>500 Activities</span><p>Rs. 936.00</p></div></div><div class="reel-item"><video src="./assets/videos/reel.mp4" autoplay muted loop playsinline></video><div class="reel-overlay"><span>Devotional Lord</span><p>Rs. 300.00</p></div></div><div class="reel-item"><video src="./assets/videos/reel.mp4" autoplay muted loop playsinline></video><div class="reel-overlay"><span>ICSE Chemistry</span><p>Rs. 1,395.00</p></div></div></div></div><!-- Video & Blogs Section --><div class="section container"><div class="grid" style="grid-template-columns: 1fr 1fr; gap: 30px;"><!-- Video Library Card --><div class="bundle-banner" style="background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%); overflow: hidden; position: relative; border-radius: 24px; box-shadow: 0 10px 30px rgba(142, 197, 252, 0.3); transition: transform 0.3s; cursor: pointer;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'"><div class="bundle-content" style="position: relative; z-index: 2; padding: 40px;"><p style="color: #3b2a82; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 12px; font-size: 0.75rem;">Interactive Learning</p><h3 style="font-size: 2.5rem; font-weight: 900; color: #1e1b4b; margin-bottom: 16px; font-family: 'Playfair Display', serif; line-height: 1.1;">Video Library</h3><p style="color: #312e81; font-size: 1.05rem; margin-bottom: 30px; max-width: 85%; line-height: 1.5;">Explore our curated collection of interactive educational videos, tutorials, and digital resources.</p><a href="#/videos" class="btn" style="background: #312e81; color: white; border-radius: 30px; padding: 12px 36px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(49, 46, 129, 0.4);">Watch Now <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></a></div><svg style="position: absolute; right: -20px; bottom: -30px; width: 220px; height: 220px; opacity: 0.15; z-index: 1; transform: rotate(-10deg);" viewBox="0 0 24 24" fill="none" stroke="#1e1b4b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg></div><!-- Blogs Card --><div class="bundle-banner" style="background: linear-gradient(135deg, #fef08a 0%, #f9a8d4 100%); overflow: hidden; position: relative; border-radius: 24px; box-shadow: 0 10px 30px rgba(249, 168, 212, 0.3); transition: transform 0.3s; cursor: pointer;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'"><div class="bundle-content" style="position: relative; z-index: 2; padding: 40px;"><p style="color: #831843; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 12px; font-size: 0.75rem;">Insights & Ideas</p><h3 style="font-size: 2.5rem; font-weight: 900; color: #4c0519; margin-bottom: 16px; font-family: 'Playfair Display', serif; line-height: 1.1;">Our Blogs</h3><p style="color: #831843; font-size: 1.05rem; margin-bottom: 30px; max-width: 85%; line-height: 1.5;">Read the latest articles, teaching strategies, news and emerging trends in early education.</p><a href="#/blogs" class="btn" style="background: #9d174d; color: white; border-radius: 30px; padding: 12px 36px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(157, 23, 77, 0.4);">Read Articles <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></a></div><svg style="position: absolute; right: -20px; bottom: -20px; width: 220px; height: 220px; opacity: 0.15; z-index: 1; transform: rotate(10deg);" viewBox="0 0 24 24" fill="none" stroke="#4c0519" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg></div></div></div><!-- Journey Stats --><div class="section" style="background: #fff9c4; padding-top: 80px; padding-bottom: 80px;"><div class="container"><div class="text-center mb-16"><h2 style="font-size: 3rem; margin-bottom: 16px; font-weight: 800;">An Overview of Our Journey...</h2><p class="text-muted" style="font-size: 1.1rem;">Engaged in publishing textbooks since 1995.</p></div><div class="stats-container"><div class="stat-item"><div class="stat-number">50 +</div><div class="stat-label">Years of Experience</div></div><div class="stat-item"><div class="stat-number">299+</div><div class="stat-label">Titles</div></div><div class="stat-item"><div class="stat-number">1,000 +</div><div class="stat-label">Schools</div></div><div class="stat-item"><div class="stat-number">400 +</div><div class="stat-label">Distributors</div></div></div></div></div><!-- Testimonials --><div class="section container" style="padding-top: 60px; padding-bottom: 80px;"><div class="text-center mb-8" style="margin-bottom: 30px;"><h2 style="font-size: 3rem; font-weight: 800;">What do teachers say about Suman Prakashan Mandir?</h2></div><div class="grid" style="grid-template-columns: 1fr 1fr; gap: 60px;"><div class="testimonial-card"><div class="stars"></div><p style="font-size: 1.25rem; color: #555; margin-bottom: 30px; line-height: 1.8; font-style: italic;">
                        "Helped a lot and i have seen many students have scored 100% marks in physics past 10 years"
                    </p><div class="flex justify-between items-center border-top pt-6" style="border-top: 1px solid #eee; padding-top: 24px;"><strong style="font-size: 1.1rem;">Rajesh Srivastava</strong><span class="text-muted">Lecturer LPC</span></div></div><div class="testimonial-card"><div class="stars"></div><p style="font-size: 1.25rem; color: #555; margin-bottom: 30px; line-height: 1.8; font-style: italic;">
                        "Content are in very simple language and supported by labeled diagram in neat way to help students learn easy"
                    </p><div class="flex justify-between items-center border-top pt-6" style="border-top: 1px solid #eee; padding-top: 24px;"><strong style="font-size: 1.1rem;">Brian Dmore</strong><span class="text-muted">Francis College</span></div></div></div></div>


    `;
}

// ─── Publication Browser Interactivity ───────────────────────────────────────
import { getCoverImage, getUnitGradient } from '../utils/book-covers.js';

let _homeBooks = [];   // cached for client-side filtering

export function initHome() {
    // ─── Hero Slider Logic ──────────────────────────────────────────────────
    let currentSlide = 0;
    const slides = document.querySelectorAll('.spm-slide');
    const dots = document.querySelectorAll('.spm-dot');
    const totalSlides = slides.length;

    function showSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;

        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Auto-slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Click on dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            const index = parseInt(dot.dataset.index);
            showSlide(index);
            // Restart interval after user interaction
            slideInterval = setInterval(nextSlide, 5000);
        });
    });

    // Store books in module scope for filtering
    catalogueApi.getAll().then(data => {
        _homeBooks = data.map(b => ({
            ...b,
            subject: b.subject || b.category || '',
            unit: b.unit || 'Aroma',
            class: b.class || '',
            price: Number(b.priceRetail) || 0,
        }));
        _renderPublicationBrowser('Aroma', 'All');
    });

    // Tab click handler
    document.addEventListener('click', e => {
        const tab = e.target.closest('.spm-pub-tab');
        if (tab) {
            document.querySelectorAll('.spm-pub-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const unit = tab.dataset.unit;
            _renderPublicationBrowser(unit, 'All');
            // Update View All link
            const link = document.getElementById('spm-view-all-link');
            if (link) link.href = `#/catalogue?unit=${encodeURIComponent(unit)}`;
            return;
        }

        // Subject chip click
        const chip = e.target.closest('.spm-chip');
        if (chip) {
            const activeTab = document.querySelector('.spm-pub-tab.active');
            const unit = activeTab?.dataset.unit || 'Aroma';
            document.querySelectorAll('.spm-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            _renderPublicationBrowser(unit, chip.dataset.subject);
        }
    });
}

function _renderPublicationBrowser(unit, selectedSubject) {
    const unitBooks = _homeBooks.filter(b => b.unit === unit);
    const subjects = ['All', ...new Set(unitBooks.map(b => b.subject).filter(Boolean))];
    const filtered = selectedSubject === 'All'
        ? unitBooks
        : unitBooks.filter(b => b.subject === selectedSubject);

    // Get active tab's brand colour
    const activeTab = document.querySelector(`.spm-pub-tab[data-unit="${unit}"]`);
    const color = activeTab?.dataset.color || '#1145a4';
    const light = activeTab?.dataset.light || '#eff6ff';

    // ── Subject chips ──────────────────────────────────────────────────────
    const chipsEl = document.getElementById('spm-subject-chips');
    if (chipsEl) {
        chipsEl.style.setProperty('--active-color', color);
        chipsEl.style.setProperty('--active-light', light);
        chipsEl.innerHTML = subjects.map(s => `
            <button class="spm-chip ${s === selectedSubject ? 'active' : ''}" data-subject="${s}">
                ${s === 'All' ? ' All Subjects' : s}
                <span style="margin-left:4px;opacity:.6;font-size:.7rem;">(${s === 'All' ? unitBooks.length : unitBooks.filter(b => b.subject === s).length})</span></button>
        `).join('');
    }

    // ── Book grid ──────────────────────────────────────────────────────────
    const gridEl = document.getElementById('spm-preview-grid');
    if (!gridEl) return;

    const toShow = filtered.slice(0, 8);   // max 8 previews in the panel

    if (toShow.length === 0) {
        gridEl.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#94a3b8;"><div style="font-size:3rem;margin-bottom:16px;"></div><p style="font-size:1rem;font-weight:600;">No books found for this subject yet.</p></div>`;
        return;
    }

    gridEl.innerHTML = toShow.map(book => {
        const cover = getCoverImage(book.unit, book.subject, book.category);
        const gradient = getUnitGradient(book.unit);
        const discount = book.price < 200 ? 12 : 15;
        const original = Math.round(book.price * (100 / (100 - discount)));

        const coverHTML = cover
            ? `<img src="${cover}" alt="${book.title}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;"
                    onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"><div style="display:none;width:100%;height:100%;background:${gradient};border-radius:8px;align-items:center;justify-content:center;flex-direction:column;padding:12px;text-align:center;"><div style="font-size:2.2rem;margin-bottom:8px;"></div><div style="font-size:0.72rem;font-weight:700;color:rgba(255,255,255,.9);line-height:1.3;">${book.title}</div></div>`
            : `<div style="width:100%;height:100%;background:${gradient};border-radius:8px;display:flex;align-items:center;justify-content:center;flex-direction:column;padding:14px;text-align:center;"><div style="font-size:2.5rem;margin-bottom:10px;"></div><div style="font-size:0.72rem;font-weight:700;color:rgba(255,255,255,.9);line-height:1.3;">${book.title}</div></div>`;

        return `
            <div style="cursor:pointer;transition:transform .2s;" onmouseover="this.style.transform='translateY(-6px)'" onmouseout="this.style.transform=''" onclick="window.location.hash='/catalogue?unit=${encodeURIComponent(unit)}'"><div style="aspect-ratio:3/4;position:relative;border-radius:10px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,.1);margin-bottom:10px;"><span style="position:absolute;top:8px;left:8px;background:#fbbf24;color:#333;font-size:.7rem;font-weight:700;padding:3px 8px;border-radius:5px;z-index:2;">-${discount}%</span>
                    ${coverHTML}
                </div><div style="text-align:center;"><p style="font-size:.82rem;font-weight:700;color:#1e293b;line-height:1.3;margin-bottom:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${book.title}</p>
                    ${book.class ? `<span style="font-size:.68rem;background:#e0e7ff;color:#3730a3;padding:2px 8px;border-radius:12px;font-weight:600;display:inline-block;margin-bottom:6px;">Class ${book.class}</span>` : ''}
                    <div style="display:flex;justify-content:center;align-items:center;gap:6px;"><span style="font-weight:800;color:${color};font-size:1rem;">₹${book.price}</span><span style="text-decoration:line-through;color:#94a3b8;font-size:.85rem;">₹${original}</span></div></div></div>`;
    }).join('');

    // Update View All link
    const link = document.getElementById('spm-view-all-link');
    if (link) link.href = `#/catalogue?unit=${encodeURIComponent(unit)}`;
}
