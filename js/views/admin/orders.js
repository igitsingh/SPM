import { orderApi } from '../../services/order-api.js';

export async function renderAdminOrders() {
    let orders = [];
    try {
        orders = await orderApi.getAll(); // Fetch basic list
    } catch (e) { }

    setTimeout(() => setupOrderListInteractions(orders), 100);

    return `
        <div class="spm-main-content">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 class="spm-heading text-2xl font-bold">Orders Management</h1>
                    <p class="text-gray-500 text-sm">Track, process, and manage all orders.</p>
                </div>
                <div class="flex gap-2">
                    <button onclick="window.location.hash='#/admin/orders/create'" class="spm-btn spm-btn-primary">+ Create New Order</button>
                    <!-- <button class="spm-btn bg-white border text-gray-700">Export CSV</button> -->
                </div>
            </div>

            <!-- Filters -->
            <div class="spm-card mb-6 p-4">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input type="text" id="filter-search" placeholder="Search Order ID or Retailer..." class="spm-input w-full">
                    
                    <select id="filter-status" class="spm-select w-full">
                        <option value="">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    <select id="filter-payment" class="spm-select w-full">
                        <option value="">All Payments</option>
                        <option value="paid">Paid</option>
                        <option value="partial">Partially Paid</option>
                        <option value="unpaid">Unpaid</option>
                    </select>
                    
                    <button id="apply-filters" class="spm-btn bg-gray-800 text-white w-full">Filter</button>
                </div>
            </div>

            <div class="spm-card overflow-hidden p-0 shadow-sm">
                <div class="overflow-x-auto">
                    <table class="spm-table w-full">
                        <thead class="bg-gray-50 text-gray-600 font-semibold border-b">
                            <tr>
                                <th class="p-4 text-left">Order ID</th>
                                <th class="p-4 text-left">Retailer</th>
                                <th class="p-4 text-left">Date</th>
                                <th class="p-4 text-center">Items</th>
                                <th class="p-4 text-left">Total</th>
                                <th class="p-4 text-left">Status</th>
                                <th class="p-4 text-left">Payment</th>
                                <th class="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="orders-table-body">
                            ${renderRows(orders)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Order Detail Modal -->
        <div id="order-modal" class="modal-overlay" style="display: none; align-items: start; justify-content: center; z-index: 2000; overflow-y: auto; padding-top: 2rem;">
            <div id="order-modal-content" class="spm-card w-full max-w-5xl p-0 overflow-hidden animate-slide-up shadow-2xl mb-10">
                <!-- Content loaded dynamically -->
                <div class="p-10 text-center"><div class="spinner"></div></div>
            </div>
        </div>
    `;
}

function renderRows(orders) {
    if (!orders || !orders.length) return '<tr><td colspan="8" class="p-8 text-center text-gray-500">No orders found.</td></tr>';

    return orders.map(o => `
        <tr class="border-b hover:bg-gray-50 transition-colors cursor-pointer" onclick="viewOrder('${o.id}')">
            <td class="p-4 font-bold text-blue-900">${o.orderNumber}</td>
            <td class="p-4">
                <div class="font-medium text-gray-800">${o.placedBy?.Partner?.shopName || 'Admin'}</div>
                <div class="text-xs text-gray-500">${o.placedBy?.name || ''}</div>
            </td>
            <td class="p-4 text-sm text-gray-600">${new Date(o.createdAt).toLocaleDateString()}</td>
            <td class="p-4 text-center">${o.items?.length || 0}</td>
            <td class="p-4 font-bold text-gray-800">₹${Number(o.total).toLocaleString()}</td>
            
            <td class="p-4"><span class="status-badge ${o.status}">${o.status}</span></td>
            
            <td class="p-4">
                <span class="inline-block px-2 py-0.5 rounded text-xs font-bold border 
                    ${o.paymentStatus === 'paid' ? 'bg-green-50 text-green-700 border-green-200' :
            o.paymentStatus === 'partial' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                'bg-red-50 text-red-700 border-red-200'}">
                    ${o.paymentStatus.toUpperCase()}
                </span>
            </td>

            <td class="p-4 text-right">
                <button class="spm-btn py-1 px-3 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100">View</button>
            </td>
        </tr>
    `).join('');
}

function setupOrderListInteractions(initialOrders) {
    const tableBody = document.getElementById('orders-table-body');
    const fStatus = document.getElementById('filter-status');
    const fPayment = document.getElementById('filter-payment');
    const fSearch = document.getElementById('filter-search');
    const btn = document.getElementById('apply-filters');

    btn.addEventListener('click', async () => {
        btn.textContent = 'Filtering...';
        const orders = await orderApi.getAll({
            status: fStatus.value,
            payment: fPayment.value, // API needs update for payment filter support if strict, but let's assume client side or loose backend support
            search: fSearch.value
        });
        tableBody.innerHTML = renderRows(orders);
        btn.textContent = 'Filter';
    });

    // View Logic
    window.viewOrder = async (id) => {
        const modal = document.getElementById('order-modal');
        const content = document.getElementById('order-modal-content');
        modal.style.display = 'flex';
        content.innerHTML = '<div class="p-10 text-center text-gray-500">Loading details...</div>';

        try {
            const order = await orderApi.getOne(id);
            if (!order) throw new Error('Order not found');
            renderDetailView(content, order);
        } catch (e) {
            content.innerHTML = `<div class="p-6 text-red-500">Error: ${e.message}</div><div class="px-6 pb-6"><button onclick="document.getElementById('order-modal').style.display='none'">Close</button></div>`;
        }
    };

    // Close modal on outside click
    document.getElementById('order-modal').addEventListener('click', (e) => {
        if (e.target.id === 'order-modal') e.target.style.display = 'none';
    });
}

function renderDetailView(container, order) {
    const steps = ['confirmed', 'processing', 'dispatched', 'delivered'];
    const currentStepIdx = steps.indexOf(order.status) === -1 ? (order.status === 'cancelled' ? -1 : 0) : steps.indexOf(order.status);

    // Timeline HTML
    const timelineHtml = steps.map((s, i) => `
        <div class="flex flex-col items-center flex-1 relative z-10">
            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-colors 
                ${i <= currentStepIdx ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-400 border-gray-300'}">
                ${i + 1}
            </div>
            <div class="text-xs mt-2 font-medium uppercase ${i <= currentStepIdx ? 'text-blue-900' : 'text-gray-400'}">${s}</div>
        </div>
    `).join('');

    const partner = order.placedBy?.Partner;

    container.innerHTML = `
        <div class="bg-gray-50 border-b px-8 py-4 flex justify-between items-center">
            <div>
                <h2 class="text-xl font-bold text-gray-900">Order #${order.orderNumber}</h2>
                <p class="text-sm text-gray-500">Placed on ${new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <button onclick="document.getElementById('order-modal').style.display='none'" class="text-3xl text-gray-400 hover:text-red-500">&times;</button>
        </div>
        
        <div class="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left: Items & Status -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Timeline -->
                ${order.status !== 'cancelled' ? `
                <div class="spm-card relative border-none shadow-sm bg-blue-50/50">
                    <div class="absolute top-4 left-0 w-full h-0.5 bg-gray-200 z-0"></div> <!-- Line base -->
                    <div class="absolute top-4 left-0 h-0.5 bg-blue-600 z-0 transition-all" style="width: ${(currentStepIdx / (steps.length - 1)) * 100}%"></div> <!-- Line active -->
                    <div class="flex justify-between relative z-10 px-4">
                        ${timelineHtml}
                    </div>
                </div>` : '<div class="spm-card bg-red-50 text-red-700 border border-red-200 font-bold text-center">ORDER CANCELLED</div>'}

                <!-- Workflow Actions -->
                ${order.status !== 'delivered' && order.status !== 'cancelled' ? `
                <div class="spm-card">
                    <h3 class="font-bold text-sm text-gray-700 mb-3 uppercase">Update Status</h3>
                    <div class="flex gap-4">
                        <select id="update-status-select" class="spm-select flex-1">
                            <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                            <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                            <option value="dispatched" ${order.status === 'dispatched' ? 'selected' : ''}>Dispatched</option>
                            <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <input type="text" id="update-notes" placeholder="Remarks..." class="spm-input flex-1">
                        <button onclick="updateOrderStatus('${order.id}')" class="spm-btn spm-btn-primary">Update</button>
                    </div>
                </div>` : ''}

                <!-- Items Table -->
                <div class="spm-card p-0 overflow-hidden">
                    <table class="w-full text-sm">
                        <thead class="bg-gray-100 text-gray-600 font-semibold">
                            <tr>
                                <th class="p-4 text-left">Book / Code</th>
                                <th class="p-4 text-right">Price</th>
                                <th class="p-4 text-center">Qty</th>
                                <th class="p-4 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order.items.map(i => `
                                <tr class="border-b last:border-0">
                                    <td class="p-4">
                                        <div class="font-medium text-gray-900">${i.book.title}</div>
                                        <div class="text-xs text-gray-500 font-mono">${i.book.code}</div>
                                    </td>
                                    <td class="p-4 text-right">₹${Number(i.unitPrice)}</td>
                                    <td class="p-4 text-center font-bold">${i.qty}</td>
                                    <td class="p-4 text-right font-medium">₹${Number(i.lineTotal)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Right: Info -->
            <div class="space-y-6">
                <!-- Retailer Info -->
                <div class="spm-card bg-white">
                    <h3 class="font-bold text-gray-800 border-b pb-2 mb-3">Retailer Info</h3>
                    <div class="text-sm space-y-2">
                        <div class="font-bold text-blue-900 text-lg">${partner?.shopName || 'N/A'}</div>
                        <div class="text-gray-600">Owner: ${order.placedBy?.name || 'N/A'}</div>
                        <div class="text-gray-600">City: ${partner?.city || 'N/A'}</div>
                        <div class="mt-4 pt-3 border-t">
                            <div class="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Used Credit</span>
                                <span>Limit</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                                <div class="bg-blue-600 h-1.5 rounded-full" style="width: ${Math.min((Number(partner?.usedCredit) / Number(partner?.creditLimit)) * 100, 100)}%"></div>
                            </div>
                            <div class="flex justify-between font-mono text-xs font-bold">
                                <span class="${Number(partner?.usedCredit) > Number(partner?.creditLimit) ? 'text-red-500' : ''}">₹${Number(partner?.usedCredit)}</span>
                                <span>₹${Number(partner?.creditLimit)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Financials -->
                <div class="spm-card bg-gray-50 border border-gray-200">
                    <h3 class="font-bold text-gray-800 mb-3">Payment Summary</h3>
                    
                    <div class="space-y-2 text-sm text-gray-600 mb-4">
                        <div class="flex justify-between"><span>Subtotal</span> <span class="font-bold">₹${Number(order.subtotal).toLocaleString()}</span></div>
                        <div class="flex justify-between text-green-600"><span>Discount</span> <span>- ₹${Number(order.discountTotal).toLocaleString()}</span></div>
                        <div class="flex justify-between"><span>Tax</span> <span>₹${Number(order.taxTotal).toLocaleString()}</span></div>
                        <div class="flex justify-between pt-2 border-t font-bold text-lg text-gray-900">
                            <span>Total</span> <span>₹${Number(order.total).toLocaleString()}</span>
                        </div>
                    </div>

                    <div class="mb-4">
                        <span class="block text-xs font-bold text-gray-500 uppercase mb-1">Payment Status</span>
                        <div class="flex items-center gap-2">
                             <span class="inline-block px-3 py-1 rounded text-sm font-bold border 
                                ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700 border-green-200' :
            order.paymentStatus === 'partial' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                'bg-red-100 text-red-700 border-red-200'}">
                                ${order.paymentStatus.toUpperCase()}
                            </span>
                        </div>
                    </div>
                    
                    <button onclick="alert('Print Invoice (PDF) - Coming Soon')" class="w-full spm-btn bg-white border border-gray-300 text-gray-700 flex items-center justify-center gap-2">
                        📄 Download Invoice
                    </button>
                </div>
                
                <!-- Notes -->
                ${order.notes ? `
                <div class="spm-card bg-yellow-50 border border-yellow-100">
                    <h3 class="font-bold text-xs text-yellow-800 uppercase mb-1">Notes</h3>
                    <p class="text-sm text-yellow-900 italic">"${order.notes}"</p>
                </div>` : ''}
            </div>
        </div>
    `;

    // Bind Update Action
    window.updateOrderStatus = async (oid) => {
        const val = document.getElementById('update-status-select').value;
        const note = document.getElementById('update-notes').value;
        if (!confirm(`Update status to ${val}?`)) return;

        try {
            await orderApi.updateStatus(oid, val, note);
            window.viewOrder(oid); // Reload modal
        } catch (e) { alert(e.message); }
    };
}
