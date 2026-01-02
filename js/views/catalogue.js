import { catalogueApi } from '../services/catalogue-api.js';
import { renderBookCard } from '../components/book-card.js';
import { API_URL } from '../store.js';

let allBooks = [];
let categories = [];
let classList = [];

export async function renderCatalogue() {
    try {
        const data = await catalogueApi.getAll();
        // Map Backend Data to Frontend Format
        allBooks = data.map(b => ({
            ...b, // Preserve all backend fields
            id: b.id,
            code: b.code || '',
            title: b.title,
            category: b.category || 'General',
            class: b.class || 'N/A',
            price: Number(b.priceRetail) || 0, // Show Retail Price
            image: b.coverImage ? `${API_URL}${b.coverImage}` : 'https://via.placeholder.com/150?text=No+Cover',
        }));

        // Extract Categories and Classes dynamically
        const catSet = new Set(allBooks.map(b => b.category).filter(Boolean));
        categories = Array.from(catSet).sort();

        const classSet = new Set(allBooks.map(b => b.class).filter(Boolean));
        // Sort classes numeric-aware
        classList = Array.from(classSet).sort((a, b) => {
            const na = Number(a);
            const nb = Number(b);
            if (!isNaN(na) && !isNaN(nb)) return na - nb;
            return a.localeCompare(b);
        });

    } catch (e) {
        console.error("Failed to load catalogue:", e);
        // Fallback or empty
        allBooks = [];
    }

    // Delay listeners
    setTimeout(attachCatalogueListeners, 100);

    return `
        <div class="container section">
            <div class="text-center" style="margin-bottom: 40px;">
                <h1 class="text-gradient" style="margin-bottom: 20px;">Books Catalogue</h1>
                <div style="max-width: 600px; margin: 0 auto; position: relative;">
                    <input type="text" id="search-input" placeholder="Search by title, code, or category..." 
                        class="input-field" style="padding: 16px 24px; border-radius: 30px; box-shadow: var(--shadow-md); border: 2px solid transparent; background: linear-gradient(white, white) padding-box, var(--gradient-rainbow) border-box;">
                    <span style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); font-size: 1.2rem;">🔍</span>
                </div>
            </div>

            <div class="catalogue-layout">
                <aside class="filters-sidebar">
                    <div class="flex justify-between items-center" style="margin-bottom: 20px;">
                        <h3>Filters</h3>
                        <button id="reset-filters" style="color: var(--primary); font-size: 0.9rem;">Reset</button>
                    </div>

                    <div class="input-group">
                        <label class="input-label">Category</label>
                        <select id="filter-category" class="input-field">
                            <option value="">All Categories</option>
                            ${categories.map(c => `<option value="${c}">${c}</option>`).join('')}
                        </select>
                    </div>

                    <div class="input-group">
                        <label class="input-label">Class</label>
                        <select id="filter-class" class="input-field">
                            <option value="">All Classes</option>
                            ${classList.map(c => `<option value="${c}">${c}</option>`).join('')}
                        </select>
                    </div>

                    <div class="input-group">
                        <label class="input-label">Price Range</label>
                        <input type="range" id="filter-price" min="0" max="1000" value="1000" style="width: 100%;">
                        <div class="flex justify-between" style="font-size: 0.8rem; color: var(--text-muted);">
                            <span>₹0</span>
                            <span id="price-display">₹1000</span>
                        </div>
                    </div>

                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border-light);">
                        <button id="export-json" class="btn-outline" style="width: 100%; font-size: 0.9rem;">Download Catalogue (JSON)</button>
                    </div>
                </aside>

                <div id="books-grid-container">
                    <div class="books-grid">
                        ${allBooks.length > 0 ? allBooks.map(book => renderBookCard(book)).join('') : '<p class="text-center col-span-full">No active books found.</p>'}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function attachCatalogueListeners() {
    const searchInput = document.getElementById('search-input');
    const filterCategory = document.getElementById('filter-category');
    const filterClass = document.getElementById('filter-class');
    const filterPrice = document.getElementById('filter-price');
    const priceDisplay = document.getElementById('price-display');
    const resetBtn = document.getElementById('reset-filters');
    const exportBtn = document.getElementById('export-json');
    const gridContainer = document.getElementById('books-grid-container');

    if (!searchInput) return;

    function filterBooks() {
        const query = searchInput.value.toLowerCase();
        const category = filterCategory.value;
        const cls = filterClass.value;
        const maxPrice = parseInt(filterPrice.value);

        priceDisplay.textContent = `₹${maxPrice}`;

        const filtered = allBooks.filter(book => {
            const matchesQuery = book.title.toLowerCase().includes(query) ||
                book.code.toLowerCase().includes(query) ||
                book.category.toLowerCase().includes(query);
            const matchesCategory = category ? book.category === category : true;
            const matchesClass = cls ? book.class === cls : true;
            const matchesPrice = book.price <= maxPrice;

            return matchesQuery && matchesCategory && matchesClass && matchesPrice;
        });

        if (filtered.length === 0) {
            gridContainer.innerHTML = `
                <div class="text-center" style="padding: 60px;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">😕</div>
                    <h3>No books found</h3>
                    <p style="color: var(--text-muted);">Try adjusting your filters or search query.</p>
                </div>
            `;
        } else {
            gridContainer.innerHTML = `
                <div class="books-grid">
                    ${filtered.map(book => renderBookCard(book)).join('')}
                </div>
            `;
        }
    }

    searchInput.addEventListener('input', filterBooks);
    filterCategory.addEventListener('change', filterBooks);
    filterClass.addEventListener('change', filterBooks);
    filterPrice.addEventListener('input', filterBooks);

    resetBtn.addEventListener('click', () => {
        searchInput.value = '';
        filterCategory.value = '';
        filterClass.value = '';
        filterPrice.value = 1000;
        filterBooks();
    });

    exportBtn.addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allBooks, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "spm_catalogue.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    });
}
