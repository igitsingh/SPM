/**
 * Partner Portal Layout
 * Wraps all operational partner pages (Order, Catalogue, Invoice) with the persistent sidebar.
 */

export function renderPartnerLayout(contentHtml, activePath) {
    // Scroll top
    window.scrollTo(0, 0);

    return `
    <div class="spm-portal-container spm-layout"><!-- SIDEBAR (Persistent) --><aside class="spm-sidebar"><div style="margin-bottom: 32px; padding: 0 12px; cursor: pointer;" onclick="window.location.hash='#/'"><div style="font-family: var(--font-main); font-weight: 700; font-size: 1.5rem; color: var(--primary);">
                    SPM <span style="font-weight: 400; font-size: 1rem; color: var(--text-muted);">Partner</span></div></div><nav><div class="spm-nav-item ${activePath === '/dashboard' ? 'active' : ''}" onclick="window.location.hash='#/dashboard'"><span class="spm-nav-icon"></span> Dashboard
                </div><div class="spm-nav-item ${activePath === '/partner/order' ? 'active' : ''}" onclick="window.location.hash='#/partner/order'"><span class="spm-nav-icon"></span> Place Order
                </div><div class="spm-nav-item ${activePath === '/partner/catalogue' ? 'active' : ''}" onclick="window.location.hash='#/partner/catalogue'"><span class="spm-nav-icon"></span> Catalogue
                </div><div class="spm-nav-item ${activePath === '/partner/invoices' ? 'active' : ''}" onclick="window.location.hash='#/partner/invoices'"><span class="spm-nav-icon"></span> Invoices
                </div><div class="spm-nav-item ${activePath === '/partner/settings' ? 'active' : ''}" onclick="window.location.hash='#/partner/settings'"><span class="spm-nav-icon">️</span> Settings
                </div><div class="spm-nav-item ${activePath === '/partner/refer-earn' ? 'active' : ''}" onclick="window.location.hash='#/partner/refer-earn'"><span class="spm-nav-icon"></span> Refer & Earn
                </div><div style="margin-top: auto; padding-top: 24px; border-top: 1px solid var(--border-color);"><div class="spm-nav-item" onclick="window.location.hash='#/'"><span class="spm-nav-icon">⇥</span> Logout
                    </div></div></nav></aside><!-- MAIN CONTENT AREA --><main class="spm-main" style="background-color: #fafafa;"><!-- Mobile Toggle --><div class="lg:hidden" style="margin-bottom: 20px;"><button class="spm-mobile-toggle"> Menu</button></div>

            ${contentHtml}
        </main></div>
    `;
}
