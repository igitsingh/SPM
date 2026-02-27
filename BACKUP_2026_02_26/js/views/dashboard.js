/**
 * Partner Dashboard View (Redesigned)
 * Modern, Minimal, and Action-Oriented
 */

import { renderAnnouncementsCard } from '../components/announcements-card.js';
import { renderOrdersTable } from '../components/orders-table.js';

export function renderDashboard() {
    return `
        <!-- 1. HERO WELCOME PANEL --><div class="spm-dashboard-hero"><div><h1 style="font-family: var(--font-main); font-size: 1.8rem; color: var(--primary); margin-bottom: 8px;">
                    Welcome back, Rohan 
                </h1><p style="color: var(--text-muted); font-size: 1rem;">
                    Rohan Book Depot • <span class="spm-badge spm-badge-warning">Category A</span></p></div><div style="text-align: right;"><div style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Current Session</div><div style="font-weight: 700; color: var(--text-main); font-size: 1.1rem;">2025–2026</div></div></div><!-- 2. SNAPSHOT METRICS --><div class="grid spm-stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; margin-bottom: 40px;">
            ${renderStatCard('Total Orders', '14', '+2 this week', '')}
            ${renderStatCard('Pending Payment', '₹ 32,400', 'Due in 5 days', '')}
            ${renderStatCard('Avg. Order Value', '₹ 8,500', 'Top 10%', '')}
            ${renderStatCard('Active Scheme', 'Gold Partner', 'Valid till Mar 31', '')}
        </div><!-- 3. QUICK ACTIONS GRID --><h3 class="spm-heading" style="margin-bottom: 24px; font-size: 1.2rem;">Quick Actions</h3><div class="spm-action-grid"><div class="spm-action-card" onclick="window.location.hash='#/partner/order'"><div class="spm-action-icon"></div><div style="font-weight: 600; color: var(--text-main);">Place New Order</div><div style="font-size: 0.8rem; color: var(--text-muted);">Browse catalogue & add items</div></div><div class="spm-action-card" onclick="window.location.hash='#/partner/catalogue'"><div class="spm-action-icon"></div><div style="font-weight: 600; color: var(--text-main);">View Catalogue</div><div style="font-size: 0.8rem; color: var(--text-muted);">See latest 2025 editions</div></div><div class="spm-action-card" onclick="window.location.hash='#/partner/invoices'"><div class="spm-action-icon"></div><div style="font-weight: 600; color: var(--text-main);">Last Invoice</div><div style="font-size: 0.8rem; color: var(--text-muted);">Download PDF (#INV-2024)</div></div><div class="spm-action-card" onclick="window.location.hash='#/contact'"><div class="spm-action-icon"></div><div style="font-weight: 600; color: var(--text-main);">Support</div><div style="font-size: 0.8rem; color: var(--text-muted);">Contact Relationship Manager</div></div></div><!-- 4. BOTTOM SPLIT: RECENT ORDERS & ANNOUNCEMENTS --><div class="grid" style="grid-template-columns: 2fr 1fr; gap: 32px; align-items: start; @media(max-width: 1024px){ grid-template-columns: 1fr; }"><!-- Recent Orders --><div><div class="flex justify-between items-center mb-6"><h3 class="spm-heading" style="margin-bottom: 0; font-size: 1.2rem;">Recent Orders</h3><a href="#/partner/orders" style="color: var(--primary); font-weight: 500; font-size: 0.9rem;">View All →</a></div><div class="spm-card" style="padding: 0; overflow: hidden; border: 1px solid rgba(0,0,0,0.06);">
                    ${renderOrdersTable({
        orders: [
            { id: '#ORD-8821', date: 'Dec 08, 2025', itemsCount: 140, amount: '₹ 84,500', status: 'Processing' },
            { id: '#ORD-8815', date: 'Nov 24, 2025', itemsCount: 45, itemsLabel: 'Standard Load', amount: '₹ 12,200', status: 'Delivered' },
            { id: '#ORD-8790', date: 'Nov 10, 2025', itemsCount: 850, amount: '₹ 4,10,000', status: 'Delivered' }
        ],
        showRetailer: false,
        emptyMessage: "No recent orders found."
    })}
                </div></div><!-- Announcements --><div><h3 class="spm-heading" style="margin-bottom: 24px; font-size: 1.2rem;">Updates</h3>
                    ${renderAnnouncementsCard([
        { title: 'New 2025 Editions', description: 'Class 1-5 UP Board books are now available.', date: 'Today', type: 'New' },
        { title: 'Price Revision', description: '5% hike effective from Jan 1st.', date: 'Nov 20', type: 'Important' },
        { title: 'Logistics Update', description: 'North Zone deliveries delayed by 2 days.', date: 'Nov 18', type: 'Logistics' }
    ])}
            </div></div>
    `;
}

function renderStatCard(label, value, subtext, icon) {
    return `
    <div class="spm-card" style="margin-bottom: 0; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; height: 100%;"><div class="flex justify-between items-start mb-2"><span class="spm-stat-label" style="font-size: 0.8rem; letter-spacing: 0.5px;">${label}</span><span style="font-size: 1.2rem; opacity: 0.8;">${icon}</span></div><div><div class="spm-stat-value" style="font-size: 1.5rem; margin: 4px 0;">${value}</div><div style="font-size: 0.8rem; color: var(--text-muted);">${subtext}</div></div></div>
    `;
}
