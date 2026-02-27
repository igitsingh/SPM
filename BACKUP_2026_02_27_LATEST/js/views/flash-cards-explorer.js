export function renderFlashCardsExplorer() {
    return `
        <div class="flash-cards-page" style="background: #f8fafc; min-height: 100vh; padding-bottom: 100px; font-family: 'Inter', sans-serif;">
            
            <!-- Hero Section -->
            <header class="fc-hero" style="position: relative; padding: 120px 0 80px; background: #0f172a; color: white; text-align: center; overflow: hidden;">
                <div class="fc-hero-bg" style="position: absolute; inset: 0; background-image: url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80'); background-size: cover; background-position: center; opacity: 0.15; z-index: 1;"></div>
                <div class="fc-hero-content" style="position: relative; z-index: 10; max-width: 900px; margin: 0 auto; padding: 0 20px;">
                    <div class="fc-badge" style="display: inline-block; padding: 6px 16px; border-radius: 30px; background: #ea580c; color: #fff; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; font-size: 0.8rem; margin-bottom: 24px;">New Product Framework</div>
                    <h1 class="fc-title" style="font-family: 'Playfair Display', serif; font-size: 4rem; font-weight: 900; line-height: 1.1; margin-bottom: 24px;">SPM Alphabet Flashcards</h1>
                    <p class="fc-desc" style="font-size: 1.2rem; opacity: 0.9; line-height: 1.6; font-weight: 400; max-width: 700px; margin: 0 auto;">A complete, scalable A–Z phonic & reading framework spanning three foundational grade levels. Designed with a clean, Montessori-inspired methodology.</p>
                </div>
            </header>

            <!-- Foundation Framework Cards -->
            <section class="fc-framework-preview" style="padding: 100px 20px 80px; max-width: 1400px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 60px;">
                </div>

                <div class="system-cards-grid" style="display: flex; gap: 60px; justify-content: center; flex-wrap: wrap;">
                    
                    <!-- Pre-Primary Card -->
                    <div class="sys-card-container">
                        <div class="sys-card-title-badge" style="background: #ff9f1c;">PRE-PRIMARY</div>
                        <div class="sys-card-subtitle">Nursery / LKG / UKG</div>
                        <div class="sys-card fc-pre-primary">
                            <div class="card-inner-layer">
                                <div class="spm-logo-tab">
                                    <img src="assets/spm_logo.png" alt="SPM Logo">
                                </div>
                                <div class="abc-badge">abc</div>
                                
                                <div class="card-content-top">
                                    <h1 class="main-letter outline-letter">A</h1>
                                    <div class="hero-image">
                                        🍎
                                    </div>
                                </div>

                                <div class="card-bottom-curve">
                                    <h2 class="title-text">A for Apple</h2>
                                    <p class="phonic-text">/æ/</p>
                                    <div class="sound-strip">
                                        Sound: /æ/ | Say: A - A - Apple
                                    </div>
                                    <div class="grass-decor"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Grade 1 Card -->
                    <div class="sys-card-container">
                        <div class="sys-card-title-badge" style="background: #ffb703;">GRADE 1</div>
                        <div class="sys-card-subtitle" style="visibility: hidden;">Spacer</div>
                        <div class="sys-card fc-grade-1">
                            <div class="card-inner-layer">
                                <div class="spm-logo-tab">
                                    <img src="assets/spm_logo.png" alt="SPM Logo">
                                </div>
                                <div class="abc-badge">abc</div>
                                
                                <div class="card-content-top g1-top">
                                    <h1 class="main-letter solid-letter">A</h1>
                                    <div class="hero-image small-hero">
                                        🍎
                                    </div>
                                    <h2 class="title-text-slim">A – Apple</h2>
                                </div>

                                <div class="g1-icons-row">
                                    <div class="g1-icon-col">
                                        <div class="g1-icon">🍎</div>
                                        <span>Apple</span>
                                    </div>
                                    <div class="g1-icon-col">
                                        <div class="g1-icon">🐜</div>
                                        <span>Ant</span>
                                    </div>
                                    <div class="g1-icon-col">
                                        <div class="g1-icon">🪓</div>
                                        <span>Axe</span>
                                    </div>
                                </div>

                                <div class="sound-strip-bottom">
                                    Sound: /æ/ | Say: A - A - Apple
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Grade 2 Card -->
                    <div class="sys-card-container">
                        <div class="sys-card-title-badge" style="background: #fb8500;">GRADE 2</div>
                        <div class="sys-card-subtitle" style="visibility: hidden;">Spacer</div>
                        <div class="sys-card fc-grade-2">
                            <div class="card-inner-layer">
                                <div class="spm-logo-tab">
                                    <img src="assets/spm_logo.png" alt="SPM Logo">
                                </div>
                                <div class="abc-badge">abc</div>
                                
                                <div class="g2-top">
                                    <h1 class="main-letter dual-letter">Aa</h1>
                                    <h2 class="title-text-slim">A for Apple</h2>
                                </div>

                                <div class="g2-word-boxes">
                                    <div class="g2-box pale-blue">
                                        <div class="box-top"><span class="box-let">A</span> <span class="box-icon">🍎</span></div>
                                        <span class="box-word">Apple</span>
                                    </div>
                                    <div class="g2-box pale-orange">
                                        <div class="box-top"><span class="box-let">a</span> <span class="box-icon">🐜</span></div>
                                        <span class="box-word">Ant</span>
                                    </div>
                                    <div class="g2-box pale-blue">
                                        <div class="box-top"><span class="box-icon">✈️</span></div>
                                        <span class="box-word">Airplane</span>
                                    </div>
                                </div>

                                <div class="g2-sentences">
                                    <p>An ant is on an apple.</p>
                                    <p>The ant ran.</p>
                                </div>

                                <div class="g2-footer-decor">
                                    <div class="g2-bottom-art">
                                        <div class="g2-mini-art">🐜🍎</div>
                                        <div class="g2-grass-line"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <style>
                /* Base Reset */
                * { box-sizing: border-box; }
                
                /* Layout */
                .sys-card-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 380px;
                }
                .sys-card-title-badge {
                    color: white;
                    font-weight: 800;
                    padding: 6px 24px;
                    border-radius: 20px;
                    font-size: 1.1rem;
                    letter-spacing: 0.5px;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                    margin-bottom: 8px;
                }
                .sys-card-subtitle {
                    color: #94a3b8;
                    font-size: 0.95rem;
                    margin-bottom: 25px;
                    font-weight: 500;
                }
                
                /* Real Flashcard Structure */
                .sys-card {
                    width: 100%;
                    height: 520px;
                    border-radius: 24px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.15), 0 5px 15px rgba(0,0,0,0.08);
                    position: relative;
                    padding: 8px;
                    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    background-color: white; /* Fallback */
                }
                .sys-card:hover {
                    transform: translateY(-8px);
                }

                .card-inner-layer {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    border-radius: 17px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                /* SPM Logo Tab */
                .spm-logo-tab {
                    position: absolute;
                    top: -2px;
                    left: 20px;
                    background: white;
                    padding: 6px 12px 14px 12px;
                    border-radius: 0 0 10px 10px;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.06);
                    z-index: 10;
                    min-width: 60px;
                    display: flex;
                    justify-content: center;
                }
                .spm-logo-tab img {
                    height: 28px;
                    object-fit: contain;
                }

                /* ABC Badge */
                .abc-badge {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    width: 48px;
                    height: 48px;
                    background: rgba(255,255,255,0.85);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #ea580c;
                    font-weight: 800;
                    font-size: 1.2rem;
                    box-shadow: inset 0 2px 5px rgba(255,255,255,1), 0 4px 10px rgba(0,0,0,0.08);
                    z-index: 10;
                }

                /* =================== PRE-PRIMARY =================== */
                .fc-pre-primary {
                    background: #f59e0b;
                }
                .fc-pre-primary .card-inner-layer {
                    background: radial-gradient(circle at 50% 30%, #fef08a 0%, #f59e0b 80%);
                    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.4);
                }
                .fc-pre-primary .abc-badge {
                    color: white;
                    background: rgba(255, 255, 255, 0.3);
                    border: 2px solid white;
                    box-shadow: none;
                }
                .card-content-top {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding-top: 40px; /* Space for badges */
                }
                .outline-letter {
                    font-size: 8rem;
                    font-weight: 900;
                    color: white;
                    -webkit-text-stroke: 4px #ea580c; /* Orange stroke */
                    text-shadow: 0 10px 20px rgba(234, 88, 12, 0.4);
                    margin: 0;
                    line-height: 1;
                }
                .hero-image {
                    font-size: 6rem;
                    filter: drop-shadow(0 15px 15px rgba(0,0,0,0.25));
                    margin-top: -15px;
                    z-index: 2;
                }
                .card-bottom-curve {
                    background: white;
                    border-top-left-radius: 50% 25px;
                    border-top-right-radius: 50% 25px;
                    padding: 30px 20px 25px;
                    text-align: center;
                    position: relative;
                    margin-top: -30px; /* Overlap gradient */
                    box-shadow: 0 -5px 20px rgba(0,0,0,0.05);
                }
                .title-text {
                    color: #d97706;
                    font-size: 1.8rem;
                    font-weight: 800;
                    margin: 0 0 5px 0;
                }
                .phonic-text {
                    color: #b45309;
                    font-style: italic;
                    font-size: 1.1rem;
                    margin: 0 0 15px 0;
                }
                .sound-strip {
                    color: #92400e;
                    font-weight: 700;
                    font-size: 1rem;
                    margin-bottom: 20px;
                }
                .grass-decor {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 20px;
                    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 20 Q 25 0 50 20 T 100 20 L 0 20 Z" fill="%23a3e635" opacity="0.6"/></svg>') repeat-x;
                    background-size: 50px 10px;
                    background-position: bottom;
                    border-radius: 0 0 17px 17px;
                }

                /* =================== GRADE 1 =================== */
                .fc-grade-1 {
                    background: #e7e5e4;
                }
                .fc-grade-1 .card-inner-layer {
                    background: #fafaf9; /* Creamy off-white */
                }
                .fc-grade-1 .abc-badge {
                    color: white;
                    background: #f97316;
                    border: 2px solid white;
                }
                .g1-top {
                    padding-top: 60px;
                    justify-content: flex-start;
                }
                .solid-letter {
                    font-size: 7rem;
                    font-weight: 900;
                    color: #f97316;
                    margin: 0 0 10px 0;
                    line-height: 1;
                }
                .small-hero {
                    font-size: 5rem;
                    margin-top: 0;
                    margin-bottom: 10px;
                }
                .title-text-slim {
                    color: #d97706;
                    font-size: 1.6rem;
                    font-weight: 600;
                    margin: 0;
                }
                
                .g1-icons-row {
                    display: flex;
                    justify-content: center;
                    gap: 30px;
                    margin-top: auto;
                    margin-bottom: 25px;
                }
                .g1-icon-col {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    color: #78350f;
                    font-weight: 600;
                    font-size: 0.95rem;
                }
                .g1-icon {
                    font-size: 2.2rem;
                    margin-bottom: 5px;
                    filter: drop-shadow(0 5px 5px rgba(0,0,0,0.1));
                }
                .sound-strip-bottom {
                    text-align: center;
                    color: #a8a29e;
                    font-weight: 600;
                    font-size: 1rem;
                    padding-bottom: 20px;
                }

                /* =================== GRADE 2 =================== */
                .fc-grade-2 {
                    background: #e7e5e4;
                }
                .fc-grade-2 .card-inner-layer {
                    background: #fffcf8; /* Warm paper white */
                }
                .fc-grade-2 .abc-badge {
                    color: white;
                    background: #fca5a5;
                    border: 2px solid white;
                }
                .g2-top {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding-top: 70px;
                }
                .dual-letter {
                    font-size: 6rem;
                    font-weight: 900;
                    color: #ea580c;
                    margin: 0 0 10px 0;
                    line-height: 1;
                    letter-spacing: -2px;
                }
                
                .g2-word-boxes {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    padding: 0 20px;
                    margin-top: 30px;
                }
                .g2-box {
                    padding: 8px 12px;
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-width: 85px;
                }
                .pale-blue { background: #e0f2fe; color: #0369a1; }
                .pale-orange { background: #ffedd5; color: #c2410c; }
                .box-top { display: flex; align-items: center; gap: 5px; margin-bottom: 5px; }
                .box-let { font-size: 1.4rem; font-weight: 800; }
                .box-icon { font-size: 1.4rem; filter: drop-shadow(0 3px 3px rgba(0,0,0,0.1)); }
                .box-word { font-weight: 600; font-size: 0.9rem; }

                .g2-sentences {
                    font-size: 1.2rem;
                    color: #57534e;
                    line-height: 1.8;
                    margin-top: 30px;
                    padding: 0 30px;
                    text-align: left;
                }
                .g2-sentences p {
                    margin: 0 0 10px 0;
                }

                .g2-footer-decor {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    padding: 20px;
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                }
                .g2-bottom-art {
                    position: relative;
                }
                .g2-mini-art {
                    font-size: 2.5rem;
                    transform: scaleX(-1); /* Flip if needed, or just let it be */
                    z-index: 2;
                    position: relative;
                }
                .g2-grass-line {
                    position: absolute;
                    bottom: 5px;
                    left: -20px;
                    right: -20px;
                    height: 4px;
                    background: #a3e635;
                    border-radius: 2px;
                    z-index: 1;
                    opacity: 0.7;
                }

            </style>
        </div>
    `;
}
