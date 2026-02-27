/**
 * Admin Analytics Dashboard Component
 * Displays charts, key insights, and performance tables.
 */

export function renderAnalyticsDashboard() {
    return `
    <div style="margin-top: 40px;">
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
                <h2 class="spm-heading" style="margin-bottom: 8px;">Analytics & Insights</h2>
                <p style="color: var(--text-muted); font-size: 1rem; max-width: 700px;">
                    Revenue trends, board-wise mix, retailers activity, and performance for the 2025–26 season.
                </p>
            </div>
            <div class="flex gap-3">
                <select class="spm-select" style="width: auto; padding: 6px 12px; font-size: 0.9rem;">
                    <option>All Boards</option>
                    <option>UP Board</option>
                    <option>CBSE</option>
                    <option>ICSE</option>
                </select>
                <select class="spm-select" style="width: auto; padding: 6px 12px; font-size: 0.9rem;">
                    <option>This Season (2025-26)</option>
                    <option>Last 30 Days</option>
                </select>
            </div>
        </div>

        <!-- Row 1: Key Insights -->
        <div class="grid spm-stats-grid" style="gap: 24px; margin-bottom: 32px;">
            ${renderInsightCard('Total Revenue', '₹ 3,42,80,450', '+12% vs last season', 'success')}
            ${renderInsightCard('Total Orders', '6,420', '+8% growth', 'success')}
            ${renderInsightCard('Active Retailers', '128', '92% retention rate', 'info')}
            ${renderInsightCard('Avg. Order Value', '₹ 5,350', 'Stable', 'warning')}
        </div>

        <!-- Row 2: Charts (Revenue & Board Mix) -->
        <div class="grid gap-8 mb-8" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); @media(min-width: 1024px) { grid-template-columns: 2fr 1fr; }">
            
            <!-- Monthly Revenue Chart -->
            <div class="spm-card" style="margin-bottom: 0;">
                <div class="spm-card-header">
                    <h3 class="spm-card-title">Monthly Revenue Trend — 2025–26</h3>
                </div>
                <div class="spm-chart-container" style="height: 300px;">
                    <!-- Placeholder SVG for Bar Chart -->
                    <svg viewBox="0 0 600 300" style="width: 100%; height: 100%;">
                        <defs>
                            <linearGradient id="barGradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stop-color="#8b5a2b"/>
                                <stop offset="100%" stop-color="#5d4037"/>
                            </linearGradient>
                        </defs>
                        <!-- Bars -->
                        <rect x="20" y="180" width="30" height="90" fill="url(#barGradient)" rx="4"/>
                        <rect x="80" y="120" width="30" height="150" fill="url(#barGradient)" rx="4"/>
                        <rect x="140" y="100" width="30" height="170" fill="url(#barGradient)" rx="4"/>
                        <rect x="200" y="70" width="30" height="200" fill="url(#barGradient)" rx="4"/>
                        <rect x="260" y="110" width="30" height="160" fill="url(#barGradient)" rx="4"/>
                        <rect x="320" y="140" width="30" height="130" fill="url(#barGradient)" rx="4"/>
                        <rect x="380" y="190" width="30" height="80" fill="url(#barGradient)" rx="4"/>
                        <rect x="440" y="160" width="30" height="110" fill="url(#barGradient)" rx="4"/>
                        <rect x="500" y="220" width="30" height="50" fill="url(#barGradient)" rx="4"/>
                        
                        <!-- Axis Lines -->
                        <line x1="10" y1="270" x2="590" y2="270" stroke="#ccc" stroke-width="1"/>
                        <text x="35" y="290" text-anchor="middle" font-size="12" fill="#888">Apr</text>
                        <text x="95" y="290" text-anchor="middle" font-size="12" fill="#888">May</text>
                        <text x="155" y="290" text-anchor="middle" font-size="12" fill="#888">Jun</text>
                        <text x="215" y="290" text-anchor="middle" font-size="12" fill="#888">Jul</text>
                        <text x="275" y="290" text-anchor="middle" font-size="12" fill="#888">Aug</text>
                        <text x="335" y="290" text-anchor="middle" font-size="12" fill="#888">Sep</text>
                        <text x="395" y="290" text-anchor="middle" font-size="12" fill="#888">Oct</text>
                        <text x="455" y="290" text-anchor="middle" font-size="12" fill="#888">Nov</text>
                        <text x="515" y="290" text-anchor="middle" font-size="12" fill="#888">Dec</text>
                    </svg>
                </div>
            </div>

            <!-- Board Wise Contribution -->
            <div class="spm-card" style="margin-bottom: 0;">
                <div class="spm-card-header">
                    <h3 class="spm-card-title">Board-wise Contribution</h3>
                </div>
                <div class="spm-chart-container" style="height: 240px; background: transparent;">
                    <!-- Placeholder SVG for Donut Chart -->
                    <svg viewBox="0 0 200 200" style="width: 200px; height: 200px;">
                        <!-- UP Board (65%) -->
                        <circle cx="100" cy="100" r="80" fill="none" stroke="#5d4037" stroke-width="30" stroke-dasharray="326 502" transform="rotate(-90 100 100)"/>
                        <!-- CBSE (20%) -->
                        <circle cx="100" cy="100" r="80" fill="none" stroke="#f9a825" stroke-width="30" stroke-dasharray="100 502" stroke-dashoffset="-326" transform="rotate(-90 100 100)"/>
                        <!-- ICSE (10%) -->
                        <circle cx="100" cy="100" r="80" fill="none" stroke="#8d6e63" stroke-width="30" stroke-dasharray="50 502" stroke-dashoffset="-426" transform="rotate(-90 100 100)"/>
                        <!-- Other (5%) -->
                        <circle cx="100" cy="100" r="80" fill="none" stroke="#e0e0e0" stroke-width="30" stroke-dasharray="25 502" stroke-dashoffset="-476" transform="rotate(-90 100 100)"/>
                    </svg>
                </div>
                <div class="spm-chart-donut-legend">
                    <div class="spm-legend-item"><div class="spm-legend-dot" style="background: #5d4037;"></div> UP Board (65%)</div>
                    <div class="spm-legend-item"><div class="spm-legend-dot" style="background: #f9a825;"></div> CBSE (20%)</div>
                    <div class="spm-legend-item"><div class="spm-legend-dot" style="background: #8d6e63;"></div> ICSE (10%)</div>
                    <div class="spm-legend-item"><div class="spm-legend-dot" style="background: #e0e0e0;"></div> Other (5%)</div>
                </div>
            </div>
        </div>

        <!-- Row 3: Order Volume & Activity -->
        <div class="grid spm-stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 32px;">
            <!-- Order Volume Weekly -->
            <div class="spm-card" style="margin-bottom: 0;">
                <div class="spm-card-header">
                    <h3 class="spm-card-title">Order Volume This Season</h3>
                </div>
                <div class="spm-chart-container" style="height: 200px; background: #fff;">
                     <svg viewBox="0 0 400 200" style="width: 100%; height: 100%;">
                        <polyline fill="none" stroke="#1565c0" stroke-width="3" points="20,150 60,140 100,160 140,80 180,60 220,90 260,120 300,110 340,140 380,130" />
                        <text x="200" y="190" text-anchor="middle" font-size="12" fill="#888">Weekly Trend (Apr - Dec)</text>
                        <text x="180" y="50" font-size="10" fill="#1565c0">Peak: Aug</text>
                     </svg>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 12px; text-align: center;">Peak order intake observed during Jun–Aug</p>
            </div>

            <!-- Retailer Activity -->
             <div class="spm-card" style="margin-bottom: 0;">
                <div class="spm-card-header">
                    <h3 class="spm-card-title">Retailer Activity Trend</h3>
                </div>
                <div class="spm-chart-container" style="height: 200px; background: #fff;">
                     <svg viewBox="0 0 400 200" style="width: 100%; height: 100%;">
                        <path fill="rgba(249, 168, 37, 0.2)" stroke="#f9a825" stroke-width="3" d="M20,160 Q60,160 100,100 T180,80 T260,120 T340,60 T380,80 V200 H20 Z" />
                        <text x="200" y="190" text-anchor="middle" font-size="12" fill="#888">Login Activity (Last 30 Days)</text>
                     </svg>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 12px; text-align: center;">Significant spike during early booking period</p>
            </div>
        </div>

        <!-- Row 4: Top Performing Titles -->
        <div class="spm-card">
            <div class="spm-card-header">
                <h3 class="spm-card-title">Top Performing Titles — 2025–26</h3>
                <button class="spm-btn spm-btn-secondary" style="font-size: 0.8rem; padding: 6px 12px;">View All Reports</button>
            </div>
            <div class="spm-table-container">
                <table class="spm-table">
                    <thead>
                        <tr>
                            <th>Title / SKU</th>
                            <th>Board</th>
                            <th>Class</th>
                            <th class="text-right">Units Sold</th>
                            <th class="text-right">Revenue</th>
                            <th class="text-center">Trend</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Maths Vol 1</strong><br><small style="color:var(--text-muted);">SPM-MTH-08</small></td>
                            <td>UP Board</td>
                            <td>8</td>
                            <td class="text-right">12,420</td>
                            <td class="text-right">₹38,60,400</td>
                            <td class="text-center" style="color: #2e7d32;">▲</td>
                        </tr>
                        <tr>
                            <td><strong>Science World</strong><br><small style="color:var(--text-muted);">SPM-SCI-07</small></td>
                            <td>CBSE</td>
                            <td>7</td>
                            <td class="text-right">9,820</td>
                            <td class="text-right">₹28,24,600</td>
                            <td class="text-center" style="color: #2e7d32;">▲</td>
                        </tr>
                        <tr>
                            <td><strong>English Grammar</strong><br><small style="color:var(--text-muted);">SPM-ENG-06</small></td>
                            <td>UP Board</td>
                            <td>6</td>
                            <td class="text-right">6,210</td>
                            <td class="text-right">₹17,12,300</td>
                            <td class="text-center" style="color: #c62828;">▼</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
    `;
}

function renderInsightCard(label, value, trend, trendType = 'success') {
    const trendColor = trendType === 'success' ? '#2e7d32' : trendType === 'warning' ? '#f57f17' : '#1565c0';
    return `
    <div class="spm-card" style="margin-bottom: 0; padding: 24px;">
        <div class="spm-stat-label">${label}</div>
        <div class="spm-stat-value">${value}</div>
        <div style="font-size: 0.85rem; color: ${trendColor}; font-weight: 500; margin-top: 4px;">${trend}</div>
    </div>
    `;
}
