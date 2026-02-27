/**
 * Retailer Profile View Component
 * Displays comprehensive details for a single retailer.
 */

import { renderOrdersTable } from '../components/orders-table.js';

export function renderRetailerProfile(retailer) {
    // Placeholder data if none provided
    const data = retailer || {
        name: 'Rohan Book Depot',
        owner: 'Mr. Rohan Gupta',
        category: 'A',
        city: 'Meerut',
        state: 'Uttar Pradesh',
        status: 'Active',
        since: '2012',
        shopType: 'Distributor',
        gst: '09AAECR1234H1Z5',
        phone: '+91 98989 89898',
        email: 'rohan.books@example.com',
        lastLogin: 'Dec 08, 2025 at 10:45 AM',
        creditLimit: '₹ 5,00,000',
        outstanding: '₹ 3,25,400',
        ordersThisSeason: 14,
        totalRevenue: '₹ 12,45,000',
        avgOrderValue: '₹ 88,900'
    };

    return `
    <div style="margin-top: 40px; margin-bottom: 60px;">
        
        <!-- PAGE HEADER -->
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div>
                <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px;">
                    Dashboard > Retailers > ${data.name}
                </div>
                <h1 class="spm-heading" style="margin-bottom: 8px;">${data.name}</h1>
                <div class="flex items-center gap-2 mb-4">
                    <span style="color: var(--text-muted);">Partner since ${data.since} • Category ${data.category} • ${data.city}, ${data.state}</span>
                </div>
                <div class="flex gap-2 flex-wrap">
                    <span class="spm-badge spm-badge-success">${data.status}</span>
                    <span class="spm-badge spm-badge-info">Credit Limit: ${data.creditLimit}</span>
                </div>
            </div>

            <div class="flex gap-3">
                <button class="spm-btn spm-btn-secondary" style="font-size: 0.9rem;">Send Statement</button>
                <button class="spm-btn spm-btn-primary" style="font-size: 0.9rem;">Create New Order</button>
                <button class="spm-btn spm-btn-secondary" style="padding: 8px 12px;">✎</button>
            </div>
        </div>

        <!-- TOP INFO ROW (3 CARDS) -->
        <div class="grid spm-stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
            
            <!-- Basic Details -->
            <div class="spm-card" style="margin-bottom: 0;">
                <div class="spm-card-header">
                    <h3 class="spm-card-title">Basic Details</h3>
                </div>
                <div class="spm-detail-list">
                    <div class="spm-detail-item">
                        <span class="spm-detail-label">Retailer Name</span>
                        <span class="spm-detail-value">${data.name}</span>
                    </div>
                    <div class="spm-detail-item">
                        <span class="spm-detail-label">Owner Name</span>
                        <span class="spm-detail-value">${data.owner}</span>
                    </div>
                    <div class="spm-detail-item">
                        <span class="spm-detail-label">Shop Type</span>
                        <span class="spm-detail-value">${data.shopType}</span>
                    </div>
                    <div class="spm-detail-item">
                        <span class="spm-detail-label">GSTIN</span>
                        <span class="spm-detail-value">${data.gst}</span>
                    </div>
                    <div class="spm-detail-item">
                        <span class="spm-detail-label">Location</span>
                        <span class="spm-detail-value">${data.city}, ${data.state}</span>
                    </div>
                </div>
            </div>

            <!-- Contact & Login -->
            <div class="spm-card" style="margin-bottom: 0;">
                <div class="spm-card-header">
                    <h3 class="spm-card-title">Contact & Login</h3>
                </div>
                <div class="spm-detail-list">
                    <div class="spm-detail-item">
                        <span class="spm-detail-label">Mobile</span>
                        <span class="spm-detail-value">${data.phone}</span>
                    </div>
                    <div class="spm-detail-item">
                        <span class="spm-detail-label">Email</span>
                        <span class="spm-detail-value">${data.email}</span>
                    </div>
                    <div class="spm-detail-item">
                        <span class="spm-detail-label">Last Login</span>
                        <span class="spm-detail-value" style="font-size: 0.85rem;">${data.lastLogin}</span>
                    </div>
                </div>
                <button class="spm-btn spm-btn-secondary" style="width: 100%; margin-top: 24px; font-size: 0.85rem;">Resend Portal Link</button>
            </div>

            <!-- Credit & Payment Status -->
            <div class="spm-card" style="margin-bottom: 0; background: #fafafa;">
                <div class="spm-card-header">
                    <h3 class="spm-card-title">Credit Status</h3>
                </div>
                <div style="margin-bottom: 20px;">
                    <div class="flex justify-between items-center mb-2">
                        <span class="spm-detail-label">Credit Limit</span>
                        <span class="spm-detail-value" style="font-weight: 700;">${data.creditLimit}</span>
                    </div>
                    <div class="flex justify-between items-center mb-4">
                        <span class="spm-detail-label">Outstanding</span>
                        <span class="spm-detail-value" style="color: #c62828;">${data.outstanding}</span>
                    </div>
                    
                    <!-- Progress Bar -->
                    <div class="spm-progress-bar-container" style="height: 10px; background: #e0e0e0;">
                        <div class="spm-progress-bar-fill" style="width: 65%; background: var(--secondary-accent);"></div>
                    </div>
                    <div class="flex justify-between mt-2" style="font-size: 0.75rem; color: var(--text-muted);">
                        <span>0%</span>
                        <span>65% Used</span>
                        <span>100%</span>
                    </div>
                </div>
                <div class="text-center">
                    <span class="spm-badge spm-badge-warning">Near Limit (Caution)</span>
                </div>
            </div>
        </div>

        <!-- PERFORMANCE & MIX ROW -->
        <div class="grid gap-8 mb-8" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
            
            <!-- Season Performance -->
            <div class="spm-card" style="margin-bottom: 0;">
                <div class="spm-card-header">
                    <h3 class="spm-card-title">Season Performance (2025–26)</h3>
                </div>
                <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 24px;">
                    <div>
                        <div class="spm-stat-label">Total Orders</div>
                        <div class="spm-stat-value">${data.ordersThisSeason}</div>
                    </div>
                    <div>
                        <div class="spm-stat-label">Total Revenue</div>
                        <div class="spm-stat-value" style="font-size: 1.4rem;">${data.totalRevenue}</div>
                    </div>
                </div>
                <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border-color);">
                    <div class="flex justify-between">
                        <span class="spm-detail-label">Avg. Order Value</span>
                        <span class="spm-detail-value">${data.avgOrderValue}</span>
                    </div>
                </div>
            </div>

            <!-- Board-wise Mix (Mini) -->
            <div class="spm-card" style="margin-bottom: 0;">
                <div class="spm-card-header">
                    <h3 class="spm-card-title">Board-wise Mix</h3>
                </div>
                <div class="flex items-center gap-6">
                    <!-- Donut SVG -->
                    <div style="width: 120px; height: 120px;">
                        <svg viewBox="0 0 100 100">
                             <circle cx="50" cy="50" r="40" fill="none" stroke="#5d4037" stroke-width="15" stroke-dasharray="188 251" transform="rotate(-90 50 50)"/> <!-- 75% -->
                             <circle cx="50" cy="50" r="40" fill="none" stroke="#f9a825" stroke-width="15" stroke-dasharray="63 251" stroke-dashoffset="-188" transform="rotate(-90 50 50)"/> <!-- 25% -->
                        </svg>
                    </div>
                    <div class="spm-detail-list flex-1">
                        <div class="spm-legend-item"><div class="spm-legend-dot" style="background: #5d4037;"></div> UP Board (75%)</div>
                        <div class="spm-legend-item"><div class="spm-legend-dot" style="background: #f9a825;"></div> CBSE (25%)</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ORDER HISTORY -->
        <div class="spm-card">
            <div class="spm-card-header">
                <h3 class="spm-card-title">Order History</h3>
                <div class="flex gap-2">
                    <select class="spm-select" style="width: auto; padding: 4px 8px; font-size: 0.85rem;">
                        <option>This Season</option>
                        <option>Last Season</option>
                    </select>
                </div>
            </div>
            
            ${renderOrdersTable({
        orders: [
            { id: '#ORD-8821', date: 'Dec 08, 2025', itemsCount: 140, amount: '₹ 84,500', status: 'Processing' },
            { id: '#ORD-8815', date: 'Nov 24, 2025', itemsCount: 45, amount: '₹ 12,200', status: 'Delivered' },
            { id: '#ORD-8790', date: 'Nov 10, 2025', itemsCount: 850, amount: '₹ 4,10,000', status: 'Delivered' }
        ],
        showRetailer: false
    })}
        </div>

        <!-- INTERNAL NOTES -->
        <div class="spm-card" style="background: #fff8e1; border-color: #ffe0b2;">
            <div class="spm-card-header" style="border-bottom-color: #ffe0b2;">
                <h3 class="spm-card-title" style="color: #e65100;">Internal Notes & Flags</h3>
            </div>
            <div class="grid gap-4">
                <div class="spm-alert-list-item" style="border-bottom: 1px dashed rgba(0,0,0,0.1);">
                    <div class="spm-alert-icon warning">⚠️</div>
                    <div class="spm-alert-content"><strong>Payment Delay:</strong> Generally delays payments by 10-15 days post due date.</div>
                </div>
                <div class="spm-alert-list-item" style="border-bottom: none;">
                    <div class="spm-alert-icon info">ℹ️</div>
                    <div class="spm-alert-content"><strong>Key Contact:</strong> Speak to Mr. Rohan directly for bulk orders.</div>
                </div>
            </div>
            <div style="margin-top: 16px;">
                <button class="spm-btn spm-btn-secondary" style="border-color: #e65100; color: #e65100; font-size: 0.85rem;">+ Add Note</button>
            </div>
        </div>

    </div>
    `;
}
