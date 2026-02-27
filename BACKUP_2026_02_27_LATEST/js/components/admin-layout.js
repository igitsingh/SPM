/**
 * Reusable Admin Layout Component (Navbar + Sidebar)
 * Wraps content in the standard Admin structure.
 */

export function renderAdminLayout(contentHtml, activePath = '/admin/dashboard') {
    return `
    <div class="spm-portal-container spm-admin-layout">
        
        <!-- TOP NAVBAR -->
        <header class="spm-admin-navbar">
            <div class="spm-admin-logo">
                <button class="spm-mobile-toggle" onclick="document.querySelector('.spm-admin-sidebar').classList.toggle('open')">☰</button>

                <span>SPM Admin</span>
            </div>
            
            <div class="spm-admin-user-menu">
                <div style="text-align: right; display: none; @media(min-width: 768px){ display: block; }">
                    <div style="font-weight: 600;">Admin User</div>
                    <div style="font-size: 0.75rem; opacity: 0.8;">Operations Manager</div>
                </div>
                <div class="spm-admin-avatar">AD</div>
                <a href="#/logout" style="color: white; opacity: 0.7; font-size: 1.2rem; margin-left: 8px;">⇥</a>
            </div>
        </header>

        <!-- LEFT SIDEBAR -->
        <aside class="spm-admin-sidebar">
            <!-- MAIN Section -->
            <div>
                <div class="spm-sidebar-section-title">Main Menu</div>
                
                <a href="#/admin/dashboard" class="spm-sidebar-link ${activePath === '/admin/dashboard' ? 'active' : ''}">
                    <span>📊</span> Dashboard
                </a>
                <a href="#/admin/retailers" class="spm-sidebar-link ${activePath === '/admin/retailers' ? 'active' : ''}">
                    <span>🏪</span> Retailers
                </a>
                <a href="#/admin/orders" class="spm-sidebar-link ${activePath === '/admin/orders' ? 'active' : ''}">
                    <span>📦</span> Orders
                </a>
                <a href="#/admin/catalogue" class="spm-sidebar-link ${activePath === '/admin/catalogue' ? 'active' : ''}">
                    <span>📖</span> Catalogue
                </a>
                <a href="#/admin/videos" class="spm-sidebar-link ${activePath === '/admin/videos' ? 'active' : ''}">
                    <span>🎥</span> Video Library
                </a>
                <a href="#/admin/inventory" class="spm-sidebar-link ${activePath === '/admin/inventory' ? 'active' : ''}">
                    <span>🏭</span> Inventory
                </a>
                <a href="#/admin/finance" class="spm-sidebar-link ${activePath === '/admin/finance' ? 'active' : ''}">
                    <span>💰</span> Payments
                </a>
                <a href="#/admin/referrals" class="spm-sidebar-link ${activePath === '/admin/referrals' ? 'active' : ''}">
                    <span>🔗</span> Referrals
                </a>
            </div>

            <!-- SETTINGS Section -->
            <div>
                <div class="spm-sidebar-section-title">Settings</div>
                
                <a href="#/admin/users" class="spm-sidebar-link ${activePath === '/admin/users' ? 'active' : ''}">
                    <span>👥</span> User Management
                </a>
                <a href="#/admin/schemes" class="spm-sidebar-link ${activePath === '/admin/schemes' ? 'active' : ''}">
                    <span>🏷️</span> Schemes & Discounts
                </a>
                <a href="#/admin/config" class="spm-sidebar-link ${activePath === '/admin/config' ? 'active' : ''}">
                    <span>⚙️</span> Configurations
                </a>
            </div>
        </aside>

        <!-- MAIN CONTENT SCROLL AREA -->
        <main class="spm-main" style="overflow-y: auto; background: var(--bg-body);">
            ${contentHtml}
        </main>

    </div>
    `;
}
