import { store } from '../../store.js';

export async function renderOrderDetails(orderId) {
    const order = await store.getOrder(orderId);

    if (!order) {
        return `
            <div class="spm-container" style="text-align: center; padding: 60px;">
                <h2>Order Not Found</h2>
                <p>Could not load details for order #${orderId}</p>
                <a href="#/partner/orders" class="spm-btn spm-btn-secondary">Back to Orders</a>
            </div>
        `;
    }

    // Format Date
    const date = new Date(order.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    return `
    <div class="spm-container" style="padding: 20px; max-width: 1000px; margin: 0 auto;">
        
        <!-- Header -->
        <div class="flex justify-between items-start mb-6">
            <div>
                <a href="#/partner/orders" style="font-size: 0.9em; color: var(--text-muted); text-decoration: none;">← Back to Orders</a>
                <h2 class="spm-heading" style="margin-top: 8px; margin-bottom: 4px;">Order #${order.orderNumber || order.id}</h2>
                <div style="color: var(--text-muted); font-size: 0.9em;">Placed on ${date}</div>
            </div>
            <div class="text-right">
                <span class="spm-badge ${getStatusBadgeClass(order.status)}" style="font-size: 1em; padding: 6px 12px;">${order.status}</span>
            </div>
        </div>

        <div class="grid" style="grid-template-columns: 2fr 1fr; gap: 32px; align-items: start;">
            
            <!-- Left: Items -->
            <div class="spm-card" style="padding: 0; overflow: hidden;">
                <div style="padding: 16px 20px; border-bottom: 1px solid #eee; background: #fafafa;">
                    <h4 style="margin: 0; font-size: 1rem;">Order Items (${order.items.length})</h4>
                </div>
                <table class="spm-table">
                    <thead>
                        <tr>
                            <th>Book</th>
                            <th class="text-center">Qty</th>
                            <th class="text-right">Price</th>
                            <th class="text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => `
                            <tr>
                                <td>
                                    <div style="font-weight: 500; color: var(--text-main);">${item.book?.title || 'Unknown Book'}</div>
                                    <div style="font-size: 0.8em; color: var(--text-muted);">${item.book?.code || item.bookId}</div>
                                </td>
                                <td class="text-center">${item.qty}</td>
                                <td class="text-right">₹${Number(item.unitPrice).toLocaleString()}</td>
                                <td class="text-right" style="font-weight: 600;">₹${Number(item.lineTotal).toLocaleString()}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <!-- Right: Summary -->
            <div class="spm-card">
                <h4 style="margin-top: 0; margin-bottom: 20px;">Order Summary</h4>
                
                <div class="flex justify-between mb-2" style="font-size: 0.95em;">
                    <span style="color: var(--text-muted);">Subtotal</span>
                    <span>₹${Number(order.subtotal).toLocaleString()}</span>
                </div>
                <!-- Optional Tax/Discount rows could go here -->
                ${order.discountTotal > 0 ? `
                <div class="flex justify-between mb-2" style="font-size: 0.95em; color: var(--success);">
                    <span>Discount</span>
                    <span>- ₹${Number(order.discountTotal).toLocaleString()}</span>
                </div>
                ` : ''}

                <div style="height: 1px; background: #eee; margin: 16px 0;"></div>

                <div class="flex justify-between items-center mb-6">
                    <span style="font-weight: 600; font-size: 1.1em;">Total</span>
                    <span style="font-weight: 700; font-size: 1.25em; color: var(--primary);">₹${Number(order.total).toLocaleString()}</span>
                </div>

                <button class="spm-btn spm-btn-outline" style="width: 100%; justify-content: center; margin-bottom: 12px;">
                    📄 Download Invoice
                </button>
                <div style="font-size: 0.8em; color: var(--text-muted); text-align: center;">
                    Questions? <a href="#/contact">Contact Support</a>
                </div>
            </div>

        </div>
    </div>
    `;
}

// Mobile Helper (duplicated from orders-table but useful standalone)
function getStatusBadgeClass(status) {
    if (!status) return 'spm-badge-info';
    switch (status.toLowerCase()) {
        case 'pending': return 'spm-badge-warning';
        case 'confirmed': return 'spm-badge-info';
        case 'completed': return 'spm-badge-success';
        case 'cancelled': return 'spm-badge-danger';
        default: return 'spm-badge-info';
    }
}
