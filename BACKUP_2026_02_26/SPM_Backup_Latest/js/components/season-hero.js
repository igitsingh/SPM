/**
 * Reusable Admin Season Overview Hero Component
 */

export function renderSeasonOverviewHero() {
    return `
    <div style="margin-bottom: 40px;">
        <!-- Hero Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
                <div class="flex items-center gap-3 mb-2">
                    <h1 class="spm-heading" style="margin-bottom: 0;">Academic Season Overview — 2025–26</h1>
                    <span class="spm-badge spm-badge-success" style="font-size: 0.75rem;">Live Season</span>
                </div>
                <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 800px;">
                    Performance summary, retailer activity, orders, and revenue insights for the ongoing season.
                </p>
            </div>
            
            <div style="background: white; border: 1px solid var(--border-color); padding: 8px 16px; border-radius: var(--radius-sm); font-size: 0.9rem; color: var(--text-muted); display: flex; items-align: center; gap: 8px;">
                <span>📅</span> Apr 01, 2025 - Mar 31, 2026
            </div>
        </div>

        <!-- Key Metrics Grid -->
        <div class="grid spm-stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-bottom: 32px;">
            ${renderMetricCard('Active Retail Partners', '128', 'Updated daily', '🏪')}
            ${renderMetricCard('Season Revenue', '₹ 3,42,80,450', 'Across all boards', '💰')}
            ${renderMetricCard('Outstanding Dues', '₹ 1,12,10,470', 'Pending from retailers', '📉')}
            ${renderMetricCard('Orders Processed', '312 <span style="font-size:0.8rem; color:var(--text-muted); font-weight:400;">/ 45 In Process</span>', 'As of last update', '📦')}
        </div>

        <!-- Progress Bar -->
        <div class="spm-card" style="padding: 16px 24px; display: flex; align-items: center; gap: 24px;">
            <div style="width: 200px; font-weight: 600; color: var(--text-muted); font-size: 0.9rem;">
                Season Completion Progress
            </div>
            <div style="flex: 1;">
                <div class="spm-progress-bar-container">
                    <div class="spm-progress-bar-fill" style="width: 68%;"></div>
                </div>
            </div>
            <div style="font-weight: 700; color: var(--primary);">68%</div>
        </div>
    </div>
    `;
}

function renderMetricCard(title, value, subtext, icon) {
    return `
    <div class="spm-card" style="margin-bottom: 0; display: flex; flex-direction: column; justify-content: center; position: relative; overflow: hidden;">
        <div style="position: absolute; top: -10px; right: -10px; font-size: 5rem; opacity: 0.05; color: var(--primary);">
            ${icon}
        </div>
        <div class="spm-stat-label" style="margin-bottom: 4px;">${title}</div>
        <div class="spm-stat-value" style="font-size: 1.6rem;">${value}</div>
        <div style="font-size: 0.8rem; color: var(--text-light); margin-top: auto;">${subtext}</div>
    </div>
    `;
}
