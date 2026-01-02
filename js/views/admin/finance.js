import { financeApi } from '../../services/finance-api.js';
import { store } from '../../store.js';

export async function renderAdminFinance() {
    let stats = {};
    let history = [];
    let allOrders = [];

    try {
        // Parallel Fetch
        const [statsData, historyData, ordersData] = await Promise.all([
            financeApi.getStats(),
            financeApi.getHistory(50),
            store.getOrders()
        ]);
        stats = statsData;
        history = historyData;
        allOrders = ordersData || [];
    } catch (e) { console.error(e); }

    // Filter useful orders for search (Pending/Partial)
    const pendingOrders = allOrders.filter(o => o.paymentStatus !== 'paid' && o.status !== 'cancelled');

    setTimeout(() => {
        setupFinanceInteractions(pendingOrders);
        renderFinanceChart(history);
    }, 100);

    return `
        <div class="spm-main-content">
             <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 class="spm-heading text-2xl font-bold">Finance & Payments</h1>
                    <p class="text-gray-500 text-sm">Track revenue, partner credits, and record payments.</p>
                </div>
                <button id="record-payment-btn" class="spm-btn spm-btn-primary">+ Record Payment</button>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="spm-card bg-blue-900 text-white shadow-lg transform hover:-translate-y-1 transition duration-300">
                    <div class="text-blue-200 text-sm font-medium uppercase tracking-wider mb-1">Total Outstanding</div>
                    <div class="text-3xl font-bold">₹${(stats.totalOutstanding || 0).toLocaleString()}</div>
                    <div class="mt-2 text-xs text-blue-300">Total Credit User by Partners</div>
                </div>
                <!-- 
                <div class="spm-card bg-white border-l-4 border-green-500 shadow-sm">
                 --> 
                <div class="spm-card bg-gradient-to-br from-green-50 to-white border border-green-100">
                    <div class="text-green-700 text-sm font-medium uppercase tracking-wider mb-1">Collected Today</div>
                    <div class="text-3xl font-bold text-green-900">₹${(stats.collectedToday || 0).toLocaleString()}</div>
                    <div class="mt-2 text-xs text-green-600">Daily Collection</div>
                </div>
                <div class="spm-card bg-white border border-gray-200">
                    <div class="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Total Revenue</div>
                    <div class="text-3xl font-bold text-gray-800">₹${(stats.totalCollected || 0).toLocaleString()}</div>
                    <div class="mt-2 text-xs text-gray-400">All Time</div>
                </div>
            </div>

            <!-- Chart Section -->
            <div class="spm-card mb-8">
                <h3 class="font-bold text-lg mb-4">Revenue Trend (Last 7 Days)</h3>
                <div style="height: 300px;">
                    <canvas id="finance-chart"></canvas>
                </div>
            </div>

            <!-- Payment History -->
             <div class="spm-card overflow-hidden p-0">
                <div class="flex justify-between items-center p-4 border-b">
                    <h3 class="font-bold text-lg">Recent Payment History</h3>
                    <button class="text-sm text-blue-600 hover:underline">View All</button>
                </div>
                <div class="overflow-x-auto">
                    <table class="spm-table w-full">
                        <thead class="bg-gray-50 text-gray-600 font-semibold border-b">
                            <tr>
                                <th class="p-4 text-left">Date</th>
                                <th class="p-4 text-left">Order & Partner</th>
                                <th class="p-4 text-left">Method / Ref</th>
                                <th class="p-4 text-left">Notes</th>
                                <th class="p-4 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${history.length > 0 ? history.map(p => `
                                <tr class="border-b hover:bg-gray-50 transition-colors">
                                    <td class="p-4 text-gray-500 whitespace-nowrap text-sm">${new Date(p.date).toLocaleDateString()}</td>
                                    <td class="p-4">
                                        <div class="font-medium text-blue-900">${p.order?.orderNumber || 'N/A'}</div>
                                        <div class="text-xs text-gray-500">
                                            ${p.order?.placedBy?.Partner?.shopName || p.order?.placedBy?.name || 'Unknown'}
                                        </div>
                                    </td>
                                    <td class="p-4">
                                        <div class="flex items-center gap-2">
                                            <span class="inline-block px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs font-bold border border-gray-200">
                                                ${p.method || p.provider || 'MANUAL'}
                                            </span>
                                        </div>
                                        ${p.reference ? `<div class="text-xs text-gray-500 mt-1 font-mono">${p.reference}</div>` : ''}
                                    </td>
                                    <td class="p-4 text-sm text-gray-600 break-words max-w-xs italic">${p.notes || '-'}</td>
                                    <td class="p-4 text-right font-mono font-bold text-green-700">₹${Number(p.amount).toLocaleString()}</td>
                                </tr>
                            `).join('') : '<tr><td colspan="5" class="p-8 text-center text-gray-500">No payments recorded recently.</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Payment Modal -->
        <div id="payment-modal" class="modal-overlay" style="display: none; align-items: center; justify-content: center; z-index: 2000;">
            <div class="spm-card w-full max-w-md p-0 overflow-hidden animate-slide-up">
                <div class="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                    <h3 class="font-bold text-lg">Record Payment</h3>
                    <button id="close-modal-btn" class="text-2xl hover:text-red-500">&times;</button>
                </div>
                <div class="p-6">
                    <form id="payment-form" class="space-y-4">
                        <div class="relative">
                            <label class="block mb-1 font-medium text-sm text-gray-700">Search Unpaid Order</label>
                            <input type="text" id="order-search" autocomplete="off" placeholder="Type Order ID (SPM-...) or Name..." class="spm-input w-full">
                            <div id="order-results" class="hidden absolute bg-white border border-gray-200 shadow-xl mt-1 w-full max-h-48 overflow-y-auto z-50 rounded-md"></div>
                            <input type="hidden" name="orderId" required>
                        </div>

                        <div id="selected-order-info" class="hidden bg-blue-50 p-3 rounded text-sm mb-2 border border-blue-100">
                            <div class="flex justify-between">
                                <span class="font-bold text-blue-900" id="sel-ord-num"></span>
                                <span class="text-red-600 font-bold text-xs bg-red-50 px-1 rounded border border-red-100">UNPAID</span>
                            </div>
                            <div class="mt-1 text-gray-600">Total: <span class="font-mono text-black font-bold">₹<span id="sel-ord-total"></span></span></div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block mb-1 font-medium text-sm text-gray-700">Amount (₹) *</label>
                                <input type="number" name="amount" required min="1" step="0.01" class="spm-input w-full font-mono">
                            </div>
                            <div>
                                <label class="block mb-1 font-medium text-sm text-gray-700">Method *</label>
                                <select name="method" required class="spm-select w-full">
                                    <option value="CASH">Cash</option>
                                    <option value="CHEQUE">Cheque</option>
                                    <option value="UPI">UPI</option>
                                    <option value="BANK_TRANSFER">Bank Transfer</option>
                                </select>
                            </div>
                        </div>
                        
                        <div>
                            <label class="block mb-1 font-medium text-sm text-gray-700">Reference (Optional)</label>
                            <input type="text" name="reference" placeholder="e.g. CHQ-89283 / UPI Ref" class="spm-input w-full">
                        </div>
                        
                        <div>
                            <label class="block mb-1 font-medium text-sm text-gray-700">Payment Date</label>
                            <input type="date" name="date" required class="spm-input w-full" value="${new Date().toISOString().split('T')[0]}">
                        </div>

                        <div>
                            <label class="block mb-1 font-medium text-sm text-gray-700">Notes</label>
                            <textarea name="notes" rows="2" class="spm-input w-full" placeholder="Internal remarks..."></textarea>
                        </div>

                        <button type="submit" class="spm-btn spm-btn-primary w-full py-2 mt-2">Save Payment</button>
                    </form>
                </div>
            </div>
        </div>
    `;
}

function setupFinanceInteractions(pendingOrders) {
    const modal = document.getElementById('payment-modal');
    const openBtn = document.getElementById('record-payment-btn');
    const closeBtn = document.getElementById('close-modal-btn');
    const form = document.getElementById('payment-form');

    // Search
    const searchInput = document.getElementById('order-search');
    const resultsDiv = document.getElementById('order-results');
    const orderIdInput = form.elements['orderId'];
    const infoBox = document.getElementById('selected-order-info');

    // Values
    const numSpan = document.getElementById('sel-ord-num');
    const totalSpan = document.getElementById('sel-ord-total');

    function openModal() {
        modal.style.display = 'flex';
        form.reset();
        infoBox.classList.add('hidden');
        form.elements['date'].value = new Date().toISOString().split('T')[0];
    }
    function closeModal() {
        modal.style.display = 'none';
    }

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    // Filter Logic
    searchInput.addEventListener('input', () => {
        const term = searchInput.value.toLowerCase();
        if (term.length < 1) {
            resultsDiv.classList.add('hidden');
            return;
        }

        const matches = pendingOrders.filter(o =>
            o.orderNumber.toLowerCase().includes(term) ||
            (o.placedBy?.name?.toLowerCase().includes(term)) ||
            (o.placedBy?.Partner?.shopName?.toLowerCase().includes(term))
        ).slice(0, 10);

        resultsDiv.innerHTML = '';
        if (matches.length === 0) {
            resultsDiv.innerHTML = '<div class="p-2 text-sm text-gray-500">No matching unpaid orders.</div>';
        } else {
            matches.forEach(m => {
                const div = document.createElement('div');
                div.className = 'p-3 hover:bg-blue-50 cursor-pointer border-b text-sm';
                div.innerHTML = `
                    <div class="font-bold text-blue-900">${m.orderNumber}</div>
                    <div class="text-xs text-gray-600">${m.placedBy?.Partner?.shopName || m.placedBy?.name}</div>
                    <div class="text-xs font-mono mt-1">₹${m.total}</div>
                `;
                div.addEventListener('click', () => {
                    selectOrder(m);
                });
                resultsDiv.appendChild(div);
            });
        }
        resultsDiv.classList.remove('hidden');
    });

    function selectOrder(order) {
        orderIdInput.value = order.id;
        searchInput.value = ''; // clear search visually or keep it? Clear it.
        resultsDiv.classList.add('hidden');

        numSpan.textContent = order.orderNumber + ' (' + (order.placedBy?.Partner?.shopName || 'User') + ')';
        totalSpan.textContent = order.total;
        infoBox.classList.remove('hidden');

        // Auto fill amount
        form.elements['amount'].value = order.total;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const data = Object.fromEntries(fd.entries());
        data.provider = 'MANUAL';
        data.amount = parseFloat(data.amount);

        try {
            await financeApi.createPayment(data);
            alert('Payment Recorded Successfully!');
            window.location.reload();
        } catch (err) {
            alert('Error: ' + err.message);
        }
    });

    // Close results on outside click
    document.addEventListener('click', e => {
        if (!searchInput.contains(e.target) && !resultsDiv.contains(e.target)) {
            resultsDiv.classList.add('hidden');
        }
    });
}

function renderFinanceChart(history) {
    const ctx = document.getElementById('finance-chart');
    if (!ctx) return;

    // Process Data: Group last 7 days from History
    const days = {};
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const key = d.toISOString().split('T')[0];
        days[key] = 0;
    }

    history.forEach(p => {
        const key = new Date(p.date).toISOString().split('T')[0];
        if (days[key] !== undefined) {
            days[key] += Number(p.amount);
        }
    });

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(days).map(d => new Date(d).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })),
            datasets: [{
                label: 'Collection (₹)',
                data: Object.values(days),
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
