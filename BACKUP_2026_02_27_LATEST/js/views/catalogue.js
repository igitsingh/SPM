import { catalogueApi } from '../services/catalogue-api.js';
import { renderBookCard } from '../components/book-card.js';
import { API_URL } from '../store.js';

let allBooks = [];
let categories = [];
let classList = [];

const UNITS = [
    { name: 'Aroma', label: ' Aroma' },
    { name: 'Bluemoon Series', label: ' Bluemoon Series' },
    { name: 'Deepanshu Gold', label: ' Deepanshu Gold' },
    { name: 'Disney Publication', label: ' Disney Publication' },
    { name: 'Harmony Publications', label: ' Harmony Publications' },
    { name: 'Pearl', label: ' Pearl (Coming Soon)' }
];

export async function renderCatalogue() {
    try {
        const data = await catalogueApi.getAll();
        // Map Backend Data to Frontend Format
        allBooks = data.map(b => ({
            ...b,
            id: b.id,
            code: b.code || '',
            title: b.title,
            category: b.category || 'General',
            subject: b.subject || 'General',
            class: b.class || 'N/A',
            unit: b.unit || 'Aroma',
            price: Number(b.priceRetail) || Number(b.price) || 0,
            image: b.coverImage
                ? `${API_URL}${b.coverImage}`
                : (b.image || 'https://via.placeholder.com/150?text=No+Cover'),
        }));

        // Extract Categories, Subjects and Classes dynamically
        const catSet = new Set(allBooks.map(b => b.subject || b.category).filter(Boolean));
        categories = Array.from(catSet).sort();

        const classSet = new Set(allBooks.map(b => b.class).filter(Boolean));
        classList = Array.from(classSet).sort((a, b) => {
            const na = Number(a);
            const nb = Number(b);
            if (!isNaN(na) && !isNaN(nb)) return na - nb;
            return a.localeCompare(b);
        });

    } catch (e) {
        console.error("Failed to load catalogue:", e);
        allBooks = [];
    }

    setTimeout(attachCatalogueListeners, 100);

    return `
        <div class="container section"><div class="text-center" style="margin-bottom: 40px;"><h1 class="text-gradient" style="margin-bottom: 20px;">SPM Digital Catalogue</h1><div style="max-width: 600px; margin: 0 auto; position: relative;"><input type="text" id="search-input" placeholder="Search by title, code, or subject..." 
                        class="input-field" style="padding: 16px 24px; border-radius: 30px; box-shadow: var(--shadow-md); border: 2px solid transparent; background: linear-gradient(white, white) padding-box, var(--gradient-rainbow) border-box;"><span style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); font-size: 1.2rem;"></span></div></div><div class="catalogue-layout" style="display: grid; grid-template-columns: 280px 1fr; gap: 40px; align-items: start;"><!-- Sidebar Navigation (Kids Theme) --><aside class="spm-kids-sidebar"><div class="spm-kids-header"><h3 class="spm-kids-title"> BROWSE </h3><button id="reset-filters" class="spm-kids-reset">Reset All</button></div><ul class="spm-kids-nav"><li><button class="spm-kids-btn active" data-unit="all" style="--btn-color: #FF6B6B;">
                                 All Units
                            </button></li>
                        ${UNITS.map(u => {
        // Assign playful colors based on unit
        const colors = ['#4ECDC4', '#FFD166', '#118AB2', '#06D6A0', '#EF476F'];
        const color = colors[UNITS.indexOf(u) % colors.length];
        return `
                            <li><button class="spm-kids-btn ${u.name === 'Pearl' ? 'disabled' : ''}" 
                                        data-unit="${u.name}" 
                                        style="--btn-color: ${color};"
                                        ${u.name === 'Pearl' ? 'disabled' : ''}>
                                    ${u.label}
                                </button></li>
                            `;
    }).join('')}
                    </ul><h4 class="spm-kids-subtitle"> FUN FILTERS</h4><div class="spm-kids-input-group"><label class="spm-kids-label">Which Subject?</label><select id="filter-category" class="spm-kids-field"><option value=""> All Subjects</option>
                            ${categories.map(c => `<option value="${c}">${c}</option>`).join('')}
                        </select></div><div class="spm-kids-input-group"><label class="spm-kids-label">Which Class?</label><select id="filter-class" class="spm-kids-field"><option value=""> All Classes</option>
                            ${classList.map(c => `<option value="${c}">${c}</option>`).join('')}
                        </select></div><div class="spm-kids-input-group"><label class="spm-kids-label">Price Range</label><input type="range" id="filter-price" min="0" max="2000" value="2000" class="spm-kids-slider"><div class="spm-kids-price-labels"><span class="price-tag">₹0</span><span id="price-display" class="price-tag">₹2000+</span></div></div><div class="spm-kids-export-wrapper"><button id="export-json" class="spm-kids-export">⬇️ Download File</button></div></aside><!-- Books Grid --><div><div id="active-unit-header" style="margin-bottom: 20px;"><h2 style="font-size: 1.5rem; font-weight: 600;">All Publications</h2><p style="color: var(--text-muted);">Browse our complete collection across all series.</p></div><div id="books-grid-container"><div class="books-grid">
                            ${allBooks.length > 0 ? allBooks.map(book => renderBookCard(book)).join('') : '<p class="text-center col-span-full">No active books found.</p>'}
                        </div></div></div></div><style>
                /* KIDS PLAYFUL THEME FOR SIDEBAR */
                .spm-kids-sidebar {
                    background: #FFFDF5; /* Soft pastel yellow background */
                    padding: 30px 25px;
                    border-radius: 28px;
                    box-shadow: 0 12px 35px rgba(255, 107, 107, 0.15), inset 0 0 0 4px #FFD166;
                    border: 4px solid #fff;
                    position: sticky;
                    top: 100px;
                    font-family: 'Poppins', 'Comic Sans MS', sans-serif;
                }

                .spm-kids-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 25px;
                    background: #4ECDC4;
                    padding: 8px 12px;
                    border-radius: 14px;
                    border-bottom: 4px solid #3ABBB2;
                    gap: 8px;
                }

                .spm-kids-title {
                    font-size: 1.05rem;
                    font-weight: 800;
                    color: white;
                    letter-spacing: 0.5px;
                    margin: 0;
                    text-transform: uppercase;
                    white-space: nowrap;
                }

                .spm-kids-reset {
                    color: white;
                    background: #FF6B6B;
                    padding: 4px 8px;
                    border-radius: 8px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    cursor: pointer;
                    border: 1.5px solid #fff;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    transition: transform 0.2s;
                    white-space: nowrap;
                    line-height: 1.2;
                }
                .spm-kids-reset:hover { transform: scale(1.1) rotate(2deg); }

                .spm-kids-nav {
                    list-style: none;
                    padding: 0;
                    margin-bottom: 35px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .spm-kids-btn {
                    display: block;
                    width: 100%;
                    text-align: left;
                    padding: 14px 20px;
                    border: 3px solid transparent;
                    background: white;
                    font-size: 1.05rem;
                    color: #2D3142;
                    font-weight: 600;
                    border-radius: 20px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
                }

                .spm-kids-btn:hover:not(.disabled) {
                    transform: translateY(-4px) scale(1.02);
                    border-color: var(--btn-color);
                    box-shadow: 0 8px 15px rgba(0,0,0,0.1);
                    color: var(--btn-color);
                }

                .spm-kids-btn.active {
                    background: var(--btn-color);
                    color: white;
                    border-color: white;
                    box-shadow: 0 6px 0 rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.15);
                    transform: translateY(-2px);
                }

                .spm-kids-btn.disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    filter: grayscale(1);
                }

                .spm-kids-subtitle {
                    font-size: 1.1rem;
                    font-weight: 800;
                    color: #FF9F1C;
                    margin-bottom: 20px;
                    letter-spacing: 0.5px;
                    text-align: center;
                    background: white;
                    padding: 8px;
                    border-radius: 12px;
                    border: 2px dashed #FFD166;
                }

                .spm-kids-input-group {
                    margin-bottom: 25px;
                    background: white;
                    padding: 15px;
                    border-radius: 18px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
                }

                .spm-kids-label {
                    display: block;
                    font-size: 0.95rem;
                    font-weight: 700;
                    margin-bottom: 10px;
                    color: #118AB2;
                }

                .spm-kids-field {
                    width: 100%;
                    padding: 12px 16px;
                    border: 3px solid #E2E8F0;
                    border-radius: 14px;
                    background: #F8FAFC;
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: #2D3142;
                    outline: none;
                    cursor: pointer;
                    appearance: none;
                    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23118AB2' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
                    background-repeat: no-repeat;
                    background-position: right 14px center;
                    background-size: 16px;
                    transition: border-color 0.2s;
                }
                .spm-kids-field:focus {
                    border-color: #118AB2;
                    background: white;
                }

                .spm-kids-slider {
                    width: 100%;
                    accent-color: #EF476F;
                    margin: 12px 0;
                    height: 8px;
                    background: #E2E8F0;
                    border-radius: 10px;
                }

                .spm-kids-price-labels {
                    display: flex;
                    justify-content: space-between;
                }
                .price-tag {
                    background: #EF476F;
                    color: white;
                    padding: 4px 10px;
                    border-radius: 10px;
                    font-size: 0.8rem;
                    font-weight: 700;
                }

                .spm-kids-export-wrapper {
                    margin-top: 25px;
                }

                .spm-kids-export {
                    width: 100%;
                    padding: 16px;
                    font-size: 1rem;
                    font-weight: 800;
                    color: white;
                    background: #06D6A0;
                    border: none;
                    border-bottom: 5px solid #05B586;
                    border-radius: 16px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .spm-kids-export:hover {
                    transform: translateY(-2px);
                    border-bottom-width: 7px;
                }
                .spm-kids-export:active {
                    transform: translateY(3px);
                    border-bottom-width: 2px;
                }
            </style
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
    const unitBtns = document.querySelectorAll('.spm-kids-btn');
    const headerTitle = document.querySelector('#active-unit-header h2');
    const headerDesc = document.querySelector('#active-unit-header p');

    let currentUnit = 'all';

    if (!searchInput) return;

    function getUnitBooks() {
        return currentUnit === 'all' ? allBooks : allBooks.filter(b => b.unit === currentUnit);
    }

    function updateDropdowns() {
        const base = getUnitBooks();
        // Update subject dropdown (uses b.subject field)
        const subjects = [...new Set(base.map(b => b.subject || b.category).filter(Boolean))].sort();
        filterCategory.innerHTML = '<option value="">All Subjects</option>' +
            subjects.map(s => `<option value="${s}">${s}</option>`).join('');
        // Update class dropdown
        const clss = [...new Set(base.map(b => b.class).filter(Boolean))].sort((a, b) => {
            const na = Number(a), nb = Number(b);
            if (!isNaN(na) && !isNaN(nb)) return na - nb;
            return a.localeCompare(b);
        });
        filterClass.innerHTML = '<option value="">All Classes</option>' +
            clss.map(c => `<option value="${c}">${c}</option>`).join('');
    }

    function filterBooks() {
        const query = searchInput.value.toLowerCase();
        const category = filterCategory.value;
        const cls = filterClass.value;
        const maxPrice = parseInt(filterPrice.value);

        priceDisplay.textContent = maxPrice >= 2000 ? '₹2000+' : `₹${maxPrice}`;

        const effectiveMax = maxPrice >= 2000 ? Infinity : maxPrice;
        const filtered = allBooks.filter(book => {
            const matchesUnit = currentUnit === 'all' || book.unit === currentUnit;
            const bookSubject = book.subject || book.category || '';
            const matchesQuery = book.title.toLowerCase().includes(query) ||
                (book.code || '').toLowerCase().includes(query) ||
                bookSubject.toLowerCase().includes(query);
            const matchesCategory = category ? bookSubject === category : true;
            const matchesClass = cls ? book.class === cls : true;
            const matchesPrice = book.price <= effectiveMax;
            return matchesUnit && matchesQuery && matchesCategory && matchesClass && matchesPrice;
        });

        const count = filtered.length;
        headerDesc.textContent = currentUnit === 'all'
            ? `Showing ${count} book${count !== 1 ? 's' : ''} across all series.`
            : `Showing ${count} book${count !== 1 ? 's' : ''} from the ${currentUnit} series.`;

        if (count === 0) {
            gridContainer.innerHTML = `
                <div class="text-center" style="padding: 60px;"><div style="font-size: 3rem; margin-bottom: 20px;"></div><h3>No books found</h3><p style="color: var(--text-muted);">Try adjusting your filters or search query.</p></div>
            `;
        } else {
            gridContainer.innerHTML = `
                <div class="books-grid">
                    ${filtered.map(book => renderBookCard(book)).join('')}
                </div>
            `;
        }
    }

    // Unit Navigation
    unitBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('disabled')) return;

            unitBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentUnit = btn.dataset.unit;
            headerTitle.textContent = currentUnit === 'all' ? 'All Publications' : currentUnit;
            filterCategory.value = '';
            filterClass.value = '';
            updateDropdowns();
            filterBooks();
        });
    });

    searchInput.addEventListener('input', filterBooks);
    filterCategory.addEventListener('change', filterBooks);
    filterClass.addEventListener('change', filterBooks);
    filterPrice.addEventListener('input', filterBooks);

    resetBtn.addEventListener('click', () => {
        currentUnit = 'all';
        unitBtns.forEach(b => b.classList.remove('active'));
        document.querySelector('.spm-kids-btn[data-unit="all"]').classList.add('active');

        searchInput.value = '';
        filterCategory.value = '';
        filterClass.value = '';
        filterPrice.value = 2000;
        headerTitle.textContent = 'All Publications';
        updateDropdowns();
        filterBooks();
    });

    exportBtn.addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allBooks, null, 2));
        const anchor = document.createElement('a');
        anchor.href = dataStr;
        anchor.download = "spm_catalogue.json";
        anchor.click();
    });

    // ── Pre-apply URL query params from the hash ──────────────────────
    // e.g. #/catalogue?subject=Mathematics  or  #/catalogue?class=3  or  #/catalogue?unit=Aroma
    const hashQuery = window.location.hash.split('?')[1] || '';
    if (hashQuery) {
        const params = new URLSearchParams(hashQuery);
        const paramSubject = params.get('subject');
        const paramClass = params.get('class');
        const paramUnit = params.get('unit');
        const paramCat = params.get('category'); // legacy Story/Coloring/Activity

        if (paramUnit) {
            const matchBtn = document.querySelector(`.unit-btn[data-unit="${paramUnit}"]`);
            if (matchBtn && !matchBtn.classList.contains('disabled')) {
                unitBtns.forEach(b => b.classList.remove('active'));
                matchBtn.classList.add('active');
                currentUnit = paramUnit;
                headerTitle.textContent = paramUnit;
                updateDropdowns();
            }
        }

        if (paramSubject) {
            // Make sure option exists, then set + filter
            const opt = filterCategory.querySelector(`option[value="${paramSubject}"]`);
            if (opt) {
                filterCategory.value = paramSubject;
            } else {
                // Option might not exist yet in current unit view — add it
                filterCategory.innerHTML += `<option value="${paramSubject}" selected>${paramSubject}</option>`;
                filterCategory.value = paramSubject;
            }
        }

        if (paramCat) {
            // category param: Story, Coloring, Activity — filter on b.category
            // Temporarily override filterBooks to match on category field
            const opt = filterCategory.querySelector(`option[value="${paramCat}"]`);
            if (opt) filterCategory.value = paramCat;
        }

        if (paramClass) {
            const opt = filterClass.querySelector(`option[value="${paramClass}"]`);
            if (opt) filterClass.value = paramClass;
        }

        if (paramSubject || paramClass || paramUnit || paramCat) {
            filterBooks();
            // Scroll catalogue into view
            setTimeout(() => {
                const grid = document.getElementById('books-grid-container');
                if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 200);
        }
    }
}
