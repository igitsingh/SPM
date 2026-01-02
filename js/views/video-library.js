import { videoApi } from '../services/video-api.js';

export async function renderVideoLibrary() {
    let videos = [];
    try {
        videos = await videoApi.getAll();
    } catch (e) {
        console.error("Failed to load videos", e);
    }

    // Fallback or Empty state handled by renderVideoCards

    // Collect unique classes and subjects for filter chips
    const classes = [...new Set(videos.map(v => v.class))].filter(Boolean).sort();
    const subjects = [...new Set(videos.map(v => v.subject))].filter(Boolean).sort();
    const allFilters = ['All', ...classes, ...subjects];

    setTimeout(() => {
        setupVideoInteractions(videos); // Pass videos to setup
    }, 100);

    return `
        <div class="video-library-container" style="background: #f9f9f9; min-height: 100vh; padding-top: 20px;">
            
            <!-- Filter Chips Bar -->
            <div class="container sticky-chips" style="position: sticky; top: 90px; z-index: 90; background: #f9f9f9; padding: 10px 0 20px;">
                <div class="chips-wrapper" style="display: flex; gap: 12px; overflow-x: auto; padding-bottom: 5px; scrollbar-width: none;">
                    ${allFilters.map((filter, index) => `
                        <button class="chip-btn ${index === 0 ? 'active' : ''}" data-filter="${filter}">
                            ${filter}
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- Video Grid -->
            <div class="container">
                <div id="video-grid" class="video-grid">
                    ${renderVideoCards(videos)}
                </div>
            </div>

            <!-- Video Player Modal -->
            <div id="video-modal" class="modal-overlay" style="display: none; align-items: center; justify-content: center; z-index: 2000;">
                <div class="video-modal-content" style="background: black; width: 90%; max-width: 1000px; aspect-ratio: 16/9; position: relative; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                    <button id="close-video" style="position: absolute; top: 10px; right: 20px; color: white; background: rgba(0,0,0,0.5); border: none; font-size: 2rem; cursor: pointer; z-index: 10; padding: 5px 15px; border-radius: 50%;">&times;</button>
                    <iframe id="video-frame" src="" width="100%" height="100%" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
            </div>

            <style>
                .chip-btn {
                    padding: 8px 16px;
                    border-radius: 8px;
                    background: #e5e5e5;
                    border: none;
                    font-size: 0.95rem;
                    font-weight: 500;
                    color: #0f0f0f;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: all 0.2s ease;
                }
                .chip-btn:hover {
                    background: #d9d9d9;
                }
                .chip-btn.active {
                    background: #0f0f0f;
                    color: white;
                }

                .video-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 24px;
                    padding-bottom: 60px;
                }

                .video-card {
                    cursor: pointer;
                    transition: transform 0.2s;
                }
                .video-card:hover {
                    transform: scale(1.02);
                }

                .thumbnail-wrapper {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 16/9;
                    background: #ccc;
                    border-radius: 12px;
                    overflow: hidden;
                    margin-bottom: 12px;
                }
                .thumbnail-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .duration-badge {
                    position: absolute;
                    bottom: 8px;
                    right: 8px;
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 3px 6px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    font-weight: 600;
                }
                
                .video-info {
                    display: flex;
                    gap: 12px;
                }
                .channel-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: #1565C0;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 0.8rem;
                    flex-shrink: 0;
                }
                
                .video-details h3 {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #0f0f0f;
                    margin-bottom: 4px;
                    line-height: 1.4;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .video-meta {
                    font-size: 0.85rem;
                    color: #606060;
                }
                .video-meta span {
                    display: block;
                }
            </style>
        </div>
    `;
}

function renderVideoCards(videoList) {
    if (videoList.length === 0) {
        return `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">No videos found for this category.</div>`;
    }
    return videoList.map(video => `
        <div class="video-card" data-id="${video.id}" data-url="${video.url}">
            <div class="thumbnail-wrapper">
                <img src="${video.thumbnail}" class="thumbnail-img" alt="${video.title}" onerror="this.src='https://via.placeholder.com/640x360?text=SPM+Video'">
                <div class="duration-badge">${video.duration}</div>
            </div>
            <div class="video-info">
                <div class="channel-icon">SPM</div>
                <div class="video-details">
                    <h3>${video.title}</h3>
                    <div class="video-meta">
                        <span>${video.author}</span>
                        <span>${video.views} views • ${video.uploadDate}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function setupVideoInteractions(videos) {
    const grid = document.getElementById('video-grid');
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-frame');
    const closeBtn = document.getElementById('close-video');
    const chips = document.querySelectorAll('.chip-btn');

    // Filter Logic
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            // UI Active State
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const filter = chip.dataset.filter;
            let filteredVideos = videos;
            if (filter !== 'All') {
                filteredVideos = videos.filter(v => v.class === filter || v.subject === filter);
            }
            grid.innerHTML = renderVideoCards(filteredVideos);

            // Re-attach click listeners to new cards
            attachCardListeners();
        });
    });

    function attachCardListeners() {
        const cards = document.querySelectorAll('.video-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const url = card.dataset.url;
                iframe.src = url + "?autoplay=1";
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Stop background scrolling
            });
        });
    }

    // Modal Close
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        iframe.src = ""; // Stop video
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            iframe.src = "";
            document.body.style.overflow = '';
        }
    });

    // Initial Attach
    attachCardListeners();
}
