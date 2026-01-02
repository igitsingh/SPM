import { catalogueApi } from '../../services/catalogue-api.js';

export async function renderAdminCatalogue() {
    let books = [];
    try {
        books = await catalogueApi.getAll();
    } catch (e) { console.error(e); }

    setTimeout(setupCatalogueInteractions, 100);

    return `
        <div class="spm-main-content">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 class="spm-heading text-2xl">Catalogue Management</h1>
                    <p class="text-gray-500 text-sm">Manage books, pricing, and inventory.</p>
                </div>
                <div class="flex gap-3">
                     <input type="file" id="bulk-upload-input" accept=".csv" style="display: none;" />
                     <button id="bulk-upload-btn" class="spm-btn spm-btn-secondary">📤 Bulk Upload (CSV)</button>
                     <button id="add-book-btn" class="spm-btn spm-btn-primary">+ Add New Book</button>
                </div>
            </div>

            <!-- Filters -->
            <div class="spm-card mb-6 p-4 flex flex-wrap gap-4 items-center">
                <input type="text" id="cat-search" placeholder="Search by Title, Code, Subject..." class="spm-input flex-1 min-w-[200px]" />
                <select id="cat-filter-board" class="spm-select w-40">
                    <option value="">All Boards</option>
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="UP Board">UP Board</option>
                </select>
                <select id="cat-filter-class" class="spm-select w-40">
                   <option value="">All Classes</option>
                   ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(c => `<option value="${c}">Class ${c}</option>`).join('')}
                </select>
                <button id="cat-refresh-btn" class="spm-btn spm-btn-secondary">🔄</button>
            </div>

            <!-- Table -->
            <div class="spm-card overflow-hidden p-0" style="min-height: 400px;">
                <div class="overflow-x-auto">
                    <table class="spm-table w-full">
                        <thead class="bg-gray-50 border-b">
                            <tr>
                                <th class="p-4 text-left font-semibold text-gray-600">Code</th>
                                <th class="p-4 text-left font-semibold text-gray-600">Title / Category</th>
                                <th class="p-4 text-left font-semibold text-gray-600">Details</th>
                                <th class="p-4 text-right font-semibold text-gray-600">Price (MRP / PTR)</th>
                                <th class="p-4 text-center font-semibold text-gray-600">Stock</th>
                                <th class="p-4 text-right font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="catalogue-table-body">
                            ${renderBookRows(books)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Add/Edit Modal -->
        <div id="book-modal" class="modal-overlay" style="display: none; align-items: center; justify-content: center; z-index: 2000;">
            <div class="spm-card w-full max-w-2xl p-0 overflow-hidden animate-slide-up">
                <div class="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                    <h3 id="modal-title" class="font-bold text-lg">Add New Book</h3>
                    <button id="close-modal-btn" class="text-2xl hover:text-red-500">&times;</button>
                </div>
                <div class="p-6 max-h-[80vh] overflow-y-auto">
                    <form id="book-form" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="hidden" name="id" id="book-id">
                        
                        <div class="col-span-1 md:col-span-2 space-y-2">
                            <label class="font-medium text-sm">Book Title *</label>
                            <input type="text" name="title" required class="spm-input w-full" placeholder="e.g. Master Mathematics Vol 1">
                        </div>

                        <div class="space-y-2">
                            <label class="font-medium text-sm">Product Code (Unique) *</label>
                            <input type="text" name="code" required class="spm-input w-full" placeholder="e.g. SPM-MATH-10">
                        </div>

                         <div class="space-y-2">
                            <label class="font-medium text-sm">Stock Quantity</label>
                            <input type="number" name="stock" required min="0" class="spm-input w-full" value="0">
                        </div>

                        <div class="space-y-2">
                            <label class="font-medium text-sm">Retail Price (MRP) *</label>
                            <input type="number" name="priceRetail" required min="0" step="0.01" class="spm-input w-full" placeholder="0.00">
                        </div>

                         <div class="space-y-2">
                            <label class="font-medium text-sm">Partner Price (PTR) *</label>
                            <input type="number" name="pricePartner" required min="0" step="0.01" class="spm-input w-full" placeholder="0.00">
                        </div>

                        <div class="space-y-2">
                            <label class="font-medium text-sm">Board</label>
                            <select name="board" class="spm-select w-full">
                                <option value="CBSE">CBSE</option>
                                <option value="ICSE">ICSE</option>
                                <option value="UP Board">UP Board</option>
                            </select>
                        </div>

                        <div class="space-y-2">
                            <label class="font-medium text-sm">Class</label>
                            <select name="class" class="spm-select w-full">
                                <option value="">Select Class</option>
                                ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(c => `<option value="${c}">${c}</option>`).join('')}
                            </select>
                        </div>

                         <div class="space-y-2">
                            <label class="font-medium text-sm">Subject</label>
                            <input type="text" name="subject" class="spm-input w-full" placeholder="e.g. Mathematics">
                        </div>

                        <div class="space-y-2">
                            <label class="font-medium text-sm">Category</label>
                            <select name="category" class="spm-select w-full">
                                <option value="Textbook">Textbook</option>
                                <option value="Guide">Guide</option>
                                <option value="Workbook">Workbook</option>
                                <option value="Sample Papers">Sample Papers</option>
                            </select>
                        </div>
                        
                         <div class="col-span-1 md:col-span-2 space-y-2">
                            <label class="font-medium text-sm">Cover Image URL</label>
                            <input type="url" name="coverImage" class="spm-input w-full" placeholder="https://...">
                        </div>

                        <div class="col-span-1 md:col-span-2 pt-4 flex justify-end gap-3 border-t mt-4">
                            <button type="button" id="cancel-btn" class="spm-btn spm-btn-secondary">Cancel</button>
                            <button type="submit" class="spm-btn spm-btn-primary px-6">Save Book</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

function renderBookRows(books) {
    if (!books || books.length === 0) {
        return `<tr><td colspan="6" class="p-8 text-center text-gray-500">No books found matching your criteria.</td></tr>`;
    }

    return books.map(book => `
        <tr class="border-b hover:bg-gray-50 transition-colors">
            <td class="p-4 font-mono text-sm text-gray-600">${book.code}</td>
            <td class="p-4">
                <div class="font-medium text-gray-900">${book.title}</div>
                <div class="text-xs text-gray-500 mt-1">${book.category || 'General'}</div>
            </td>
            <td class="p-4">
                <div class="flex flex-wrap gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700">${book.board || 'N/A'}</span>
                    <span class="px-2 py-0.5 rounded text-xs font-semibold bg-green-50 text-green-700">Cl ${book.class || '-'}</span>
                </div>
                <div class="text-xs text-gray-500 mt-1">${book.subject || ''}</div>
            </td>
            <td class="p-4 text-right">
                <div class="font-mono text-sm">₹${book.priceRetail}</div>
                <div class="text-xs text-gray-400">PTR: ₹${book.pricePartner}</div>
            </td>
            <td class="p-4 text-center">
                <span class="inline-block px-2 py-1 rounded-full text-xs font-bold ${book.stock < 20 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}">
                    ${book.stock}
                </span>
            </td>
            <td class="p-4 text-right space-x-2">
                <button class="edit-book-btn text-blue-600 hover:text-blue-800 text-sm font-medium" 
                    data-json='${JSON.stringify(book).replace(/'/g, "&#39;")}'>Edit</button>
                <button class="delete-book-btn text-red-600 hover:text-red-800 text-sm font-medium" data-id="${book.id}">Delete</button>
            </td>
        </tr>
    `).join('');
}

function setupCatalogueInteractions() {
    // --- Elements ---
    const searchInput = document.getElementById('cat-search');
    const filterBoard = document.getElementById('cat-filter-board');
    const filterClass = document.getElementById('cat-filter-class');
    const refreshBtn = document.getElementById('cat-refresh-btn');
    const tableBody = document.getElementById('catalogue-table-body');

    const modal = document.getElementById('book-modal');
    const form = document.getElementById('book-form');
    const modalTitle = document.getElementById('modal-title');
    const addBtn = document.getElementById('add-book-btn');
    const closeBtn = document.getElementById('close-modal-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    const bulkBtn = document.getElementById('bulk-upload-btn');
    const bulkInput = document.getElementById('bulk-upload-input');

    // --- State ---
    let currentFilters = {};

    // --- Search/Filter Logic ---
    async function refreshTable() {
        // tableBody.innerHTML = '<tr><td colspan="6" class="text-center p-4">Loading...</td></tr>';
        try {
            const books = await catalogueApi.getAll(currentFilters);
            tableBody.innerHTML = renderBookRows(books);
            attachRowListeners();
        } catch (e) { console.error(e); }
    }

    const handleFilterChange = () => {
        currentFilters = {
            search: searchInput.value,
            board: filterBoard.value,
            class: filterClass.value
        };
        refreshTable();
    };

    searchInput.addEventListener('input', debounce(handleFilterChange, 300));
    filterBoard.addEventListener('change', handleFilterChange);
    filterClass.addEventListener('change', handleFilterChange);
    refreshBtn.addEventListener('click', refreshTable);

    // --- Modal Logic ---
    function openModal(book = null) {
        form.reset();
        if (book) {
            modalTitle.textContent = 'Edit Book';
            // Fill form
            for (const key in book) {
                if (form.elements[key]) form.elements[key].value = book[key];
            }
        } else {
            modalTitle.textContent = 'Add New Book';
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
        // Convert numbers
        data.priceRetail = parseFloat(data.priceRetail);
        data.pricePartner = parseFloat(data.pricePartner);
        data.stock = parseInt(data.stock);

        try {
            if (data.id) {
                await catalogueApi.update(data.id, data);
            } else {
                delete data.id;
                await catalogueApi.create(data);
            }
            closeModal();
            refreshTable();
            alert('Book saved successfully!');
        } catch (err) {
            alert('Error: ' + err.message);
        }
    });

    // --- Row Actions (Edit/Delete) ---
    function attachRowListeners() {
        document.querySelectorAll('.edit-book-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const book = JSON.parse(btn.dataset.json);
                openModal(book);
            });
        });

        document.querySelectorAll('.delete-book-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (confirm('Are you sure you want to delete this book?')) {
                    try {
                        await catalogueApi.delete(btn.dataset.id);
                        refreshTable();
                    } catch (e) { alert('Failed to delete'); }
                }
            });
        });
    }

    // --- Bulk Upload ---
    bulkBtn.addEventListener('click', () => bulkInput.click());
    bulkInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            const csv = e.target.result;
            // Simple CSV Parse (Assumes standard CSV)
            const lines = csv.split('\n').filter(l => l.trim());
            const headers = lines[0].split(',').map(h => h.trim());
            const books = [];

            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',');
                if (values.length < headers.length) continue;

                const book = {};
                headers.forEach((h, idx) => {
                    let val = values[idx]?.trim();
                    // Basic map based on header name (approximate)
                    if (h.toLowerCase().includes('price')) val = parseFloat(val);
                    else if (h.toLowerCase().includes('stock')) val = parseInt(val);

                    // Map CSV Headers to DTO keys needed?
                    // Use simple fixed mapping or smart check
                    if (h === 'code') book.code = val;
                    if (h === 'title') book.title = val;
                    if (h === 'class') book.class = val;
                    if (h === 'price') book.priceRetail = val;
                    if (h === 'stock') book.stock = val;
                    // ... etc. 
                    // For demo, assume CSV matches DTO keys
                    book[h] = val;
                });

                // Validate defaults
                if (!book.pricePartner && book.priceRetail) book.pricePartner = book.priceRetail * 0.7; // default
                books.push(book);
            }

            if (confirm(`Ready to upload ${books.length} books?`)) {
                try {
                    await catalogueApi.bulkCreate(books);
                    alert('Uploaded successfully!');
                    refreshTable();
                } catch (err) { alert('Upload failed: ' + err.message); }
            }
        };
        reader.readAsText(file);
    });

    // Initial Attach
    attachRowListeners();
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
