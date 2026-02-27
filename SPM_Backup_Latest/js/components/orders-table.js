/**
 * Reusable Orders Table Component
 * Usage: renderOrdersTable({ orders: [], showRetailer: false, emptyMessage: '...' })
 */

export function renderOrdersTable({
    orders = [],
    showRetailer = false,
    emptyMessage = "No orders found.",
    onPlaceOrderLink = "#/order-distributor"
}) {
    // Empty State
    if (!orders || orders.length === 0) {
        return `
            <div class="spm-table-container">
                <div class="spm-table-empty">
                    <div style="font-size: 3rem; opacity: 0.3; margin-bottom: 16px;">📦</div>
                    <h4 style="color: var(--text-main); margin-bottom: 8px;">${emptyMessage}</h4>
                    <p style="color: var(--text-muted); margin-bottom: 24px;">Start by placing your first order today.</p>
                    <a href="${onPlaceOrderLink}" class="spm-btn spm-btn-primary">Place New Order</a>
                </div>
            </div>
        `;
    }

    // Table View
    return `
        <div class="spm-table-container" style="max-height: 500px; overflow-y: auto;">
            <table class="spm-table">
                <thead>
                    <tr>
                        <th width="120">Order ID</th>
                        ${showRetailer ? '<th>Retailer / School</th>' : ''}
                        <th>Date</th>
                        <th>Items</th>
                        <th class="text-right">Amount</th>
                        <th class="text-center">Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${orders.map(order => renderOrderRow(order, showRetailer)).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderOrderRow(order, showRetailer) {
    const statusClass = getStatusBadgeClass(order.status);

    return `
        <tr>
            <td style="font-family: monospace; font-weight: 500;">${order.id}</td>
            ${showRetailer ? `<td><strong>${order.retailerName || 'Unknown'}</strong><br><small style="color: var(--text-muted);">${order.retailerLocation || ''}</small></td>` : ''}
            <td>${order.date}</td>
            <td>${order.itemsCount} Items</td>
            <td class="text-right" style="font-weight: 600;">${order.amount}</td>
            <td class="text-center">
                <span class="spm-badge ${statusClass}">${order.status}</span>
            </td>
            <td class="text-right">
                <a href="#/orders/${order.id}" class="spm-btn spm-btn-secondary" style="padding: 4px 8px; font-size: 0.8rem;">View</a>
            </td>
        </tr>
    `;
}

function getStatusBadgeClass(status) {
    switch (status?.toLowerCase()) {
        case 'pending approval':
        case 'pending':
            return 'spm-badge-warning';
        case 'confirmed':
        case 'processing':
            return 'spm-badge-info';
        case 'dispatched':
        case 'delivered':
        case 'completed':
            return 'spm-badge-success';
        case 'cancelled':
        case 'failed':
            return 'spm-badge-danger';
        default:
            return 'spm-badge-info'; // Default fallback
    }
}
