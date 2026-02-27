// ── Shared Utilities ──────────────────────────────────────────────────────────
const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;900&display=swap');`;

function heroSection({ color, icon, badge, title, subtitle, video = null, bg = null }) {
    const bgStyle = video
        ? `position:relative; overflow:hidden;`
        : `background: linear-gradient(135deg, ${bg || color + '22'} 0%, ${color}44 100%); position:relative;`;
    return `
    <div class="sc-hero" style="${bgStyle}">
        ${video ? `<video class="sc-hero-vid" autoplay muted loop playsinline><source src="${video}" type="video/mp4"></video><div class="sc-hero-vid-overlay" style="background: linear-gradient(135deg,${color}cc 0%,rgba(10,10,30,0.7) 100%)"></div>` : ''}
        <div class="sc-hero-content">
            <div class="sc-hero-badge" style="background:${video ? 'rgba(255,255,255,0.15)' : color + '22'}; color:${video ? 'white' : color}; border:1.5px solid ${video ? 'rgba(255,255,255,0.3)' : color + '55'}">${badge}</div>
            <h1 class="sc-hero-title" style="color:${video ? 'white' : '#111827'}">${title}</h1>
            <p class="sc-hero-sub" style="color:${video ? 'rgba(255,255,255,0.82)' : '#6b7280'}">${subtitle}</p>
        </div>
    </div>`;
}

const SHARED_CSS = `<style>
${FONT_IMPORT}
* { box-sizing: border-box; }
.sc-page { font-family: 'Inter', sans-serif; min-height: 100vh; background: #f8f9fc; }
.sc-hero { min-height: 280px; display: flex; align-items: center; }
.sc-hero-vid { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:0; }
.sc-hero-vid-overlay { position:absolute; inset:0; z-index:1; }
.sc-hero-content { position:relative; z-index:2; max-width:1280px; margin:0 auto; padding:60px 40px; }
.sc-hero-badge { display:inline-flex; align-items:center; gap:8px; padding:6px 16px; border-radius:100px; font-size:0.78rem; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; margin-bottom:16px; }
.sc-hero-title { font-family:'Playfair Display',serif; font-size:3rem; font-weight:900; margin:0 0 12px; line-height:1.1; }
.sc-hero-sub { font-size:1.1rem; margin:0; max-width:600px; }
.sc-body { max-width:1280px; margin:0 auto; padding:48px 40px 80px; }
.sc-grid { display:grid; gap:24px; }
.sc-card { background:white; border-radius:16px; padding:28px; box-shadow:0 2px 12px rgba(0,0,0,0.06); transition:transform 0.2s,box-shadow 0.2s; }
.sc-card:hover { transform:translateY(-3px); box-shadow:0 8px 28px rgba(0,0,0,0.1); }
.sc-card-icon { width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.4rem; margin-bottom:16px; }
.sc-card-title { font-size:1.1rem; font-weight:800; color:#111827; margin:0 0 8px; }
.sc-card-desc { font-size:0.9rem; color:#6b7280; line-height:1.6; margin:0; }
.sc-badge { display:inline-flex; padding:4px 12px; border-radius:100px; font-size:0.72rem; font-weight:700; margin-top:12px; }
.sc-section-title { font-size:1.5rem; font-weight:800; color:#111827; margin:0 0 20px; }
.sc-divider { border:none; border-top:2px solid #f3f4f6; margin:40px 0; }
.sc-coming-soon { text-align:center; padding:80px 40px; }
.sc-coming-soon-icon { font-size:4rem; margin-bottom:16px; }
.sc-coming-soon h2 { font-size:1.8rem; font-weight:800; color:#111827; margin:0 0 12px; }
.sc-coming-soon p { color:#6b7280; font-size:1rem; }
.sc-tag { display:inline-flex; align-items:center; gap:6px; background:#f3f4f6; padding:6px 14px; border-radius:8px; font-size:0.82rem; font-weight:600; color:#374151; cursor:pointer; transition:background 0.15s; }
.sc-tag:hover { background:#e5e7eb; }
.sc-cta-btn { display:inline-flex; align-items:center; gap:8px; padding:12px 28px; border-radius:10px; font-size:0.9rem; font-weight:700; text-decoration:none; transition:all 0.2s; border:none; cursor:pointer; }
</style>`;

// ── 1. SYLLABUS ───────────────────────────────────────────────────────────────
export function renderSyllabus() {
    const subjects = [
        { name: 'Mathematics', classes: '1–8', color: '#3b82f6', icon: '📐' },
        { name: 'English', classes: '1–8', color: '#10b981', icon: '📖' },
        { name: 'Hindi', classes: '1–8', color: '#f59e0b', icon: '🔤' },
        { name: 'Science', classes: '3–8', color: '#8b5cf6', icon: '🔬' },
        { name: 'EVS', classes: '1–5', color: '#ec4899', icon: '🌿' },
        { name: 'Social Studies', classes: '3–8', color: '#06b6d4', icon: '🌍' },
        { name: 'Computer', classes: '1–8', color: '#f97316', icon: '💻' },
        { name: 'Sanskrit', classes: '4–8', color: '#84cc16', icon: '📜' },
        { name: 'General Knowledge', classes: '1–8', color: '#ef4444', icon: '🧠' },
    ];
    const classes = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8'];
    return `
        ${SHARED_CSS}
        <div class="sc-page">
            ${heroSection({ color: '#3b82f6', badge: '📚 Academic Resources', title: 'Syllabus Hub', subtitle: 'Download and explore NEP 2020-aligned syllabi for all subjects and classes, curated by SPM.' })}
            <div class="sc-body">
                <p class="sc-section-title">Browse by Subject</p>
                <div class="sc-grid" style="grid-template-columns: repeat(auto-fill,minmax(220px,1fr))">
                    ${subjects.map(s => `
                    <div class="sc-card" style="border-top:4px solid ${s.color}">
                        <div class="sc-card-icon" style="background:${s.color}15; color:${s.color}">${s.icon}</div>
                        <p class="sc-card-title">${s.name}</p>
                        <p class="sc-card-desc">Class ${s.classes} · NEP 2020 Aligned</p>
                        <a href="#/catalogue?subject=${s.name}" class="sc-cta-btn" style="background:${s.color}15; color:${s.color}; margin-top:14px; font-size:0.8rem; padding:8px 16px; border-radius:8px;">View Books →</a>
                    </div>`).join('')}
                </div>
                <hr class="sc-divider">
                <p class="sc-section-title">Browse by Class</p>
                <div style="display:flex; gap:10px; flex-wrap:wrap">
                    ${classes.map(c => `<a href="#/catalogue?class=${c}" class="sc-tag">Class ${c}</a>`).join('')}
                </div>
                <div style="margin-top:40px; background:linear-gradient(135deg,#eff6ff,#dbeafe); border-radius:16px; padding:32px; display:flex; align-items:center; gap:24px;">
                    <div style="font-size:2.5rem">📥</div>
                    <div>
                        <p style="font-weight:800; font-size:1.1rem; color:#1e40af; margin:0 0 8px">Full Syllabus Downloads Coming Soon</p>
                        <p style="color:#3b82f6; margin:0; font-size:0.9rem">PDF downloads for each class and subject will be available here. Stay tuned!</p>
                    </div>
                </div>
            </div>
        </div>`;
}

// ── 2. EXAM DATESHEETS ────────────────────────────────────────────────────────
export function renderExamDatesheets() {
    const exams = [
        { board: 'CBSE', session: '2025–26', status: 'announced', color: '#3b82f6', exams: ['Pre-Board (Jan)', 'Board Exams (Feb–Mar)', 'Compartment (July)'] },
        { board: 'ICSE / ISC', session: '2025–26', status: 'announced', color: '#7c3aed', exams: ['Pre-Board (Dec)', 'Board Exams (Feb–Apr)', 'Compartment (Aug)'] },
        { board: 'UP Board', session: '2025–26', status: 'upcoming', color: '#f59e0b', exams: ['Half Yearly (Oct)', 'Annual Exam (Feb–Mar)', 'Back Exam (June)'] },
        { board: 'State Board', session: '2025–26', status: 'upcoming', color: '#10b981', exams: ['Quarterly Exam (Sep)', 'Annual (Mar–Apr)', 'Supplementary (June)'] },
    ];
    return `
        ${SHARED_CSS}
        <div class="sc-page">
            ${heroSection({ color: '#f59e0b', badge: '📅 Academic Calendar', title: 'Exam Datesheets', subtitle: 'Stay on top of every exam schedule — CBSE, ICSE, UP Board, and State Board all in one place.' })}
            <div class="sc-body">
                <p class="sc-section-title">Board Exam Calendars 2025–26</p>
                <div class="sc-grid" style="grid-template-columns: repeat(auto-fill,minmax(300px,1fr))">
                    ${exams.map(e => `
                    <div class="sc-card" style="border-left:5px solid ${e.color}">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px">
                            <div>
                                <p class="sc-card-title" style="font-size:1.25rem">${e.board}</p>
                                <p style="color:#9ca3af; font-size:0.82rem; margin:0">Session ${e.session}</p>
                            </div>
                            <span class="sc-badge" style="background:${e.status === 'announced' ? '#d1fae5' : '#fef3c7'}; color:${e.status === 'announced' ? '#059669' : '#d97706'}">
                                ${e.status === 'announced' ? '✓ Announced' : '⏳ Upcoming'}
                            </span>
                        </div>
                        <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px">
                            ${e.exams.map(ex => `<li style="display:flex; align-items:center; gap:10px; font-size:0.88rem; color:#374151; background:#f9fafb; padding:8px 12px; border-radius:8px;"><span style="color:${e.color}; font-weight:700">→</span> ${ex}</li>`).join('')}
                        </ul>
                        <a href="#/" class="sc-cta-btn" style="background:${e.color}15; color:${e.color}; margin-top:16px; padding:8px 16px; border-radius:8px; font-size:0.8rem">Download PDF →</a>
                    </div>`).join('')}
                </div>
                <div style="margin-top:40px; background:#fff7ed; border:1.5px solid #fdba74; border-radius:14px; padding:24px; display:flex; gap:16px; align-items:flex-start;">
                    <span style="font-size:1.5rem">⚠️</span>
                    <div>
                        <p style="font-weight:700; color:#c2410c; margin:0 0 4px">Always Check Official Websites</p>
                        <p style="color:#ea580c; font-size:0.88rem; margin:0">Dates are subject to change. Please verify with official board websites (cbse.gov.in, cisce.org, upmsp.edu.in) for the latest updates.</p>
                    </div>
                </div>
            </div>
        </div>`;
}

// ── 3. TIME MANAGEMENT ────────────────────────────────────────────────────────
export function renderTimeManagement() {
    const tips = [
        { icon: '⏰', title: 'The Pomodoro Technique', desc: 'Study for 25 minutes, take a 5-minute break. After 4 cycles, take a 20–30 minute break. This keeps your brain fresh and focused.', color: '#ef4444' },
        { icon: '📋', title: 'Make a Weekly Timetable', desc: 'Plan your subjects across the week. Give more time to harder subjects and schedule lighter topics before bedtime.', color: '#3b82f6' },
        { icon: '🎯', title: 'Set SMART Goals', desc: 'Specific, Measurable, Achievable, Relevant, Time-bound. \"Finish Chapter 3 of Math by 5 PM today\" beats \"study math\".', color: '#10b981' },
        { icon: '📵', title: 'Eliminate Distractions', desc: 'Put your phone on Do Not Disturb. Use apps like Forest or Focus Mode to stay on task during study sessions.', color: '#8b5cf6' },
        { icon: '🌅', title: 'Study in the Morning', desc: 'Your brain is freshest in the morning. Schedule your hardest subjects before noon whenever possible.', color: '#f59e0b' },
        { icon: '🔁', title: 'Review Daily', desc: 'Spend 10 minutes each evening reviewing what you studied that day. This cements knowledge in long-term memory.', color: '#06b6d4' },
    ];
    return `
        ${SHARED_CSS}
        <div class="sc-page">
            ${heroSection({ color: '#10b981', badge: '⏱️ Productivity Skills', title: 'Time Management', subtitle: 'Master your schedule, maximize your study hours, and reduce exam stress with proven techniques.' })}
            <div class="sc-body">
                <p class="sc-section-title">Proven Study Strategies</p>
                <div class="sc-grid" style="grid-template-columns: repeat(auto-fill,minmax(300px,1fr))">
                    ${tips.map(t => `
                    <div class="sc-card">
                        <div class="sc-card-icon" style="background:${t.color}15; color:${t.color}; font-size:1.5rem">${t.icon}</div>
                        <p class="sc-card-title">${t.title}</p>
                        <p class="sc-card-desc">${t.desc}</p>
                    </div>`).join('')}
                </div>
                <hr class="sc-divider">
                <p class="sc-section-title">Sample Study Timetable (Class 6–8)</p>
                <div style="overflow-x:auto">
                    <table style="width:100%; border-collapse:collapse; background:white; border-radius:12px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.06)">
                        <thead>
                            <tr style="background:#111827; color:white">
                                <th style="padding:14px 20px; text-align:left; font-size:0.82rem; font-weight:700; letter-spacing:0.5px">TIME</th>
                                <th style="padding:14px 20px; text-align:left; font-size:0.82rem; font-weight:700">MON</th>
                                <th style="padding:14px 20px; text-align:left; font-size:0.82rem; font-weight:700">TUE</th>
                                <th style="padding:14px 20px; text-align:left; font-size:0.82rem; font-weight:700">WED</th>
                                <th style="padding:14px 20px; text-align:left; font-size:0.82rem; font-weight:700">THU</th>
                                <th style="padding:14px 20px; text-align:left; font-size:0.82rem; font-weight:700">FRI</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${[
            ['6–7 AM', 'Morning Walk', 'Morning Walk', 'Morning Walk', 'Morning Walk', 'Morning Walk'],
            ['7–9 AM', 'Math', 'Science', 'English', 'Hindi', 'Math'],
            ['9–10 AM', 'School', 'School', 'School', 'School', 'School'],
            ['4–5 PM', 'English', 'Math', 'Hindi', 'Science', 'Revision'],
            ['5–6 PM', 'Homework', 'Homework', 'Homework', 'Homework', 'Free Time'],
            ['7–8 PM', 'Hindi', 'Computer', 'Science', 'S.Studies', 'Mind Map'],
        ].map((row, i) => `<tr style="background:${i % 2 === 0 ? 'white' : '#fafafa'}; border-bottom:1px solid #f3f4f6">
                                <td style="padding:12px 20px; font-weight:700; font-size:0.85rem; color:#374151">${row[0]}</td>
                                ${row.slice(1).map(c => `<td style="padding:12px 20px; font-size:0.84rem; color:#6b7280">${c}</td>`).join('')}
                            </tr>`).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`;
}

// ── 4. MIND MAPPING ───────────────────────────────────────────────────────────
export function renderMindMapping() {
    const concepts = [
        { title: 'What is a Mind Map?', icon: '🗺️', color: '#7c3aed', desc: 'A visual diagram that connects related ideas around a central topic — like a tree with branches. Invented by Tony Buzan, it mirrors how your brain actually thinks.' },
        { title: 'How to Make One', icon: '✏️', color: '#3b82f6', desc: '1) Write your main topic in the centre. 2) Draw branches for key sub-topics. 3) Add smaller branches with details. 4) Use colours, symbols, and images.' },
        { title: 'Benefits for Students', icon: '🚀', color: '#10b981', desc: 'Mind maps boost memory retention by up to 10×, help in revision, make complex topics simple, and are great for essay planning and project work.' },
        { title: 'Best Tools to Use', icon: '🛠️', color: '#f59e0b', desc: 'Free tools: MindMeister, Canva, XMind (free tier), Coggle.it. Or simply use a blank A3 sheet with colour pens — sometimes the simplest way is the best.' },
        { title: 'For Exam Revision', icon: '📝', color: '#ef4444', desc: 'Create one mind map per chapter. Condense the whole chapter onto one page. Review these maps 1 day, 1 week, and 1 month after studying for maximum retention.' },
        { title: 'Pro Tips', icon: '💡', color: '#06b6d4', desc: 'Use one key word per branch (not sentences), use at least 3 colours, add tiny drawings where possible, and practice making them by hand first.' },
    ];
    return `
        ${SHARED_CSS}
        <div class="sc-page">
            ${heroSection({ color: '#7c3aed', badge: '🧠 Visual Learning', title: 'Mind Mapping', subtitle: 'Transform complex topics into clear visual diagrams. Study smarter, remember longer, score higher.' })}
            <div class="sc-body">
                <p class="sc-section-title">Everything You Need to Know</p>
                <div class="sc-grid" style="grid-template-columns: repeat(auto-fill,minmax(300px,1fr))">
                    ${concepts.map(c => `
                    <div class="sc-card" style="border-top:4px solid ${c.color}">
                        <div class="sc-card-icon" style="background:${c.color}15; font-size:1.5rem">${c.icon}</div>
                        <p class="sc-card-title">${c.title}</p>
                        <p class="sc-card-desc">${c.desc}</p>
                    </div>`).join('')}
                </div>
                <hr class="sc-divider">
                <div style="background:linear-gradient(135deg,#f5f3ff,#ede9fe); border-radius:16px; padding:40px; text-align:center">
                    <div style="font-size:3rem; margin-bottom:16px">🗺️</div>
                    <h2 style="font-family:'Playfair Display',serif; font-size:1.8rem; font-weight:900; color:#4c1d95; margin:0 0 12px">Interactive Mind Maps Coming Soon</h2>
                    <p style="color:#7c3aed; max-width:500px; margin:0 auto; font-size:0.95rem">We're building an in-browser mind map creator specifically designed for SPM book chapters. Stay tuned!</p>
                </div>
            </div>
        </div>`;
}

// ── 5. EARN WITH STUDY ────────────────────────────────────────────────────────
export function renderEarnWithStudy() {
    const programs = [
        { icon: '📣', title: 'Refer a Friend', color: '#10b981', reward: 'Earn ₹100–₹500 per referral', desc: 'Refer your classmates or teachers to SPM books. When they purchase, you earn reward points redeemable against your next order.' },
        { icon: '⭐', title: 'Write a Review', color: '#f59e0b', reward: 'Earn \u20b950 per review', desc: 'Write a genuine review for any SPM book you have used. Quality reviews that help other students earn bonus credits instantly.' },
        { icon: '🏆', title: 'Quiz Champion', color: '#3b82f6', reward: 'Win scholarships & vouchers', desc: 'Participate in our monthly subject quizzes. Top scorers win book vouchers, scholarships, and get featured on our honour board.' },
        { icon: '🎥', title: 'Create Study Content', color: '#8b5cf6', reward: 'Up to ₹2,000 per video', desc: 'Make short educational videos explaining SPM book topics. Approved content creators earn revenue share and get free books.' },
        { icon: '📝', title: 'Student Blogger', color: '#ef4444', reward: '₹200–₹1,000 per article', desc: 'Write helpful study guides, exam tips, or subject explainers for our blog. We pay for quality content that helps fellow students.' },
        { icon: '🤝', title: 'Campus Ambassador', color: '#06b6d4', reward: 'Monthly stipend + perks', desc: 'Represent SPM at your school. Organize events, share materials, and help other students. Ambassadors get exclusive benefits and career references.' },
    ];
    return `
        ${SHARED_CSS}
        <div class="sc-page">
            ${heroSection({ color: '#10b981', badge: '💰 Student Rewards', title: 'Earn with Study', subtitle: 'Turn your academic journey into real rewards. Learn, contribute, and earn while you grow.' })}
            <div class="sc-body">
                <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:40px">
                    ${[['₹500+', 'Max per referral'], ['1,000+', 'Active earners'], ['100%', 'Free to join']].map(([n, l]) => `
                    <div style="background:white; border-radius:14px; padding:24px; text-align:center; box-shadow:0 2px 12px rgba(0,0,0,0.06)">
                        <p style="font-size:2rem; font-weight:900; color:#10b981; margin:0 0 4px">${n}</p>
                        <p style="color:#9ca3af; font-size:0.85rem; margin:0">${l}</p>
                    </div>`).join('')}
                </div>
                <p class="sc-section-title">Ways to Earn</p>
                <div class="sc-grid" style="grid-template-columns: repeat(auto-fill,minmax(300px,1fr))">
                    ${programs.map(p => `
                    <div class="sc-card" style="border-left:4px solid ${p.color}">
                        <div style="display:flex; align-items:flex-start; gap:14px">
                            <div class="sc-card-icon" style="background:${p.color}15; font-size:1.5rem; flex-shrink:0">${p.icon}</div>
                            <div>
                                <p class="sc-card-title">${p.title}</p>
                                <span class="sc-badge" style="background:${p.color}15; color:${p.color}; margin-bottom:10px; display:inline-flex">${p.reward}</span>
                                <p class="sc-card-desc">${p.desc}</p>
                            </div>
                        </div>
                    </div>`).join('')}
                </div>
                <div style="margin-top:40px; background:linear-gradient(135deg,#ecfdf5,#d1fae5); border-radius:16px; padding:36px; text-align:center">
                    <h3 style="font-size:1.5rem; font-weight:800; color:#065f46; margin:0 0 12px">Ready to Start Earning?</h3>
                    <p style="color:#059669; margin:0 0 24px; font-size:0.95rem">Register your student account to access all earning programs.</p>
                    <a href="#/student-register" class="sc-cta-btn" style="background:#10b981; color:white; margin:0 auto">Create Student Account →</a>
                </div>
            </div>
        </div>`;
}

// ── 6. STUDENT LEISURE ────────────────────────────────────────────────────────
export function renderStudentLeisure() {
    const activities = [
        { icon: '🎮', title: 'Educational Games', color: '#8b5cf6', desc: 'Fun brain teasers, math puzzles, word games, and science experiments that make learning feel like play.' },
        { icon: '📚', title: 'Story Corner', color: '#3b82f6', desc: 'Short stories, fables, and illustrated tales from around the world. Perfect for a 10-minute reading break.' },
        { icon: '🎨', title: 'Creative Arts', color: '#ec4899', desc: 'Drawing tutorials, coloring pages, origami guides, and craft ideas you can do at home with minimal supplies.' },
        { icon: '🎵', title: 'Study Music', color: '#f59e0b', desc: 'Curated playlists of instrumental and lo-fi music scientifically proven to improve focus and reduce anxiety.' },
        { icon: '🧘', title: 'Mindfulness & Wellness', color: '#10b981', desc: 'Breathing exercises, 5-minute meditations, and stress-busting techniques for students before exams.' },
        { icon: '🌐', title: 'Fun Facts & Trivia', color: '#06b6d4', desc: 'Daily fun facts about science, history, nature and more. Expand your general knowledge one fact at a time.' },
    ];
    return `
        ${SHARED_CSS}
        <div class="sc-page">
            ${heroSection({ color: '#ec4899', badge: '🎉 Take a Break!', title: 'Student Leisure', subtitle: 'All work and no play makes Jack a dull boy. Recharge with curated activities, stories, and games.' })}
            <div class="sc-body">
                <p class="sc-section-title">What Would You Like to Do?</p>
                <div class="sc-grid" style="grid-template-columns: repeat(auto-fill,minmax(270px,1fr))">
                    ${activities.map(a => `
                    <div class="sc-card" style="text-align:center; border-top:4px solid ${a.color}; cursor:pointer">
                        <div style="font-size:2.5rem; margin:0 auto 16px">${a.icon}</div>
                        <p class="sc-card-title">${a.title}</p>
                        <p class="sc-card-desc">${a.desc}</p>
                        <span class="sc-badge" style="background:${a.color}15; color:${a.color}; margin-top:16px">Coming Soon</span>
                    </div>`).join('')}
                </div>
                <div style="margin-top:48px; background:white; border-radius:20px; padding:40px; box-shadow:0 4px 20px rgba(0,0,0,0.07); text-align:center">
                    <p style="font-size:2.5rem; margin:0 0 16px">💭</p>
                    <h3 style="font-size:1.4rem; font-weight:800; color:#111827; margin:0 0 12px">"The mind is not a vessel to be filled, but a fire to be kindled."</h3>
                    <p style="color:#9ca3af; font-size:0.9rem; margin:0">— Plutarch</p>
                </div>
            </div>
        </div>`;
}

// ── 7. BLOGS ─────────────────────────────────────────────────────────────────
export function renderBlogs() {
    const posts = [
        { title: 'NEP 2020 Explained: What It Means for Your Child', tag: 'Education Policy', date: 'Feb 2026', color: '#3b82f6', read: '6 min', excerpt: 'The New Education Policy 2020 is the biggest reform in Indian education in 30 years. Here is what every parent and student needs to know.' },
        { title: '10 Tips to Score 95%+ in Board Exams', tag: 'Exam Tips', date: 'Jan 2026', color: '#10b981', read: '8 min', excerpt: 'From toppers across India, here are the proven study habits, revision techniques, and last-minute strategies that actually work.' },
        { title: 'Why Reading for Pleasure Boosts Academic Performance', tag: 'Learning Science', date: 'Dec 2025', color: '#7c3aed', read: '5 min', excerpt: 'Research shows students who read for pleasure score 30% higher in comprehension tests. Here\'s how to build the habit.' },
        { title: 'How SPM Books Are Designed for NEP 2020', tag: 'SPM Insights', date: 'Nov 2025', color: '#f59e0b', read: '4 min', excerpt: 'A behind-the-scenes look at how our editorial team crafts books that go beyond rote learning to nurture true understanding.' },
        { title: 'Best Study Habits for Students in Hindi Medium Schools', tag: 'Study Skills', date: 'Oct 2025', color: '#ef4444', read: '7 min', excerpt: 'Hindi-medium students face unique challenges. Here\'s how thousands of toppers have overcome them to achieve excellent results.' },
        { title: 'The Science of Sleep and Student Performance', tag: 'Student Health', date: 'Sep 2025', color: '#06b6d4', read: '6 min', excerpt: 'Missing sleep to study more may be counterproductive. The research is clear — adequate sleep is essential for memory consolidation.' },
    ];
    return `
        ${SHARED_CSS}
        <div class="sc-page">
            ${heroSection({ color: '#f59e0b', badge: '✍️ Insights & Ideas', title: 'Our Blogs', subtitle: 'Expert articles on education, study skills, parenting, and the latest from the world of learning.' })}
            <div class="sc-body">
                <div class="sc-grid" style="grid-template-columns: repeat(auto-fill,minmax(350px,1fr))">
                    ${posts.map(p => `
                    <article class="sc-card" style="cursor:pointer">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px">
                            <span class="sc-badge" style="background:${p.color}15; color:${p.color}">${p.tag}</span>
                            <span style="font-size:0.78rem; color:#9ca3af">${p.read} read · ${p.date}</span>
                        </div>
                        <h3 style="font-size:1.05rem; font-weight:800; color:#111827; margin:0 0 10px; line-height:1.4">${p.title}</h3>
                        <p style="font-size:0.88rem; color:#6b7280; line-height:1.65; margin:0 0 16px">${p.excerpt}</p>
                        <a href="#/" style="color:${p.color}; font-size:0.85rem; font-weight:700; text-decoration:none">Read More →</a>
                    </article>`).join('')}
                </div>
            </div>
        </div>`;
}

// ── 8. TEST PAPER GENERATOR ───────────────────────────────────────────────────
export function renderTestPaperGenerator() {
    return `
        ${SHARED_CSS}
        <style>
        .tpg-form { background:white; border-radius:20px; padding:36px; box-shadow:0 4px 20px rgba(0,0,0,0.08); }
        .tpg-label { font-size:0.85rem; font-weight:700; color:#374151; margin-bottom:8px; display:block; }
        .tpg-select, .tpg-input { width:100%; padding:10px 14px; border:1.5px solid #e5e7eb; border-radius:10px; font-size:0.9rem; color:#111827; outline:none; font-family:'Inter',sans-serif; transition:border-color 0.2s; }
        .tpg-select:focus, .tpg-input:focus { border-color:#6366f1; }
        .tpg-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        .tpg-btn { width:100%; padding:14px; background:linear-gradient(135deg,#6366f1,#8b5cf6); color:white; border:none; border-radius:12px; font-size:1rem; font-weight:700; cursor:pointer; margin-top:24px; font-family:'Inter',sans-serif; transition:opacity 0.2s; }
        .tpg-btn:hover { opacity:0.9; }
        .tpg-sample { background:#f0fdf4; border:1.5px dashed #86efac; border-radius:14px; padding:32px; text-align:center; margin-top:32px; }
        </style>
        <div class="sc-page">
            ${heroSection({ color: '#6366f1', badge: '📄 Smart Tools', title: 'Test Paper Generator', subtitle: 'Generate custom practice papers from SPM syllabus. Choose subject, class, difficulty and get instant papers.' })}
            <div class="sc-body">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:32px; align-items:start">
                    <div class="tpg-form">
                        <h2 style="font-size:1.3rem; font-weight:800; color:#111827; margin:0 0 28px">Configure Your Test Paper</h2>
                        <div style="display:flex; flex-direction:column; gap:20px">
                            <div>
                                <label class="tpg-label">Class / Grade</label>
                                <select class="tpg-select">
                                    <option>Select Class...</option>
                                    ${['1', '2', '3', '4', '5', '6', '7', '8', 'Nursery', 'LKG', 'UKG'].map(c => `<option>Class ${c}</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="tpg-label">Subject</label>
                                <select class="tpg-select">
                                    <option>Select Subject...</option>
                                    ${['Mathematics', 'English', 'Hindi', 'Science', 'EVS', 'Social Studies', 'Computer', 'Sanskrit', 'General Knowledge'].map(s => `<option>${s}</option>`).join('')}
                                </select>
                            </div>
                            <div class="tpg-grid">
                                <div>
                                    <label class="tpg-label">Difficulty</label>
                                    <select class="tpg-select"><option>Easy</option><option>Medium</option><option>Hard</option><option>Mixed</option></select>
                                </div>
                                <div>
                                    <label class="tpg-label">Total Marks</label>
                                    <select class="tpg-select"><option>25</option><option>50</option><option>80</option><option>100</option></select>
                                </div>
                            </div>
                            <div class="tpg-grid">
                                <div>
                                    <label class="tpg-label">MCQ Questions</label>
                                    <input type="number" class="tpg-input" value="10" min="0" max="30">
                                </div>
                                <div>
                                    <label class="tpg-label">Short Answer</label>
                                    <input type="number" class="tpg-input" value="5" min="0" max="20">
                                </div>
                            </div>
                            <div class="tpg-grid">
                                <div>
                                    <label class="tpg-label">Long Answer</label>
                                    <input type="number" class="tpg-input" value="3" min="0" max="10">
                                </div>
                                <div>
                                    <label class="tpg-label">Duration (mins)</label>
                                    <select class="tpg-select"><option>30</option><option>60</option><option>90</option><option>120</option><option>180</option></select>
                                </div>
                            </div>
                            <button class="tpg-btn">🎲 Generate Test Paper</button>
                        </div>
                    </div>
                    <div>
                        <div class="tpg-sample">
                            <div style="font-size:3rem; margin-bottom:16px">📄</div>
                            <h3 style="font-size:1.2rem; font-weight:800; color:#166534; margin:0 0 8px">Your Test Paper Will Appear Here</h3>
                            <p style="color:#16a34a; font-size:0.9rem; margin:0">Configure the options on the left and click Generate. You'll be able to download as PDF or print directly.</p>
                        </div>
                        <div style="margin-top:24px; display:flex; flex-direction:column; gap:12px">
                            ${[['🗂️', 'Chapter-wise Papers', 'Select specific chapters only'], ['🔀', 'Random Mix', 'Questions shuffled each time'], ['📊', 'Track Performance', 'Save results to your student dashboard'], ['🖨️', 'Print or PDF', 'Download or print instantly']].map(([ic, t, d]) => `
                            <div style="display:flex; align-items:center; gap:14px; background:white; padding:16px; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.05)">
                                <span style="font-size:1.5rem">${ic}</span>
                                <div><p style="font-weight:700; font-size:0.9rem; color:#111827; margin:0 0 2px">${t}</p><p style="font-size:0.8rem; color:#9ca3af; margin:0">${d}</p></div>
                            </div>`).join('')}
                        </div>
                        <div style="margin-top:16px; background:#fef3c7; border-radius:12px; padding:16px; display:flex; gap:12px; align-items:flex-start">
                            <span>⚠️</span>
                            <p style="font-size:0.82rem; color:#92400e; margin:0">Full AI-powered generation requires a student account. <a href="#/student-register" style="color:#d97706; font-weight:700">Sign up free →</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}

// ── 9. WEB SUPPORT ────────────────────────────────────────────────────────────
export function renderWebSupport() {
    const faqs = [
        { q: 'How do I access video lessons for my SPM book?', a: 'Visit the Video Library section or scan the QR code printed inside your SPM book. Each book has a unique code that unlocks its associated video content.' },
        { q: 'My video is not loading. What should I do?', a: 'Check your internet connection. Try refreshing the page. If the issue persists, clear your browser cache (Ctrl+Shift+R) and try again. Contact us if it still fails.' },
        { q: 'How do I register as a student?', a: 'Click "Register" in the top navigation bar and create a student account. It\'s completely free. You\'ll need a valid email or phone number.' },
        { q: 'Can I access SPM content on my mobile phone?', a: 'Yes! Our website is fully mobile-friendly. Open your browser, visit the site, and everything will work perfectly on Android and iOS.' },
        { q: 'How do I find books for my specific class and subject?', a: 'Use the Catalogue page. You can filter by Class (1–8, Kindergarten), Subject, and Series. You can also search by book title or code.' },
        { q: 'How do I report a technical issue?', a: 'Use the contact form below or email us at support@spmbooks.com. Include your browser name, device type, and a description of the issue.' },
    ];
    return `
        ${SHARED_CSS}
        <style>
        .ws-faq { background:white; border-radius:12px; padding:20px 24px; cursor:pointer; box-shadow:0 2px 8px rgba(0,0,0,0.05); transition:box-shadow 0.2s; }
        .ws-faq:hover { box-shadow:0 4px 16px rgba(0,0,0,0.1); }
        .ws-faq-q { font-weight:700; color:#111827; font-size:0.95rem; display:flex; justify-content:space-between; align-items:center; gap:12px; }
        .ws-faq-a { font-size:0.88rem; color:#6b7280; line-height:1.65; margin-top:12px; padding-top:12px; border-top:1px solid #f3f4f6; }
        </style>
        <div class="sc-page">
            ${heroSection({ color: '#0891b2', badge: '🛟 Help Center', title: 'Web Support', subtitle: 'Find answers to common questions, troubleshoot issues, and get in touch with our support team.' })}
            <div class="sc-body">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:32px; margin-bottom:48px">
                    ${[['📞', 'Call Us', 'Mon–Sat, 9AM–6PM', '7014681829'], ['📧', 'Email Us', 'We reply within 24 hours', 'support@spmbooks.com'], ['💬', 'WhatsApp', 'Quick responses', 'Chat on WhatsApp'], ['📍', 'Visit Us', 'Mon–Sat, 10AM–5PM', 'Lucknow, Uttar Pradesh']].map(([ic, t, sub, val]) => `
                    <div class="sc-card" style="display:flex; align-items:center; gap:16px">
                        <div style="font-size:2rem; background:#f0f9ff; padding:16px; border-radius:12px; flex-shrink:0">${ic}</div>
                        <div>
                            <p style="font-weight:800; color:#111827; margin:0 0 4px">${t}</p>
                            <p style="color:#9ca3af; font-size:0.8rem; margin:0 0 4px">${sub}</p>
                            <p style="color:#0891b2; font-weight:700; font-size:0.88rem; margin:0">${val}</p>
                        </div>
                    </div>`).join('')}
                </div>
                <p class="sc-section-title">Frequently Asked Questions</p>
                <div style="display:flex; flex-direction:column; gap:12px">
                    ${faqs.map((f, i) => `
                    <div class="ws-faq" onclick="this.querySelector('.ws-faq-a').style.display=this.querySelector('.ws-faq-a').style.display==='none'?'block':'none'; this.querySelector('.ws-arrow').textContent=this.querySelector('.ws-faq-a').style.display==='block'?'▲':'▼'">
                        <div class="ws-faq-q">${f.q} <span class="ws-arrow" style="color:#9ca3af; flex-shrink:0">▼</span></div>
                        <div class="ws-faq-a" style="display:none">${f.a}</div>
                    </div>`).join('')}
                </div>
                <div style="margin-top:48px; background:linear-gradient(135deg,#f0f9ff,#e0f2fe); border-radius:20px; padding:40px; text-align:center">
                    <h3 style="font-size:1.4rem; font-weight:800; color:#0c4a6e; margin:0 0 12px">Still need help?</h3>
                    <p style="color:#0891b2; margin:0 0 24px">Our team is ready to assist you with any queries about books, orders, or the website.</p>
                    <a href="#/contact" class="sc-cta-btn" style="background:#0891b2; color:white; margin:0 auto; text-decoration:none">Go to Contact Page →</a>
                </div>
            </div>
        </div>`;
}

// ── 10. VIDEO LECTURE ──────────────────────────────────────────────────────────
export function renderVideoLecture() {
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

    // Map videos strictly to Disney Books
    const mappedBooks = {};

    youtubeVideos.forEach(video => {
        // Robust regex parsing since formatting varies slightly
        const matchChapter = video.title.match(/Ch\s*(\d+)/i) || [];
        const matchClass = video.title.match(/Class\s*(\d+)/i) || [];

        const chapNum = matchChapter[1] || '?';
        let classNum = matchClass[1] || '?';
        if (classNum.startsWith('0')) classNum = classNum.substring(1);

        const lowerTitle = video.title.toLowerCase();
        let subject = '';
        let bookName = '';
        let bookColor = '#3b82f6';
        let bookIcon = '📚';

        // Identification Logic based on exact Disney Publication Catalog
        if (lowerTitle.includes('science')) {
            subject = 'Science'; bookName = `Quantum - ${classNum}`; bookColor = '#8b5cf6'; bookIcon = '🔬';
        } else if (lowerTitle.includes('hindi') && !lowerTitle.includes('vyakaran') && !lowerTitle.includes('grammar')) {
            subject = 'Hindi'; bookName = `नवधा (हिंदी पाठ्य पुस्तक) - ${classNum}`; bookColor = '#ef4444'; bookIcon = '🔤';
        } else if (lowerTitle.includes('grammar')) {
            subject = 'English Grammar'; bookName = `Dew Drops of Grammar - ${classNum}`; bookColor = '#3b82f6'; bookIcon = '📖';
        } else if (lowerTitle.includes('vyakaran')) {
            subject = 'Hindi Grammar'; bookName = `व्याकरण दीक्षा - ${classNum}`; bookColor = '#f59e0b'; bookIcon = '📝';
        } else if (lowerTitle.includes('sst') || lowerTitle.includes('social studies')) {
            subject = 'Social Studies'; bookName = `Exploring Society - ${classNum}`; bookColor = '#ec4899'; bookIcon = '🌍';
        } else if (lowerTitle.includes('gk') || lowerTitle.includes('general knowledge')) {
            subject = 'General Knowledge'; bookName = `Smart G.K - ${classNum}`; bookColor = '#10b981'; bookIcon = '🧠';
        } else if (lowerTitle.includes('english')) {
            subject = 'English Reader'; bookName = `Ripple - ${classNum}`; bookColor = '#6366f1'; bookIcon = '📚';
        } else {
            // Fallback safety
            subject = 'General'; bookName = `SPM Book - Class ${classNum}`;
        }

        // Clean chapter title by grabbing the part after class (if available), removing "For children"
        const titleParts = video.title.split('|');
        let cleanTitle = titleParts.length >= 5 ? titleParts[4] : (titleParts[3] || video.title);
        cleanTitle = cleanTitle.replace(/For children/gi, '').trim();

        const bookId = `${subject}-${classNum}`;
        if (!mappedBooks[bookId]) {
            mappedBooks[bookId] = {
                id: bookId, name: bookName, subject, classNum, color: bookColor, icon: bookIcon, videos: []
            };
        }

        mappedBooks[bookId].videos.push({
            id: video.id, chapNum, title: cleanTitle
        });
    });

    // Sort chapters in books
    const bookList = Object.values(mappedBooks).map(b => {
        b.videos.sort((v1, v2) => parseInt(v1.chapNum) - parseInt(v2.chapNum));
        return b;
    });

    // Sort books by class then name
    bookList.sort((a, b) => {
        if (a.classNum !== b.classNum) return parseInt(a.classNum) - parseInt(b.classNum);
        return a.name.localeCompare(b.name);
    });

    // Group by Subject first
    const subjectsMap = {};
    bookList.forEach(book => {
        if (!subjectsMap[book.subject]) {
            subjectsMap[book.subject] = {
                name: book.subject,
                icon: book.icon,
                color: book.color,
                books: []
            };
        }
        subjectsMap[book.subject].books.push(book);
    });

    const subjectsArray = Object.values(subjectsMap);

    const subjectTabsHtml = subjectsArray.map((sub, index) => `
        <button onclick="const tabs=document.querySelectorAll('.subject-tab-btn'); const contents=document.querySelectorAll('.subject-content'); tabs.forEach(t=>{t.classList.remove('active'); t.style.background='white'; t.style.color='#6b7280'; t.style.borderColor='#e5e7eb';}); this.classList.add('active'); this.style.background='${sub.color}15'; this.style.color='${sub.color}'; this.style.borderColor='${sub.color}'; contents.forEach(c=>{if(c.id==='subject-${sub.name.replace(/\s+/g, '-')}'){c.style.display='block';c.style.animation='none';c.offsetHeight;c.style.animation='fadeIn 0.4s ease-out';}else{c.style.display='none';}});" class="subject-tab-btn ${index === 0 ? 'active' : ''}" data-subject="${sub.name.replace(/\s+/g, '-')}" style="padding: 12px 24px; border-radius: 30px; font-weight: 700; font-size: 1rem; cursor: pointer; border: 2px solid ${index === 0 ? sub.color : '#e5e7eb'}; background: ${index === 0 ? sub.color + '15' : 'white'}; color: ${index === 0 ? sub.color : '#6b7280'}; transition: all 0.3s; white-space: nowrap; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.2rem;">${sub.icon}</span> ${sub.name}
        </button>
    `).join('');

    const subjectsHtml = subjectsArray.map((sub, index) => `
        <div class="subject-content" id="subject-${sub.name.replace(/\s+/g, '-')}" style="${index === 0 ? 'display: block;' : 'display: none;'} animation: fadeIn 0.4s ease-out;">
            
            <div style="margin-bottom: 32px; padding: 24px; background: linear-gradient(135deg, ${sub.color}15, transparent); border-radius: 20px; border: 1px solid ${sub.color}22;">
                <h2 style="font-size: 2rem; font-weight: 900; color: #111827; margin: 0; display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 2.5rem;">${sub.icon}</span> ${sub.name}
                </h2>
                <p style="color: #6b7280; font-size: 1.05rem; margin: 8px 0 0; font-weight: 500;">Select a class below to view synchronized ${sub.name} video lectures.</p>
            </div>

            <div class="classes-container" style="display: flex; flex-direction: column; gap: 24px;">
                ${sub.books.map(book => `
                <div class="class-section" style="background: white; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.04); overflow: hidden; border: 1px solid #f3f4f6;">
                    
                    <div style="padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; background: ${book.color}05; cursor: pointer; transition: background 0.2s" onclick="const p = this.nextElementSibling; const icon = this.querySelector('.toggle-icon'); if (p.style.display === 'none') { p.style.display = 'block'; this.style.background = 'transparent'; icon.style.transform = 'rotate(180deg)'; } else { p.style.display = 'none'; this.style.background = '${book.color}05'; icon.style.transform = 'rotate(0deg)'; }">
                        <div style="display: flex; align-items: center; gap: 16px;">
                            <div style="width: 48px; height: 48px; background: ${book.color}15; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; color: ${book.color}; font-size: 1.2rem;">
                                ${book.classNum}
                            </div>
                            <div>
                                <h3 style="font-size: 1.4rem; font-weight: 800; color: #111827; margin: 0; letter-spacing: -0.5px">Class ${book.classNum}</h3>
                                <div style="font-size: 0.85rem; font-weight: 600; color: #6b7280; margin-top: 2px;">${book.name}</div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px">
                            <span style="background: ${book.color}15; color: ${book.color}; font-size: 0.85rem; font-weight: 800; padding: 6px 14px; border-radius: 20px;">${book.videos.length} Lectures</span>
                            <div style="width: 36px; height: 36px; border-radius: 50%; background: white; border: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: center; transition: transform 0.3s" class="toggle-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="book-videos-grid" style="display: none; padding: 24px; background: #fafafa; border-top: 1px solid #f3f4f6;">
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px;">
                            ${book.videos.map(v => `
                            <a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" class="book-vid-card" style="display:flex; flex-direction:column; background:white; border-radius:12px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.05); text-decoration:none; transition:all 0.2s; border: 1px solid #f3f4f6">
                                <div style="position:relative; aspect-ratio:16/9; background:#000">
                                    <img src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" style="width:100%; height:100%; object-fit:cover; opacity:0.85; transition:opacity 0.2s" onload="this.style.opacity=1" />
                                    <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.1)">
                                        <div style="width:44px; height:44px; background:rgba(255,0,0,0.9); border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; box-shadow: 0 4px 10px rgba(255,0,0,0.3)">
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                        </div>
                                    </div>
                                    <div style="position:absolute; top:12px; left:12px; background:rgba(0,0,0,0.7); backdrop-filter: blur(4px); color:white; font-size:0.75rem; font-weight:800; padding:6px 10px; border-radius:6px; box-shadow: 0 2px 8px rgba(0,0,0,0.2)">Ch ${v.chapNum}</div>
                                </div>
                                <div style="padding:16px;">
                                    <p style="font-size:0.95rem; font-weight:800; color:#111827; margin:0; line-height:1.4; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden">${v.title}</p>
                                    <p style="color: #6b7280; font-size: 0.8rem; font-weight: 600; margin: 8px 0 0; display: flex; align-items: center; gap: 6px">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" color="#ff0000"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                                        Play Chapter
                                    </p>
                                </div>
                            </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    return `
        ${SHARED_CSS}
        <style>
        .book-vid-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.1) !important; border-color: #d1d5db !important; z-index: 10; }
        .subject-tab-btn:hover:not(.active) { background: #f3f4f6 !important; border-color: #d1d5db !important; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        /* Hide scrollbar for tabs */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        /* Full width for Video Lectures page */
        .video-lecture-page .sc-body { max-width: 100%; padding: 48px 4% 80px; }
        .video-lecture-page .sc-hero-content { max-width: 100%; padding: 60px 4%; }
        </style>
        <div class="sc-page video-lecture-page">
            ${heroSection({
        color: '#7c3aed',
        badge: '🎬 Live & Recorded Lectures',
        title: 'Video Lectures',
        subtitle: 'Expert-taught video lessons synchronized with SPM Disney Publication Books. Select a subject, choose your class, and watch your desired chapters.',
        video: './assets/videos/Video Lecture_02.mp4'
    })}
            
            <div class="sc-body">
                <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-bottom:48px">
                    ${[[youtubeVideos.length, 'Total Video Lessons'], [bookList.length, 'Disney Books'], ['100%', 'Free']].map(([n, l]) => `
                    <div style="background:white; border-radius:14px; padding:24px; text-align:center; box-shadow:0 2px 12px rgba(0,0,0,0.06)">
                        <p style="font-size:2.2rem; font-weight:900; color:#7c3aed; margin:0 0 4px">${n}</p>
                        <p style="color:#9ca3af; font-size:0.85rem; margin:0">${l}</p>
                    </div>`).join('')}
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
                    <p class="sc-section-title" style="margin: 0;">Select Your Subject First</p>
                    <a href="https://www.youtube.com/@sumanprakashanmandir-digital/videos" target="_blank" class="sc-cta-btn" style="background: #ff0000; color: white; padding: 10px 20px;">Subscribe to Channel →</a>
                </div>

                <div class="subject-tabs-container" style="margin-bottom: 32px; padding-bottom: 4px; border-bottom: 1px solid #e5e7eb;">
                    <div id="subject-tabs-scroll" class="scrollbar-hide" style="display: flex; gap: 12px; flex-wrap: wrap; padding-bottom: 12px;">
                        ${subjectTabsHtml}
                    </div>
                </div>

                <div class="book-lecture-container">
                    ${subjectsHtml}
                </div>
            </div>
        </div>
        

        `;
}

// ── 11. INTERACTIVE EXERCISES ─────────────────────────────────────────────────
export function renderInteractiveExercises() {
    const exercises = [
        { icon: '🔢', title: 'Math Drills', color: '#3b82f6', type: 'Quiz', desc: 'Practice multiplication tables, fractions, and arithmetic with instant feedback. Adaptive difficulty adjusts to your level.', subjects: ['Class 1–8', 'Mathematics'] },
        { icon: '📖', title: 'English Grammar Quiz', color: '#10b981', type: 'Quiz', desc: 'Fill-in-the-blanks, tense correction, vocabulary matching. Covers all grammar topics from SPM English books.', subjects: ['Class 1–8', 'English'] },
        { icon: '🔬', title: 'Science Flashcards', color: '#8b5cf6', type: 'Flashcards', desc: 'Swipe through definitions, diagrams, and key concepts for Science chapters. Spaced repetition built in.', subjects: ['Class 3–8', 'Science'] },
        { icon: '🌍', title: 'Map Skills', color: '#f59e0b', type: 'Interactive', desc: 'Label maps, identify states and capitals, rivers and mountains. Aligned with Social Studies chapters.', subjects: ['Class 4–8', 'SST'] },
        { icon: '🔤', title: 'Hindi Vocabulary Builder', color: '#ef4444', type: 'Word Game', desc: 'Antonyms, synonyms, muhavre, and dohe practice. Build your Hindi vocabulary through word games.', subjects: ['Class 1–8', 'Hindi'] },
        { icon: '💻', title: 'Computer Typing Practice', color: '#06b6d4', type: 'Practice', desc: 'Improve your typing speed and accuracy. Essential for the computer science curriculum and beyond.', subjects: ['Class 1–8', 'Computer'] },
        { icon: '🧮', title: 'Mental Maths Challenge', color: '#f97316', type: 'Challenge', desc: 'Solve rapid-fire mental maths problems. Compete against the clock and see your score improve each session.', subjects: ['All Classes', 'Mathematics'] },
        { icon: '🌿', title: 'EVS Explorer', color: '#84cc16', type: 'Interactive', desc: 'Interactive environment and nature quizzes. Learn about plants, animals, weather, and our planet.', subjects: ['Class 1–5', 'EVS'] },
        { icon: '📜', title: 'Sanskrit Basics', color: '#a78bfa', type: 'Practice', desc: 'Learn Devanagari script, basic shlokas, and vocabulary. Audio pronunciation support included.', subjects: ['Class 4–8', 'Sanskrit'] },
    ];
    return `
        ${SHARED_CSS}
        <div class="sc-page">
            ${heroSection({ color: '#3b82f6', badge: '⚡ Learn by Doing', title: 'Interactive Exercises', subtitle: 'Hands-on practice questions, quizzes, and activities for every subject — instant feedback, real learning.' })}
            <div class="sc-body">
                <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:32px; align-items:center">
                    <span style="font-size:0.85rem; font-weight:700; color:#6b7280">Filter:</span>
                    ${['All', 'Quiz', 'Flashcards', 'Interactive', 'Practice', 'Challenge', 'Word Game'].map((f, i) => `
                    <button onclick="document.querySelectorAll('.ex-card').forEach(c=>{ c.style.display = '${f === 'All' ? '' : 'none'}'; if('${f}'==='All'||c.dataset.type==='${f}') c.style.display='flex'; })" style="padding:6px 14px; border-radius:8px; border:1.5px solid ${i === 0 ? '#3b82f6' : '#e5e7eb'}; background:${i === 0 ? '#3b82f6' : 'white'}; color:${i === 0 ? 'white' : '#374151'}; font-size:0.82rem; font-weight:600; cursor:pointer">${f}</button>`).join('')}
                </div>
                <div class="sc-grid" style="grid-template-columns:repeat(auto-fill,minmax(300px,1fr))">
                    ${exercises.map(e => `
                    <div class="sc-card ex-card" data-type="${e.type}" style="border-top:4px solid ${e.color}; display:flex; flex-direction:column">
                        <div style="display:flex; align-items:flex-start; gap:14px; flex:1">
                            <div class="sc-card-icon" style="background:${e.color}15; font-size:1.5rem; flex-shrink:0; margin-bottom:0">${e.icon}</div>
                            <div style="flex:1">
                                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px">
                                    <p class="sc-card-title" style="margin:0">${e.title}</p>
                                    <span style="background:${e.color}15; color:${e.color}; padding:2px 8px; border-radius:4px; font-size:0.7rem; font-weight:700; flex-shrink:0; margin-left:8px">${e.type}</span>
                                </div>
                                <p class="sc-card-desc" style="margin-bottom:12px">${e.desc}</p>
                                <div style="display:flex; gap:6px; flex-wrap:wrap">
                                    ${e.subjects.map(s => `<span style="background:#f3f4f6; color:#6b7280; padding:2px 8px; border-radius:4px; font-size:0.72rem; font-weight:600">${s}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                        <button style="margin-top:16px; width:100%; padding:10px; background:${e.color}; color:white; border:none; border-radius:10px; font-weight:700; font-size:0.85rem; cursor:pointer; opacity:0.85" onclick="alert('This exercise module is coming soon!')">Start Exercise →</button>
                    </div>`).join('')}
                </div>
                <div style="margin-top:48px; background:linear-gradient(135deg,#eff6ff,#dbeafe); border-radius:20px; padding:40px; text-align:center">
                    <h3 style="font-size:1.4rem; font-weight:800; color:#1e40af; margin:0 0 12px">🚀 Full Interactive Platform Coming Soon</h3>
                    <p style="color:#3b82f6; margin:0 0 20px">We're building a complete adaptive learning engine with real-time scoring, progress tracking, and personalised question banks.</p>
                    <a href="#/student-register" class="sc-cta-btn" style="background:#3b82f6; color:white; text-decoration:none; margin:0 auto">Register to Get Early Access →</a>
                </div>
            </div>
        </div>`;
}

// ── 12. LESSON PLAN / WORKSHEETS ──────────────────────────────────────────────
export function renderLessonPlanWorksheets() {
    const worksheets = [
        { subject: 'Mathematics', icon: '📐', color: '#3b82f6', count: 24, classes: '1–8', types: ['Addition & Subtraction', 'Multiplication Tables', 'Fractions', 'Geometry', 'Word Problems'] },
        { subject: 'English', icon: '📖', color: '#10b981', count: 31, classes: '1–8', types: ['Grammar Practice', 'Reading Comprehension', 'Creative Writing', 'Vocabulary', 'Pronunciation'] },
        { subject: 'Hindi', icon: '🔤', color: '#f59e0b', count: 18, classes: '1–8', types: ['Varnamala', 'Shabd Rachna', 'Nibandh', 'Kavita Paath', 'Vyakaran'] },
        { subject: 'Science', icon: '🔬', color: '#8b5cf6', count: 20, classes: '3–8', types: ['Diagrams to Label', 'Experiments', 'MCQs', 'Fill in the Blanks', 'Match the Column'] },
        { subject: 'EVS', icon: '🌿', color: '#84cc16', count: 15, classes: '1–5', types: ['My Family', 'Plants & Animals', 'Weather', 'Our School', 'Transport'] },
        { subject: 'Social Studies', icon: '🌍', color: '#06b6d4', count: 22, classes: '3–8', types: ['Map Work', 'History Timeline', 'Geography Facts', 'Civics Quiz', 'Current Affairs'] },
    ];
    return `
        ${SHARED_CSS}
        <div class="sc-page">
            ${heroSection({ color: '#f59e0b', badge: '📋 Teacher Resources', title: 'Lesson Plans & Worksheets', subtitle: 'Ready-to-use lesson plans and printable worksheets created by expert educators, aligned with SPM books.' })}
            <div class="sc-body">
                <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:40px">
                    ${[['130+', 'Worksheets Available'], ['6', 'Subjects Covered'], ['Free', 'For Registered Users']].map(([n, l]) => `
                    <div style="background:white; border-radius:14px; padding:24px; text-align:center; box-shadow:0 2px 12px rgba(0,0,0,0.06)">
                        <p style="font-size:2.2rem; font-weight:900; color:#f59e0b; margin:0 0 4px">${n}</p>
                        <p style="color:#9ca3af; font-size:0.85rem; margin:0">${l}</p>
                    </div>`).join('')}
                </div>
                <p class="sc-section-title">Worksheets by Subject</p>
                <div class="sc-grid" style="grid-template-columns:repeat(auto-fill,minmax(340px,1fr))">
                    ${worksheets.map(w => `
                    <div class="sc-card" style="border-left:5px solid ${w.color}">
                        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px">
                            <div style="display:flex; align-items:center; gap:12px">
                                <div class="sc-card-icon" style="background:${w.color}15; font-size:1.4rem; margin-bottom:0; flex-shrink:0">${w.icon}</div>
                                <div>
                                    <p class="sc-card-title" style="margin:0 0 2px">${w.subject}</p>
                                    <p style="font-size:0.78rem; color:#9ca3af; margin:0">Class ${w.classes}</p>
                                </div>
                            </div>
                            <span class="sc-badge" style="background:${w.color}15; color:${w.color}">${w.count} sheets</span>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:16px">
                            ${w.types.slice(0, 3).map(t => `
                            <div style="display:flex; align-items:center; gap:8px; font-size:0.84rem; color:#374151">
                                <span style="color:${w.color}; font-weight:700">→</span> ${t}
                            </div>`).join('')}
                            ${w.types.length > 3 ? `<span style="font-size:0.78rem; color:#9ca3af">+${w.types.length - 3} more topics</span>` : ''}
                        </div>
                        <div style="display:flex; gap:8px">
                            <button onclick="alert('Download available after login!')" style="flex:1; padding:8px; background:${w.color}; color:white; border:none; border-radius:8px; font-size:0.8rem; font-weight:700; cursor:pointer">📥 Download All</button>
                            <button onclick="alert('Preview coming soon!')" style="flex:1; padding:8px; background:${w.color}15; color:${w.color}; border:none; border-radius:8px; font-size:0.8rem; font-weight:700; cursor:pointer">👁 Preview</button>
                        </div>
                    </div>`).join('')}
                </div>
                <hr class="sc-divider">
                <p class="sc-section-title">Sample Lesson Plan Structure</p>
                <div style="background:white; border-radius:16px; overflow:hidden; box-shadow:0 2px 16px rgba(0,0,0,0.06)">
                    ${[
            ['#fef3c7', '#92400e', '⏰ Learning Objectives (5 min)', 'Clearly define what students will know/be able to do by the end of the lesson.'],
            ['#dbeafe', '#1e40af', '📚 Introduction / Hook (10 min)', 'A story, question, or activity to engage students and activate prior knowledge.'],
            ['#d1fae5', '#065f46', '🧠 Direct Instruction (15 min)', 'Teacher explains the new concept using the SPM book, board, and visual aids.'],
            ['#fae8ff', '#6b21a8', '✏️ Guided Practice (10 min)', 'Students work through examples with teacher guidance. Use SPM exercises.'],
            ['#ffedd5', '#9a3412', '🔁 Independent Practice (10 min)', 'Students attempt worksheet or textbook exercises independently.'],
            ['#f0fdf4', '#14532d', '✅ Assessment & Wrap-up (5 min)', 'Quick quiz, exit ticket, or verbal check to gauge understanding.'],
        ].map(([bg, c, title, desc]) => `
                    <div style="padding:20px 28px; background:${bg}; border-bottom:1px solid rgba(0,0,0,0.05)">
                        <p style="font-weight:800; color:${c}; margin:0 0 4px; font-size:0.95rem">${title}</p>
                        <p style="color:${c}; font-size:0.85rem; margin:0; opacity:0.8">${desc}</p>
                    </div>`).join('')}
                </div>
            </div>
        </div>`;
}

// ── 13. FLIP BOOK ─────────────────────────────────────────────────────────────
export function renderFlipBook() {
    // We defer the heavy lifting until the DOM mounts
    setTimeout(initPageFlip, 100);

    return `
        ${SHARED_CSS}
        <style>
        .fb-page-container {
            width: 100%;
            height: calc(100vh - 80px); /* Account for header */
            background: linear-gradient(135deg, #a7f3d0 0%, #bae6fd 100%);
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding: 25px 40px 40px;
            overflow: hidden;
            background-image: url('https://img.freepik.com/free-vector/seamless-pattern-with-different-school-supplies_1308-56832.jpg?w=1800');
            background-blend-mode: overlay;
            transition: all 0.6s ease;
        }
        .fb-page-container.dark-mode {
            background-color: #0f172a;
            background-blend-mode: multiply;
        }
        .fb-backdrop {
            position: absolute; inset: 0; background: rgba(255, 255, 255, 0.65); z-index: 0; backdrop-filter: blur(5px); transition: background 0.6s ease;
        }
        .fb-page-container.dark-mode .fb-backdrop {
            background: rgba(15, 23, 42, 0.92);
        }
        .flipbook-viewport {
            position: relative; z-index: 10; display: flex; align-items: center; justify-content: center;
            width: 90%; flex: 1; min-height: 0; max-height: 62vh;
            margin-top: 30px; 
            /* Scaled down max-height ensures the book never overlaps the header text */
        }
        #flipbook {
            box-shadow: 0 40px 80px rgba(0,0,0,0.15), 0 0 0 10px white;
            display: none; /* hidden until loaded */
            border-radius: 6px;
        }
        .book-page {
            background-color: white; overflow: hidden; position: relative;
            background-size: cover; background-position: center; border: 1px solid #f3f4f6;
        }
        .page-content {
            width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: white;
        }
        .page-content canvas {
            max-width: 100%; max-height: 100%; object-fit: contain; pointer-events: none;
        }
        .loader-overlay {
            position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;
            z-index: 20; color: #4338ca; transition: opacity 0.5s; text-align: center;
        }
        .loader-spinner {
            width: 80px; height: 80px; border: 8px solid rgba(67, 56, 202, 0.2); border-top-color: #f59e0b; border-radius: 50%;
            animation: spin 1s linear infinite; margin-bottom: 24px;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        
        /* Magical Header Title */
        .fb-header {
            position: relative; z-index: 15; text-align: center; display: flex; flex-direction: column; align-items: center; padding-bottom: 10px; width: 100%; transition: all 0.5s ease;
        }
        .fb-header-badge {
            background: #f59e0b; color: white; padding: 6px 18px; border-radius: 30px; font-weight: 900; font-size: 0.9rem; letter-spacing: 2px; text-transform: uppercase; box-shadow: 0 6px 16px rgba(245, 158, 11, 0.4); margin-bottom: 12px; display: inline-block;
        }
        .fb-header h1 { 
            margin: 0; font-family: 'Playfair Display', serif; 
            font-size: 2.4rem; font-weight: 900; color: #1e1b4b; 
            text-shadow: 2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white, 0 10px 20px rgba(0,0,0,0.15); 
            line-height:1; letter-spacing:-1px; transition: color 0.5s, text-shadow 0.5s;
        }
        .fb-page-container.dark-mode .fb-header h1 {
            color: #f1f5f9; text-shadow: 2px 2px 0px #334155, -2px -2px 0px #334155, 2px -2px 0px #334155, -2px 2px 0px #334155, 0 10px 20px rgba(0,0,0,0.5);
        }

        /* Large Kid-Friendly Arrow Buttons */
        .fb-nav-arrow {
            position: absolute; top: 50%; transform: translateY(-50%); z-index: 15;
            width: 90px; height: 90px; background: #ec4899; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; border: 8px solid white; box-shadow: 0 15px 35px rgba(236, 72, 153, 0.4), inset 0 -5px 15px rgba(0,0,0,0.15); transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .fb-nav-arrow:hover { transform: translateY(-50%) scale(1.15); background: #db2777; box-shadow: 0 20px 45px rgba(236, 72, 153, 0.6), inset 0 -5px 15px rgba(0,0,0,0.15); }
        .fb-nav-arrow:active { transform: translateY(-50%) scale(0.95); }
        .fb-nav-arrow.prev { left: 50px; }
        .fb-nav-arrow.next { right: 50px; }
        .fb-nav-arrow svg { stroke-width: 4; width: 44px; height: 44px; }

        /* Playful Page Counter Bottom */
        .fb-counter-pill {
            position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); z-index: 15;
            background: white; border: 5px solid #8b5cf6; color: #6d28d9; padding: 12px 36px; border-radius: 50px; font-weight: 900; font-size: 1.3rem; box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3); display: flex; align-items: center; gap: 12px;
        }

        /* Ambience Toggle Button */
        .fb-ambience-toggle {
            position: absolute; top: 20px; right: 30px; z-index: 20;
            background: white; border: 4px solid #f59e0b; color: #d97706;
            border-radius: 50px; padding: 10px 20px; font-weight: 800; font-size: 1rem;
            cursor: pointer; box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            display: flex; align-items: center; gap: 8px; transition: all 0.3s ease;
        }
        .fb-ambience-toggle:hover { transform: scale(1.05); }
        .fb-page-container.dark-mode .fb-ambience-toggle {
            background: #1e293b; border-color: #6366f1; color: #818cf8; box-shadow: 0 10px 20px rgba(0,0,0,0.4);
        }
        </style>
        
        <div class="fb-page-container" id="fb-main-container">
            <div class="fb-backdrop"></div>
            
            <button class="fb-ambience-toggle" id="btn-ambience">
                <span id="ambience-icon">🌙</span> <span id="ambience-text">Turn Lights Off</span>
            </button>
            
            <div class="fb-header">
                <span class="fb-header-badge">Interactive Reading Experience by SPM</span>
                <h1>Subject: English Reader - 1</h1>
            </div>

            <div id="pdf-loader" class="loader-overlay">
                <div class="loader-spinner"></div>
                <h2 style="font-size: 2.8rem; font-weight: 900; font-family: 'Playfair Display', serif; margin:0; text-shadow: 2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white;">Opening Book...</h2>
                <p id="pdf-progress" style="color: #4f46e5; margin-top: 16px; font-weight: 800; font-size: 1.2rem; background:white; padding: 8px 24px; border-radius:30px; box-shadow:0 4px 12px rgba(0,0,0,0.05)">Sprinkling Magic Dust ✨</p>
            </div>

            <div class="flipbook-viewport">
                <div id="flipbook"></div>
            </div>
            
            <div style="display: none;" id="flip-controls">
                <button class="fb-nav-arrow prev" id="btn-prev">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                
                <div class="fb-counter-pill">
                    Page <div id="page-counter" style="min-width: 60px; text-align:center;">- / -</div>
                </div>

                <button class="fb-nav-arrow next" id="btn-next">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>
            </div>
        </div>
    `;
}

// Ensure PageFlip library and PDF.js are loaded
function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector('script[src="' + src + '"]')) return resolve();
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

async function initPageFlip() {
    const pdfUrl = "./assets/pdfs/English Reader - 1 2025.pdf";
    const statusText = document.getElementById('pdf-progress');
    const loader = document.getElementById('pdf-loader');
    const flipbookEl = document.getElementById('flipbook');
    const controls = document.getElementById('flip-controls');

    try {
        statusText.innerText = "Loading Book Engine Requirements...";

        // 1. Fetch libraries from CDNs dynamically
        await Promise.all([
            loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"),
            loadScript("https://cdn.jsdelivr.net/npm/page-flip/dist/js/page-flip.browser.js")
        ]);

        // 2. Setup PDF.js
        const pdfjsLib = window['pdfjs-dist/build/pdf'];
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

        statusText.innerText = "Downloading High-Res English Reader PDF...";
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;

        statusText.innerText = `Preparing ${numPages} Pages...`;

        // 3. Render HTML structure for the book pages
        for (let i = 1; i <= numPages; i++) {
            const pageDiv = document.createElement('div');
            pageDiv.className = 'book-page';
            // Each page has a canvas ready to be drawn
            pageDiv.innerHTML = '<div class="page-content"><canvas id="canvas-page-' + i + '"></canvas></div>';
            flipbookEl.appendChild(pageDiv);
        }

        flipbookEl.style.display = 'block';

        // 4. Initialize St.PageFlip
        const pageFlip = new St.PageFlip(flipbookEl, {
            width: 500, // base page width
            height: 650, // base page height
            size: "stretch",
            minWidth: 315,
            maxWidth: 1000,
            minHeight: 420,
            maxHeight: 1350,
            maxShadowOpacity: 0.6,
            showCover: true,
            mobileScrollSupport: false
        });

        // Load the nodes we just created
        pageFlip.loadFromHTML(document.querySelectorAll('.book-page'));

        // 5. Setup Interactive Controls
        document.getElementById('btn-prev').addEventListener('click', () => pageFlip.flipPrev());
        document.getElementById('btn-next').addEventListener('click', () => pageFlip.flipNext());

        // Use a high-quality real page turn Audio file downloaded locally
        const flipSound = new Audio('./assets/audio/page-flip.mp3');
        flipSound.volume = 0.5;

        function playFlipSound() {
            // Reset to 0 so fast consecutive flips still play sound instantly
            flipSound.currentTime = 0;
            flipSound.play().catch(e => console.log('Audio play blocked or failed', e));
        }

        pageFlip.on('flip', (e) => {
            document.getElementById('page-counter').innerText = (e.data + 1) + " / " + numPages;
            playFlipSound(); // Play the crisp paper turn sound!
        });
        document.getElementById('page-counter').innerText = "1 / " + numPages;

        // Ambience Toggle Logic
        let isDarkMode = false;
        document.getElementById('btn-ambience').addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            const container = document.getElementById('fb-main-container');
            const icon = document.getElementById('ambience-icon');
            const text = document.getElementById('ambience-text');
            if (isDarkMode) {
                container.classList.add('dark-mode');
                icon.innerText = '☀️';
                text.innerText = 'Turn Lights On';
            } else {
                container.classList.remove('dark-mode');
                icon.innerText = '🌙';
                text.innerText = 'Turn Lights Off';
            }
        });

        // 6. Native Page Rendering Implementation
        statusText.innerText = "Rendering High Quality Pages...";

        const renderedPages = new Set();
        async function renderPageToCanvas(pageNum) {
            if (renderedPages.has(pageNum)) return;
            renderedPages.add(pageNum);

            const page = await pdf.getPage(pageNum);
            const canvas = document.getElementById('canvas-page-' + pageNum);
            if (!canvas) return;

            const context = canvas.getContext('2d', { alpha: false });
            // Scale by 2.0 for higher DPI Retina readability
            const viewport = page.getViewport({ scale: window.devicePixelRatio || 2.0 });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Fill white background natively
            context.fillStyle = '#ffffff';
            context.fillRect(0, 0, canvas.width, canvas.height);

            const renderContext = { canvasContext: context, viewport: viewport };
            await page.render(renderContext).promise;
        }

        // Render first 4 pages synchronously to get user reading fast
        const initialPages = Math.min(4, numPages);
        for (let i = 1; i <= initialPages; i++) {
            await renderPageToCanvas(i);
        }

        // Hide Loader, Show Controls
        loader.style.opacity = '0';
        controls.style.display = 'flex';
        setTimeout(() => loader.style.display = 'none', 500);

        // Render the remaining pages in the background sequentially using an async queue
        let queuePage = initialPages + 1;
        async function processQueue() {
            if (queuePage > numPages) return;
            await renderPageToCanvas(queuePage);
            queuePage++;
            requestAnimationFrame(processQueue); // don't block main thread too heavily
        }
        processQueue();

    } catch (error) {
        console.error("Flipbook Error:", error);
        statusText.innerText = "Error loading interactive reading experience.";
        statusText.style.color = "#ef4444";
        loader.querySelector('.loader-spinner').style.display = 'none';
    }
}
