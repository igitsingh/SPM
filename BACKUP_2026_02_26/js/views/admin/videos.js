import { videoApi } from '../../services/video-api.js';

export async function renderAdminVideos() {
    let videos = [];
    try {
        videos = await videoApi.getAll();
    } catch (e) {
        console.error("Failed to fetch videos", e);
    }

    setTimeout(() => {
        setupAdminVideoInteractions();
    }, 100);

    return `
        <div class="spm-main-content">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 class="spm-heading text-2xl">Video Library</h1>
                    <p class="text-gray-500 text-sm">Manage educational videos and content.</p>
                </div>
                <button id="add-video-btn" class="spm-btn spm-btn-primary">+ Add New Video</button>
            </div>

            <!-- Filters -->
             <div class="spm-card mb-6 p-4 flex gap-4 items-center flex-wrap">
                <input type="text" id="vid-search" placeholder="Search by Title, Subject..." class="spm-input flex-1 min-w-[200px]" />
                <select id="vid-filter-class" class="spm-select w-40">
                   <option value="">All Classes</option>
                   ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(c => `<option value="Class ${c}">Class ${c}</option>`).join('')}
                </select>
                <button id="vid-refresh-btn" class="spm-btn spm-btn-secondary">🔄</button>
            </div>

            <div class="spm-card overflow-hidden p-0">
                <div class="overflow-x-auto">
                    <table class="spm-table w-full">
                        <thead class="bg-gray-50 border-b">
                            <tr>
                                <th class="p-4 text-left font-semibold text-gray-600">Thumbnail</th>
                                <th class="p-4 text-left font-semibold text-gray-600">Title / Details</th>
                                <th class="p-4 text-left font-semibold text-gray-600">Class & Subject</th>
                                <th class="p-4 text-left font-semibold text-gray-600">Views</th>
                                <th class="p-4 text-right font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="admin-video-list">
                            ${renderVideoRows(videos)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Add/Edit Video Modal -->
        <div id="video-modal" class="modal-overlay" style="display: none; align-items: center; justify-content: center; z-index: 2000;">
            <div class="spm-card w-full max-w-lg p-0 overflow-hidden animate-slide-up">
                 <div class="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                    <h3 id="modal-title" class="font-bold text-lg">Add New Video</h3>
                    <button id="close-modal-btn" class="text-2xl hover:text-red-500">&times;</button>
                </div>
                <div class="p-6">
                    <form id="video-form" class="space-y-4">
                        <input type="hidden" name="id" id="video-id">
                        
                        <div>
                            <label class="block mb-1 font-medium text-sm">Video Title *</label>
                            <input type="text" name="title" required placeholder="e.g. Real Numbers Part 1" class="spm-input w-full">
                        </div>
                         <div>
                            <label class="block mb-1 font-medium text-sm">YouTube URL *</label>
                            <input type="url" name="youtubeUrl" required placeholder="https://www.youtube.com/watch?v=..." class="spm-input w-full">
                        </div>
                        <div>
                            <label class="block mb-1 font-medium text-sm">Description</label>
                            <textarea name="description" rows="3" class="spm-input w-full" placeholder="Brief details about the video..."></textarea>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block mb-1 font-medium text-sm">Class *</label>
                                <select name="class" required class="spm-select w-full">
                                    <option value="">Select</option>
                                    ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(c => `<option value="Class ${c}">Class ${c}</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="block mb-1 font-medium text-sm">Subject *</label>
                                <input type="text" name="subject" required placeholder="e.g. Maths" class="spm-input w-full">
                            </div>
                        </div>

                        <div class="flex justify-end gap-3 pt-4 border-t mt-4">
                            <button type="button" id="cancel-btn" class="spm-btn spm-btn-secondary">Cancel</button>
                            <button type="submit" class="spm-btn spm-btn-primary">Save Video</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

function renderVideoRows(videos) {
    if (!videos || videos.length === 0) return '<tr><td colspan="5" class="p-8 text-center text-gray-500">No videos found.</td></tr>';

    return videos.map(video => `
        <tr class="border-b hover:bg-gray-50 transition-colors">
            <td class="p-4">
                <img src="${video.thumbnail}" alt="Thumb" class="w-24 h-14 object-cover rounded shadow-sm bg-gray-200" onerror="this.src='https://via.placeholder.com/150'">
            </td>
            <td class="p-4">
                <a href="${video.url}" target="_blank" class="font-medium text-blue-800 hover:text-blue-600 block mb-1">
                    ${video.title}
                </a>
                <div class="text-xs text-gray-500 line-clamp-2 max-w-[250px]">${video.description || 'No description provided.'}</div>
            </td>
            <td class="p-4">
                <span class="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-semibold mb-1">${video.class}</span>
                <div class="text-xs text-gray-600 font-medium">${video.subject}</div>
            </td>
            <td class="p-4 text-sm text-gray-600">${video.views || 0}</td>
            <td class="p-4 text-right space-x-2">
                <button class="edit-video-btn text-blue-600 hover:text-blue-800 text-sm font-medium p-1 hover:bg-blue-50 rounded" 
                    data-json='${JSON.stringify(video).replace(/'/g, "&#39;")}'>Edit</button>
                <button class="delete-video-btn text-red-600 hover:text-red-800 text-sm font-medium p-1 hover:bg-red-50 rounded" data-id="${video.id}">Delete</button>
            </td>
        </tr>
    `).join('');
}

function setupAdminVideoInteractions() {
    const modal = document.getElementById('video-modal');
    const form = document.getElementById('video-form');
    const modalTitle = document.getElementById('modal-title');
    const addBtn = document.getElementById('add-video-btn');
    const closeBtn = document.getElementById('close-modal-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    const searchInput = document.getElementById('vid-search');
    const filterClass = document.getElementById('vid-filter-class');
    const refreshBtn = document.getElementById('vid-refresh-btn');
    const tableBody = document.getElementById('admin-video-list');

    // --- Search & Filter ---
    let filters = {};

    async function refreshTable() {
        try {
            const videos = await videoApi.getAll(filters);
            tableBody.innerHTML = renderVideoRows(videos);
            attachRowListeners();
        } catch (e) { console.error(e); }
    }

    const handleFilter = () => {
        filters = {
            search: searchInput.value,
            class: filterClass.value
        };
        refreshTable();
    };

    let timeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(handleFilter, 300);
    });
    filterClass.addEventListener('change', handleFilter);
    refreshBtn.addEventListener('click', refreshTable);

    // --- Modal ---
    function openModal(video = null) {
        form.reset();
        if (video) {
            modalTitle.textContent = 'Edit Video';
            for (let key in video) {
                if (form.elements[key]) form.elements[key].value = video[key];
            }
            // Must set YOUTUBE URL explicitly if it's derived? 
            // The backend stores 'url' (embed) and 'youtubeId'. It doesn't store original 'youtubeUrl' in DTO form.
            // But we can reconstruct it from 'youtubeId' if needed, OR just leave it empty and let user paste new one if they want to change it.
            // Better: Reconstruct.
            if (form.elements['youtubeUrl'] && video.youtubeId) {
                form.elements['youtubeUrl'].value = `https://www.youtube.com/watch?v=${video.youtubeId}`;
            }
        } else {
            modalTitle.textContent = 'Add New Video';
            form.elements['id'].value = '';
        }
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
        form.reset();
    }

    addBtn.addEventListener('click', () => openModal(null));
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            if (data.id) {
                await videoApi.update(data.id, data);
            } else {
                delete data.id;
                await videoApi.create(data);
            }
            closeModal();
            refreshTable();
            alert('Video saved successfully!');
        } catch (err) {
            alert('Error: ' + err.message);
        }
    });

    // --- Row Actions ---
    function attachRowListeners() {
        document.querySelectorAll('.edit-video-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const video = JSON.parse(btn.dataset.json);
                openModal(video);
            });
        });

        document.querySelectorAll('.delete-video-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (confirm('Are you sure you want to delete this video?')) {
                    const id = btn.dataset.id;
                    try {
                        await videoApi.delete(id);
                        refreshTable();
                    } catch (err) { alert('Failed to delete'); }
                }
            });
        });
    }

    attachRowListeners();
}
