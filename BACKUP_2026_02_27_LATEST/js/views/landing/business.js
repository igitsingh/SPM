export async function renderBusinessLanding() {
    return `
        <style>
            .spm-business-hero {
                background: linear-gradient(to right, rgba(255, 215, 0, 0.95) 0%, rgba(255, 215, 0, 0.7) 40%, rgba(255, 215, 0, 0) 100%), url('images/business-hero-bg.jpg');
                background-size: cover;
                background-position: center;
                background-attachment: fixed;
                color: #222;
                padding: 100px 0;
                position: relative;
                overflow: hidden;
            }
            .spm-hero-content {
                /* No max-width, no centering */
            }
            .spm-trust-badge-row {
                display: flex;
                gap: 20px;
                margin: 24px 0 32px;
                flex-wrap: wrap;
            }
            .spm-trust-badge {
                display: flex;
                align-items: center;
                font-size: 0.95rem;
                font-weight: 500;
                background: rgba(0,0,0,0.08);
                color: #333;
                padding: 6px 12px;
                border-radius: 6px;
                backdrop-filter: blur(4px);
            }
            .spm-feature-card {
                background: white;
                border: 1px solid rgba(0,0,0,0.05);
                border-radius: 12px;
                padding: 32px 24px;
                text-align: center;
                transition: transform 0.2s, box-shadow 0.2s;
                height: 100%;
            }
            .spm-feature-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 12px 24px rgba(0,0,0,0.08);
            }
            .spm-feature-icon-circle {
                width: 70px;
                height: 70px;
                background: #F0F4FA;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
                color: #1565C0;
                font-size: 2rem;
            }
            .spm-product-range-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                gap: 20px;
                margin-top: 40px;
            }
            .spm-product-cat {
                background: white;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                border: 1px solid #eee;
            }
            .spm-mid-cta {
                background: linear-gradient(135deg, #FFD700 0%, #FFB300 100%);
                color: #222;
                padding: 80px 0;
                text-align: center;
                position: relative;
            }
            .spm-mid-cta::before {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIiBvcGFjaXR5PSIwLjA1Ij48cGF0aCBkPSJNMjAgMjBMMCAwSDQwTDYwIDQwSDIwTDQwIDYwVjIwSDIwek0yMCAyMEwwIDQwSDQwTDAgNjBWMjBIMjB6IiBmaWxsPSIjMDAwIi8+PC9zdmc+');
                opacity: 0.05;
            }

            .spm-hero-cta-group {
                display: flex;
                gap: 16px;
                flex-wrap: wrap;
                align-items: center;
                margin-top: 30px;
            }
            @media(max-width: 900px) {
                .spm-hero-content { grid-template-columns: 1fr; text-align: center; }
                .spm-trust-badge-row { justify-content: center; }
                .spm-hero-cta-group { justify-content: center; }
                .spm-hero-illustration { margin-top: 40px; }
            }
        </style>

        <div class="landing-page fade-in">
            
            <!-- 1. HERO SECTION -->
            <div class="spm-business-hero">
                <div class="container spm-hero-content">
                    <div>
                         <h1 style="font-size: 4rem; font-weight: 800; line-height: 1.1; margin-bottom: 12px; font-family: 'Playfair Display', serif;">
                            Start Your Own Profitable<br>School Book Business
                        </h1>
                        <h2 style="font-size: 2.2rem; font-weight: 500; margin-bottom: 28px; opacity: 0.9;">
                            अपना स्कूल बुक बिज़नेस शुरू करें
                        </h2>
                        
                        <div class="spm-trust-badge-row">
                            <div class="spm-trust-badge"><span style="margin-right:8px;">✔</span> 40+ Years Legacy</div>
                            <div class="spm-trust-badge"><span style="margin-right:8px;">✔</span> Trusted by 1,000+ Schools</div>
                            <div class="spm-trust-badge"><span style="margin-right:8px;">✔</span> NEP 2020 Compliant</div>
                        </div>

                        <div class="spm-hero-cta-group">
                            <a href="#/register" class="btn" style="background: white; color: #1565C0; padding: 16px 36px; font-weight: 700; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); transition: transform 0.2s;">
                                Become a Distributor
                            </a>
                            <a href="#" onclick="alert('Business Brochure downloading...')" style="color: #333; font-weight: 600; text-decoration: underline; opacity: 0.8;">
                                Download Brochure (PDF)
                            </a>
                        </div>
                    </div>
                </div>
            </div>



            <!-- 2. WHY CHOOSE SPM -->
            <div class="section" style="background: #F8F8F8; padding: 80px 20px;">
                <div style="max-width: 1200px; margin: 0 auto;">
                    <div class="text-center mb-12">
                        <h2 style="font-size: 2.2rem; font-weight: 800; color: #2A2A2A; margin-bottom: 8px;">Why Choose SPM?</h2>
                        <p style="color: #666; font-size: 1.1rem;">(SPM ही क्यों?)</p>
                    </div>

                    <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 30px;">
                        
                        <!-- Card 1 -->
                        <div class="spm-feature-card">
                            <div class="spm-feature-icon-circle">💰</div>
                            <h3 style="color: #1565C0; margin-bottom: 4px;">Low Investment</h3>
                            <h4 style="font-size: 0.9rem; color: #8B5A2B; margin-bottom: 12px; font-weight: 400;">(कम निवेश)</h4>
                            <p style="color: #555; font-size: 0.95rem; line-height: 1.5;">Start with a small capital and grow your business systematically.</p>
                        </div>

                        <!-- Card 2 -->
                        <div class="spm-feature-card">
                            <div class="spm-feature-icon-circle">📈</div>
                            <h3 style="color: #1565C0; margin-bottom: 4px;">High Margins</h3>
                            <h4 style="font-size: 0.9rem; color: #8B5A2B; margin-bottom: 12px; font-weight: 400;">(ज़्यादा मुनाफा)</h4>
                            <p style="color: #555; font-size: 0.95rem; line-height: 1.5;">Tiered commission structure ensuring you earn more as you grow.</p>
                        </div>

                         <!-- Card 3 -->
                        <div class="spm-feature-card">
                            <div class="spm-feature-icon-circle">🤝</div>
                            <h3 style="color: #1565C0; margin-bottom: 4px;">Full Support</h3>
                            <h4 style="font-size: 0.9rem; color: #8B5A2B; margin-bottom: 12px; font-weight: 400;">(पूरा सहयोग)</h4>
                            <p style="color: #555; font-size: 0.95rem; line-height: 1.5;">Dedicated relationship manager, marketing materials, and training.</p>
                        </div>

                         <!-- Card 4 -->
                        <div class="spm-feature-card">
                            <div class="spm-feature-icon-circle">🏛️</div>
                            <h3 style="color: #1565C0; margin-bottom: 4px;">NEP Compliant</h3>
                            <h4 style="font-size: 0.9rem; color: #8B5A2B; margin-bottom: 12px; font-weight: 400;">(नए पाठ्यक्रम अनुसार)</h4>
                            <p style="color: #555; font-size: 0.95rem; line-height: 1.5;">Latest syllabus books that schools are actively looking for.</p>
                        </div>

                    </div>
                </div>
            </div>

            <!-- 3. PRODUCTS RANGE -->
            <div class="section container" style="padding: 80px 20px;">
                <div class="text-center">
                    <h2 style="font-size: 2.2rem; font-weight: 800; color: #2A2A2A;">Product Range</h2>
                    <p style="color: #666; max-width: 600px; margin: 10px auto;">From Kindergarten to Class 5, covering all major subjects.</p>
                    
                    <div class="spm-product-range-grid">
                        <div class="spm-product-cat">
                            <div style="font-size: 2rem;">🔤</div>
                            <div style="font-weight: 600; margin-top: 8px;">English</div>
                        </div>
                         <div class="spm-product-cat">
                            <div style="font-size: 2rem;">अ</div>
                            <div style="font-weight: 600; margin-top: 8px;">Hindi</div>
                        </div>
                         <div class="spm-product-cat">
                            <div style="font-size: 2rem;">🔢</div>
                            <div style="font-weight: 600; margin-top: 8px;">Mathematics</div>
                        </div>
                         <div class="spm-product-cat">
                            <div style="font-size: 2rem;">🌍</div>
                            <div style="font-weight: 600; margin-top: 8px;">EVS & Sci</div>
                        </div>
                         <div class="spm-product-cat">
                            <div style="font-size: 2rem;">🎨</div>
                            <div style="font-weight: 600; margin-top: 8px;">Art & Craft</div>
                        </div>
                         <div class="spm-product-cat">
                            <div style="font-size: 2rem;">💻</div>
                            <div style="font-weight: 600; margin-top: 8px;">Computer</div>
                        </div>
                    </div>

                    <div style="margin-top: 40px;">
                        <a href="#/catalogue" class="btn btn-outline" style="border-color: #1565C0; color: #1565C0;">View Full Catalogue →</a>
                    </div>
                </div>
            </div>

            <!-- 4. MID PAGE CTA (Dark) -->
            <div class="spm-mid-cta">
                <div class="container" style="position: relative; z-index: 1;">
                    <h2 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 10px;">Ready to Start Your Journey?</h2>
                    <p style="font-size: 1.2rem; opacity: 0.9; margin-bottom: 30px;">Join India’s fastest-growing school book network today.</p>
                    
                    <a href="#/register" class="btn" style="background: #1565C0; color: white; padding: 18px 48px; font-size: 1.2rem; font-weight: 700; border-radius: 6px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                        Register Interest (रजिस्टर करें)
                    </a>

                    <div style="margin-top: 30px; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <span style="opacity: 0.8; color: #333;">📞 Speak with our Business Team:</span>
                        <strong style="color: #0D47A1;">+91 98765 43210</strong>
                    </div>
                </div>
            </div>

        </div>
    `;
}
