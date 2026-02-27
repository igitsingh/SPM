import { partnerApi } from '../../services/partner-api.js';
import { catalogueApi } from '../../services/catalogue-api.js';
import { orderApi } from '../../services/order-api.js';

let cart = [];
let selectedPartner = null;
let bookCache = [];

export async function renderCreateOrder() {
    setTimeout(setupInteractions, 100);

    return `
        <div class="spm-main-content">
            <div class="flex items-center gap-4 mb-6">
                <button onclick="window.location.hash='#/admin/orders'" class="text-gray-500 hover:text-blue-600">
                    &larr; Back
                </button>
                <h1 class="spm-heading text-2xl font-bold m-0">Create New Order (POS)</h1>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Left: Partner & Product Selection -->
                <div class="lg:col-span-2 space-y-6">
                    
                    <!-- 1. Select Retailer -->
                    <div class="spm-card">
                        <h3 class="font-bold text-gray-800 mb-4 border-b pb-2">1. Select Retailer</h3>
                        <div class="relative">
                            <input type="text" id="partner-search" class="spm-input w-full" placeholder="Search by Shop Name, Owner Name or Email..." autocomplete="off">
                            <div id="partner-results" class="hidden absolute w-full bg-white border shadow-xl z-50 rounded mt-1 max-h-48 overflow-y-auto"></div>
                        </div>
                        
                        <div id="selected-partner-card" class="hidden mt-4 bg-blue-50 border border-blue-200 rounded p-4">
                            <div class="flex justify-between items-start">
                                <div>
                                    <div class="font-bold text-lg text-blue-900" id="sp-name"></div>
                                    <div class="text-sm text-gray-600" id="sp-owner"></div>
                                    <div class="text-xs text-blue-600 mt-1" id="sp-email"></div>
                                </div>
                                <div class="text-right">
                                    <div class="text-xs text-gray-500 uppercase">Available Credit</div>
                                    <div class="font-mono font-bold text-lg text-green-700" id="sp-credit"></div>
                                    <button id="change-partner-btn" class="text-xs text-red-500 hover:underline mt-2">Change</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 2. Add Products -->
                    <div class="spm-card relative">
                        <div id="product-overlay" class="absolute inset-0 bg-white/50 z-10 cursor-not-allowed flex items-center justify-center text-gray-400 font-bold">
                            Select Retailer First
                        </div>
                        <h3 class="font-bold text-gray-800 mb-4 border-b pb-2">2. Add Books</h3>
                        
                        <div class="flex gap-2 mb-4">
                            <div class="relative flex-1">
                                <input type="text" id="book-search" class="spm-input w-full" placeholder="Search Book Name, Code, subject..." autocomplete="off">
                                <div id="book-results" class="hidden absolute w-full bg-white border shadow-xl z-50 rounded mt-1 max-h-60 overflow-y-auto"></div>
                            </div>
                        </div>

                        <!-- Cart Table -->
                        <div class="border rounded overflow-hidden">
                            <table class="w-full text-sm">
                                <thead class="bg-gray-50 border-b text-gray-600">
                                    <tr>
                                        <th class="p-3 text-left">Item</th>
                                        <th class="p-3 text-right">Price</th>
                                        <th class="p-3 text-center">Qty</th>
                                        <th class="p-3 text-right">Total</th>
                                        <th class="p-3"></th>
                                    </tr>
                                </thead>
                                <tbody id="cart-body">
                                    <tr><td colspan="5" class="p-4 text-center text-gray-400 italic">Cart is empty.</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Right: Summary Sidebar -->
                <div class="lg:col-span-1">
                    <div class="spm-card sticky top-4 border-t-4 border-blue-600">
                        <h3 class="font-bold text-gray-800 mb-4">Order Summary</h3>
                        
                        <div class="space-y-2 text-sm text-gray-600 mb-4">
                            <div class="flex justify-between">
                                <span>Total Items:</span>
                                <span class="font-bold" id="sum-qty">0</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Subtotal:</span>
                                <span class="font-bold" id="sum-subtotal">₹0</span>
                            </div>
                            <div class="flex justify-between text-green-600">
                                <span>Discount (Scheme):</span>
                                <span class="font-bold" id="sum-discount">- ₹0</span>
                            </div>
                            <div class="flex justify-between text-gray-500">
                                <span>Tax (0%):</span>
                                <span class="font-bold">₹0</span>
                            </div>
                        </div>

                        <div class="border-t pt-3 mb-6">
                            <div class="flex justify-between items-center">
                                <span class="font-bold text-lg text-gray-900">Total Amount</span>
                                <span class="font-bold text-2xl text-blue-700" id="sum-total">₹0</span>
                            </div>
                        </div>

                        <div class="mb-4">
                            <label class="block text-xs font-bold text-gray-500 mb-1">Admin Notes</label>
                            <textarea id="order-notes" class="spm-input w-full text-sm" rows="3" placeholder="Special instructions..."></textarea>
                        </div>

                        <button id="place-order-btn" class="spm-btn spm-btn-primary w-full py-3 text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                            Place Order
                        </button>
                        
                        <p class="text-xs text-center text-gray-400 mt-2">Inventory will be deducted immediately.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function setupInteractions() {
    // Reset state
    cart = [];
    selectedPartner = null;

    // Elements
    const pSearch = document.getElementById('partner-search');
    const pResults = document.getElementById('partner-results');
    const bSearch = document.getElementById('book-search');
    const bResults = document.getElementById('book-results');
    const overlay = document.getElementById('product-overlay');

    // Partner Search
    pSearch.addEventListener('input', debounce(async (e) => {
        const term = e.target.value.trim();
        if (term.length < 2) { pResults.classList.add('hidden'); return; }

        const partners = await partnerApi.search(term);
        pResults.innerHTML = partners.map(p => `
            <div class="p-3 hover:bg-blue-50 cursor-pointer border-b" onclick="selectPartner('${p.id}', '${escape(p.shopName)}', '${escape(p.user.name)}', '${p.user.email}', ${p.creditLimit}, ${p.usedCredit}, '${p.user.id}')">
                <div class="font-bold text-blue-900">${p.shopName}</div>
                <div class="text-xs text-gray-600">${p.user.name} (${p.user.email})</div>
            </div>
        `).join('');
        pResults.classList.remove('hidden');
    }, 300));

    window.selectPartner = (id, shop, owner, email, limit, used, userId) => {
        selectedPartner = { id, shop: unescape(shop), owner: unescape(owner), email, limit, used, userId };

        document.getElementById('sp-name').textContent = selectedPartner.shop;
        document.getElementById('sp-owner').textContent = selectedPartner.owner;
        document.getElementById('sp-email').textContent = selectedPartner.email;
        const avail = limit - used;
        document.getElementById('sp-credit').textContent = `₹${avail.toLocaleString()}`;
        document.getElementById('sp-credit').className = `font-mono font-bold text-lg ${avail < 0 ? 'text-red-600' : 'text-green-700'}`;

        document.getElementById('selected-partner-card').classList.remove('hidden');
        pSearch.value = '';
        pResults.classList.add('hidden');
        document.getElementById('partner-search').parentElement.classList.add('hidden');

        overlay.classList.add('hidden'); // Unlock products
    };

    document.getElementById('change-partner-btn').addEventListener('click', () => {
        selectedPartner = null;
        cart = [];
        renderCart();
        document.getElementById('selected-partner-card').classList.add('hidden');
        document.getElementById('partner-search').parentElement.classList.remove('hidden');
        overlay.classList.remove('hidden'); // Lock products
    });

    // Book Search
    bSearch.addEventListener('input', debounce(async (e) => {
        const term = e.target.value.trim();
        if (term.length < 2) { bResults.classList.add('hidden'); return; }

        const books = await catalogueApi.getAll(term);
        bResults.innerHTML = books.slice(0, 10).map(b => `
            <div class="p-2 hover:bg-gray-50 cursor-pointer border-b flex justify-between items-center" onclick="addToCart('${b.id}', '${escape(b.title)}', '${b.code}', ${b.pricePartner}, ${b.stock})">
                <div>
                    <div class="font-bold text-sm text-gray-800">${b.title}</div>
                    <div class="text-xs text-gray-500">${b.code} | Stock: ${b.stock}</div>
                </div>
                <div class="font-bold text-blue-700">₹${b.pricePartner}</div>
            </div>
        `).join('');
        bResults.classList.remove('hidden');
    }, 300));

    window.addToCart = (id, title, code, price, stock) => {
        title = unescape(title);
        const existing = cart.find(i => i.id === id);
        if (existing) {
            if (existing.qty < stock) existing.qty++;
            else alert('Max stock reached!');
        } else {
            if (stock <= 0) { alert('Out of stock!'); return; }
            cart.push({ id, title, code, price, qty: 1, stock });
        }
        bSearch.value = '';
        bResults.classList.add('hidden');
        renderCart();
    };

    window.updateQty = (id, delta) => {
        const item = cart.find(i => i.id === id);
        if (!item) return;
        const newQty = item.qty + delta;
        if (newQty > 0 && newQty <= item.stock) {
            item.qty = newQty;
        } else if (newQty <= 0) {
            cart = cart.filter(i => i.id !== id);
        } else {
            alert('Cannot exceed stock!');
        }
        renderCart();
    };

    function renderCart() {
        const tbody = document.getElementById('cart-body');
        if (cart.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="p-4 text-center text-gray-400 italic">Cart is empty.</td></tr>';
            updateSummary();
            return;
        }

        tbody.innerHTML = cart.map(item => `
            <tr class="border-b">
                <td class="p-3">
                    <div class="font-medium text-gray-800">${item.title}</div>
                    <div class="text-xs text-gray-500 code font-mono">${item.code}</div>
                </td>
                <td class="p-3 text-right">₹${item.price}</td>
                <td class="p-3 text-center">
                    <div class="flex items-center justify-center gap-2">
                        <button onclick="updateQty('${item.id}', -1)" class="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300">-</button>
                        <span class="w-8 text-center font-bold">${item.qty}</span>
                        <button onclick="updateQty('${item.id}', 1)" class="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300">+</button>
                    </div>
                </td>
                <td class="p-3 text-right font-bold text-gray-800">₹${(item.price * item.qty).toFixed(2)}</td>
                <td class="p-3 text-center">
                    <button onclick="updateQty('${item.id}', -${item.qty})" class="text-red-500 hover:text-red-700">&times;</button>
                </td>
            </tr>
        `).join('');
        updateSummary();
    }

    function updateSummary() {
        const qty = cart.reduce((s, i) => s + i.qty, 0);
        const subtotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);

        // Mock Scheme calc (Simplistic 10% for demo if > 5000)
        // Ideally fetch 'Active Schemes' and calc. 
        // Since backend does logic, we can estimate or show "Calculated at Checkout".
        // Let's rely on Backend but show "Pending" or estimate.
        let discount = 0; // Backend handles scheme logic
        const total = subtotal - discount;

        document.getElementById('sum-qty').textContent = qty;
        document.getElementById('sum-subtotal').textContent = `₹${subtotal.toLocaleString()}`;
        document.getElementById('sum-discount').textContent = `- ₹${discount}`;
        document.getElementById('sum-total').textContent = `₹${total.toLocaleString()}`;

        const btn = document.getElementById('place-order-btn');
        btn.disabled = cart.length === 0 || !selectedPartner;
    }

    // Submit
    document.getElementById('place-order-btn').addEventListener('click', async () => {
        if (!selectedPartner || cart.length === 0) return;

        const btn = document.getElementById('place-order-btn');
        const notes = document.getElementById('order-notes').value;
        const payload = {
            buyerId: selectedPartner.userId,
            notes: notes,
            items: cart.map(i => ({ bookId: i.id, qty: i.qty }))
        };

        try {
            btn.disabled = true;
            btn.textContent = 'Processing...';
            await orderApi.create(payload);
            window.location.href = '#/admin/orders';
            alert('Order Created Successfully!');
        } catch (e) {
            alert('Error: ' + e.message);
            btn.disabled = false;
            btn.textContent = 'Place Order';
        }
    });

    // Close on outside click for searches
    document.addEventListener('click', (e) => {
        if (!pSearch.contains(e.target) && !pResults.contains(e.target)) pResults.classList.add('hidden');
        if (!bSearch.contains(e.target) && !bResults.contains(e.target)) bResults.classList.add('hidden');
    });
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
