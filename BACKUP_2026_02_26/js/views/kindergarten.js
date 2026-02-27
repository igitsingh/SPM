export function renderKindergartenCategory(category) {
    const categories = {
        'by-level': {
            title: 'Kindergarten By Level',
            subtitle: 'Structured learning paths for every developmental stage.',
            image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
            links: [
                { name: 'Nursery Books', href: '#/catalogue?class=Nursery', desc: 'First steps in letters and numbers.' },
                { name: 'LKG Books', href: '#/catalogue?class=LKG', desc: 'Developing foundational literacy and numeracy.' },
                { name: 'UKG Books', href: '#/catalogue?class=UKG', desc: 'Preparing for the elementary school journey.' }
            ]
        },
        'subjects': {
            title: 'Kindergarten Subjects',
            subtitle: 'Holistic curriculum covering essential early skills.',
            image: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&w=800&q=80',
            links: [
                { name: 'English Activity', href: '#/catalogue?subject=English', desc: 'Phonics, tracing, and basic vocabulary.' },
                { name: 'Maths Activity', href: '#/catalogue?subject=Mathematics', desc: 'Number recognition and basic logic.' },
                { name: 'Hindi Akshar', href: '#/catalogue?subject=Hindi', desc: 'Introduction to Swar and Vyanjan.' },
                { name: 'Picture Books', href: '#/catalogue?subject=EVS', desc: 'Visual storytelling and environmental awareness.' }
            ]
        },
        'kits': {
            title: 'Learning Kits',
            subtitle: 'All-in-one educational resources for home and school.',
            image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
            links: [
                { name: 'Full Learning Kit', href: '#/learning-kits/full', desc: 'Complete sets for a full academic year.' },
                { name: 'Flash Cards', href: '#/learning-kits/flash-cards', desc: 'Interactive visual aids for quick learning.' },
                { name: 'Educational Posters', href: '#/learning-kits/posters', desc: 'Wall-mounted learning for every room.' }
            ]
        },
        'resources': {
            title: 'Kindergarten Resources',
            subtitle: 'Extra support for students and teachers.',
            image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
            links: [
                { name: 'Fun Learning Videos', href: '#/video-library', desc: 'Animated educational content.' },
                { name: 'Practice Sheets', href: '#/download-worksheets', desc: 'Printable activities for daily practice.' },
                { name: 'Teacher\'s Guide', href: '#/teacher-guide', desc: 'Lesson plans and teaching strategies.' }
            ]
        },
        'children-subjects': {
            title: 'Primary Subjects (1-8)',
            subtitle: 'Core curriculum subjects for classes 1 to 8.',
            image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
            links: [
                { name: 'Mathematics', href: '#/catalogue?subject=Mathematics', desc: 'Logical reasoning and numerical skills.' },
                { name: 'Science', href: '#/catalogue?subject=Science', desc: 'Exploring the natural world.' },
                { name: 'English', href: '#/catalogue?subject=English', desc: 'Grammar, literature, and communication.' },
                { name: 'Social Studies', href: '#/catalogue?subject=Social Studies', desc: 'History, geography, and civics.' }
            ]
        },
        'children-classes': {
            title: 'By Class (1-8)',
            subtitle: 'NEP 2020 aligned books for every grade.',
            image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80',
            links: [
                { name: 'Class 1-2', href: '#/catalogue?class=1', desc: 'Foundational stage learning.' },
                { name: 'Class 3-5', href: '#/catalogue?class=3', desc: 'Preparatory stage curriculum.' },
                { name: 'Class 6-8', href: '#/catalogue?class=6', desc: 'Middle stage specialized subjects.' }
            ]
        },
        'children-activity': {
            title: 'Activity & Extras',
            subtitle: 'Beyond the classroom development.',
            image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
            links: [
                { name: 'Story Books', href: '#/catalogue?category=Story', desc: 'Moral stories and literature.' },
                { name: 'Coloring Books', href: '#/catalogue?category=Coloring', desc: 'Creative expression for kids.' },
                { name: 'Skill Books', href: '#/catalogue?category=Activity', desc: 'Logic, coding, and more.' }
            ]
        },
        'children-resources': {
            title: 'Resource Center',
            subtitle: 'Complete learning solutions for primary schools.',
            image: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&w=800&q=80',
            links: [
                { name: 'Video Library', href: '#/video-library', desc: 'Digital content for every chapter.' },
                { name: 'Teacher Support', href: '#/teacher-support', desc: 'Manuals and interactive tools.' },
                { name: 'Full Catalogue', href: '#/catalogue', desc: 'Browse our entire collection.' }
            ]
        },
        'students-videos': {
            title: 'Video Resources',
            subtitle: 'Visual learning for the digital generation.',
            image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
            links: [
                { name: 'Animated Library', href: '#/video-library', desc: 'Fun concepts explained.' },
                { name: 'Expert Lectures', href: '#/video-lecture', desc: 'Deep dives into subjects.' },
                { name: 'Flip Books', href: '#/flip-book', desc: 'Interactive digital books.' }
            ]
        },
        'students-interactive': {
            title: 'Interactive Learning',
            subtitle: 'Engage with education like never before.',
            image: 'https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?auto=format&fit=crop&w=800&q=80',
            links: [
                { name: 'Interactive Exercises', href: '#/interactive-exercises', desc: 'Auto-graded practice sessions.' },
                { name: 'Test Generator', href: '#/test-paper-generator', desc: 'Customized assessments.' },
                { name: 'Lesson Plans', href: '#/worksheets', desc: 'Structured progress tracking.' }
            ]
        },
        'students-academic': {
            title: 'Academic Corner',
            subtitle: 'Essential tools for exam success.',
            image: 'https://images.unsplash.com/photo-1434031211bc6-023b7f12cf3e?auto=format&fit=crop&w=800&q=80',
            links: [
                { name: 'Full Syllabus', href: '#/syllabus', desc: 'Current academic guidelines.' },
                { name: 'Datesheets', href: '#/exam-datesheets', desc: 'Stay ahead of schedules.' },
                { name: 'Time Management', href: '#/time-management', desc: 'Study planning strategies.' },
                { name: 'Mind Mapping', href: '#/mind-mapping', desc: 'Visual memory triggers.' }
            ]
        },
        'students-hub': {
            title: 'Student Hub',
            subtitle: 'Community and rewards for our learners.',
            image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
            links: [
                { name: 'Earn with Study', href: '#/earn-with-study', desc: 'Referral and scholarship programs.' },
                { name: 'Student Leisure', href: '#/student-leisure', desc: 'Games and creative break-time.' },
                { name: 'Educational Blogs', href: '#/blogs', desc: 'Stay updated with learning trends.' }
            ]
        }
    };

    const data = categories[category] || categories['by-level'];

    // Determine the "Mode" of the page
    let mode = 'kindergarten';
    if (category.startsWith('children')) mode = 'primary';
    if (category.startsWith('students')) mode = 'students';

    // Mode-specific configurations
    const configs = {
        'kindergarten': {
            label: 'EARLY CHILDHOOD EDUCATION',
            accent: '#FFD700',
            bg: 'linear-gradient(135deg, #0d3b8e 0%, #1a4da1 100%)',
            heroClass: 'hero-kinder',
            icon: '🎨'
        },
        'primary': {
            label: 'PRIMARY & MIDDLE SCHOOL (1-8)',
            accent: '#00D4FF',
            bg: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            heroClass: 'hero-primary',
            icon: '📚'
        },
        'students': {
            label: '21st CENTURY STUDENT HUB',
            accent: '#C084FC',
            bg: 'linear-gradient(135deg, #2b125a 0%, #4c1d95 100%)',
            heroClass: 'hero-students',
            icon: '🚀'
        }
    };

    const config = configs[mode];

    return `
        <div class="spm-category-page mode-${mode}">
            <!-- PREMIUM HERO -->
            <header class="category-hero" style="background: ${config.bg};">
                <div class="hero-overlay" style="background-image: url('${data.image}')"></div>
                <div class="container relative z-10">
                    <div class="hero-content-flex">
                        <div class="hero-text-side">
                            <div class="category-badge-wrap">
                                <span class="category-badge" style="background: ${config.accent}; color: #0d3b8e">
                                    ${config.icon} ${config.label}
                                </span>
                            </div>
                            <h1 class="hero-main-title">${data.title}</h1>
                            <p class="hero-desc">${data.subtitle}</p>
                            <div class="hero-stats">
                                <div class="stat-pill"><span>100%</span> NEP Aligned</div>
                                <div class="stat-pill"><span>50k+</span> Students</div>
                                <div class="stat-pill"><span>2025</span> Edition</div>
                            </div>
                        </div>
                        <div class="hero-visual-side">
                            <div class="floating-card-wrap">
                                <img src="${data.image}" class="hero-main-img" alt="Hero">
                                <div class="glass-float-box">
                                    <strong>Premium Content</strong>
                                    <span>Interactive & Digital Ready</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hero-wave">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
                    </svg>
                </div>
            </header>

            <!-- CORE INFORMATION SECTION -->
            <section class="section info-blocks">
                <div class="container">
                    <div class="info-grid">
                        <div class="info-card-premium">
                            <div class="ipc-icon">🎯</div>
                            <h3>Academic Goals</h3>
                            <p>Focused on competency-based learning and cognitive development as per NCF guidelines.</p>
                        </div>
                        <div class="info-card-premium">
                            <div class="ipc-icon">💡</div>
                            <h3>Modern Pedagogy</h3>
                            <p>Integrating 21st-century skills like critical thinking, collaboration, and digital literacy.</p>
                        </div>
                        <div class="info-card-premium">
                            <div class="ipc-icon">🛠️</div>
                            <h3>Teacher Support</h3>
                            <p>Comprehensive manuals, lesson plans, and digital resources for effortless teaching.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- SECTION BROWSER -->
            <section class="category-browse section" style="background: #f8fafc;">
                <div class="container">
                    <div class="section-header-centered">
                        <h2 class="section-title-premium">Explore Individual Modules</h2>
                        <div class="title-underline" style="background: ${config.accent}"></div>
                        <p class="section-sub">Detailed resources for every ${mode === 'primary' ? 'class' : 'domain'}</p>
                    </div>

                    <div class="module-grid">
                        ${data.links.map((link, idx) => `
                            <div class="module-card-wrap">
                                <a href="${link.href}" class="module-card no-underline">
                                    <div class="mc-top">
                                        <span class="mc-tag">MODULE ${idx + 1}</span>
                                        <div class="mc-icon-h">➜</div>
                                    </div>
                                    <h3>${link.name}</h3>
                                    <p>${link.desc}</p>
                                    <div class="mc-footer">
                                        <span class="mc-link-text">ACCESS MODULE</span>
                                        <div class="mc-progress"><span></span></div>
                                    </div>
                                </a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>

            <!-- CALL TO ACTION -->
            <section class="section category-cta-wrap">
                <div class="container">
                    <div class="cta-banner" style="background: ${config.bg}">
                        <div class="cta-content" style="text-align: left;">
                            <h2>Ready to start the journey?</h2>
                            <p>Browse our exhaustive catalogue or request a demo for your school today.</p>
                        </div>
                        <div class="cta-actions">
                            <a href="#/catalogue" class="cta-btn-main">BOOK CATALOGUE</a>
                            <a href="#/contact" class="cta-btn-alt">CONTACT US</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <style>
            .category-hero { position: relative; min-height: 650px; display: flex; align-items: center; overflow: hidden; color: white; padding: 100px 0 150px; }
            .hero-overlay { position: absolute; top:0; left:0; width:100%; height:100%; background-size: cover; background-position: center; opacity: 0.15; filter: grayscale(1); mix-blend-mode: overlay; pointer-events: none; }
            .hero-content-flex { display: flex; align-items: center; gap: 60px; position: relative; z-index: 10; width: 100%; }
            .hero-text-side { flex: 1.3; text-align: left; }
            .hero-visual-side { flex: 0.7; position: relative; }
            
            .category-badge-wrap { margin-bottom: 30px; }
            .category-badge { display: inline-flex; align-items: center; gap: 10px; padding: 10px 24px; border-radius: 50px; font-weight: 800; font-size: 0.85rem; letter-spacing: 1.5px; text-transform: uppercase; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
            .hero-main-title { font-size: 4.8rem; font-weight: 900; line-height: 1; margin-bottom: 25px; letter-spacing: -2px; }
            .hero-desc { font-size: 1.35rem; opacity: 0.9; line-height: 1.6; margin-bottom: 45px; max-width: 650px; }
            
            .hero-stats { display: flex; gap: 20px; }
            .stat-pill { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); padding: 10px 22px; border-radius: 14px; font-size: 0.9rem; backdrop-filter: blur(10px); }
            .stat-pill span { font-weight: 900; color: #FFD700; margin-right: 6px; }

            .hero-main-img { width: 100%; border-radius: 40px; transform: rotate(2deg); box-shadow: 0 40px 80px rgba(0,0,0,0.4); border: 10px solid rgba(255,255,255,0.05); }
            .glass-float-box { position: absolute; bottom: -20px; left: -20px; background: rgba(255,255,255,0.95); padding: 25px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.15); color: #0d3b8e; min-width: 240px; }
            .glass-float-box strong { display: block; font-size: 1.1rem; margin-bottom: 4px; }
            .glass-float-box span { font-size: 0.85rem; color: #64748b; font-weight: 500; }

            .hero-wave { position: absolute; bottom: -1px; left: 0; width: 100%; line-height: 0; transform: rotate(180deg); }
            .hero-wave svg { width: 100%; height: 100px; }
            .hero-wave .shape-fill { fill: #FFFFFF; }

            .info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-top: -80px; position: relative; z-index: 20; }
            .info-card-premium { background: white; padding: 45px; border-radius: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.03); transition: all 0.4s ease; text-align: left; }
            .info-card-premium:hover { transform: translateY(-12px); box-shadow: 0 40px 80px rgba(0,0,0,0.12); }
            .ipc-icon { font-size: 3rem; margin-bottom: 30px; }
            .info-card-premium h3 { font-size: 1.5rem; font-weight: 800; color: #0f172a; margin-bottom: 18px; }
            .info-card-premium p { color: #64748b; line-height: 1.7; font-size: 1rem; }

            .section-header-centered { text-align: center; margin-bottom: 70px; }
            .section-title-premium { font-size: 3rem; font-weight: 900; color: #0f172a; margin-bottom: 20px; }
            .title-underline { width: 100px; height: 6px; margin: 0 auto 25px; border-radius: 10px; }

            .module-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 35px; }
            .module-card { background: white; padding: 45px; border-radius: 30px; border: 1px solid #f1f5f9; display: block; transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); box-shadow: 0 4px 6px rgba(0,0,0,0.02); text-align: left; }
            .module-card:hover { transform: translateY(-10px); border-color: #0d3b8e; box-shadow: 0 30px 60px rgba(13,59,142,0.1); }
            .mc-top { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .mc-tag { font-size: 0.75rem; font-weight: 900; color: #64748b; background: #f8fafc; padding: 6px 14px; border-radius: 8px; letter-spacing: 1px; }
            .mc-icon-h { color: #0d3b8e; font-size: 1.2rem; transition: all 0.3s; }
            .module-card:hover .mc-icon-h { transform: translateX(8px); }
            .module-card h3 { font-size: 1.8rem; font-weight: 800; color: #0f172a; margin-bottom: 15px; }
            .module-card p { color: #64748b; font-size: 1.1rem; line-height: 1.6; margin-bottom: 40px; }
            .mc-progress { width: 100%; height: 4px; background: #f1f5f9; border-radius: 10px; overflow: hidden; margin-top: 15px; }
            .mc-progress span { display: block; width: 0; height: 100%; background: #0d3b8e; transition: width 0.8s ease; }
            .module-card:hover .mc-progress span { width: 100%; }

            .cta-banner { padding: 100px; border-radius: 50px; display: flex; justify-content: space-between; align-items: center; color: white; margin-top: 60px; box-shadow: 0 40px 90px rgba(0,0,0,0.25); }
            .cta-content h2 { font-size: 3.5rem; font-weight: 900; margin-bottom: 20px; line-height: 1.1; }
            .cta-btn-main { background: #FFD700; color: #0d3b8e; padding: 22px 50px; border-radius: 18px; font-weight: 900; font-size: 1.1rem; text-decoration: none; transition: all 0.3s; box-shadow: 0 15px 30px rgba(0,0,0,0.15); }
            .cta-btn-alt { background: rgba(255,255,255,0.1); border: 2px solid white; color: white; padding: 20px 50px; border-radius: 18px; font-weight: 800; font-size: 1.1rem; text-decoration: none; transition: all 0.3s; margin-left: 15px; }
            .cta-btn-main:hover { background: #fff; transform: translateY(-5px); }
            .cta-btn-alt:hover { background: #white; color: #0d3b8e; transform: translateY(-5px); }
        </style>
`;
}
