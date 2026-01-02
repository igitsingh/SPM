import { store } from '../../store.js';
import { renderOrdersTable } from '../../components/orders-table.js';

export async function renderOrderHistory() {
    const orders = await store.getOrders();

    return `
        <div class="spm-container" style="padding: 20px;">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h2 class="spm-heading">Order History</h2>
                    <p style="color: var(--text-muted);">View and track all your past orders.</p>
                </div>
                <a href="#/partner/order" class="spm-btn spm-btn-primary">
                    <span style="margin-right:8px;">+</span> Place New Order
                </a>
            </div>

            <div class="spm-card" style="padding: 0; overflow: hidden;">
                ${renderOrdersTable({
        orders: orders,
        showRetailer: false, // Partners see their own orders
        emptyMessage: "You haven't placed any orders yet.",
        onPlaceOrderLink: "#/partner/order"
    })}
            </div>
        </div>
    `;
}
