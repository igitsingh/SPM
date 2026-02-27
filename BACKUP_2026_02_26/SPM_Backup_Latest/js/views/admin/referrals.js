/**
 * Admin Referral Management View
 * Allows admins to track, approve, and manage partner referral rewards.
 */

export function renderAdminReferrals() {
    window.scrollTo(0, 0);

    // Mock Data
    const referralList = [
        { id: 101, referrer: 'Vikas Book Depot (Lucknow)', newRetailer: 'Saraswati Gyan Mandir', status: 'Qualified', reward: '5%', date: 'Nov 20, 2025' },
        { id: 102, referrer: 'Agarwal Books (Varanasi)', newRetailer: 'Modern Kids Academy', status: 'Pending', reward: '-', date: 'Dec 05, 2025' },
        { id: 103, referrer: 'Rohan Books (Agra)', newRetailer: 'Little Stars School', status: 'Used', reward: '10%', date: 'Oct 15, 2025' },
        { id: 104, referrer: 'Gupta Depot (Meerut)', newRetailer: 'City Public School', status: 'Pending', reward: '-', date: 'Dec 08, 2025' },
    ];

    return `
    <div style="margin-top: 0px; margin-bottom: 60px;">
        
        <!-- HEADER -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pt-6">
            <div>
                <h1 class="spm-heading" style="margin-bottom: 8px; font-size: 1.75rem;">Referral Management</h1>
                <p style="color: var(--text-muted); font-size: 1rem;">
                    Track new retailer signups via referrals and approve reward discounts.
                </p>
            </div>
            <div class="flex gap-3">
                <button class="spm-btn spm-btn-secondary">Export Report</button>
            </div>
        </div>

        <!-- METRICS -->
        <div class="grid spm-stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 32px;">
            ${renderMetricCard('Total Referrals', '142', '+12 this month', 'info')}
            ${renderMetricCard('Qualified & Issued', '85', 'Rewards Sent', 'success')}
            ${renderMetricCard('Pending Validation', '15', 'New Signups', 'warning')}
            ${renderMetricCard('Discounts Redeemed', '₹ 4.5L', 'Total Value', 'primary')}
        </div>

        <!-- MAIN CONTENT -->
        <div class="spm-card" style="padding: 0; overflow: hidden;">
            <div class="spm-card-header" style="padding: 24px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                <h3 class="spm-card-title" style="margin: 0;">Referral Activity Log</h3>
                <div style="display: flex; gap: 12px;">
                     <input type="text" class="spm-search-input" placeholder="Search referrer..." style="padding: 6px 12px;">
                     <select class="spm-select" style="width: auto; padding: 6px 12px;">
                        <option>Status: All</option>
                        <option>Pending</option>
                        <option>Qualified</option>
                        <option>Used</option>
                     </select>
                </div>
            </div>

            <div class="spm-table-container" style="border: none;">
                <table class="spm-table">
                    <thead>
                        <tr>
                            <th>Referrer Partner</th>
                            <th>Referred New Entity</th>
                            <th>Signup Date</th>
                            <th>Status</th>
                            <th>Reward Tier</th>
                            <th class="text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${referralList.map(item => `
                        <tr>
                            <td><strong>${item.referrer}</strong></td>
                            <td>${item.newRetailer}</td>
                            <td style="color: var(--text-muted);">${item.date}</td>
                            <td>${getAdminStatusBadge(item.status)}</td>
                            <td style="font-weight: 600; color: var(--primary);">${item.reward}</td>
                            <td class="text-right">
                                ${item.status === 'Pending' ?
            `<button class="spm-btn spm-btn-primary" style="font-size: 0.75rem; padding: 4px 8px;">Validate</button>` :
            `<button class="spm-btn spm-btn-secondary" style="font-size: 0.75rem; padding: 4px 8px;">View</button>`}
                            </td>
                        </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
             <div class="spm-pagination" style="padding: 16px 24px;">
                <div style="font-size: 0.85rem; color: var(--text-muted);">Showing 1-4 of 142</div>
                <div class="flex gap-2">
                    <button class="spm-page-btn disabled">Prev</button>
                    <button class="spm-page-btn active">1</button>
                    <button class="spm-page-btn">2</button>
                    <button class="spm-page-btn">Next</button>
                </div>
            </div>

        </div>

    </div>
    `;
}

function renderMetricCard(label, value, subtext, type = 'info') {
    const colorMap = {
        'success': { border: '#e8f5e9', text: '#2e7d32' },
        'warning': { border: '#fff8e1', text: '#f57f17' },
        'danger': { border: '#ffebee', text: '#c62828' },
        'info': { border: '#e3f2fd', text: '#1565c0' },
        'primary': { border: 'rgba(21, 101, 192, 0.1)', text: 'var(--primary)' }
    };
    const style = colorMap[type];

    return `
    <div class="spm-card" style="margin-bottom: 0; padding: 20px; border-top: 4px solid ${style.text};">
        <div class="spm-stat-label" style="font-size: 0.8rem;">${label}</div>
        <div class="spm-stat-value" style="font-size: 1.8rem; margin: 4px 0;">${value}</div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">${subtext}</div>
    </div>
    `;
}

function getAdminStatusBadge(status) {
    let className = 'spm-badge-info';
    if (status === 'Qualified') className = 'spm-badge-success';
    if (status === 'Pending') className = 'spm-badge-warning';
    if (status === 'Used') className = 'spm-badge-logistics'; // Grey for used
    return `<span class="spm-badge ${className}">${status}</span>`;
}
