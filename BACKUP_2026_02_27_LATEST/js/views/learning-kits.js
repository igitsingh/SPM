export function renderLearningKit(type) {
    const dataMap = {
        'full': {
            title: 'SPM Complete Learning Kit',
            badge: 'ALL-IN-ONE BUNDLE',
            color: '#ef4444',
            bgImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1920&q=80',
            desc: 'A comprehensive, single-box solution containing everything your child needs for the entire academic year. Expertly curated for optimal cognitive and academic development.',
            features: [
                { icon: '📚', title: 'Complete Book Set', text: 'All essential textbooks and workbooks for the grade.' },
                { icon: '🖍️', title: 'Stationery Pack', text: 'Premium crayons, pencils, and crafting materials included.' },
                { icon: '🧩', title: 'Activity Games', text: 'Hands-on learning puzzles and board activities.' },
                { icon: '📱', title: 'Digital Access', text: 'QR codes for interactive video lessons and apps.' }
            ],
            ctaText: 'Buy the Full Kit'
        },
        'flash-cards': {
            title: 'Interactive Flash Cards',
            badge: 'VISUAL LEARNING',
            color: '#8b5cf6',
            bgImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1920&q=80',
            desc: 'Jumpstart early learning with our high-contrast, durable flash cards. Perfect for developing fast recall, vocabulary, and visual memory.',
            features: [
                { icon: '🅰️', title: 'Alphabets & Phonics', text: 'Learn letters and their sounds efficiently.' },
                { icon: '🔢', title: 'Numbers & Counting', text: 'Visual representations of basic math concepts.' },
                { icon: '🦁', title: 'Animals & Nature', text: 'Vibrant real-world photography and illustrations.' },
                { icon: '🛡️', title: 'Kid-Safe Quality', text: 'Thick, wipe-clean cards with rounded corners.' }
            ],
            ctaText: 'Explore Flash Cards'
        },
        'posters': {
            title: 'Educational Posters',
            badge: 'ROOM TO GROW',
            color: '#0ea5e9',
            bgImage: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1920&q=80',
            desc: 'Transform empty walls into powerful learning environments. Our large-format, glossy educational charts are perfect for classrooms or children\'s bedrooms.',
            features: [
                { icon: '🗺️', title: 'Maps & Geography', text: 'Detailed world and country maps for early explorers.' },
                { icon: '🧠', title: 'Anatomy Posters', text: 'Learn the human body with kid-friendly diagrams.' },
                { icon: '🌌', title: 'Solar System', text: 'Beautiful space charts to inspire astronauts.' },
                { icon: '📏', title: 'Large Format', text: 'A1 and A2 sizes printed on premium 300GSM cardstock.' }
            ],
            ctaText: 'View All Posters'
        }
    };

    const data = dataMap[type] || dataMap['full'];

    return `
        <style>
            .kit-page {
                background-color: #f8fafc;
                min-height: 100vh;
                font-family: 'Inter', sans-serif;
            }
            .kit-hero {
                position: relative;
                padding: 120px 0 80px;
                background: #1e293b;
                color: white;
                text-align: center;
                overflow: hidden;
            }
            .kit-hero-bg {
                position: absolute; inset: 0;
                background-image: url('${data.bgImage}');
                background-size: cover; background-position: center;
                opacity: 0.25; filter: blur(3px); z-index: 1;
            }
            .kit-hero-content {
                position: relative; z-index: 10;
                max-width: 800px; margin: 0 auto;
                padding: 0 20px;
            }
            .kit-badge {
                display: inline-block; padding: 6px 16px; border-radius: 30px;
                background: ${data.color}; color: white;
                font-weight: 800; letter-spacing: 2px; text-transform: uppercase;
                font-size: 0.8rem; margin-bottom: 24px;
                box-shadow: 0 4px 15px ${data.color}66;
            }
            .kit-title {
                font-family: 'Playfair Display', serif;
                font-size: 4.5rem; font-weight: 900; line-height: 1.1; margin-bottom: 24px;
                text-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }
            .kit-desc {
                font-size: 1.25rem; opacity: 0.9; line-height: 1.6;
                margin-bottom: 40px; font-weight: 400;
            }
            .kit-features-grid {
                display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 30px; padding: 60px 20px;
                max-width: 1200px; margin: -60px auto 0;
                position: relative; z-index: 20;
            }
            .kit-feature-card {
                background: white; border-radius: 20px; padding: 40px 30px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.08); text-align: left;
                transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                border-top: 6px solid ${data.color};
            }
            .kit-feature-card:hover {
                transform: translateY(-10px);
            }
            .kit-feature-icon {
                font-size: 3rem; margin-bottom: 20px;
                width: 70px; height: 70px; background: #f1f5f9;
                display: flex; align-items: center; justify-content: center;
                border-radius: 16px;
            }
            .kit-feature-title {
                font-size: 1.4rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;
            }
            .kit-feature-text {
                font-size: 1rem; color: #64748b; line-height: 1.6;
            }
            .kit-cta-section {
                text-align: center; padding: 60px 20px 100px;
            }
            .btn-kit-primary {
                background: ${data.color}; color: white; padding: 18px 48px; border-radius: 50px;
                font-size: 1.2rem; font-weight: 800; text-decoration: none; display: inline-block;
                box-shadow: 0 10px 30px ${data.color}66; transition: all 0.3s;
            }
            .btn-kit-primary:hover {
                transform: scale(1.05); box-shadow: 0 15px 40px ${data.color}88;
            }
        </style>
        <div class="kit-page">
            <header class="kit-hero">
                <div class="kit-hero-bg"></div>
                <div class="kit-hero-content">
                    <div class="kit-badge">${data.badge}</div>
                    <h1 class="kit-title">${data.title}</h1>
                    <p class="kit-desc">${data.desc}</p>
                </div>
            </header>
            
            <div class="kit-features-grid">
                ${data.features.map(f => `
                    <div class="kit-feature-card">
                        <div class="kit-feature-icon">${f.icon}</div>
                        <h3 class="kit-feature-title">${f.title}</h3>
                        <p class="kit-feature-text">${f.text}</p>
                    </div>
                `).join('')}
            </div>

            <section class="kit-cta-section">
                <h2 style="font-size: 2.5rem; font-weight: 900; color: #0f172a; margin-bottom: 30px; font-family:'Playfair Display',serif">Equip Your Child for Success</h2>
                <a href="${type === 'flash-cards' ? '#/flash-cards-explorer' : '#/catalogue'}" class="btn-kit-primary">${data.ctaText}</a>
            </section>
        </div>
    `;
}
