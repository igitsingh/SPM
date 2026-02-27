// ── Video Library ─────────────────────────────────────────────────────────────
// Real educational videos organised by chapter

const VIDEO_DATA = [
    {
        chapter: 'Chapter 1 — You Sow, Shall You Reap',
        chapterSlug: 'ch1',
        color: '#7c3aed',
        accent: '#4c1d95',
        videos: [
            { id: 1, title: 'You Sow, Shall You Reap — Title', file: '01_You Sow, Shall You Reap_TITLE.mp4', duration: '' },
            { id: 2, title: 'An Elegant Parchment', file: '02_An_elegant_parchment_202512031806.mp4', duration: '' },
            { id: 3, title: 'Inside a Bright Room', file: '03_Inside_a_bright_202512030813.mp4', duration: '' },
            { id: 4, title: 'A Sunny Palace', file: '04_A_sunny_palace_202512030813.mp4', duration: '' },
            { id: 5, title: 'Closeup of the Scene', file: '05_Closeup_of_the_202512030813.mp4', duration: '' },
            { id: 6, title: 'The Boy Smiles', file: '06_The_boy_smiles_202512030815.mp4', duration: '' },
            { id: 7, title: 'The Princess Mischievously', file: '07_The_princess_mischievously_202512030817.mp4', duration: '' },
            { id: 8, title: 'The Princess Sits', file: '08_The_princess_sits_202512030820.mp4', duration: '' },
            { id: 9, title: 'The Princess Returns', file: '09_The_princess_returns_202512030820.mp4', duration: '' },
            { id: 10, title: 'Flowers Sway Gently', file: '11_Flowers_sway_gently_202512030828.mp4', duration: '' },
        ],
        folder: 'Chapter-1 You Sow, Shall You Reap'
    },
    {
        chapter: "Chapter 2 — Balraj and his B's",
        chapterSlug: 'ch2',
        color: '#0891b2',
        accent: '#0c4a6e',
        videos: [
            { id: 11, title: 'A Warm Sunrise', file: '01_A_warm_sunrise_202512032346.mp4', duration: '' },
            { id: 12, title: 'A Soft-Focus Scene', file: '02_A_softfocus_scene_202512032347.mp4', duration: '' },
            { id: 13, title: "A Cozy Child's Room", file: '03_A_cozy_childs_202512032348.mp4', duration: '' },
            { id: 14, title: 'Balraj Neatly Arranging', file: '04_Balraj_neatly_arranging_202512032349.mp4', duration: '' },
            { id: 15, title: 'Balraj Brushing his Teeth', file: '05_Balraj_brushing_his_202512040007.mp4', duration: '' },
            { id: 16, title: 'Balraj Sitting On', file: '06_Balraj_sitting_on_202512040015.mp4', duration: '' },
            { id: 17, title: 'Father Gently Tucking In', file: '07_Father_gently_tucking_202512040206.mp4', duration: '' },
            { id: 18, title: 'A Hallway with Light', file: '08_A_hallway_with_202512040208.mp4', duration: '' },
            { id: 19, title: "Balraj and his B's", file: '09_Balraj_and_his_202512040223.mp4', duration: '' },
            { id: 20, title: 'Balraj Lying Peacefully', file: '10_Balraj_lying_peacefully_202512040232.mp4', duration: '' },
            { id: 21, title: 'A Dreamy Night', file: '11_A_dreamy_night_202512040245.mp4', duration: '' },
        ],
        folder: "Chapter-2 Balraj and his B's"
    }
];

// ── Main Render ───────────────────────────────────────────────────────────────
export async function renderVideoLibrary() {
    const totalVideos = VIDEO_DATA.reduce((s, c) => s + c.videos.length, 0);

    setTimeout(() => setupVideoLibraryInteractions(), 100);

    return `
        <div class="vl-page" id="vl-page">

            ${getStyles()}

            <!-- ── Hero ──────────────────────────────────────── -->
            <div class="vl-hero">
                <video class="vl-hero-video" autoplay muted loop playsinline>
                    <source src="./assets/videos/Chapter-1 You Sow, Shall You Reap/07_The_princess_mischievously_202512030817.mp4" type="video/mp4">
                </video>
                <div class="vl-hero-overlay"></div>
                <div class="vl-hero-content">
                    <div class="vl-hero-badge">
                        <span class="vl-hero-badge-dot"></span>
                        SPM Video Library
                    </div>
                    <h1 class="vl-hero-title">Watch & Learn with<br><span class="vl-hero-highlight">SPM Stories</span></h1>
                    <p class="vl-hero-subtitle">
                        <strong>${totalVideos} animated video lessons</strong> across
                        <strong>${VIDEO_DATA.length} chapters</strong> — bringing stories to life
                    </p>
                    <div class="vl-hero-stats">
                        ${VIDEO_DATA.map(ch => `
                        <div class="vl-hero-stat" style="--ch-color: ${ch.color}">
                            <span class="vl-hero-stat-num">${ch.videos.length}</span>
                            <span class="vl-hero-stat-label">${ch.chapter}</span>
                        </div>`).join('')}
                    </div>
                </div>
            </div>

            <!-- ── Chapters ──────────────────────────────────── -->
            <div class="vl-chapters-wrapper">
                ${VIDEO_DATA.map((chapter, ci) => `
                <section class="vl-chapter" id="chapter-${chapter.chapterSlug}">
                    <div class="vl-chapter-header">
                        <div class="vl-chapter-badge" style="background: ${chapter.color}20; color: ${chapter.color}; border: 1.5px solid ${chapter.color}40">
                            Chapter ${ci + 1}
                        </div>
                        <h2 class="vl-chapter-title">${chapter.chapter}</h2>
                        <span class="vl-chapter-count">${chapter.videos.length} clips</span>
                    </div>

                    <div class="vl-video-grid">
                        ${chapter.videos.map((vid, vi) => `
                        <div class="vl-vid-card" data-video-id="${vid.id}"
                             data-src="./assets/videos/${encodeFolder(chapter.folder)}/${encodeURIComponent(vid.file)}"
                             data-title="${vid.title}"
                             data-chapter="${chapter.chapter}"
                             style="--card-color: ${chapter.color}">
                            <div class="vl-vid-thumb">
                                <video class="vl-vid-preview" muted preload="metadata"
                                       src="./assets/videos/${encodeFolder(chapter.folder)}/${encodeURIComponent(vid.file)}#t=1">
                                </video>
                                <div class="vl-vid-play-btn">
                                    <svg viewBox="0 0 24 24" fill="white" width="28" height="28"><path d="M8 5v14l11-7z"/></svg>
                                </div>
                                <div class="vl-vid-num">${String(vi + 1).padStart(2, '0')}</div>
                            </div>
                            <div class="vl-vid-info">
                                <p class="vl-vid-title">${vid.title}</p>
                                <span class="vl-vid-chapter-tag" style="color: ${chapter.color}">${chapter.chapter.split('—')[0].trim()}</span>
                            </div>
                        </div>`).join('')}
                    </div>
                </section>`).join('')}
            </div>

            <!-- ── Video Modal ────────────────────────────────── -->
            <div class="vl-modal-backdrop" id="vl-modal" style="display:none">
                <div class="vl-modal">
                    <div class="vl-modal-header">
                        <div>
                            <p class="vl-modal-chapter" id="vl-modal-chapter"></p>
                            <h3 class="vl-modal-title" id="vl-modal-title"></h3>
                        </div>
                        <button class="vl-modal-close" id="vl-modal-close">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22"><path d="M18 6 6 18M6 6l12 12"/></svg>
                        </button>
                    </div>
                    <div class="vl-modal-video-wrap">
                        <video id="vl-modal-video" class="vl-modal-video" controls autoplay playsinline></video>
                    </div>
                    <div class="vl-modal-nav">
                        <button class="vl-modal-nav-btn" id="vl-prev-btn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="m15 18-6-6 6-6"/></svg>
                            Previous
                        </button>
                        <button class="vl-modal-nav-btn primary" id="vl-next-btn">
                            Next
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="m9 18 6-6-6-6"/></svg>
                        </button>
                    </div>
                </div>
            </div>

        </div>`;
}

function encodeFolder(folder) {
    return folder.split('/').map(p => encodeURIComponent(p)).join('/');
}

// ── Interactions ──────────────────────────────────────────────────────────────
function setupVideoLibraryInteractions() {
    // Flat list of all videos for prev/next
    const allVideos = VIDEO_DATA.flatMap(ch =>
        ch.videos.map(v => ({
            ...v,
            src: `./assets/videos/${ch.folder}/${v.file}`,
            chapter: ch.chapter
        }))
    );

    let currentIdx = 0;

    const modal = document.getElementById('vl-modal');
    const modalVideo = document.getElementById('vl-modal-video');
    const modalTitle = document.getElementById('vl-modal-title');
    const modalChapter = document.getElementById('vl-modal-chapter');
    const closeBtn = document.getElementById('vl-modal-close');
    const prevBtn = document.getElementById('vl-prev-btn');
    const nextBtn = document.getElementById('vl-next-btn');

    function openVideo(idx) {
        currentIdx = idx;
        const v = allVideos[idx];
        modalVideo.src = v.src;
        modalTitle.textContent = v.title;
        modalChapter.textContent = v.chapter;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        prevBtn.disabled = idx === 0;
        nextBtn.disabled = idx === allVideos.length - 1;
        modalVideo.load();
        modalVideo.play().catch(() => { });
    }

    function closeVideo() {
        modalVideo.pause();
        modalVideo.src = '';
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Card clicks
    document.querySelectorAll('.vl-vid-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.videoId);
            const idx = allVideos.findIndex(v => v.id === id);
            if (idx !== -1) openVideo(idx);
        });
    });

    // Hover preview
    document.querySelectorAll('.vl-vid-preview').forEach(vid => {
        const card = vid.closest('.vl-vid-card');
        card.addEventListener('mouseenter', () => { vid.play().catch(() => { }); });
        card.addEventListener('mouseleave', () => { vid.pause(); vid.currentTime = 1; });
    });

    // Nav
    prevBtn?.addEventListener('click', () => { if (currentIdx > 0) openVideo(currentIdx - 1); });
    nextBtn?.addEventListener('click', () => { if (currentIdx < allVideos.length - 1) openVideo(currentIdx + 1); });
    closeBtn?.addEventListener('click', closeVideo);
    modal?.addEventListener('click', e => { if (e.target === modal) closeVideo(); });

    // Keyboard
    document.addEventListener('keydown', e => {
        if (modal?.style.display === 'none') return;
        if (e.key === 'Escape') closeVideo();
        if (e.key === 'ArrowRight' && currentIdx < allVideos.length - 1) openVideo(currentIdx + 1);
        if (e.key === 'ArrowLeft' && currentIdx > 0) openVideo(currentIdx - 1);
    });

    // Auto-play next
    modalVideo?.addEventListener('ended', () => {
        if (currentIdx < allVideos.length - 1) openVideo(currentIdx + 1);
    });

    // Handle deep linking to specific video via hash parameters
    const hashParts = window.location.hash.split('?');
    if (hashParts.length > 1) {
        const urlParams = new URLSearchParams(hashParts[1]);
        const videoId = parseInt(urlParams.get('video'));
        if (!isNaN(videoId)) {
            const targetIdx = allVideos.findIndex(v => v.id === videoId);
            if (targetIdx !== -1) {
                // adding a tiny delay to ensure DOM and animations handle it smoothly
                setTimeout(() => openVideo(targetIdx), 200);
            }
        }
    }
}

// ── Styles ────────────────────────────────────────────────────────────────────
function getStyles() {
    return `<style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;900&display=swap');

        .vl-page { font-family: 'Inter', sans-serif; background: #f8f9fc; }

        /* ── Hero ── */
        .vl-hero {
            position: relative;
            height: 520px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
        .vl-hero-video {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 0;
        }
        .vl-hero-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(15,10,50,0.82) 0%, rgba(30,20,80,0.70) 100%);
            z-index: 1;
        }
        .vl-hero-content {
            position: relative;
            z-index: 2;
            text-align: center;
            padding: 0 24px;
            max-width: 800px;
        }
        .vl-hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255,255,255,0.12);
            border: 1px solid rgba(255,255,255,0.25);
            color: white;
            padding: 6px 16px;
            border-radius: 100px;
            font-size: 0.8rem;
            font-weight: 600;
            letter-spacing: 0.5px;
            margin-bottom: 20px;
        }
        .vl-hero-badge-dot {
            width: 8px; height: 8px;
            border-radius: 50%;
            background: #22c55e;
            box-shadow: 0 0 8px #22c55e;
            animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        .vl-hero-title {
            font-family: 'Playfair Display', serif;
            font-size: 3.4rem;
            font-weight: 900;
            color: white;
            line-height: 1.1;
            margin-bottom: 16px;
        }
        .vl-hero-highlight { color: #FFD700; }
        .vl-hero-subtitle {
            color: rgba(255,255,255,0.8);
            font-size: 1.1rem;
            margin-bottom: 32px;
        }
        .vl-hero-stats {
            display: flex;
            justify-content: center;
            gap: 16px;
            flex-wrap: wrap;
        }
        .vl-hero-stat {
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 12px;
            padding: 12px 20px;
            backdrop-filter: blur(8px);
            text-align: left;
        }
        .vl-hero-stat-num {
            display: block;
            font-size: 1.6rem;
            font-weight: 900;
            color: var(--ch-color, white);
            line-height: 1;
        }
        .vl-hero-stat-label {
            font-size: 0.75rem;
            color: rgba(255,255,255,0.7);
            font-weight: 500;
        }

        /* ── Chapters ── */
        .vl-chapters-wrapper {
            max-width: 1280px;
            margin: 0 auto;
            padding: 48px 24px 80px;
        }
        .vl-chapter { margin-bottom: 60px; }
        .vl-chapter-header {
            display: flex;
            align-items: center;
            gap: 14px;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 2px solid #e5e7eb;
        }
        .vl-chapter-badge {
            padding: 4px 12px;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            flex-shrink: 0;
        }
        .vl-chapter-title {
            font-size: 1.35rem;
            font-weight: 800;
            color: #111827;
            flex: 1;
        }
        .vl-chapter-count {
            font-size: 0.85rem;
            color: #9ca3af;
            font-weight: 500;
            flex-shrink: 0;
        }

        /* ── Video Grid ── */
        .vl-video-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 20px;
        }
        .vl-vid-card {
            background: white;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 2px 12px rgba(0,0,0,0.07);
            cursor: pointer;
            transition: transform 0.25s, box-shadow 0.25s;
        }
        .vl-vid-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 28px rgba(0,0,0,0.13);
        }
        .vl-vid-thumb {
            position: relative;
            aspect-ratio: 16/9;
            background: #0f0f1a;
            overflow: hidden;
        }
        .vl-vid-preview {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.4s;
        }
        .vl-vid-card:hover .vl-vid-preview { transform: scale(1.05); }
        .vl-vid-play-btn {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0,0,0,0.3);
            opacity: 0;
            transition: opacity 0.2s;
        }
        .vl-vid-play-btn svg {
            filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
            transform: scale(1.5);
        }
        .vl-vid-card:hover .vl-vid-play-btn { opacity: 1; }
        .vl-vid-num {
            position: absolute;
            top: 8px;
            left: 10px;
            font-size: 0.7rem;
            font-weight: 800;
            color: white;
            background: rgba(0,0,0,0.5);
            padding: 2px 7px;
            border-radius: 5px;
            letter-spacing: 0.5px;
        }
        .vl-vid-info {
            padding: 12px 14px 14px;
        }
        .vl-vid-title {
            font-size: 0.9rem;
            font-weight: 700;
            color: #111827;
            line-height: 1.35;
            margin-bottom: 4px;
        }
        .vl-vid-chapter-tag {
            font-size: 0.72rem;
            font-weight: 600;
        }

        /* ── Modal ── */
        .vl-modal-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.88);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            backdrop-filter: blur(6px);
            animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        .vl-modal {
            background: #0f0f1a;
            border-radius: 20px;
            width: 100%;
            max-width: 900px;
            overflow: hidden;
            box-shadow: 0 30px 80px rgba(0,0,0,0.6);
            animation: slideUp 0.25s ease;
        }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .vl-modal-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            padding: 20px 24px 16px;
        }
        .vl-modal-chapter {
            font-size: 0.75rem;
            font-weight: 600;
            color: #FFD700;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 4px;
        }
        .vl-modal-title {
            font-size: 1.2rem;
            font-weight: 800;
            color: white;
        }
        .vl-modal-close {
            background: rgba(255,255,255,0.1);
            border: none;
            border-radius: 8px;
            color: white;
            width: 38px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            flex-shrink: 0;
            transition: background 0.2s;
        }
        .vl-modal-close:hover { background: rgba(255,255,255,0.2); }
        .vl-modal-video-wrap {
            width: 100%;
            aspect-ratio: 16/9;
            background: black;
        }
        .vl-modal-video {
            width: 100%;
            height: 100%;
            display: block;
        }
        .vl-modal-nav {
            display: flex;
            gap: 12px;
            padding: 16px 24px;
            justify-content: space-between;
        }
        .vl-modal-nav-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 10px 20px;
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 10px;
            background: transparent;
            color: rgba(255,255,255,0.7);
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        .vl-modal-nav-btn:hover:not(:disabled) {
            background: rgba(255,255,255,0.1);
            color: white;
        }
        .vl-modal-nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .vl-modal-nav-btn.primary {
            background: #FFD700;
            color: #0f0f1a;
            border-color: #FFD700;
        }
        .vl-modal-nav-btn.primary:hover:not(:disabled) {
            background: #fbbf24;
            border-color: #fbbf24;
        }
    </style>`;
}
