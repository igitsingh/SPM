/**
 * Refer & Earn View for Partner Portal
 * Allows partners to generate referral links, view status, and see earned rewards.
 */

export function renderReferEarn() {
    // Scroll top
    window.scrollTo(0, 0);

    // Mock Data for Referral History
    const referrals = [
        { name: 'Vikas Book Depot', city: 'Lucknow', date: 'Dec 01, 2025', orderVal: '₹ 12,50,000', status: 'Qualified', reward: '10% Off' },
        { name: 'Modern School Books', city: 'Kanpur', date: 'Dec 05, 2025', orderVal: '₹ 2,10,000', status: 'Pending', reward: '-' },
        { name: 'Saraswati Gyan Mandir', city: 'Varanasi', date: 'Nov 20, 2025', orderVal: '₹ 6,00,000', status: 'Reward Used', reward: '5% Off (Used)' },
    ];

    const referralCode = 'SPMREF-8821';
    const referralLink = `https://portal.sumanprakashan.com/register?ref=${referralCode}`;

    return `
    <div style="max-width: 1000px; margin: 0 auto; padding-top: 20px; padding-bottom: 60px;">
        
        <!-- 1. HERO SECTION -->
        <div class="spm-card spm-dashboard-hero" style="background: linear-gradient(135deg, var(--primary), var(--primary-dark)); color: white; text-align: center; border: none; padding: 48px 24px;">
            <div style="font-size: 3rem; margin-bottom: 16px;">🎁</div>
            <h1 style="font-family: var(--font-main); font-size: 2.5rem; margin-bottom: 12px; color: white;">Refer & Earn Rewards</h1>
            <p style="font-size: 1.1rem; opacity: 0.9; max-width: 600px; margin: 0 auto; line-height: 1.6;">
                Invite retailers to join the SPM Partner Portal and earn exclusive discounts on your next invoice.
                Grow the network, grow your savings.
            </p>
        </div>

        <!-- 2. REFERRAL LINK SECTION -->
        <div class="spm-card" style="margin-top: -30px; position: relative; z-index: 10; padding: 32px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <h3 class="spm-heading" style="margin-bottom: 24px;">Your Unique Referral Link</h3>
            
            <div style="display: flex; gap: 12px; max-width: 600px; margin: 0 auto 24px auto;">
                <input type="text" class="spm-input" value="${referralLink}" readonly style="text-align: center; font-family: monospace; font-size: 1rem; color: var(--primary); background: #f5f9ff; border-color: #bbdefb;">
                <button class="spm-btn spm-btn-primary" onclick="navigator.clipboard.writeText('${referralLink}'); alert('Link copied!');">Copy Link</button>
            </div>

            <div style="display: flex; gap: 16px; justify-content: center;">
                <button class="spm-btn spm-btn-secondary" style="border-color: #25D366; color: #25D366;">
                    <span style="font-size: 1.2rem; margin-right: 8px;">📱</span> Share on WhatsApp
                </button>
                <div style="background: white; padding: 0px; display: inline-block;">
                    <!-- QR Code Placeholder -->
                    <span style="font-size: 1.5rem; vertical-align: middle; margin-left:8px;">🏁</span>
                </div>
            </div>
        </div>

        <!-- 3. HOW IT WORKS -->
        <div style="margin-top: 48px; margin-bottom: 48px;">
            <h2 class="spm-heading text-center" style="margin-bottom: 32px;">How It Works</h2>
            <div class="grid spm-responsive-grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;">
                <!-- Step 1 -->
                <div class="spm-card" style="text-align: center; padding: 32px 24px;">
                    <div style="width: 64px; height: 64px; background: #e3f2fd; color: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 20px auto;">1</div>
                    <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px;">Share Link</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem;">Copy and share your unique referral link with retailers in your network via WhatsApp or Email.</p>
                </div>
                <!-- Step 2 -->
                <div class="spm-card" style="text-align: center; padding: 32px 24px;">
                    <div style="width: 64px; height: 64px; background: #fff8e1; color: var(--secondary-accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 20px auto;">2</div>
                    <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px;">They Transact</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem;">Your referred retailer must sign up and place a qualifying first order (min ₹5L).</p>
                </div>
                <!-- Step 3 -->
                <div class="spm-card" style="text-align: center; padding: 32px 24px;">
                    <div style="width: 64px; height: 64px; background: #e8f5e9; color: #2e7d32; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 20px auto;">3</div>
                    <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px;">You Earn</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem;">Get instant discounts credits (5-10%) automatically applied to your next invoice.</p>
                </div>
            </div>
        </div>

        <!-- 4. REWARDS TABLE -->
        <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 48px; align-items: start; @media(max-width:768px){grid-template-columns: 1fr;}">
            
            <!-- Tier Table -->
            <div class="spm-card">
                <div class="spm-card-header">
                    <h3 class="spm-card-title">Rewards Tiers</h3>
                </div>
                <table class="spm-table">
                    <thead>
                        <tr>
                            <th>Referred Order Value</th>
                            <th class="text-right">Your Reward</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 16px;">₹ 5,00,000 +</td>
                            <td class="text-right" style="font-weight: 700; color: var(--primary);">5% Discount</td>
                        </tr>
                        <tr>
                            <td style="padding: 16px;">₹ 10,00,000 +</td>
                            <td class="text-right" style="font-weight: 700; color: var(--secondary-accent);">10% Discount</td>
                        </tr>
                    </tbody>
                </table>
                <div style="padding: 16px; background: #fffde7; font-size: 0.85rem; color: #f57f17; border-top: 1px solid #fff59d;">
                    * Reward applies to your next single invoice.
                </div>
            </div>

            <!-- Terms -->
            <div class="spm-card">
                 <div class="spm-card-header">
                    <h3 class="spm-card-title">Terms & Conditions</h3>
                </div>
                <ul style="padding-left: 20px; color: var(--text-muted); font-size: 0.95rem; line-height: 1.8;">
                    <li>Referred partner must be a <strong>new retailer</strong> not previously registered.</li>
                    <li>Qualifying order must be placed within <strong>60 days</strong> of registration.</li>
                    <li>Discounts cannot be stacked with other seasonal schemes.</li>
                    <li>Only the <strong>first successfully paid order</strong> counts for eligibility.</li>
                    <li>Management reserves the right to revoke rewards for fraudulent activity.</li>
                </ul>
            </div>
        </div>

        <!-- 5. REFERRAL STATUS TRACKING -->
        <div class="spm-card">
            <div class="spm-card-header">
                <h3 class="spm-card-title">Your Referral History</h3>
            </div>
            
            <div class="spm-table-container" style="border: none;">
                <table class="spm-table">
                    <thead>
                        <tr>
                            <th>Retailer Name</th>
                            <th>City</th>
                            <th>Referral Date</th>
                            <th>First Order Value</th>
                            <th>Status</th>
                            <th class="text-right">Reward Earned</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${referrals.map(ref => `
                            <tr>
                                <td style="font-weight: 600;">${ref.name}</td>
                                <td style="color: var(--text-muted);">${ref.city}</td>
                                <td style="color: var(--text-muted); font-size: 0.9rem;">${ref.date}</td>
                                <td>${ref.orderVal}</td>
                                <td>${getStatusBadge(ref.status)}</td>
                                <td class="text-right" style="font-weight: 700; color: var(--primary);">${ref.reward}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>

    </div>
    `;
}

function getStatusBadge(status) {
    let className = 'spm-badge-info';
    if (status === 'Qualified') className = 'spm-badge-success';
    if (status === 'Used' || status.includes('Used')) className = 'spm-badge-warning'; // Using warning color for 'Used' state
    return `<span class="spm-badge ${className}">${status}</span>`;
}
