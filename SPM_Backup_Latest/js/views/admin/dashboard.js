/**
 * Admin Dashboard View (Redesigned)
 * Enterprise-grade, clean, and highly structured overview.
 */

import { renderOrdersTable } from '../../components/orders-table.js';

export function renderAdminDashboard() {
    // Top-of-page scroll
    window.scrollTo(0, 0);

    return `
    <!-- 1. HEADER SECTION (Hero Block) -->
    <div class="spm-admin-hero">
        <div>
            <div class="spm-hero-overline">Performance Summary</div>
            <h1 class="spm-hero-title">Academic Season Overview</h1>
            <div style="font-size: 0.95rem; color: var(--text-muted); margin-top: 4px;">
                Tracking active distribution across all zones.
            </div>
        </div>
        <div class="spm-date-chip">
             <span>📅</span> <strong>Apr 01, 2025 – Mar 31, 2026</strong>
        </div>
    </div>

    <div class="spm-main" style="padding-top: 40px; background: #fafafa;">

        <!-- 2. KEY METRIC CARDS (Top-Level KPIs) -->
        <div class="spm-kpi-grid">
            ${renderKPICard('Season Revenue', '₹ 1.24 Cr', '+12% vs last year', '📈', true)}
            ${renderKPICard('Orders Processed', '1,024', '140 pending', '📦')}
            ${renderKPICard('Active Retailers', '850', '42 new this month', '🏪')}
            ${renderKPICard('Outstanding Dues', '₹ 45.2 L', 'Needs attention', '⚠️')}
        </div>

        <!-- 3. ANALYTICS & INSIGHTS (Interactive Blocks) -->
        <div class="spm-analytics-grid">
            
            <!-- Revenue Trend Chart -->
            <div class="spm-chart-card">
                <div class="spm-chart-header">
                    <div>
                        <h3 class="spm-heading" style="margin-bottom: 4px; font-size: 1.1rem;">Revenue Trend</h3>
                        <div style="font-size: 0.8rem; color: var(--text-muted);">Monthly comparison</div>
                    </div>
                    <select class="spm-select" style="width: auto; padding: 6px 12px; font-size: 0.8rem;">
                        <option>This Season</option>
                        <option>Last Season</option>
                    </select>
                </div>
                <!-- SVG Line Chart Placeholder -->
                <div style="height: 250px; width: 100%; position: relative;">
                    <svg viewBox="0 0 500 150" style="width: 100%; height: 100%; overflow: visible;">
                        <!-- Grid lines -->
                        <line x1="0" y1="150" x2="500" y2="150" stroke="#eee" stroke-width="1"/>
                        <line x1="0" y1="100" x2="500" y2="100" stroke="#eee" stroke-width="1" stroke-dasharray="4"/>
                        <line x1="0" y1="50" x2="500" y2="50" stroke="#eee" stroke-width="1" stroke-dasharray="4"/>
                        
                        <!-- Area Fill -->
                        <path d="M0,120 Q50,100 100,50 T200,80 T300,40 T400,20 T500,60 V150 H0 Z" fill="rgba(21, 101, 192, 0.05)" />
                        <!-- Line -->
                        <path d="M0,120 Q50,100 100,50 T200,80 T300,40 T400,20 T500,60" fill="none" stroke="var(--primary)" stroke-width="3" />
                        
                        <!-- Dots -->
                        <circle cx="100" cy="50" r="4" fill="white" stroke="var(--primary)" stroke-width="2"/>
                        <circle cx="300" cy="40" r="4" fill="white" stroke="var(--primary)" stroke-width="2"/>
                        <circle cx="500" cy="60" r="4" fill="white" stroke="var(--primary)" stroke-width="2"/>
                    </svg>
                    <!-- X Axis Labels placeholder since we can't do complex layout in SVG easily without more code -->
                    <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #888; margin-top: 10px;">
                        <span>Apr</span><span>Jun</span><span>Aug</span><span>Oct</span><span>Dec</span><span>Mar</span>
                    </div>
                </div>
            </div>

            <!-- Board-wise Distribution (Donut) -->
            <div class="spm-chart-card">
                 <div class="spm-chart-header">
                    <h3 class="spm-heading" style="margin-bottom: 0px; font-size: 1.1rem;">Board Mix</h3>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
                     <svg width="160" height="160" viewBox="0 0 100 100">
                         <!-- UP Board 60% -->
                         <circle cx="50" cy="50" r="40" fill="none" stroke="#1565c0" stroke-width="12" stroke-dasharray="150 251" transform="rotate(-90 50 50)"/>
                         <!-- CBSE 30% -->
                         <circle cx="50" cy="50" r="40" fill="none" stroke="#f9a825" stroke-width="12" stroke-dasharray="75 251" stroke-dashoffset="-150" transform="rotate(-90 50 50)"/>
                         <!-- ICSE 10% -->
                         <circle cx="50" cy="50" r="40" fill="none" stroke="#e0e0e0" stroke-width="12" stroke-dasharray="26 251" stroke-dashoffset="-225" transform="rotate(-90 50 50)"/>
                     </svg>
                     <div style="margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%; font-size: 0.8rem;">
                        <div class="flex items-center gap-2"><span style="width:8px;height:8px;border-radius:50%;background:#1565c0;"></span> UP Board (60%)</div>
                        <div class="flex items-center gap-2"><span style="width:8px;height:8px;border-radius:50%;background:#f9a825;"></span> CBSE (30%)</div>
                        <div class="flex items-center gap-2"><span style="width:8px;height:8px;border-radius:50%;background:#e0e0e0;"></span> Other (10%)</div>
                     </div>
                </div>
            </div>

        </div>

        <!-- 4. QUICK ADMIN ACTIONS -->
        <div class="spm-quick-actions-row">
            <div class="spm-quick-btn" onclick="window.location.hash='#/admin/orders'">
                <span>➕</span> Create Order
            </div>
            <div class="spm-quick-btn">
                <span>👤</span> Add Retailer
            </div>
            <div class="spm-quick-btn">
                <span>📦</span> Update Stock
            </div>
            <div class="spm-quick-btn">
                <span>📢</span> Post Notice
            </div>
        </div>

        <!-- 5. RECENT OPERATIONS Grid -->
        <div class="spm-analytics-grid" style="grid-template-columns: 2fr 1fr;">
            
            <!-- Recent Orders Table -->
            <div>
                 <div class="flex justify-between items-center mb-4">
                    <h3 class="spm-heading" style="margin-bottom: 0; font-size: 1.2rem;">Live Operations</h3>
                    <a href="#/admin/orders" style="color: var(--primary); font-weight: 500; font-size: 0.9rem;">View All Orders →</a>
                </div>
                <div class="spm-card" style="padding: 0; overflow: hidden; border: 1px solid rgba(0,0,0,0.06);">
                    ${renderOrdersTable({
        orders: [
            { id: '#ORD-8821', date: '10 mins ago', retailer: 'Gupta Book Depot', amount: '₹ 84,500', status: 'Processing' },
            { id: '#ORD-8820', date: '35 mins ago', retailer: 'Sharma Stationers', amount: '₹ 12,200', status: 'Confirmed' },
            { id: '#ORD-8819', date: '1 hour ago', retailer: 'City Library', amount: '₹ 4,10,000', status: 'Delivered' },
            { id: '#ORD-8818', date: '2 hours ago', retailer: 'Rohan Books', amount: '₹ 22,500', status: 'Delivered' }
        ],
        showRetailer: true
    })}
                </div>
            </div>

            <!-- Activity Feed -->
            <div>
                <h3 class="spm-heading" style="margin-bottom: 20px; font-size: 1.2rem;">System Alerts</h3>
                <div class="spm-card" style="padding: 0 20px;">
                    <div class="spm-activity-feed">
                        ${renderActivityItem('⚠️', 'Stock Alert: Class 5 Hindi low stock', '2 mins ago')}
                        ${renderActivityItem('👤', 'New Retailer Approved: Vikas Stationers', '1 hour ago')}
                        ${renderActivityItem('💰', 'Payment Received from Agrawal Books', '3 hours ago')}
                        ${renderActivityItem('📦', 'Logistics: Meerut Zone dispatched', '5 hours ago')}
                    </div>
                </div>
            </div>

        </div>

    </div>
    `;
}

function renderKPICard(label, value, subtext, icon, trendUp = false) {
    const trendHtml = trendUp ? `<span class="spm-trend-indicator spm-trend-up">↗</span>` : '';
    return `
    <div class="spm-kpi-card">
        <div class="flex justify-between items-start">
            <div class="spm-kpi-icon" style="background: rgba(0,0,0,0.03);">${icon}</div>
        </div>
        <div>
            <div class="spm-kpi-value">${value}</div>
            <div class="spm-kpi-label">${label} ${trendHtml}</div>
            <div style="font-size: 0.8rem; color: var(--text-light); margin-top: 4px;">${subtext}</div>
        </div>
    </div>
    `;
}

function renderActivityItem(icon, text, time) {
    return `
    <div class="spm-activity-item">
        <div class="spm-activity-icon">${icon}</div>
        <div>
            <div style="font-size: 0.9rem; font-weight: 500; color: var(--text-main); margin-bottom: 2px;">${text}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${time}</div>
        </div>
    </div>
    `;
}
