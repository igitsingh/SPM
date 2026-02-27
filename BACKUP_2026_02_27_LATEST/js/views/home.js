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
            ${(() => {
            const slidesData = [
                {
                    id: 'modern-learning',
                    label: 'MOST POPULAR IN KIDS',
                    name: 'MODERN LEARNING',
                    tagline: 'ANIMATED CHAPTERS',
                    bgVideo: './assets/videos/Chapter-1 You Sow, Shall You Reap/03_Inside_a_bright_202512030813.mp4',
                    color: '#f59e0b',
                    btnText: 'Watch Now',
                    books: [],
                    link: '#/learning-kits/videos'
                },
                {
                    id: 'disney-digital',
                    label: 'DISNEY SPECIAL',
                    name: 'DIGITAL LEARNING',
                    tagline: 'DISNEY VIDEO LECTURES',
                    bgVideo: './assets/videos/Video Lecture_01.mp4',
                    color: '#0284c7',
                    btnText: 'Explore Now',
                    books: ['/public/images/books/disney_hindi.png', '/public/images/books/disney_maths.png'],
                    link: '#/learning-kits/disney'
                },
                {
                    id: 'spm-flipbooks',
                    label: 'SPM SPECIAL',
                    name: 'INTERACTIVE LEARNING',
                    tagline: 'FLIP BOOKS',
                    bg: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1600&q=80',
                    color: '#ec4899',
                    btnText: 'Read Now',
                    books: ['/public/images/books/aroma_hindi.png', '/public/images/books/deepanshu_maths.png'],
                    link: '#/flipbook'
                },
                {
                    id: 'aroma',
                    label: 'Series',
                    name: 'AROMA BOOKS',
                    tagline: 'Building Bright Futures, One Book at a Time',
                    bg: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80',
                    color: '#FFD700',
                    btnText: 'Discover Now',
                    books: ['/public/images/books/aroma_hindi.png', '/public/images/books/aroma_english.png', '/public/images/books/aroma_maths.png'],
                    link: '#/catalogue?unit=Aroma'
                },
                {
                    id: 'bluemoon',
                    label: 'Series',
                    name: 'BLUEMOON SERIES',
                    tagline: 'Joyful Learning for Early Childhood',
                    bg: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=80',
                    color: '#3b82f6',
                    btnText: 'Discover Now',
                    books: ['/public/images/books/bluemoon_alphabet.png', '/public/images/books/bluemoon_drawing.png', '/public/images/books/bluemoon_alphabet.png'],
                    link: '#/catalogue?unit=Bluemoon%20Series'
                },
                {
                    id: 'deepanshu',
                    label: 'Series',
                    name: 'DEEPANSHU GOLD',
                    tagline: 'Excellence in Academic Publishing',
                    bg: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80',
                    color: '#b45309',
                    btnText: 'Discover Now',
                    books: ['/public/images/books/deepanshu_hindi.png', '/public/images/books/deepanshu_maths.png', '/public/images/books/deepanshu_hindi.png'],
                    link: '#/catalogue?unit=Deepanshu%20Gold'
                },
                {
                    id: 'disney',
                    label: 'Series',
                    name: 'DISNEY PUBLICATION',
                    tagline: 'Nurturing Young Minds Creatively',
                    bg: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&w=1600&q=80',
                    color: '#0891b2',
                    btnText: 'Discover Now',
                    books: ['/public/images/books/disney_hindi.png', '/public/images/books/disney_maths.png', '/public/images/books/disney_social.png'],
                    link: '#/catalogue?unit=Disney%20Publication'
                },
                {
                    id: 'harmony',
                    label: 'Series',
                    name: 'HARMONY BOOKS',
                    tagline: 'Comprehensive Learning for Classes 1-8',
                    bg: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80',
                    color: '#16a34a',
                    btnText: 'Discover Now',
                    books: ['/public/images/books/harmony_science.png', '/public/images/books/harmony_maths.png', '/public/images/books/harmony_english.png'],
                    link: '#/catalogue?unit=Harmony%20Publications'
                }
            ];

            const HTML = slidesData.map((slide, i) => `
                    <div class="spm-slide ${i === 0 ? 'active' : ''}" style="${slide.bg ? `background-image: url('${slide.bg}');` : 'background-color: #0f172a;'}">
                        ${slide.bgVideo ? `<video class="spm-slide-video" autoplay loop muted playsinline><source src="${slide.bgVideo}" type="video/mp4"></video>` : ''}
                        <div class="spm-slide-overlay"></div>
                        <div class="container spm-slide-container">
                            <div class="spm-slide-text">
                                <span class="spm-series-label">${slide.label}</span>
                                <h1 class="spm-series-name">${slide.name}</h1>
                                <p class="spm-series-tagline">${slide.tagline}</p>
                                <a href="${slide.link}" class="spm-discover-btn" style="--btn-color: ${slide.color}">
                                    ${slide.btnText} <span class="spm-btn-arrow">›</span>
                                </a>
                            </div>
                            <div class="spm-slide-visual">
                                ${slide.books && slide.books.length > 0 ? slide.books.map((b, bi) => `
                                    <div class="spm-hero-book-wrap" style="--book-index: ${bi}"><img src="${b}" alt="Book" onerror="this.src='https://via.placeholder.com/200x280?text=SPM+Book'"></div>
                                `).join('') : ''}
                            </div>
                        </div>
                    </div>
                `).join('');

            const dotsHTML = '<div class="spm-hero-dots">' + slidesData.map((_, i) => `<span class="spm-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('') + '</div>';

            const socialHTML = `<!-- Social Icons Right --><div class="spm-hero-social"><a href="#"><img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="FB"></a><a href="#"><img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="IG"></a><a href="#"><img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" alt="TW"></a><a href="#"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LI"></a></div>`;

            return HTML + socialHTML + dotsHTML;
        })()}</div><style>
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
        .spm-slide-video {
            position: absolute;
            top: 50%;
            left: 50%;
            min-width: 100%;
            min-height: 100%;
            width: auto;
            height: auto;
            transform: translateX(-50%) translateY(-50%);
            object-fit: cover;
            z-index: 0;
            opacity: 0.8;
            pointer-events: none;
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

        }
        @media (max-width: 991px) {
            .spm-slide-container { grid-template-columns: 1fr; text-align: center; }
            .spm-series-name { font-size: 3.5rem; }
            .spm-slide-visual { display: none; }
            .spm-hero-social { display: none; }
        }</style>

        <!-- Quick Browse by Class using macOS dock effect (Uiverse.io inspired) -->
        <div class="spm-class-dock-section" style="padding: 40px 0 20px 0; background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%); text-align: center; overflow: visible; position: relative; z-index: 20;">
            <p style="font-size: 0.85rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 24px;">Quick Jump to Class</p>
            <div class="container-items">
                ${[
            { label: 'Nursery', text: 'Nur', color: '#ef4444' },
            { label: 'LKG', text: 'LKG', color: '#f97316' },
            { label: 'UKG', text: 'UKG', color: '#f59e0b' },
            { label: '1', text: '1', color: '#eab308' },
            { label: '2', text: '2', color: '#84cc16' },
            { label: '3', text: '3', color: '#22c55e' },
            { label: '4', text: '4', color: '#10b981' },
            { label: '5', text: '5', color: '#14b8a6' },
            { label: '6', text: '6', color: '#06b6d4' },
            { label: '7', text: '7', color: '#3b82f6' },
            { label: '8', text: '8', color: '#6366f1' },
            { label: 'Art and Craft', text: 'Art', color: '#a855f7' }
        ].map(c => `
                    <a href="#/catalogue?class=${encodeURIComponent(c.label)}" class="item-class" aria-label="Class ${c.label}" style="--color: ${c.color}">
                        <span class="item-class-text">${c.text}</span>
                    </a>
                `).join('')}
            </div>
        </div>

        <style>
            /* Uiverse.io macOS Dock Style Adapted for SPM Quick Jump */
            .container-items {
                display: flex;
                transform-style: preserve-3d;
                transform: perspective(1000px);
                justify-content: center;
                gap: 2px;
                padding: 20px 0;
            }

            .item-class {
                position: relative;
                flex-shrink: 0;
                width: 48px;
                height: 56px;
                border: none;
                outline: none;
                transition: 500ms cubic-bezier(0.175, 0.885, 0.32, 1.1);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                text-decoration: none;
            }

            .item-class::after {
                position: absolute;
                content: "";
                inset: 0;
                width: 100%;
                height: 100%;
                background-color: var(--color);
                border-radius: 10px;
                transform: scale(1.1);
                pointer-events: none;
                transition: 500ms cubic-bezier(0.175, 0.885, 0.32, 1.1);
                z-index: 1;
                box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            }

            .item-class-text {
                position: relative;
                z-index: 2;
                color: white;
                font-weight: 800;
                font-size: 1.1rem;
                font-family: 'Inter', sans-serif;
                pointer-events: none;
                transition: 500ms cubic-bezier(0.175, 0.885, 0.32, 1.1);
                text-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }

            .item-class::before {
                position: absolute;
                content: attr(aria-label);
                left: 50%;
                bottom: 80px;
                font-size: 12px;
                line-height: 16px;
                font-weight: 700;
                font-family: 'Inter', sans-serif;
                white-space: nowrap;
                transform: translateX(-50%);
                padding: 6px 12px;
                background-color: #0f172a;
                color: #ffffff;
                border-radius: 8px;
                pointer-events: none;
                opacity: 0;
                visibility: hidden;
                transition: 500ms cubic-bezier(0.175, 0.885, 0.32, 1.1);
                z-index: 10;
                box-shadow: 0 4px 15px rgba(0,0,0,0.15);
            }

            /* Tooltip Arrow */
            .item-class::after, .item-class::before {
                /* We already use ::after for the background and ::before for the tooltip text */
            }
            .item-class:hover {
                transform: scale(1.6);
                z-index: 99999;
            }
            .item-class:hover::before {
                opacity: 1;
                visibility: visible;
                bottom: 75px;
            }

            .item-class:active > span {
                transform: scale(0.95);
            }

            .item-class:active::after {
                transform: scale(1.05);
            }

            .item-class:hover + * {
                transform: scale(1.3);
                z-index: 9999;
            }

            .item-class:hover + * + * {
                transform: scale(1.15);
                z-index: 999;
            }

            .item-class:has(+ *:hover) {
                transform: scale(1.3);
                z-index: 9999;
            }

            .item-class:has(+ * + *:hover) {
                transform: scale(1.15);
                z-index: 999;
            }
        </style>

        <!-- Building World of Learning – Brand Tabs -->
        <div class="spm-explore-section">
            <!-- Animated World Background Elements -->
            <div class="spm-world-bg-wrapper"></div>
            <!-- Floating 3D Background Elements -->
            <div class="spm-world-bg-wrapper"></div>
            <img src="./assets/3D FOR SPM/3d-handcrafting-icon-set-2025-12-30-09-06-26-utc/PNG/2000px/4. Palette.png" class="spm-3d-float float-1" alt="3D Palette">
            <img src="./assets/3D FOR SPM/3d-handcrafting-icon-set-2025-12-30-09-06-26-utc/PNG/2000px/21. Craft Box.png" class="spm-3d-float float-2" alt="3D Craft Box">
            <img src="./assets/3D FOR SPM/3d-handcrafting-icon-set-2025-12-30-09-06-26-utc/PNG/2000px/18. Sketchbook.png" class="spm-3d-float float-3" alt="3D Sketchbook">
            <img src="./assets/3D FOR SPM/3d-handcrafting-icon-set-2025-12-30-09-06-26-utc/PNG/2000px/3. Paintbrush.png" class="spm-3d-float float-4" alt="3D Paintbrush">
            <img src="./assets/3D FOR SPM/3d-handcrafting-icon-set-2025-12-30-09-06-26-utc/PNG/2000px/27. Pencil Compass.png" class="spm-3d-float float-5" alt="3D Compass">
            <img src="./assets/3D FOR SPM/colorful-crayon-pack-for-kids-drawing-2026-02-22-03-23-03-utc/Crayon.png" class="spm-3d-float float-6" alt="3D Crayon">

            <div class="spm-explore-inner">
                <div class="text-center" style="margin-bottom: 48px; display: flex; flex-direction: column; align-items: center; text-align: center;">
                    <div style="margin-bottom: 16px;"><span class="spm-section-pill" style="margin-bottom: 0;">Our Learning World</span></div>
                    <div><h2 class="spm-explore-title spm-silky-heading" style="padding-bottom: 10px;">Building World of Learning</h2></div>
                    <div class="spm-explore-sub" style="max-width: 800px; margin: 0 auto; line-height: 1.6;">
                        From playful first steps to confident academic success —<br>
                        our thoughtfully designed books nurture curiosity, creativity, and strong foundations from Pre-Primary to Class 8.<br><br>
                        <div class="spm-mission-highlight">
                            <strong>5 dynamic series • 299 engaging titles • NEP 2020 aligned • Session 2025–26</strong>
                        </div>
                    </div>
                </div>
                <!-- Publisher Logo Tabs -->
                <div class="spm-pub-tabs">
                    ${[
            { id: 'Aroma', logo: './assets/images/Aroma Logo.png', rgb: '194,65,12', bg: './assets/images/aroma_bg.png', border: '#f59e0b', scale: 1, books: books.filter(b => b.unit === 'Aroma') },
            { id: 'Bluemoon Series', logo: './assets/images/Bluemoon Logo.png', rgb: '15,23,42', bg: './assets/images/bluemoon_bg.png', border: '#60a5fa', scale: 1.1, books: books.filter(b => b.unit === 'Bluemoon Series') },
            { id: 'Deepanshu Gold', logo: './assets/images/DeepanshuGold Logo.png', rgb: '38,38,38', bg: './assets/images/deepanshu_bg.png', border: '#fbbf24', scale: 1.45, books: books.filter(b => b.unit === 'Deepanshu Gold') },
            { id: 'Disney Publication', logo: './assets/images/Disney Logo.png', rgb: '126,34,206', bg: './assets/images/disney_bg.png', border: '#e879f9', scale: 1.1, books: books.filter(b => b.unit === 'Disney Publication') },
            { id: 'Harmony Publications', logo: './assets/images/Harmony Logo.png', rgb: '6,78,59', bg: './assets/images/harmony_bg.png', border: '#10b981', scale: 1.1, books: books.filter(b => b.unit === 'Harmony Publications') },
        ].map(pub => `
                        <a href="#/catalogue?unit=${encodeURIComponent(pub.id)}" class="spm-pub-tab"
                           style="--pub-rgb:${pub.rgb}; --pub-bg:url('${pub.bg}'); --pub-border:${pub.border}; --logo-scale:${pub.scale || 1}; --hover-scale:${(pub.scale || 1) * 1.05}; text-decoration:none;">
                            <div class="spm-pub-tab-logo-wrap">
                                <img src="${pub.logo}" alt="${pub.id}" class="spm-pub-tab-logo" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
                                <span class="spm-pub-tab-text" style="display:none">${pub.id}</span>
                            </div>
                            <span class="spm-pub-tab-count">${pub.books.length} BOOKS</span>
                        </a>
                    `).join('')}
                </div>
            </div>
            <!-- NOTE: spm-explore-section is left open here to wrap the Bundles and Reels sections below -->

        <style>
        .spm-silky-heading {
            background: linear-gradient(110deg, #0d3b8e 0%, #3b82f6 15%, #082f6e 30%, #60a5fa 45%, #0d3b8e 60%, #1e40af 80%, #0d3b8e 100%);
            background-size: 200% auto;
            color: #0d3b8e; /* Fallback */
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shineSilkyCloth 6s ease-in-out infinite alternate;
            filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.15));
            display: inline-block; /* Prevents shadow clipping */
        }
        @keyframes shineSilkyCloth {
            0% { background-position: 0% center; }
            100% { background-position: 150% center; }
        }
        .spm-retro-3d-text {
            font-family: 'Impact', 'Arial Black', sans-serif;
            text-transform: uppercase;
            color: #48a6e6; /* Bright cyan/blue face */
            -webkit-text-stroke: 2px #fff; /* White outline */
            letter-spacing: 2px;
            text-shadow: 
                -1px 1px 0 #0d3b8e, -2px 2px 0 #0d3b8e, -3px 3px 0 #0d3b8e, -4px 4px 0 #0d3b8e, 
                -5px 5px 0 #0d3b8e, -6px 6px 0 #0d3b8e, -7px 7px 0 #0d3b8e, -8px 8px 0 #0d3b8e, 
                -9px 9px 0 #0d3b8e, -10px 10px 0 #0d3b8e, -11px 11px 0 #0d3b8e, -12px 12px 0 #0d3b8e,
                -13px 13px 0 #0d3b8e, -14px 14px 0 #0d3b8e, -15px 15px 0 #0d3b8e,
                -18px 18px 15px rgba(0,0,0,0.4);
            transform: skewX(-5deg); /* slight retro italic slant */
            display: inline-block;
            margin-bottom: 20px;
        }
        .spm-explore-section { position: relative; overflow: hidden; padding: 100px 40px; background: #fff; z-index: 1; }
        .spm-world-bg-wrapper { position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 0; background: linear-gradient(135deg, #fff5f5 0%, #f0f4ff 33%, #fffdf0 66%, #f8f0ff 100%); background-size: 400% 400%; animation: worldGradient 20s ease infinite; }
        @keyframes worldGradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        
        .spm-view-all-btn {
            display: inline-flex;
            align-items: center;
            font-size: 1.1rem;
            font-weight: 700;
            color: #082f6e;
            text-decoration: none;
            padding: 10px 20px;
            transition: all 0.3s ease;
            position: relative;
        }
        .spm-view-all-btn::after {
            content: '';
            position: absolute;
            bottom: 5px;
            left: 50%;
            width: 0%;
            height: 2px;
            background: #0891b2;
            transition: all 0.3s ease;
            transform: translateX(-50%);
        }
        .spm-view-all-btn:hover { color: #0891b2; transform: translateY(-2px); }
        .spm-view-all-btn:hover::after { width: 80%; }

        /* Floating 3D Elements using the User's assets */
        .spm-3d-float { position: absolute; z-index: 1; opacity: 1; filter: drop-shadow(0 25px 35px rgba(0,0,0,0.15)); animation: float3d var(--dur, 6s) ease-in-out infinite alternate; pointer-events: none; }
        .float-1 { top: 30px; left: 4%; width: 220px; transform: rotate(-15deg); --dur: 7s; }
        .float-2 { top: 600px; left: 6%; width: 200px; transform: rotate(10deg); --dur: 8s; animation-delay: -2s; }
        .float-3 { top: 40px; right: 3%; width: 240px; transform: rotate(20deg); --dur: 9s; animation-delay: -1s; }
        .float-4 { top: 300px; left: 2%; width: 160px; transform: rotate(-25deg); --dur: 6s; animation-delay: -3s; }
        .float-5 { top: 400px; right: 4%; width: 150px; transform: rotate(45deg); --dur: 8.5s; animation-delay: -4s; }
        .float-6 { top: 620px; right: 5%; width: 190px; transform: rotate(-35deg); --dur: 7.5s; animation-delay: -5s; }
        @keyframes float3d { 100% { transform: translateY(-30px) rotate(calc(var(--rot, 0deg) + 5deg)) scale(1.05); } }

        .spm-explore-inner { position: relative; z-index: 5; background: rgba(255, 255, 255, 0.45); backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px); border: 1px solid rgba(255, 255, 255, 0.5); border-radius: 40px; padding: 80px 40px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08); max-width: 1400px; margin: 0 auto; }
        .spm-section-pill { display:inline-block; background:#0d3b8e; color:#FFD700; font-size:0.8rem; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; padding:6px 16px; border-radius:20px; margin-bottom:16px; }
        .spm-explore-title { font-size:clamp(1.8rem,3vw,2.8rem); font-weight:900; color:#0f172a; margin-bottom:12px; line-height:1.2; }
        .spm-explore-sub { font-size:1rem; color:#64748b; letter-spacing:0.3px; }
        .spm-pub-tabs { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; margin-top:8px; }
        .spm-pub-tab { position:relative; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px; border:2px solid transparent; border-radius:12px; background:linear-gradient(rgba(var(--pub-rgb),0.92),rgba(var(--pub-rgb),0.92)),var(--pub-bg) center/cover; cursor:pointer; transition:all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); width:220px; height:120px; box-shadow:0 10px 20px rgba(0,0,0,0.1); color:white; text-transform:uppercase; border-color:var(--pub-border); }
        .spm-pub-tab:hover { transform:translateY(-8px) scale(1.05); box-shadow:0 20px 40px rgba(0,0,0,0.25); }
        .spm-pub-tab-logo-wrap { height:80px; width:100%; display:flex; align-items:center; justify-content:center; }
        .spm-pub-tab-logo { max-height:100%; max-width:100%; object-fit:contain; transition:transform 0.4s; transform:scale(var(--logo-scale,1)); }
        .spm-pub-tab:hover .spm-pub-tab-logo { transform:scale(var(--hover-scale,1.1)); }
        .spm-pub-tab-count { position:absolute; bottom:12px; left:0; right:0; text-align:center; font-size:0.75rem; color:rgba(255,255,255,0.85); font-weight:700; letter-spacing:1px; }
        .spm-mission-highlight {
            display: inline-block;
            position: relative;
            margin-top: 10px;
        }
        .spm-mission-highlight strong {
            color: #d97706; /* Nice punchy readable yellow-gold */
            position: relative;
            z-index: 1;
            font-size: 1.15rem;
            letter-spacing: 0.5px;
            text-shadow: 0 1px 1px rgba(0,0,0,0.1);
        }</style>

        <!-- COMPACT VIDEO, LECTURES & FLIP BOOK SECTION -->
        <div class="spm-compact-bundles container" style="margin-top: 50px; position: relative; z-index: 100; margin-bottom: 40px;">
            <div class="grid" style="grid-template-columns: 1fr 1fr 1fr; gap: 24px;">
                <!-- Video Library Card -->
                <div class="bundle-banner" style="overflow: hidden; position: relative; border-radius: 20px; box-shadow: 0 15px 35px rgba(0,0,0,0.25); transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); cursor: pointer; min-height: 220px; display: flex; align-items: center;" onmouseover="this.style.transform='translateY(-8px) scale(1.01)'; this.style.boxShadow='0 25px 50px rgba(0,0,0,0.35)'" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 15px 35px rgba(0,0,0,0.25)'">
                    <div style="position: absolute; top: 0; left: 0; width: 100%; background: linear-gradient(90deg, #FFD700, #F59E0B); color: #111827; text-align: center; padding: 6px 0; font-size: 0.75rem; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; z-index: 10; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">Most Popular in Kids</div>
                    <video autoplay muted loop playsinline style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: right center; transform: scale(1.15) translateX(2%); z-index: 0;"><source src="./assets/videos/Chapter-2%20Balraj%20and%20his%20B's/01_A_warm_sunrise_202512032346.mp4" type="video/mp4"></video>
                    <div style="position: absolute; inset: 0; background: linear-gradient(90deg, rgba(30,20,80,1) 0%, rgba(30,20,80,0) 100%); z-index: 1;"></div>
                    <div class="bundle-content" style="position: absolute; z-index: 2; padding: 40px; text-align: left; max-width: 75%; left: 0; top: 50%; transform: translateY(-50%);">
                        <p style="color: rgba(255,255,255,0.7); font-weight: 800; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; font-size: 0.65rem;">Modern Learning</p>
                        <h3 style="font-size: 1.8rem; font-weight: 900; color: #ffffff; margin-bottom: 12px; font-family: 'Playfair Display', serif; line-height: 1.1;">Animated Chapters</h3>
                        <a href="#/video-library" class="btn" style="background: #FFD700; color: #111827; border-radius: 30px; padding: 10px 24px; font-weight: 800; display: inline-flex; align-items: center; gap: 10px; text-decoration: none; font-size: 0.85rem; box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);">Watch Now <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></a>
                    </div>
                </div>
                <!-- Video Lectures Card -->
                <div class="bundle-banner" style="overflow: hidden; position: relative; border-radius: 20px; box-shadow: 0 15px 35px rgba(249, 168, 212, 0.25); transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); cursor: pointer; min-height: 220px; display: flex; align-items: center;" onmouseover="this.style.transform='translateY(-8px) scale(1.01)'; this.style.boxShadow='0 25px 50px rgba(249, 168, 212, 0.4)'" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 15px 35px rgba(249, 168, 212, 0.25)'">
                    <div style="position: absolute; top: 0; left: 0; width: 100%; background: linear-gradient(90deg, #FF1493, #DB2777); color: white; text-align: center; padding: 6px 0; font-size: 0.75rem; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; z-index: 10; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">Disney Special</div>
                    <video autoplay muted loop playsinline class="lec-hero-vid" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: right center; transform: scale(1.15) translateX(2%); z-index: 0;"><source src="./assets/videos/Video%20Lecture_01.mp4" type="video/mp4"></video>
                    <div style="position: absolute; inset: 0; background: linear-gradient(90deg, rgba(249,168,212,1) 0%, rgba(249,168,212,0) 100%); z-index: 1;"></div>
                    <div class="bundle-content" style="position: absolute; z-index: 2; padding: 40px; text-align: left; max-width: 75%; left: 0; top: 50%; transform: translateY(-50%);">
                        <p style="color: #831843; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; font-size: 0.65rem;">Digital Learning</p>
                        <h3 style="font-size: 1.8rem; font-weight: 900; color: #4c0519; margin-bottom: 12px; font-family: 'Playfair Display', serif; line-height: 1.1;">Disney Video Lectures</h3>
                        <a href="#/video-lecture" class="btn" style="background: #FF1493; color: white; border-radius: 30px; padding: 10px 24px; font-weight: 800; display: inline-flex; align-items: center; gap: 10px; text-decoration: none; font-size: 0.85rem; box-shadow: 0 5px 15px rgba(255, 20, 147, 0.4);">Explore Now <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg></a>
                    </div>
                </div>
                <!-- Flip Book Card -->
                <div class="bundle-banner" style="overflow: hidden; position: relative; border-radius: 20px; box-shadow: 0 15px 35px rgba(251, 146, 60, 0.25); transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); cursor: pointer; min-height: 220px; display: flex; align-items: center; background: url('https://images.unsplash.com/photo-1544716278-e513176f20b5?auto=format&fit=crop&w=800&q=80') center/cover;" onmouseover="this.style.transform='translateY(-8px) scale(1.01)'; this.style.boxShadow='0 25px 50px rgba(251, 146, 60, 0.4)'" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 15px 35px rgba(251, 146, 60, 0.25)'">
                    <div style="position: absolute; top: 0; left: 0; width: 100%; background: linear-gradient(90deg, #0d3b8e, #15479E); color: #FFD700; text-align: center; padding: 6px 0; font-size: 0.75rem; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; z-index: 10; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">SPM Special</div>
                    <div style="position: absolute; inset: 0; background: linear-gradient(90deg, rgba(253,186,116,1) 0%, rgba(253,186,116,0.3) 100%); z-index: 1;"></div>
                    <div class="bundle-content" style="position: absolute; z-index: 2; padding: 40px; text-align: left; max-width: 75%; left: 0; top: 50%; transform: translateY(-50%);">
                        <p style="color: #9a3412; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; font-size: 0.65rem;">Interactive Learning</p>
                        <h3 style="font-size: 1.8rem; font-weight: 900; color: #431407; margin-bottom: 12px; font-family: 'Playfair Display', serif; line-height: 1.1;">Flip Books</h3>
                        <a href="#/flip-book" class="btn" style="background: #FF5722; color: white; border-radius: 30px; padding: 10px 24px; font-weight: 800; display: inline-flex; align-items: center; gap: 10px; text-decoration: none; font-size: 0.85rem; box-shadow: 0 5px 15px rgba(255, 87, 34, 0.4);">Read Now <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Reels Section (moved here, right after brand header) -->
        <div class="section container reels-home-container" style="position: relative; z-index: 10; padding-top: 0; padding-bottom: 60px; margin-top: -120px;">
            <div class="text-center" style="margin-bottom: 35px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0 20px;">
                <img src="./assets/INDIA'S%20FIRST.png" alt="India's First - Animated Academic Videos" style="width: 100%; max-width: 1000px; height: auto; display: block; z-index: 2; position: relative; margin-bottom: -35px;" />
                <h3 class="spm-silky-heading" style="font-size: clamp(2rem, 4.5vw, 3.2rem); font-weight: 900; margin-top: 0; margin-bottom: 0; padding-bottom: 10px; text-transform: uppercase; font-family: 'Playfair Display', serif;">ANIMATED ACADEMIC VIDEOS<sup style="font-size: 0.35em; vertical-align: super; margin-left: 5px; color: #1e40af; filter: drop-shadow(none);">®</sup></h3>
            </div>
            <div class="reels-container">

                <div class="reel-item" style="cursor: pointer;" onclick="window.location.hash='#/video-library?video=3'">
                    <span class="reel-frame-star tl">★</span><span class="reel-frame-star tr">★</span>
                    <span class="reel-frame-star bl">★</span><span class="reel-frame-star br">★</span>
                    <video src="./assets/videos/Chapter-1 You Sow, Shall You Reap/03_Inside_a_bright_202512030813.mp4" autoplay muted loop playsinline></video>
                    <div class="reel-overlay">
                        <div class="reel-overlay-inner">
                            <div class="reel-dots"><span></span><span></span><span></span></div>
                            <span class="reel-chapter-badge">✨ Chapter 1</span>
                            <span class="reel-scene-title">Inside a Bright Room</span>
                            <p class="reel-chapter-name">🌟 You Sow, Shall You Reap</p>
                        </div>
                        <div class="reel-accent-bar"></div>
                    </div>
                </div>

                <div class="reel-item" style="cursor: pointer;" onclick="window.location.hash='#/video-library?video=11'">
                    <span class="reel-frame-star tl">★</span><span class="reel-frame-star tr">★</span>
                    <span class="reel-frame-star bl">★</span><span class="reel-frame-star br">★</span>
                    <video src="./assets/videos/Chapter-2 Balraj and his B's/01_A_warm_sunrise_202512032346.mp4" autoplay muted loop playsinline></video>
                    <div class="reel-overlay">
                        <div class="reel-overlay-inner">
                            <div class="reel-dots"><span></span><span></span><span></span></div>
                            <span class="reel-chapter-badge">🌅 Chapter 2</span>
                            <span class="reel-scene-title">A Warm Sunrise</span>
                            <p class="reel-chapter-name">🌸 Balraj and his B's</p>
                        </div>
                        <div class="reel-accent-bar"></div>
                    </div>
                </div>

                <div class="reel-item" style="cursor: pointer;" onclick="window.location.hash='#/video-library?video=14'">
                    <span class="reel-frame-star tl">★</span><span class="reel-frame-star tr">★</span>
                    <span class="reel-frame-star bl">★</span><span class="reel-frame-star br">★</span>
                    <video src="./assets/videos/Chapter-2 Balraj and his B's/04_Balraj_neatly_arranging_202512032349.mp4" autoplay muted loop playsinline></video>
                    <div class="reel-overlay">
                        <div class="reel-overlay-inner">
                            <div class="reel-dots"><span></span><span></span><span></span></div>
                            <span class="reel-chapter-badge">🎒 Chapter 2</span>
                            <span class="reel-scene-title">Balraj Arranging</span>
                            <p class="reel-chapter-name">🌿 Balraj and his B's</p>
                        </div>
                        <div class="reel-accent-bar"></div>
                    </div>
                </div>

                <div class="reel-item" style="cursor: pointer;" onclick="window.location.hash='#/video-library?video=21'">
                    <span class="reel-frame-star tl">★</span><span class="reel-frame-star tr">★</span>
                    <span class="reel-frame-star bl">★</span><span class="reel-frame-star br">★</span>
                    <video src="./assets/videos/Chapter-2 Balraj and his B's/11_A_dreamy_night_202512040245.mp4" autoplay muted loop playsinline></video>
                    <div class="reel-overlay">
                        <div class="reel-overlay-inner">
                            <div class="reel-dots"><span></span><span></span><span></span></div>
                            <span class="reel-chapter-badge">🌙 Chapter 2</span>
                            <span class="reel-scene-title">A Dreamy Night</span>
                            <p class="reel-chapter-name">💫 Balraj and his B's</p>
                        </div>
                        <div class="reel-accent-bar"></div>
                    </div>
                </div>

            </div>
        </div>
        </div> <!-- End of .spm-explore-section -->

        <!-- Kindergarten Section --><div class="section" style="background: linear-gradient(135deg,#e0f7fa,#b2ebf2); padding-top: 100px; padding-bottom: 100px;"><div class="container"><div class="text-center mb-12" style="display: flex; flex-direction: column; align-items: center; text-align: center;"><div style="margin-bottom: 14px;"><span style="display:inline-block;background:#0891b2;color:white;font-size:0.75rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:6px 16px;border-radius:20px;"> Bluemoon Series</span></div><div><h2 class="spm-silky-heading" style="font-size: 2.8rem; margin-bottom: 16px; font-weight: 900; padding-bottom: 10px;">Pre-Primary & Kindergarten Books</h2></div><p class="text-muted" style="font-size: 1.05rem; letter-spacing: 0.5px;">Joyful, activity-based learning for Nursery · LKG · UKG — designed to make little minds curious!</p></div><div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 28px;">
                    ${displayKindergarten.map(book => renderBookCard(book)).join('')}
                </div><div class="text-center" style="margin-top:40px;"><a href="#/catalogue" class="spm-view-all-btn">Browse All Kindergarten Books →</a></div></div></div>

        <!-- Bestsellers / Featured Section -->
        <div class="section container" style="padding-top: 80px; padding-bottom: 80px;">
            <div class="text-center mb-12" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div style="margin-bottom: 14px;"><span style="display:inline-block;background:#fef9c3;color:#854d0e;font-size:0.75rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:6px 16px;border-radius:20px;"> Most Popular</span></div>
                <div><h2 class="spm-silky-heading" style="font-size: 2.8rem; margin-bottom: 14px; font-weight: 900; padding-bottom: 10px;">Top Picks Across All Publications</h2></div>
                <p class="text-muted" style="font-size: 1.05rem;">Handpicked NEP 2020-aligned titles trusted by 1000+ schools — Session 2025-26</p>
            </div>
            <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 28px;">
                ${bestsellers.map(book => renderBookCard(book)).join('')}
            </div>
            <div class="text-center" style="margin-top: 50px;">
                <a href="#/catalogue" class="spm-view-all-btn">View Complete Catalogue →</a>
            </div>
        </div>

        <!-- Journey Stats & Testimonials Combined Compact Section -->
        <div class="spm-metrics-section" style="background: linear-gradient(135deg, #0d3b8e 0%, #082f6e 100%); padding: 60px 0; color: white;">
            <div class="container">
                <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
                    
                    <!-- Stats Side -->
                    <div>
                        <h2 style="font-size: 2.2rem; margin-bottom: 12px; font-weight: 800; font-family: 'Playfair Display', serif;">Our Journey in Numbers</h2>
                        <p style="font-size: 0.95rem; color: #bae6fd; margin-bottom: 30px; max-width: 400px; line-height: 1.6;">Engaged in publishing excellence since 1995. Our commitment to modern, pedagogical curriculum spans decades of trusted partnerships.</p>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div style="background: rgba(255,255,255,0.06); padding: 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(5px);">
                                <div style="font-size: 2.2rem; font-weight: 900; color: #f59e0b; line-height: 1;">50+</div>
                                <div style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-top: 8px; color: #e2e8f0;">Years Exp.</div>
                            </div>
                            <div style="background: rgba(255,255,255,0.06); padding: 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(5px);">
                                <div style="font-size: 2.2rem; font-weight: 900; color: #10b981; line-height: 1;">299+</div>
                                <div style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-top: 8px; color: #e2e8f0;">Book Titles</div>
                            </div>
                            <div style="background: rgba(255,255,255,0.06); padding: 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(5px);">
                                <div style="font-size: 2.2rem; font-weight: 900; color: #3b82f6; line-height: 1;">1,000+</div>
                                <div style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-top: 8px; color: #e2e8f0;">Schools</div>
                            </div>
                            <div style="background: rgba(255,255,255,0.06); padding: 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(5px);">
                                <div style="font-size: 2.2rem; font-weight: 900; color: #ec4899; line-height: 1;">400+</div>
                                <div style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-top: 8px; color: #e2e8f0;">Distributors</div>
                            </div>
                        </div>
                    </div>

                    <!-- Testimonials Side -->
                    <div>
                        <div style="display: flex; gap: 12px; margin-bottom: 20px;">
                            <span style="font-size: 1.5rem;">⭐️⭐️⭐️⭐️⭐️</span>
                        </div>
                        <div style="background: rgba(255,255,255,0.04); border-left: 4px solid #f59e0b; padding: 25px 30px; border-radius: 0 16px 16px 0;">
                            <p style="font-size: 1.15rem; color: #f8fafc; font-style: italic; line-height: 1.6; margin-bottom: 20px;">
                                "Helped a lot and I have seen many students score 100% marks in physics over the past 10 years thanks to SPM's structured approach."
                            </p>
                            <div style="display: flex; align-items: center; justify-content: space-between;">
                                <div>
                                    <strong style="display: block; font-size: 1rem; color: white;">Rajesh Srivastava</strong>
                                    <span style="font-size: 0.8rem; color: #94a3b8;">Lecturer LPC</span>
                                </div>
                            </div>
                        </div>

                        <div style="background: rgba(255,255,255,0.04); border-left: 4px solid #3b82f6; padding: 25px 30px; border-radius: 0 16px 16px 0; margin-top: 20px;">
                            <p style="font-size: 1.15rem; color: #f8fafc; font-style: italic; line-height: 1.6; margin-bottom: 20px;">
                                "Content is in very simple language and supported by neat labeled diagrams to help students learn easily."
                            </p>
                            <div style="display: flex; align-items: center; justify-content: space-between;">
                                <div>
                                    <strong style="display: block; font-size: 1rem; color: white;">Brian Dmore</strong>
                                    <span style="font-size: 0.8rem; color: #94a3b8;">Francis College</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>


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
