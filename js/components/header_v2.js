import { isAuthenticated, getUserRole } from '../utils/auth.js';
import { store } from '../store.js';
// CACHE BUSTER: 2026-02-23 - Force Horizontal Nav V4

export function renderHeader() {
    const authenticated = isAuthenticated();
    const role = getUserRole();

    let rightNav = '';

    const hash = window.location.hash || '#/';
    const isHome = hash === '#/' || hash === '#' || hash === '';
    const isBusiness = hash.includes('business') || hash.includes('distributor') || hash.includes('schools');

    if (!authenticated) {
        rightNav = `
            <a href="#/catalogue" class="nav-link">Catalogue</a>
            <div class="dropdown">
                <span class="nav-link" style="cursor:pointer;position:relative;">
                    Orders ▾
                    <img src="images/new-badge.svg" class="nav-badge-icon" alt="New">
                </span>
                <div class="spm-dropdown-content spm-vertical-dropdown spm-dark-dropdown">
                    <a href="#/order?type=school">School Order</a>
                    <a href="#/order?type=distributor">Distributor Order</a>
                    <a href="#/order?type=retailer">Retailer Order</a>
                </div>
            </div>
            <a href="#/forbusiness" class="nav-link spm-btn-biz ${isBusiness ? 'active' : ''}">For Business</a>
            <a href="#/student-login" class="nav-link spm-btn-login">Login</a>
            <a href="#/student-register" class="nav-link spm-btn-reg">Register</a>
        `;
    } else if (role === 'customer') {
        rightNav = `
            <a href="#/catalogue" class="nav-link">Catalogue</a>
            <a href="#/students/orders" class="nav-link">My Orders</a>
            <a href="#/students/dashboard" class="nav-link">Dashboard</a>
            <a href="#/contact" class="nav-link">Contact</a>
            <a href="#" class="nav-link spm-btn-logout" id="logout-btn">Logout</a>
        `;
    }

    return `
        <div class="spm-navbar-wrap">
            <nav class="spm-navbar">

                <!-- LOGO LEFT (Ace Publication Style) -->
                <a href="#/" class="spm-brand-box">
                    <div class="spm-logo-top">
                        <div class="spm-logo-main-text">spm</div>
                        <div class="spm-logo-sub-text">PUBLICATION</div>
                    </div>
                    <div class="spm-logo-bottom">
                        <div class="spm-tagline-text">हर सपने की शुरुआत</div>
                    </div>
                </a>

                <!-- MAIN NAVIGATION (Centered/Right) -->
                <div class="spm-nav-main">
                    ${isHome ? `
                        <a href="#/" class="nav-link">Home</a>

                        <div class="dropdown">
                            <span class="nav-link" style="cursor:pointer;">Kindergarten ▾</span>
                            <div class="spm-dropdown-content spm-mega-menu-jb spm-dark-dropdown" style="min-width: 280px !important; padding: 15px !important; width: 280px;">
                                <div class="spm-pod">
                                    <div class="spm-pod-header spm-bg-blue" style="min-height: 70px; padding: 15px;">KINDERGARTEN</div>
                                    <div class="spm-pod-body" style="padding: 15px;">
                                        <a href="#/catalogue?class=Nursery">Nursery Books</a>
                                        <a href="#/catalogue?class=LKG">LKG Books</a>
                                        <a href="#/catalogue?class=UKG">UKG Books</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="dropdown spm-mega-dropdown">
                            <span class="nav-link spm-nav-trigger" style="cursor:pointer;">Children Books ▾</span>
                            <div class="spm-dropdown-content spm-mega-menu-jb spm-dark-dropdown">
                                <div class="spm-mega-content-jb">
                                    <div class="spm-pod">
                                        <div class="spm-pod-header spm-bg-blue">BY SUBJECT (1-8)</div>
                                        <div class="spm-pod-body">
                                            <a href="#/catalogue?subject=Mathematics">Mathematics</a>
                                            <a href="#/catalogue?subject=English">English</a>
                                            <a href="#/catalogue?subject=Hindi">Hindi</a>
                                            <a href="#/catalogue?subject=Science">Science</a>
                                            <a href="#/catalogue?subject=EVS">EVS</a>
                                            <a href="#/catalogue?subject=Social Studies">Social Studies</a>
                                            <a href="#/catalogue?subject=General Knowledge">General Knowledge</a>
                                            <a href="#/catalogue?subject=Computer">Computer</a>
                                            <a href="#/catalogue?subject=Sanskrit">Sanskrit</a>
                                        </div>
                                    </div>

                                    <div class="spm-pod">
                                        <div class="spm-pod-header spm-bg-purple">BY CLASS</div>
                                        <div class="spm-pod-body">
                                            <a href="#/catalogue?class=1">Class 1</a>
                                            <a href="#/catalogue?class=2">Class 2</a>
                                            <a href="#/catalogue?class=3">Class 3</a>
                                            <a href="#/catalogue?class=4">Class 4</a>
                                            <a href="#/catalogue?class=5">Class 5</a>
                                            <a href="#/catalogue?class=6">Class 6</a>
                                            <a href="#/catalogue?class=7">Class 7</a>
                                            <a href="#/catalogue?class=8">Class 8</a>
                                        </div>
                                    </div>

                                    <div class="spm-pod">
                                        <div class="spm-pod-header spm-bg-red">ACTIVITY BOOKS</div>
                                        <div class="spm-pod-body">
                                            <a href="#/catalogue?category=Story">Story Books</a>
                                            <a href="#/catalogue?category=Coloring">Coloring Books</a>
                                            <a href="#/catalogue?category=Activity">Activity Books</a>
                                        </div>
                                    </div>

                                    <div class="spm-pod">
                                        <div class="spm-pod-header spm-bg-orange">RESOURCE CENTER</div>
                                        <div class="spm-pod-body">
                                            <a href="#/catalogue" class="spm-cta-gold">Full Catalogue →</a>
                                            <a href="#/video-library">Video Resources</a>
                                            <a href="#/">Educational Posters</a>
                                            <a href="#/">Teacher Support</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="spm-mega-footer-jb">
                                    <div class="spm-footer-label">PRODUCTS & SOLUTIONS</div>
                                    <div class="spm-footer-nav">
                                        <a href="#/catalogue?category=NEP">NEP 2020 Aligned</a>
                                        <a href="#/catalogue?category=Activity">Inclusive Access</a>
                                        <a href="#/">Digital Learning</a>
                                        <a href="#/">School Kits</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="dropdown">
                            <span class="nav-link" style="cursor:pointer;position:relative;">
                                Students Corner ▾
                                <img src="images/new-badge.svg" class="nav-badge-icon" alt="New">
                            </span>
                            <div class="spm-dropdown-content spm-mega-menu-jb spm-dark-dropdown" style="min-width: 280px !important; padding: 15px !important; width: 280px;">
                                <div class="spm-pod">
                                    <div class="spm-pod-header spm-bg-blue" style="min-height: 70px; padding: 15px;">STUDENTS CORNER</div>
                                    <div class="spm-pod-body" style="padding: 15px;">
                                        <a href="#/video-library">Video Library</a>
                                        <a href="#/">Syllabus</a>
                                        <a href="#/">Exam Datesheets</a>
                                        <a href="#/">Time Management</a>
                                        <a href="#/">Mind Mapping</a>
                                        <a href="#/">Earn with Study</a>
                                        <a href="#/">Student Leisure</a>
                                        <a href="#/">Blogs</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ` : `
                        <a href="#/" class="nav-link">Home</a>
                        ${isBusiness ? `
                            <span class="spm-biz-separator">|</span>
                            <span class="spm-biz-badge">Business Portal</span>
                        ` : ''}
                    `}
                </div>

                <!-- RIGHT ACTIONS / SEARCH -->
                <div class="spm-nav-right">
                    ${isBusiness ? `
                        <div class="spm-biz-nav">
                            ${rightNav}
                        </div>
                    ` : `
                        <div class="spm-search-wrap">
                            <input type="text" placeholder="Search books..." class="spm-search-input">
                            <button class="spm-search-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </button>
                        </div>
                        ${isHome ? '' : rightNav}
                    `}
                </div>

            </nav>
        </div>

        <style>
        /* ═══ Jones & Bartlett Style Navbar ═══ */
        .spm-navbar-wrap {
            position: fixed;
            top: 0; left: 0;
            width: 100%;
            z-index: 1000;
            background: linear-gradient(135deg, #0d3b8e 0%, #1565C0 60%, #0d3b8e 100%);
            box-shadow: 0 4px 24px rgba(0,0,0,0.3);
            border-bottom: 2px solid rgba(255,215,0,0.4);
        }

        .spm-navbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 74px;
            max-width: 1440px;
            margin: 0 auto;
            padding: 0 36px;
        }

        .spm-nav-main { display: flex; align-items: center; gap: 4px; margin-left: 20px; }
        .spm-nav-right { display: flex; align-items: center; gap: 15px; }

        /* ── Modern Glassmorphic Search Bar ── */
        .spm-search-wrap {
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.12);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 40px;
            padding: 6px 16px;
            margin-right: 12px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
        }
        .spm-search-wrap:focus-within {
            background: rgba(255, 255, 255, 0.95);
            border-color: #FFD700;
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.3), 0 4px 10px rgba(0,0,0,0.1);
            transform: translateY(-1px);
        }
        .spm-search-input {
            background: transparent !important;
            border: none !important;
            color: white !important;
            font-size: 0.9rem !important;
            width: 130px;
            padding: 4px 0 !important;
            outline: none !important;
            box-shadow: none !important;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            font-family: 'Inter', sans-serif;
            font-weight: 500;
        }
        .spm-search-input::placeholder {
            color: rgba(255, 255, 255, 0.6) !important;
        }
        .spm-search-wrap:focus-within .spm-search-input {
            color: #0d3b8e !important;
            width: 220px;
        }
        .spm-search-wrap:focus-within .spm-search-input::placeholder {
            color: rgba(13, 59, 142, 0.5) !important;
        }
        .spm-search-btn {
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.8);
            cursor: pointer;
            padding: 0;
            margin-left: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        .spm-search-wrap:focus-within .spm-search-btn {
            color: #0d3b8e;
            transform: scale(1.05);
        }
        .spm-search-btn:hover {
            color: #FFD700 !important;
        }

        /* ── Ace Style Logo Box ── */
        .spm-brand-box {
            display: flex;
            flex-direction: column;
            text-decoration: none;
            min-width: 180px;
            align-self: flex-start;
            filter: drop-shadow(0 4px 10px rgba(0,0,0,0.2));
            transition: transform 0.2s;
        }
        .spm-brand-box:hover { transform: scale(1.02); }

        .spm-logo-top {
            background: #0d3b8e;
            padding: 0 15px;
            height: 76px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-left: 1px solid rgba(255,255,255,0.1);
            border-right: 1px solid rgba(255,255,255,0.1);
        }
        .spm-logo-main-text {
            color: #FFD700;
            font-family: 'Playfair Display', serif;
            font-size: 3rem;
            font-weight: 800;
            line-height: 0.75;
            letter-spacing: 1.5px;
            text-transform: lowercase;
            margin: 0;
            margin-right: -1.5px;
            padding: 0;
        }
        .spm-logo-sub-text {
            color: white;
            font-size: 0.55rem;
            font-weight: 800;
            letter-spacing: 6.5px;
            margin-top: 18px;
            margin-right: -6.5px;
            margin-bottom: 0;
            line-height: 1;
            text-transform: uppercase;
        }
        .spm-logo-bottom {
            background: white;
            padding: 4px 10px;
            text-align: center;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
        }
        .spm-tagline-text {
            color: #0d3b8e;
            font-size: 0.8rem;
            font-weight: 800;
            letter-spacing: 0.5px;
            font-family: 'Inter', sans-serif;
        }
        .spm-logo-link:hover { opacity: .85; }

        .spm-logo-icon { font-size: 2.2rem; line-height: 1; }
        .spm-logo-name {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 1.85rem;
            font-weight: 900;
            color: #FFD700;
            letter-spacing: 5px;
            line-height: 1;
            text-shadow: 0 2px 10px rgba(0,0,0,.35);
        }
        .spm-logo-sub {
            font-size: 0.6rem;
            font-weight: 700;
            color: rgba(255,255,255,.75);
            letter-spacing: 5px;
            text-transform: uppercase;
            margin-top: 3px;
        }

        .spm-navbar .nav-link {
            color: rgba(255,255,255,.9);
            text-decoration: none;
            font-size: 0.82rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            padding: 10px 15px;
            border-radius: 6px;
            transition: all 0.2s;
            white-space: nowrap;
        }
        .spm-navbar .nav-link:hover {
            color: #FFD700;
        }

        /* ── Dark Dropdown Design ── */
        .spm-dark-dropdown {
            background: #2b2b2b !important;
            border-radius: 4px !important;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5) !important;
            border: none !important;
            padding: 0 !important;
            overflow: hidden;
            min-width: 240px;
        }

        /* Show Dropdown on Hover */
        .spm-navbar .dropdown:hover .spm-dropdown-content {
            top: 100%;
            visibility: visible;
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        
        /* Dropdown content base (needed for animation) */
        .spm-dropdown-content {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%) translateY(10px);
            visibility: hidden;
            opacity: 0;
            transition: all 0.2s ease;
            z-index: 1002;
        }

        /* ── Vertical Navbar Dropdowns ── */
        .spm-navbar .dropdown .spm-dropdown-content.spm-vertical-dropdown {
            display: flex !important;
            flex-direction: column !important;
            width: auto !important;
            min-width: 240px !important;
            padding: 10px 0 !important;
            left: 50% !important;
            transform: translateX(-50%) translateY(10px) !important;
        }
        .spm-navbar .dropdown .spm-dropdown-content.spm-vertical-dropdown a {
            display: block !important;
            padding: 12px 25px !important;
            color: #cbd5e1 !important;
            text-decoration: none !important;
            font-size: 0.85rem !important;
            font-weight: 600 !important;
            transition: all 0.2s !important;
            border-bottom: 1px solid rgba(255,255,255,0.05) !important;
        }
        .spm-navbar .dropdown .spm-dropdown-content.spm-vertical-dropdown a:last-child {
            border-bottom: none !important;
        }
        .spm-navbar .dropdown .spm-dropdown-content.spm-vertical-dropdown a:hover {
            color: #FFD700 !important;
            background: rgba(255,255,255,0.05) !important;
            padding-left: 30px !important;
        }

        /* ── Jones & Bartlett Style Mega Menu ── */
        .spm-mega-menu-jb {
            min-width: 1100px !important;
            padding: 0 !important;
            background: #2b2b2b !important;
            border-top: 3px solid #FFD700 !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
        }
        .spm-mega-content-jb {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            padding: 30px;
        }
        .spm-pod {
            background: #242424;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            display: flex;
            flex-direction: column;
        }
        .spm-pod-header {
            padding: 35px 20px;
            font-size: 0.9rem;
            font-weight: 900;
            text-align: center;
            color: white;
            letter-spacing: 2px;
            text-transform: uppercase;
            min-height: 90px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .spm-pod-body {
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .spm-pod-body a {
            color: #94a3b8 !important;
            font-size: 0.82rem !important;
            text-decoration: none !important;
            transition: all 0.2s !important;
            padding: 5px 0 !important;
            border-bottom: none !important;
        }
        .spm-pod-body a:hover {
            color: white !important;
            padding-left: 8px !important;
        }

        .spm-mega-footer-jb {
            background: #1e1e1e;
            padding: 20px 30px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            border-top: 1px solid rgba(255,255,255,0.05);
        }
        .spm-footer-label {
            color: white;
            font-weight: 800;
            font-size: 0.85rem;
            letter-spacing: 2px;
        }
        .spm-footer-nav {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
        }
        .spm-footer-nav a {
            background: #2b2b2b !important;
            color: #cbd5e1 !important;
            padding: 8px 16px !important;
            font-size: 0.72rem !important;
            font-weight: 700 !important;
            text-transform: uppercase;
            border-radius: 4px;
            border: none !important;
        }
        .spm-footer-nav a:hover {
            background: #3b82f6 !important;
            color: white !important;
        }

        .spm-cta-gold {
            color: #FFD700 !important;
            font-weight: 900 !important;
            border-bottom: 2px solid #FFD700 !important;
            width: fit-content;
            margin-bottom: 12px !important;
            padding-bottom: 2px !important;
        }

        /* ── Header Background Utility ── */
        .spm-bg-blue { background: linear-gradient(rgba(13,59,142,0.8), rgba(13,59,142,0.8)), url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80') center/cover; }
        .spm-bg-purple { background: linear-gradient(rgba(103,58,183,0.8), rgba(103,58,183,0.8)), url('https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&w=400&q=80') center/cover; }
        .spm-bg-red { background: linear-gradient(rgba(211,47,47,0.8), rgba(211,47,47,0.8)), url('https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80') center/cover; }
        .spm-bg-orange { background: linear-gradient(rgba(230,81,0,0.8), rgba(230,81,0,0.8)), url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80') center/cover; }

        /* ── Business Portal Styles ── */
        .spm-biz-nav {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .spm-biz-separator {
            color: rgba(255,255,255,0.3);
            margin: 0 5px;
            font-weight: 300;
        }
        .spm-biz-badge {
            background: rgba(255,215,0,0.1);
            color: #FFD700;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 0.65rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            border: 1px solid rgba(255,215,0,0.2);
        }
        .nav-link.active {
            color: #FFD700 !important;
        }

        @media (max-width: 1200px) { .spm-mega-menu-jb { min-width: 90vw !important; } }
        </style>
    `;
}

export function initHeader() {
    document.addEventListener('click', (e) => {
        if (e.target.id === 'logout-btn') {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                store.logout();
            }
        }
    });
}
