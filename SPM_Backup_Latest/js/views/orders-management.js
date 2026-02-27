/**
 * Orders Management Dashboard View
 * Full UI for searching, filtering, and managing orders.
 */

import { store } from '../store.js';
import { renderOrdersTable } from '../components/orders-table.js';

export async function renderOrdersManagement() {
    const allOrders = await store.getOrders();
    const totalOrders = allOrders.length;
    const pendingCount = allOrders.filter(o => o.status === 'Pending').length;

    // We use a small setTimeout to attach listeners after render, mainly for search
    setTimeout(attachAdminListeners, 100);

    return `
    <div style="margin-top: 0px; margin-bottom: 60px;">
        
        <!-- PAGE HEADER -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pt-6">
            <div>
                <h1 class="spm-heading" style="margin-bottom: 8px;">Orders Management</h1>
                <p style="color: var(--text-muted); font-size: 1rem;">
                    Search, filter, and manage all orders across retailers and boards.
                </p>
            </div>
            <div class="flex gap-3">
                <button class="spm-btn spm-btn-secondary">Export Orders</button>
                <button class="spm-btn spm-btn-primary" onclick="window.location.hash='#/admin/orders/new'">Create New Order</button>
            </div>
        </div>

        <!-- TOP METRICS (Dynamic) -->
        <div class="grid spm-stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 32px;">
            ${renderMetricCard('Total Orders', totalOrders, '+8% vs last week', 'success')}
            ${renderMetricCard('Pending Approval', pendingCount, 'Needs Attention', pendingCount > 0 ? 'warning' : 'success')}
            ${renderMetricCard('Dispatched', '4,850', 'This Season', 'success')}
            ${renderMetricCard('Cancelled / Hold', '12', 'Requires Review', 'danger')}
        </div>

        <!-- MAIN LAYOUT (Table + Side Panel) -->
        <div class="grid spm-responsive-grid" style="grid-template-columns: 1fr 300px; gap: 32px;">
            
            <!-- LEFT COLUMN: Filters, Tabs, Table -->
            <div style="min-width: 0;"> <!-- min-width: 0 prevents table overflow issues in grid -->
                
                <!-- Filter Bar -->
                <div class="spm-filter-bar">
                    <span style="font-size: 1.2rem; color: var(--text-muted);">🔍</span>
                    <input type="text" id="admin-search" class="spm-search-input" placeholder="Search by Order ID, Retailer, City...">
                    
                    <select class="spm-select" style="width: auto; padding: 8px;">
                        <option value="">Status: All</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                    </select>

                    <button class="spm-btn spm-btn-secondary" style="padding: 8px 12px; font-size: 0.85rem; border: none;">Reset</button>
                </div>

                <!-- Tabs -->
                <div class="spm-tabs" style="margin-bottom: 0; border-bottom: none;">
                    <div class="spm-tab active">All Orders</div>
                    <div class="spm-tab">Pending Approval <span class="spm-badge spm-badge-warning" style="margin-left:8px; font-size:0.7rem;">${pendingCount}</span></div>
                    <div class="spm-tab">Dispatched</div>
                    <div class="spm-tab">Flagged</div>
                </div>

                <!-- Orders Table Card -->
                <div class="spm-card" style="padding: 0; overflow: hidden; border-top-left-radius: 0;" id="admin-orders-table-container">
                    ${renderOrdersTable({ orders: allOrders, showRetailer: true })}
                </div>

            </div>

            <!-- RIGHT COLUMN: Side Panels (Static for Demo) -->
            <div class="flex flex-col gap-6">
                
                <!-- Status Breakdown -->
                <div class="spm-card">
                    <div class="spm-card-header">
                        <h3 class="spm-card-title">Status Breakdown</h3>
                    </div>
                    
                    <!-- Micro Chart -->
                    <div class="spm-status-bar">
                        <div class="spm-status-segment" style="width: 15%; background: #fff8e1;"></div> <!-- Pending -->
                        <div class="spm-status-segment" style="width: 75%; background: #e8f5e9;"></div> <!-- Dispatched -->
                        <div class="spm-status-segment" style="width: 5%; background: #ffebee;"></div> <!-- Cancelled -->
                        <div class="spm-status-segment" style="width: 5%; background: #e0e0e0;"></div> <!-- Other -->
                    </div>

                    <div class="spm-detail-list">
                        <div class="spm-detail-item" style="border: none; padding: 4px 0;">
                            <span class="spm-detail-label">Pending</span>
                            <span class="spm-detail-value">${pendingCount}</span>
                        </div>
                        <div class="spm-detail-item" style="border: none; padding: 4px 0;">
                            <span class="spm-detail-label">Dispatched</span>
                            <span class="spm-detail-value">4,850</span>
                        </div>
                    </div>
                </div>

                 <!-- Quick Filters -->
                <div class="spm-card">
                    <div class="spm-card-header">
                        <h3 class="spm-card-title">Quick Filters</h3>
                    </div>
                    <div class="flex flex-col gap-2">
                         <button class="spm-btn spm-btn-secondary" style="justify-content: flex-start; text-align: left; font-size: 0.85rem;">High Value Orders (₹ > 50k)</button>
                         <button class="spm-btn spm-btn-secondary" style="justify-content: flex-start; text-align: left; font-size: 0.85rem;">New Retailers (Last 7 Days)</button>
                    </div>
                </div>

            </div>
        </div>

    </div>
    `;
}

function attachAdminListeners() {
    const searchInput = document.getElementById('admin-search');
    const tableContainer = document.getElementById('admin-orders-table-container');

    if (searchInput) {
        searchInput.addEventListener('input', async (e) => {
            const term = e.target.value.toLowerCase();
            const allOrders = await store.getOrders();
            const filtered = allOrders.filter(o =>
                o.id.toLowerCase().includes(term) ||
                (o.retailerName && o.retailerName.toLowerCase().includes(term)) ||
                (o.retailerLocation && o.retailerLocation.toLowerCase().includes(term))
            );
            tableContainer.innerHTML = renderOrdersTable({ orders: filtered, showRetailer: true });
        });
    }
}

function renderMetricCard(label, value, subtext, type = 'info') {
    const trendColor = type === 'success' ? '#2e7d32' : type === 'warning' ? '#f57f17' : '#c62828';
    return `
    <div class="spm-card" style="margin-bottom: 0; padding: 20px;">
        <div class="spm-stat-label">${label}</div>
        <div class="spm-stat-value">${value}</div>
        <div style="font-size: 0.85rem; color: ${trendColor}; font-weight: 500; margin-top: 4px;">${subtext}</div>
    </div>
    `;
}

// Inline custom table render for Admin to include Checkboxes and Actions
function renderAdminOrdersTable() {
    return `
    <div class="spm-table-container" style="border: none;">
        <table class="spm-table">
            <thead>
                <tr>
                    <th width="40"><input type="checkbox"></th>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Retailer</th>
                    <th>City</th>
                    <th class="text-right">Items</th>
                    <th class="text-right">Amount</th>
                    <th class="text-center">Status</th>
                    <th class="text-right">Action</th>
                </tr>
            </thead>
            <tbody>
                ${renderRow('SPM-0118', 'Dec 09, 2025', 'Gupta Book Depot', 'Meerut', 140, '₹ 84,500', 'Pending', 'warning')}
                ${renderRow('SPM-0117', 'Dec 08, 2025', 'St. Mary\'s School', 'Delhi', 45, '₹ 12,200', 'Confirmed', 'info')}
                ${renderRow('SPM-0116', 'Dec 08, 2025', 'Rohan Books', 'Agra', 220, '₹ 1,10,000', 'Dispatched', 'success')}
                ${renderRow('SPM-0115', 'Dec 07, 2025', 'Vidya Kendra', 'Kanpur', 80, '₹ 45,600', 'Cancelled', 'danger')}
                ${renderRow('SPM-0114', 'Dec 05, 2025', 'Modern Shop', 'Lucknow', 12, '₹ 5,400', 'Dispatched', 'success')}
            </tbody>
        </table>
    </div>
    `;
}

function renderRow(id, date, retailer, city, items, amount, status, type) {
    const badgeClass = `spm-badge-${type}`;
    return `
    <tr>
        <td><input type="checkbox"></td>
        <td><a href="#/admin/orders/${id}" style="font-weight: 600; color: var(--primary); text-decoration: none;">${id}</a></td>
        <td style="color: var(--text-muted); font-size: 0.9rem;">${date}</td>
        <td><strong>${retailer}</strong></td>
        <td style="color: var(--text-muted);">${city}</td>
        <td class="text-right">${items}</td>
        <td class="text-right" style="font-weight: 600;">${amount}</td>
        <td class="text-center"><span class="spm-badge ${badgeClass}">${status}</span></td>
        <td class="text-right">
            <button class="spm-btn spm-btn-secondary" style="padding: 4px 8px; font-size: 0.8rem;">View</button>
        </td>
    </tr>
    `;
}
