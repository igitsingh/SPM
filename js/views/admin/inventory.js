import { inventoryApi } from '../../services/inventory-api.js';
import { catalogueApi } from '../../services/catalogue-api.js';

export async function renderAdminInventory() {
    let logs = [];
    let lowStock = [];
    try {
        [logs, lowStock] = await Promise.all([
            inventoryApi.getLogs(20),
            inventoryApi.getLowStock()
        ]);
    } catch (e) { console.error(e); }

    // Safety check
    if (!Array.isArray(logs)) logs = [];
    if (!Array.isArray(lowStock)) lowStock = [];

    setTimeout(setupInventoryInteractions, 100);

    return `
        <div class="spm-main-content">
            <h1 class="spm-heading text-2xl font-bold mb-6">Inventory Management</h1>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                
                <!-- Quick Adjustment Panel -->
                <div class="spm-card h-full">
                    <h3 class="font-bold text-lg mb-4 border-b pb-2 flex items-center gap-2">
                        <span>📦</span> Stock Adjustment
                    </h3>
                    
                    <div class="relative mb-4">
                        <label class="block text-sm font-medium mb-1 text-gray-700">Search Book to Adjust</label>
                        <input type="text" id="inv-book-search" autocomplete="off" placeholder="Type book title or code..." class="spm-input w-full">
                        <div id="inv-search-results" class="absolute w-full bg-white shadow-lg border rounded mt-1 max-h-48 overflow-y-auto hidden z-50">
                            <!-- Results here -->
                        </div>
                    </div>

                    <div id="selected-book-panel" class="hidden bg-blue-50 p-4 rounded mb-4 border border-blue-100">
                        <div class="flex justify-between items-start">
                            <div>
                                <h4 id="sel-book-title" class="font-bold text-blue-900 text-sm"></h4>
                                <div class="text-xs text-blue-700 mt-1">
                                    Code: <span id="sel-book-code" class="font-mono"></span> | 
                                    Current Stock: <span id="sel-book-stock" class="font-bold text-lg ml-1"></span>
                                </div>
                            </div>
                            <button id="clear-sel-book" class="text-blue-400 hover:text-blue-700 text-lg leading-none">&times;</button>
                        </div>
                    </div>

                    <form id="adjust-stock-form" class="space-y-4 transition-opacity duration-200 opacity-50 pointer-events-none"> 
                        <input type="hidden" name="bookId" id="inv-book-id">
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-1 text-gray-700">Action</label>
                                <select name="type" class="spm-select w-full">
                                    <option value="IN">Add Stock (+)</option>
                                    <option value="OUT">Remove Stock (-)</option>
                                    <!-- <option value="ADJUST">Set Exact Amount</option> -->
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1 text-gray-700">Quantity</label>
                                <input type="number" name="quantity" min="1" value="1" required class="spm-input w-full">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1 text-gray-700">Reason / Note</label>
                            <input type="text" name="reason" placeholder="e.g. New Shipment, Damaged, etc." class="spm-input w-full">
                        </div>
                        <button type="submit" class="spm-btn spm-btn-primary w-full py-2">Update Stock</button>
                    </form>
                </div>

                <!-- Low Stock Alerts -->
                <div class="spm-card h-full flex flex-col">
                    <div class="flex justify-between items-center border-b pb-2 mb-4">
                        <h3 class="font-bold text-lg text-red-600 flex items-center gap-2">
                            <span>⚠️</span> Low Stock Alerts (< 20)
                        </h3>
                        <span class="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">${(lowStock || []).length}</span>
                    </div>
                    
                    <div class="overflow-y-auto flex-1 max-h-[300px]">
                        ${lowStock.length > 0 ? `
                            <table class="w-full text-sm text-left">
                                <thead class="bg-gray-50 text-gray-500 sticky top-0">
                                    <tr>
                                        <th class="p-2">Title</th>
                                        <th class="p-2 text-center">Stock</th>
                                        <th class="p-2 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${lowStock.map(book => `
                                        <tr class="border-b hover:bg-red-50 transition-colors">
                                            <td class="p-2 text-gray-700 truncate max-w-[200px]" title="${book.title}">
                                                <div class="font-medium">${book.title}</div>
                                                <div class="text-xs text-gray-400 font-mono">${book.code}</div>
                                            </td>
                                            <td class="p-2 text-center font-bold text-red-600">${book.stock}</td>
                                            <td class="p-2 text-right">
                                                <button class="quick-restock-btn text-blue-600 hover:text-blue-800 text-xs font-semibold px-2 py-1 border border-blue-200 rounded hover:bg-blue-50" 
                                                    data-id="${book.id}" 
                                                    data-title="${book.title}" 
                                                    data-code="${book.code}" 
                                                    data-stock="${book.stock}">Restock</button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        ` : '<div class="h-full flex flex-col items-center justify-center text-gray-400 p-8"><span class="text-2xl mb-2">✅</span><p>All stock levels are healthy.</p></div>'}
                    </div>
                </div>
            </div>

            <!-- Recent Activity Log -->
            <div class="spm-card">
                <h3 class="font-bold text-lg mb-4">Recent Activity Log</h3>
                <div class="overflow-x-auto">
                    <table class="spm-table w-full text-sm">
                        <thead class="bg-gray-50 text-gray-600">
                            <tr>
                                <th class="p-3 text-left">Date</th>
                                <th class="p-3 text-left">Book</th>
                                <th class="p-3 text-center">Type</th>
                                <th class="p-3 text-right">Qty</th>
                                <th class="p-3 text-left">Reason</th>
                            </tr>
                        </thead>
                        <tbody id="inventory-log-body">
                            ${logs.length > 0 ? logs.map(log => `
                                <tr class="border-b hover:bg-gray-50">
                                    <td class="p-3 text-gray-500 whitespace-nowrap">${new Date(log.createdAt).toLocaleString()}</td>
                                    <td class="p-3">
                                        <div class="font-medium text-gray-800">${log.book?.title || 'Unknown Book'}</div>
                                        <div class="text-xs text-gray-400 font-mono">${log.book?.code || ''}</div>
                                    </td>
                                    <td class="p-3 text-center">
                                        <span class="px-2 py-0.5 rounded text-xs font-bold ${log.type === 'IN' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">${log.type}</span>
                                    </td>
                                    <td class="p-3 text-right font-mono font-medium">${log.quantity}</td>
                                    <td class="p-3 text-gray-600 italic">${log.reason || '-'}</td>
                                </tr>
                            `).join('') : '<tr><td colspan="5" class="p-8 text-center text-gray-500">No activity logs found.</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function setupInventoryInteractions() {
    const searchInput = document.getElementById('inv-book-search');
    const resultsContainer = document.getElementById('inv-search-results');
    const selectedPanel = document.getElementById('selected-book-panel');
    const form = document.getElementById('adjust-stock-form');

    // Selecting
    const bookIdInput = document.getElementById('inv-book-id');
    const selTitle = document.getElementById('sel-book-title');
    const selCode = document.getElementById('sel-book-code');
    const selStock = document.getElementById('sel-book-stock');
    const clearBtn = document.getElementById('clear-sel-book');

    // Debounce Search
    let timeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(timeout);
        const term = searchInput.value.trim();
        if (term.length < 2) {
            resultsContainer.classList.add('hidden');
            return;
        }

        timeout = setTimeout(async () => {
            try {
                const books = await catalogueApi.getAll({ search: term });
                renderSearchResults(books);
            } catch (e) { }
        }, 300);
    });

    function renderSearchResults(books) {
        resultsContainer.innerHTML = '';
        if (books.length === 0) {
            resultsContainer.innerHTML = '<div class="p-3 text-gray-500 text-sm">No books found.</div>';
        } else {
            books.forEach(book => {
                const div = document.createElement('div');
                div.className = 'p-3 hover:bg-gray-100 cursor-pointer border-b last:border-0';
                div.innerHTML = `
                    <div class="font-medium text-sm text-gray-800">${book.title}</div>
                    <div class="text-xs text-gray-500 flex justify-between">
                        <span>${book.code}</span>
                        <span>Stock: ${book.stock}</span>
                    </div>
                `;
                div.addEventListener('click', () => selectBook(book));
                resultsContainer.appendChild(div);
            });
        }
        resultsContainer.classList.remove('hidden');
    }

    function selectBook(book) {
        bookIdInput.value = book.id;
        selTitle.textContent = book.title;
        selCode.textContent = book.code;
        selStock.textContent = book.stock;

        selectedPanel.classList.remove('hidden');
        resultsContainer.classList.add('hidden');
        searchInput.value = ''; // Clear search

        // Enable form
        form.classList.remove('opacity-50', 'pointer-events-none');
    }

    function clearSelection() {
        bookIdInput.value = '';
        selectedPanel.classList.add('hidden');
        form.classList.add('opacity-50', 'pointer-events-none');
        form.reset();
    }

    clearBtn.addEventListener('click', clearSelection);

    // Form Submit
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const type = formData.get('type');
        const qty = formData.get('quantity');
        const reason = formData.get('reason');
        const bookId = formData.get('bookId');

        try {
            await inventoryApi.adjustStock(bookId, type, qty, reason);
            alert('Stock updated successfully!');
            window.location.reload(); // Simple reload to refresh logs and stats
        } catch (err) {
            alert('Error: ' + err.message);
        }
    });

    // Quick Restock Buttons
    document.querySelectorAll('.quick-restock-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectBook({
                id: btn.dataset.id,
                title: btn.dataset.title,
                code: btn.dataset.code,
                stock: btn.dataset.stock
            });
            // Auto focus on quantity
            form.elements['quantity'].focus();
        });
    });

    // Close search on click outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.classList.add('hidden');
        }
    });
}
