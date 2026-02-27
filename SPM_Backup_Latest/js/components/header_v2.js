import { isAuthenticated, getUserRole } from '../utils/auth.js';
import { store } from '../store.js';
// CACHE BUSTER: 2026-02-23 - Force Horizontal Nav V4

export function renderHeader() {
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
                    <a href="#/" class="nav-link">Home</a>

                    <div class="dropdown spm-mega-dropdown">
                        <span class="nav-link spm-nav-trigger" style="cursor:pointer;">Kindergarten ▾</span>
                        <div class="spm-dropdown-content spm-mega-menu-jb spm-dark-dropdown">
                            <div class="spm-mega-content-jb">
                                <div class="spm-pod">
                                    <a href="#/kindergarten/by-level" class="spm-pod-header spm-bg-blue clickable-header">BY LEVEL</a>
                                    <div class="spm-pod-body">
                                        <a href="#/catalogue?class=Nursery">Nursery Books</a>
                                        <a href="#/catalogue?class=LKG">LKG Books</a>
                                        <a href="#/catalogue?class=UKG">UKG Books</a>
                                    </div>
                                </div>

                                <div class="spm-pod">
                                    <a href="#/kindergarten/subjects" class="spm-pod-header spm-bg-purple clickable-header">SUBJECTS</a>
                                    <div class="spm-pod-body">
                                        <a href="#/catalogue?subject=English">English Activity</a>
                                        <a href="#/catalogue?subject=Mathematics">Maths Activity</a>
                                        <a href="#/catalogue?subject=Hindi">Hindi Akshar</a>
                                        <a href="#/catalogue?subject=EVS">Picture Books</a>
                                    </div>
                                </div>

                                <div class="spm-pod">
                                    <a href="#/kindergarten/kits" class="spm-pod-header spm-bg-red clickable-header">LEARNING KITS</a>
                                    <div class="spm-pod-body">
                                        <a href="#/learning-kits/full">Full Learning Kit</a>
                                        <a href="#/learning-kits/flash-cards">Flash Cards</a>
                                        <a href="#/learning-kits/posters">Educational Posters</a>
                                    </div>
                                </div>

                                <div class="spm-pod">
                                    <a href="#/kindergarten/resources" class="spm-pod-header spm-bg-orange clickable-header">RESOURCES</a>
                                    <div class="spm-pod-body">
                                        <a href="#/video-library">🎬 Fun Learning Videos</a>
                                        <a href="#/download-worksheets">📋 Practice Sheets</a>
                                        <a href="#/teacher-guide">👩‍🏫 Teacher's Guide</a>
                                    </div>
                                </div>
                            </div>

                            <div class="spm-mega-footer-jb">
                                <div class="spm-footer-label">EARLY CHILDHOOD EDUCATION</div>
                                <div class="spm-footer-nav">
                                    <a href="#/pedagogy">Our Methodology</a>
                                    <a href="#/parent-corner">Parent's Corner</a>
                                    <a href="#/activity-ideas">Home Activities</a>
                                    <a href="#/school-tieups">School Solutions</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="dropdown spm-mega-dropdown">
                        <span class="nav-link spm-nav-trigger" style="cursor:pointer;">Children Books ▾</span>
                        <div class="spm-dropdown-content spm-mega-menu-jb spm-dark-dropdown">
                            <div class="spm-mega-content-jb">
                                <div class="spm-pod">
                                    <a href="#/children/subjects" class="spm-pod-header spm-bg-blue clickable-header">BY SUBJECT (1-8)</a>
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
                                    <a href="#/children/classes" class="spm-pod-header spm-bg-purple clickable-header">BY CLASS</a>
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
                                    <a href="#/children/activity" class="spm-pod-header spm-bg-red clickable-header">ACTIVITY BOOKS</a>
                                    <div class="spm-pod-body">
                                        <a href="#/catalogue?category=Story">Story Books</a>
                                        <a href="#/catalogue?category=Coloring">Coloring Books</a>
                                        <a href="#/catalogue?category=Activity">Activity Books</a>
                                    </div>
                                </div>

                                <div class="spm-pod">
                                    <a href="#/children/resources" class="spm-pod-header spm-bg-orange clickable-header">RESOURCE CENTER</a>
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

                    <div class="dropdown spm-mega-dropdown">
                        <span class="nav-link spm-nav-trigger" style="cursor:pointer;position:relative;">
                            Students Corner ▾
                            <span class="spm-new-badge">NEW</span>
                        </span>
                        <div class="spm-dropdown-content spm-mega-menu-jb spm-dark-dropdown">
                            <div class="spm-mega-content-jb">
                                <div class="spm-pod">
                                    <a href="#/students/videos" class="spm-pod-header spm-bg-blue clickable-header">VIDEO RESOURCES</a>
                                    <div class="spm-pod-body">
                                        <a href="#/video-library">🎬 Video Library</a>
                                        <a href="#/video-lecture">📹 Video Lectures</a>
                                        <a href="#/flip-book">📖 Flip Book</a>
                                    </div>
                                </div>

                                <div class="spm-pod">
                                    <a href="#/students/interactive" class="spm-pod-header spm-bg-purple clickable-header">INTERACTIVE LEARNING</a>
                                    <div class="spm-pod-body">
                                        <a href="#/interactive-exercises">⚡ Interactive Exercises</a>
                                        <a href="#/test-paper-generator">📄 Test Paper Generator</a>
                                        <a href="#/worksheets">📋 Lesson Plans & Worksheets</a>
                                    </div>
                                </div>

                                <div class="spm-pod">
                                    <a href="#/students/academic" class="spm-pod-header spm-bg-red clickable-header">ACADEMIC CORNER</a>
                                    <div class="spm-pod-body">
                                        <a href="#/syllabus">📚 Syllabus</a>
                                        <a href="#/exam-datesheets">📅 Exam Datesheets</a>
                                        <a href="#/time-management">⏱️ Time Management</a>
                                        <a href="#/mind-mapping">🧠 Mind Mapping</a>
                                    </div>
                                </div>

                                <div class="spm-pod">
                                    <a href="#/students/hub" class="spm-pod-header spm-bg-orange clickable-header">STUDENT HUB</a>
                                    <div class="spm-pod-body">
                                        <a href="#/earn-with-study">💰 Earn with Study</a>
                                        <a href="#/student-leisure">🎉 Student Leisure</a>
                                        <a href="#/blogs">✍️ Blogs</a>
                                        <a href="#/web-support">🛟 Web Support</a>
                                    </div>
                                </div>
                            </div>

                            <div class="spm-mega-footer-jb">
                                <div class="spm-footer-label">STUDENT ASSISTANCE</div>
                                <div class="spm-footer-nav">
                                    <a href="#/contact">Help Center</a>
                                    <a href="#/faq">FAQs</a>
                                    <a href="#/downloads">Downloads</a>
                                    <a href="#/community">Student Community</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- RIGHT ACTIONS / SEARCH -->
                <div class="spm-nav-right">
                    <div class="spm-search-wrap">
                        <input type="text" placeholder="Search books..." class="spm-search-input">
                        <button class="spm-search-btn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                    </div>
                    <!-- Mobile Logic -->
                    <button class="mobile-menu-icon" onclick="toggleMobileMenu()">
                        <span></span><span></span><span></span>
                    </button>
                </div>

            </nav>
        </div>

        <!-- Mobile Menu Overlay Backdrop -->
        <div id="mobileMenuBackdrop" class="spm-mm-backdrop" onclick="toggleMobileMenu()"></div>

        <!-- Mobile Menu Overlay -->
        <div id="mobileMenu" class="spm-mobile-menu">

            <!-- Header: same layout as homepage navbar -->
            <div class="mm-header">
                <!-- Inline-sized logo (no transform scale, no overflow) -->
                <a href="#/" class="mm-logo-unit" onclick="toggleMobileMenu()">
                    <div class="mm-logo-top">
                        <span class="mm-logo-spm">spm</span>
                        <span class="mm-logo-pub">PUBLICATION</span>
                    </div>
                    <div class="mm-logo-tag">हर सपने की शुरुआत</div>
                </a>
                <!-- X button: same padding/position as the hamburger -->
                <button class="mm-close" onclick="toggleMobileMenu()" aria-label="Close menu">
                    <span></span><span></span>
                </button>
            </div>

            <!-- Search -->
            <div class="mm-search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="text" placeholder="Search books, series, subjects..." class="mm-search-input" id="mobileSearchInput">
            </div>

            <!-- Nav Items -->
            <nav class="mm-nav">
                <a href="#/" class="mm-item" onclick="toggleMobileMenu()">
                    <span>Home</span>
                    <svg class="mm-item-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>

                <div class="mm-section">
                    <div class="mm-section-trigger" onclick="this.parentElement.classList.toggle('open')">
                        <span>Kindergarten</span>
                        <svg class="mm-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                    <div class="mm-section-body">
                        <a href="#/kindergarten/by-level" onclick="toggleMobileMenu()">By Level</a>
                        <a href="#/kindergarten/subjects" onclick="toggleMobileMenu()">Subjects</a>
                        <a href="#/kindergarten/kits" onclick="toggleMobileMenu()">Learning Kits</a>
                        <a href="#/kindergarten/resources" onclick="toggleMobileMenu()">Resources</a>
                    </div>
                </div>

                <div class="mm-section">
                    <div class="mm-section-trigger" onclick="this.parentElement.classList.toggle('open')">
                        <span>Children Books</span>
                        <svg class="mm-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                    <div class="mm-section-body">
                        <a href="#/catalogue?class=1" onclick="toggleMobileMenu()">Class 1</a>
                        <a href="#/catalogue?class=2" onclick="toggleMobileMenu()">Class 2</a>
                        <a href="#/catalogue?class=3" onclick="toggleMobileMenu()">Class 3</a>
                        <a href="#/children/subjects" onclick="toggleMobileMenu()">By Subject (1–8)</a>
                        <a href="#/children/activity" onclick="toggleMobileMenu()">Activity Books</a>
                    </div>
                </div>

                <div class="mm-section">
                    <div class="mm-section-trigger" onclick="this.parentElement.classList.toggle('open')">
                        <span>Students Corner</span>
                        <svg class="mm-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                    <div class="mm-section-body">
                        <a href="#/video-library" onclick="toggleMobileMenu()">Video Library</a>
                        <a href="#/video-lecture" onclick="toggleMobileMenu()">Video Lectures</a>
                        <a href="#/students/interactive" onclick="toggleMobileMenu()">Interactive Learning</a>
                        <a href="#/students/academic" onclick="toggleMobileMenu()">Academic Corner</a>
                    </div>
                </div>

                <a href="#/catalogue" class="mm-item" onclick="toggleMobileMenu()">
                    <span>Full Catalogue</span>
                    <svg class="mm-item-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
                <a href="#/about" class="mm-item" onclick="toggleMobileMenu()">
                    <span>About Us</span>
                    <svg class="mm-item-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
                <a href="#/contact" class="mm-item" onclick="toggleMobileMenu()">
                    <span>Contact</span>
                    <svg class="mm-item-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
            </nav>
        </div>

        <style>
        /* Mobile backdrop */
        .spm-mm-backdrop {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(5,15,40,0.7);
            z-index: 1999;
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
        }
        .spm-mm-backdrop.active { display: block; }

        /* ── Full-width panel ── */
        .spm-mobile-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100dvh;
            background: #0d1f4e;
            z-index: 2000;
            transform: translateX(100%);
            transition: transform 0.38s cubic-bezier(0.77, 0, 0.175, 1);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        .spm-mobile-menu.active { transform: translateX(0); }

        /* ── Header: identical look to homepage navbar ── */
        .mm-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 14px;
            height: 56px;
            min-height: 56px;
            max-height: 56px;
            background: linear-gradient(135deg, #0d3b8e 0%, #1565C0 60%, #0d3b8e 100%);
            border-bottom: 2px solid rgba(255,215,0,0.4);
            box-shadow: 0 4px 24px rgba(0,0,0,0.3);
            flex-shrink: 0;
        }

        /* ── Inline logo: explicit sizes, zero overflow risk ── */
        .mm-logo-unit {
            display: flex;
            flex-direction: column;
            text-decoration: none;
            flex-shrink: 0;
        }
        .mm-logo-top {
            background: #0d3b8e;
            padding: 4px 8px 2px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .mm-logo-spm {
            color: #FFD700;
            font-family: 'Playfair Display', serif;
            font-size: 1.55rem;
            font-weight: 800;
            line-height: 0.85;
            letter-spacing: 1px;
            text-transform: lowercase;
        }
        .mm-logo-pub {
            color: white;
            font-size: 0.3rem;
            font-weight: 800;
            letter-spacing: 3.5px;
            margin-top: 5px;
            margin-right: -3.5px;
            text-transform: uppercase;
        }
        .mm-logo-tag {
            background: white;
            color: #0d3b8e;
            font-size: 0.45rem;
            font-weight: 800;
            letter-spacing: 0.3px;
            text-align: center;
            padding: 2px 6px;
            font-family: 'Inter', sans-serif;
            border-bottom-left-radius: 3px;
            border-bottom-right-radius: 3px;
        }

        /* ── X button: same shape/padding as hamburger ── */
        .mm-close {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5px;
            width: 40px;
            height: 40px;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 10px;
            flex-shrink: 0;
        }
        .mm-close span {
            display: block;
            width: 25px;
            height: 2px;
            background: white;
            transition: all 0.3s ease;
        }
        .mm-close span:first-child { transform: rotate(45deg) translate(0, 3.5px); }
        .mm-close span:last-child  { transform: rotate(-45deg) translate(0, -3.5px); }

        /* ── Search ── */
        .mm-search {
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 16px 20px 8px;
            background: rgba(255,255,255,0.07);
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 10px;
            padding: 10px 14px;
            flex-shrink: 0;
        }
        .mm-search svg { color: rgba(255,255,255,0.4); flex-shrink: 0; }
        .mm-search-input {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            color: white;
            font-size: 0.88rem;
            font-family: 'Inter', sans-serif;
        }
        .mm-search-input::placeholder { color: rgba(255,255,255,0.35); }

        /* ── Nav ── */
        .mm-nav {
            flex: 1;
            overflow-y: auto;
            padding: 8px 0 24px;
            scrollbar-width: none;
        }
        .mm-nav::-webkit-scrollbar { display: none; }

        /* Top-level item */
        .mm-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 24px;
            color: rgba(255,255,255,0.92);
            font-size: 1rem;
            font-weight: 700;
            font-family: 'Inter', sans-serif;
            text-decoration: none;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            transition: all 0.2s;
            letter-spacing: 0.2px;
        }
        .mm-item:hover {
            color: #FFD700;
            background: rgba(255,215,0,0.05);
            padding-left: 28px;
        }
        .mm-item-arrow { opacity: 0.3; flex-shrink: 0; }
        .mm-item:hover .mm-item-arrow { opacity: 1; color: #FFD700; }

        /* Section with accordion */
        .mm-section-trigger {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 24px;
            color: rgba(255,255,255,0.92);
            font-size: 1rem;
            font-weight: 700;
            font-family: 'Inter', sans-serif;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            cursor: pointer;
            transition: all 0.2s;
            user-select: none;
        }
        .mm-section-trigger:hover {
            color: #FFD700;
            background: rgba(255,215,0,0.05);
        }
        .mm-chevron {
            flex-shrink: 0;
            opacity: 0.4;
            transition: transform 0.25s ease;
        }
        .mm-section.open .mm-chevron { transform: rotate(180deg); opacity: 1; color: #FFD700; }
        .mm-section.open .mm-section-trigger { color: #FFD700; }

        /* Accordion sub-items */
        .mm-section-body {
            display: none;
            background: rgba(0,0,0,0.25);
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .mm-section.open .mm-section-body { display: block; }
        .mm-section-body a {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 11px 24px 11px 36px;
            color: rgba(255,255,255,0.65) !important;
            font-size: 0.88rem !important;
            font-weight: 600 !important;
            font-family: 'Inter', sans-serif;
            text-decoration: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.04) !important;
            transition: all 0.18s;
        }
        .mm-section-body a::before {
            content: '';
            width: 4px;
            height: 4px;
            background: rgba(255,215,0,0.5);
            border-radius: 50%;
            flex-shrink: 0;
        }
        .mm-section-body a:last-child { border-bottom: none !important; }
        .mm-section-body a:hover {
            color: #FFD700 !important;
            background: rgba(255,215,0,0.06) !important;
            padding-left: 40px !important;
        }
        .mm-section-body a:hover::before { background: #FFD700; }
        </style>

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
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            text-decoration: none;
        }
        .clickable-header:hover {
            filter: brightness(1.2) contrast(1.1);
            transform: scale(1.02);
            box-shadow: inset 0 0 100px rgba(255,255,255,0.1);
        }
        .clickable-header::after {
            content: 'VIEW ALL →';
            position: absolute;
            bottom: 5px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            font-size: 0.6rem;
            opacity: 0;
            transition: all 0.3s ease;
            letter-spacing: 2px;
            font-weight: 800;
        }
        .clickable-header:hover::after {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
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

        /* Premium Gold NEW Badge */
        .spm-new-badge {
            position: absolute;
            top: -12px;
            right: -20px;
            background: linear-gradient(135deg, #FFD700, #ffb900);
            color: #0d3b8e;
            font-size: 0.58rem;
            font-weight: 900;
            padding: 2px 7px;
            border-radius: 30px;
            letter-spacing: 1.2px;
            box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
            pointer-events: none;
            line-height: 1;
            text-transform: uppercase;
            border: 1.5px solid rgba(255, 255, 255, 0.4);
            animation: badgeGlow 3s ease-in-out infinite;
            z-index: 10;
        }

        @keyframes badgeGlow {
            0%, 100% { transform: translateY(0); filter: brightness(1) drop-shadow(0 0 2px rgba(255, 215, 0, 0.4)); }
            50% { transform: translateY(-3px); filter: brightness(1.15) drop-shadow(0 0 8px rgba(255, 215, 0, 0.6)); }
        }

        /* ── Mobile Menu Aesthetics ── */
        .mobile-menu-icon {
            display: none;
            flex-direction: column;
            gap: 5px;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 10px;
            z-index: 1100;
        }
        .mobile-menu-icon span {
            display: block;
            width: 25px;
            height: 2px;
            background: white;
            transition: all 0.3s ease;
        }

        @media (max-width: 1024px) {
            .spm-nav-main, .spm-search-wrap { display: none !important; }
            .mobile-menu-icon { display: flex; }
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

    // Expose mobile menu toggle globally (used by inline onclick attributes)
    window.toggleMobileMenu = function () {
        const menu = document.getElementById('mobileMenu');
        const backdrop = document.getElementById('mobileMenuBackdrop');
        const icon = document.querySelector('.mobile-menu-icon');
        if (!menu) return;

        const isOpen = menu.classList.toggle('active');
        if (backdrop) backdrop.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';

        // Animate hamburger → X
        if (icon) {
            const spans = icon.querySelectorAll('span');
            if (isOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            }
        }
    };

    // Mobile search submit
    window.submitMobileSearch = function () {
        const input = document.getElementById('mobileSearchInput');
        if (input && input.value.trim()) {
            window.location.hash = `/catalogue?q=${encodeURIComponent(input.value.trim())}`;
            window.toggleMobileMenu();
        }
    };

    // Allow Enter key in mobile search
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.id === 'mobileSearchInput') {
            window.submitMobileSearch();
        }
    });
}
