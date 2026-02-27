export function renderAbout() {
    return `
        <div class="spm-about-page">
            <!-- CINEMATIC HERO SECTION -->
            <section class="about-hero">
                <div class="hero-bg-overlay"></div>
                <div class="container hero-content">
                    <span class="about-label animate-fade-up">SINCE 1995</span>
                    <h1 class="about-title animate-fade-up" style="animation-delay: 0.2s;">
                        A Legacy of <span class="text-gold">Courage</span>,<br>
                        Driven by <span class="text-white">Knowledge</span>
                    </h1>
                    <p class="about-subtitle animate-fade-up" style="animation-delay: 0.4s;">
                        The story of Suman Prakashan Mandir is a testament to the power of a single dream and the resilience to bring it to life.
                    </p>
                    <div class="hero-scroll-indicator">
                        <div class="mouse"></div>
                        <span>Scroll Journey</span>
                    </div>
                </div>
            </section>

            <!-- THE FOUNDER'S VISION SECTION -->
            <section class="about-heritage section">
                <div class="container grid-2">
                    <div class="heritage-image-wrap animate-reveal-left">
                        <div class="heritage-frame">
                            <img src="/Users/isachinsingh/.gemini/antigravity/brain/4a033ea5-eb04-4ae5-8169-52a0b696c4be/about_heritage_desk_1771970450371.png" alt="Heritage Desk" class="img-fluid">
                            <div class="heritage-accent"></div>
                        </div>
                    </div>
                    <div class="heritage-text animate-reveal-right">
                        <span class="section-pill">The Beginning</span>
                        <h2 class="section-title">One Table, A Typewriter,<br>And Infinite Hope</h2>
                        <p class="heritage-p">
                            Suman Prakashan Mandir was born out of a dream—one man’s unshakeable belief that books could change lives. 
                            Our founder, <strong>Late Shri Thakur Tejveer Singh</strong>, started this journey in a time of struggle, 
                            when resources were few but hope was abundant. 
                        </p>
                        <p class="heritage-p">
                            He began with nothing more than a small table, a borrowed typewriter, and a heart full of ambition. 
                            Days were long. Nights were longer. But he kept going because he believed every child deserved a book, 
                            and every family deserved access to learning.
                        </p>
                        <div class="about-quote">
                            <svg class="quote-icon" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H12.017V21H14.017ZM5.01692 21L5.01692 18C5.01692 16.8954 5.91235 16 7.01692 16H10.0169C10.5692 16 11.0169 15.5523 11.0169 15V9C11.0169 8.44772 10.5692 8 10.0169 8H6.01692C5.46464 8 5.01692 8.44772 5.01692 9V12C5.01692 12.5523 4.5692 13 4.01692 13H3.01692V21H5.01692Z" fill="currentColor"/></svg>
                            <p>Those early years were not easy. But every challenge carved the identity of Suman Prakashan Mandir — a publishing house built not on profit, but on purpose.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- THE LEGACY STATS SECTION (Dark Mode) -->
            <section class="about-stats">
                <div class="stats-overlay"></div>
                <div class="container">
                    <div class="stats-grid">
                        <div class="stat-box animate-scale">
                            <span class="stat-num">30+</span>
                            <span class="stat-label">Years of Trust</span>
                        </div>
                        <div class="stat-box animate-scale" style="animation-delay: 0.1s;">
                            <span class="stat-num">5k+</span>
                            <span class="stat-label">Schools Empowered</span>
                        </div>
                        <div class="stat-box animate-scale" style="animation-delay: 0.2s;">
                            <span class="stat-num">299+</span>
                            <span class="stat-label">Modern Titles</span>
                        </div>
                        <div class="stat-box animate-scale" style="animation-delay: 0.3s;">
                            <span class="stat-num">1M+</span>
                            <span class="stat-label">Happy Students</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- OUR PILLARS / VALUES (Glassmorphism Cards) -->
            <section class="about-pillars section">
                <div class="container text-center">
                    <span class="section-pill">Our Core Pillars</span>
                    <h2 class="section-title">What Defines Us</h2>
                    <div class="pillars-grid mt-12">
                        <div class="pillar-card glass-card animate-fade-up">
                            <div class="pillar-icon bg-blue">📚</div>
                            <h3>Authentic Education</h3>
                            <p>Books rooted in timeless values and modern pedagogical excellence.</p>
                        </div>
                        <div class="pillar-card glass-card animate-fade-up" style="animation-delay: 0.1s;">
                            <div class="pillar-icon bg-gold">🤝</div>
                            <h3>Unwavering Trust</h3>
                            <p>Building lifelong partnerships with educators and parents nationwide.</p>
                        </div>
                        <div class="pillar-card glass-card animate-fade-up" style="animation-delay: 0.2s;">
                            <div class="pillar-icon bg-purple">⚡</div>
                            <h3>Innovation First</h3>
                            <p>Constant evolution to meet the needs of the digital-first generation.</p>
                        </div>
                        <div class="pillar-card glass-card animate-fade-up" style="animation-delay: 0.3s;">
                            <div class="pillar-icon bg-red">💎</div>
                            <h3>Premium Quality</h3>
                            <p>High-grade content and presentation accessible to every learner.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- GUARDIANS OF THE LEGACY (Sons) -->
            <section class="about-leadership section" style="background: #f8fafc;">
                <div class="container">
                    <div class="text-center mb-12 animate-fade-up" style="margin-bottom: 50px;">
                        <span class="section-pill">The Guardians</span>
                        <h2 class="section-title">Carrying the Vision Forward</h2>
                        <p style="font-size: 1.2rem; color: #475569; max-width: 700px; margin: 0 auto;">
                            For decades, the sons of Thakur Tejveer Singh have dedicated their lives to nurturing and expanding their father's dream, establishing Suman Prakashan Mandir as a bedrock of educational trust in India.
                        </p>
                    </div>
                    
                    <div class="leadership-grid">
                        <div class="leader-card animate-fade-up" style="animation-delay: 0.1s;">
                            <div class="leader-img-wrap">
                                <img src="./assets/images/lekhraj_singh_professional.png" alt="Lekhraj Singh">
                            </div>
                            <h3 class="leader-name">Lekhraj Singh</h3>
                            <p class="leader-role">Director</p>
                        </div>
                        <div class="leader-card animate-fade-up" style="animation-delay: 0.2s;">
                            <div class="leader-img-wrap">
                                <img src="./assets/images/subhash_singh_professional.png" alt="Subhash Singh">
                            </div>
                            <h3 class="leader-name">Subhash Singh</h3>
                            <p class="leader-role">Director</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- FAMILY TESTAMENT SECTION -->
            <section class="about-testament">
                <div class="container-narrow text-center glass-panel animate-fade-up">
                    <h2 class="testament-title">The Promise Forward</h2>
                    <p class="testament-text">
                        “As we continue to grow, our mission remains unchanged: 
                        To honour our grandfather's dream and our fathers' relentless hard work by spreading knowledge, nurturing young minds, 
                        and keeping the flame of learning alive for generations to come.”
                    </p>
                    <div class="testament-signature">
                        <span class="sig-title">The Suman Prakashan Mandir Family</span>
                        <div class="sig-line"></div>
                    </div>
                </div>
            </section>
        </div>

        <style>
            /* ═══ ABOUT PAGE REDESIGN ═══ */
            .spm-about-page { background: #fcfdfe; color: #1e293b; overflow-x: hidden; }
            
            /* Utils */
            .container { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
            .container-narrow { max-width: 900px; margin: 0 auto; padding: 0 40px; }
            .section { padding: 120px 0; }
            .text-gold { color: #FFD700; }
            .text-white { color: #fff; }
            .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
            .section-pill { display: inline-block; background: #0d3b8e; color: #FFD700; font-size: 0.75rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 8px 20px; border-radius: 50px; margin-bottom: 24px; }
            .section-title { font-size: 3rem; font-weight: 900; color: #0f172a; margin-bottom: 30px; line-height: 1.1; letter-spacing: -1px; }
            .mt-12 { margin-top: 60px; }

            /* Hero Section */
            .about-hero { 
                position: relative; 
                height: 100vh; 
                min-height: 700px;
                display: flex; 
                align-items: center; 
                justify-content: center;
                background: url('/Users/isachinsingh/.gemini/antigravity/brain/4a033ea5-eb04-4ae5-8169-52a0b696c4be/about_hero_bg_1771970420839.png') center/cover;
                color: #fff;
                text-align: center;
            }
            .hero-bg-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(15,23,42,0.85), rgba(15,23,42,0.4), rgba(15,23,42,0.9)); z-index: 1; }
            .hero-content { position: relative; z-index: 2; width: 100%; }
            .about-label { font-size: 1rem; font-weight: 800; letter-spacing: 5px; color: #FFD700; margin-bottom: 20px; display: block; }
            .about-title { font-size: 5rem; font-weight: 900; line-height: 1.1; margin-bottom: 30px; }
            .about-subtitle { font-size: 1.4rem; color: rgba(255,255,255,0.8); max-width: 700px; margin: 0 auto; line-height: 1.6; }
            
            .hero-scroll-indicator { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 10px; opacity: 0.6; }
            .mouse { width: 24px; height: 40px; border: 2px solid #fff; border-radius: 20px; position: relative; }
            .mouse::before { content: ''; position: absolute; left: 50%; top: 8px; transform: translateX(-50%); width: 4px; height: 8px; background: #fff; border-radius: 2px; animation: mouseWheel 2s infinite; }
            @keyframes mouseWheel { 0% { opacity: 1; transform: translate(-50%, 0); } 100% { opacity: 0; transform: translate(-50%, 15px); } }

            /* Heritage Section */
            .heritage-image-wrap { position: relative; }
            .heritage-frame { position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.15); }
            .heritage-frame img { width: 100%; display: block; filter: sepia(0.1) contrast(1.1); transform: scale(1.02); transition: 0.6s; }
            .heritage-frame:hover img { transform: scale(1.05); }
            .heritage-accent { position: absolute; -15px; top: -15px; width: 100px; height: 100px; border-left: 10px solid #FFD700; border-top: 10px solid #FFD700; z-index: -1; }
            .heritage-p { font-size: 1.15rem; line-height: 1.8; color: #475569; margin-bottom: 24px; }
            
            .about-quote { border-left: 5px solid #0d3b8e; padding: 25px 40px; background: #f8fafc; border-radius: 0 20px 20px 0; position: relative; margin-top: 40px; }
            .quote-icon { position: absolute; top: -15px; left: 15px; width: 40px; height: 40px; color: #0d3b8e; opacity: 0.1; }
            .about-quote p { font-size: 1.25rem; font-weight: 600; font-style: italic; color: #1e293b; line-height: 1.5; }

            /* Stats Section */
            .about-stats { position: relative; background: #0f172a; padding: 80px 0; color: #fff; text-align: center; }
            .stats-overlay { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,215,0,0.1) 1px, transparent 1px); background-size: 30px 30px; opacity: 0.2; }
            .stats-grid { display: flex; justify-content: space-between; position: relative; z-index: 2; }
            .stat-box { flex: 1; }
            .stat-num { display: block; font-size: 4rem; font-weight: 900; color: #FFD700; margin-bottom: 8px; }
            .stat-label { font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: rgba(255,255,255,0.6); }

            /* Pillars Card Styles */
            .pillars-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
            .glass-card { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.5); border-radius: 24px; padding: 40px 30px; text-align: left; transition: all 0.4s; box-shadow: 0 10px 30px rgba(0,0,0,0.03); }
            .glass-card:hover { transform: translateY(-10px); background: #fff; box-shadow: 0 30px 60px rgba(0,0,0,0.1); border-color: #0d3b8e; }
            .pillar-icon { width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 24px; }
            .bg-blue { background: #eff6ff; } .bg-gold { background: #fefce8; } .bg-purple { background: #faf5ff; } .bg-red { background: #fef2f2; }
            .glass-card h3 { font-size: 1.4rem; font-weight: 800; color: #0f172a; margin-bottom: 16px; }
            .glass-card p { color: #64748b; line-height: 1.6; }

            /* Testament Section */
            .about-testament { padding-bottom: 120px; }
            .glass-panel { background: linear-gradient(135deg, rgba(13, 59, 142, 0.05) 0%, rgba(13, 59, 142, 0.02) 100%); padding: 80px 60px; border-radius: 40px; border: 1px solid rgba(13, 59, 142, 0.1); }
            .testament-title { font-size: 2.5rem; font-weight: 900; color: #0f172a; margin-bottom: 30px; }
            .testament-text { font-size: 1.8rem; font-weight: 500; font-style: italic; color: #334155; line-height: 1.5; max-width: 800px; margin: 0 auto 40px; }
            .testament-signature { display: inline-flex; flex-direction: column; align-items: center; }
            .sig-title { font-size: 1.1rem; font-weight: 800; color: #0d3b8e; letter-spacing: 1px; }
            .sig-line { width: 100px; height: 3px; background: #FFD700; margin-top: 10px; border-radius: 2px; }

            /* Leadership Section */
            .leadership-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; max-width: 900px; margin: 0 auto; }
            .leader-card { text-align: center; }
            .leader-img-wrap { width: 100%; max-width: 320px; margin: 0 auto 24px; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); border: 8px solid #fff; aspect-ratio: 1/1; background: #e2e8f0; }
            .leader-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
            .leader-card:hover .leader-img-wrap img { transform: scale(1.05); }
            .leader-name { font-size: 1.8rem; font-weight: 800; color: #0f172a; margin-bottom: 5px; }
            .leader-role { font-size: 1.1rem; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }

            /* Animations */
            .animate-fade-up { opacity: 0; transform: translateY(30px); animation: fadeUp 0.8s forwards ease-out; }
            @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
            
            .animate-reveal-left { opacity: 0; transform: translateX(-50px); animation: revealIn 1s forwards ease-out; }
            .animate-reveal-right { opacity: 0; transform: translateX(50px); animation: revealIn 1s forwards ease-out; }
            @keyframes revealIn { to { opacity: 1; transform: translateX(0); } }

            .animate-scale { opacity: 0; transform: scale(0.9); animation: scaleIn 0.6s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            @keyframes scaleIn { to { opacity: 1; transform: scale(1); } }

            @media (max-width: 991px) {
                .grid-2 { grid-template-columns: 1fr; gap: 40px; }
                .pillars-grid { grid-template-columns: repeat(2, 1fr); }
                .about-title { font-size: 3.5rem; }
                .stats-grid { flex-wrap: wrap; }
                .stat-box { flex: 0 0 50%; margin-bottom: 30px; }
            }
        </style>
    `;
}
