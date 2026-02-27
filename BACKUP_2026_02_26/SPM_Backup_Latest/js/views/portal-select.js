export const renderPortalSelect = () => {
    return `
    <div class="spm-login-container" style="
        min-height: 85vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f8f9fa;
    ">
        <div class="spm-card" style="width: 100%; max-width: 900px; padding: 60px; text-align: center; border: 1px solid #eee; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
            
            <div style="font-size: 3rem; margin-bottom: 20px;">🏢</div>
            <h1 style="margin-bottom: 10px; font-family: var(--font-main); color: var(--text-main);">Suman Prakashan Business</h1>
            <p style="color: var(--text-muted); margin-bottom: 50px; font-size: 1.1rem;">Select your portal to continue</p>

            <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; text-align: left;">
                
                <!-- Partner Portal -->
                <div class="spm-card" style="margin: 0; border: 1px solid #e0e0e0; transition: transform 0.2s; cursor: pointer;" 
                     onclick="window.location.hash='#/login'"
                     onmouseover="this.style.transform='translateY(-5px)'" 
                     onmouseout="this.style.transform='translateY(0)'">
                    <div style="font-size: 2rem; margin-bottom: 16px;">🤝</div>
                    <h3 style="margin-bottom: 8px;">Partner Portal</h3>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 20px;">
                        For Schools, Distributors, and Retailers. Manage orders, invoices, and returns.
                    </p>
                    <span style="color: var(--primary); font-weight: 600; font-size: 0.9rem;">Login →</span>
                </div>

                <!-- Admin Portal -->
                <div class="spm-card" style="margin: 0; border: 1px solid #e0e0e0; transition: transform 0.2s; cursor: pointer;" 
                     onclick="window.location.hash='#/admin/login'"
                     onmouseover="this.style.transform='translateY(-5px)'" 
                     onmouseout="this.style.transform='translateY(0)'">
                    <div style="font-size: 2rem; margin-bottom: 16px;">🔐</div>
                    <h3 style="margin-bottom: 8px;">Admin Console</h3>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 20px;">
                        Internal management system for SPM staff. Analytics, Inventory, and Approvals.
                    </p>
                    <span style="color: var(--primary); font-weight: 600; font-size: 0.9rem;">Access →</span>
                </div>

            </div>

            <div style="margin-top: 60px; padding-top: 30px; border-top: 1px solid #eee;">
                <p style="margin-bottom: 16px; color: var(--text-main);">New Partner? Join our network</p>
                <a href="#/partner-register" class="spm-btn" style="min-width: 200px; background: #FF7B00; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: 600;">Register as Partner</a>
                <div style="margin-top: 20px;">
                    <a href="#/" style="font-size: 0.9rem; color: #777;">&larr; Back to Website</a>
                </div>
            </div>

        </div>
    </div>
    `;
};
