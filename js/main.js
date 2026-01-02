import { Router } from './router.js';
import { store } from './store.js';

// Views
import { renderHome } from './views/home.js';
import { renderCatalogue } from './views/catalogue.js';
import { renderOrder } from './views/order.js';
import { renderAbout } from './views/about.js';
import { renderContact } from './views/contact.js';
import { renderRegister } from './views/register.js';
import { renderLogin } from './views/login.js';
import { renderAdminLogin } from './views/admin/admin-login.js';
import { renderPortalSelect } from './views/portal-select.js';
import { renderVideoLibrary } from './views/video-library.js';
import { renderPartnerRegister } from './views/partner-register.js';
import { renderStudentRegister } from './views/student-register.js';
import { renderStudentLogin } from './views/student-login.js';
import { renderStudentDashboard } from './views/students/dashboard.js';
import { renderStudentOrders } from './views/students/orders.js';

// Landing Pages
import { renderBusinessLanding } from './views/landing/business.js';
import { renderSchoolsLanding } from './views/landing/schools.js';
import { renderDistributorsLanding } from './views/landing/distributors.js';

// Components
import { renderHeader, initHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { initFlyout } from './components/flyout.v2.js';
import { renderAdminLayout } from './components/admin-layout.js';
import { renderPartnerLayout } from './components/partner-layout.js';

// Auth utilities
import { protectRoute, isAuthenticated, redirectToDashboard } from './utils/auth.js';

// Admin Views
import { renderDashboard } from './views/dashboard.js';
import { renderAdminOrders } from './views/admin/orders.js';
import { renderCreateOrder } from './views/admin/create-order.js';
import { renderRetailerProfile } from './views/retailer-profile.js';
import { renderReferEarn } from './views/partner/refer-earn.js';
import { renderAdminReferrals } from './views/admin/referrals.js';
import { renderAdminDashboard } from './views/admin/dashboard.js';
import { renderAdminVideos } from './views/admin/videos.js';
import { renderAdminCatalogue } from './views/admin/catalogue.js';
import { renderAdminInventory } from './views/admin/inventory.js';
import { renderAdminFinance } from './views/admin/finance.js';
import { renderAdminUsers } from './views/admin/users.js';
import { renderAdminSchemes } from './views/admin/schemes.js';
import { renderAdminConfig } from './views/admin/config.js';
import { renderOrderHistory } from './views/partner/orders-history.js';


// Define Routes
const routes = {
    '/': renderHome,
    '/video-library': renderVideoLibrary,
    '/login': renderLogin,
    '/admin/login': renderAdminLogin,
    '/register': renderRegister,
    '/partner-register': renderPartnerRegister,
    '/student-register': renderStudentRegister,
    '/student-login': renderStudentLogin,
    '/portal-select': renderPortalSelect,

    // Student/Parent Routes
    '/students/dashboard': renderStudentDashboard,
    '/students/orders': renderStudentOrders,

    // Partner Portal Routes (Wrapped in Layout)
    '/dashboard': async () => renderPartnerLayout(renderDashboard(), '/dashboard'),
    '/partner/order': async () => renderPartnerLayout(await renderOrder('retailer'), '/partner/order'),
    '/partner/orders': async () => renderPartnerLayout(await renderOrderHistory(), '/partner/orders'),
    '/partner/catalogue': async () => renderPartnerLayout(await renderCatalogue(), '/partner/catalogue'),
    '/partner/invoices': async () => renderPartnerLayout('<div class="spm-card" style="text-align:center; padding: 60px;"><h3>🧾 Invoices Module</h3><p>Start date logic here...</p></div>', '/partner/invoices'),
    '/partner/settings': async () => renderPartnerLayout('<div class="spm-card" style="text-align:center; padding: 60px;"><h3>⚙️ Settings Module</h3><p>Profile & Preferences</p></div>', '/partner/settings'),
    '/partner/refer-earn': async () => renderPartnerLayout(renderReferEarn(), '/partner/refer-earn'),

    // Legacy / Public Routes
    '/catalogue': renderCatalogue,
    '/order-retailer': () => renderOrder('retailer'),

    // Admin Routes
    '/admin': async () => renderAdminLayout(renderAdminDashboard(), '/admin/dashboard'),
    '/admin/dashboard': async () => renderAdminLayout(renderAdminDashboard(), '/admin/dashboard'),
    '/admin/orders': async () => renderAdminLayout(await renderAdminOrders(), '/admin/orders'),
    '/admin/orders/create': async () => renderAdminLayout(await renderCreateOrder(), '/admin/orders'),
    '/admin/retailer-profile': async () => renderAdminLayout(renderRetailerProfile(), '/admin/retailers'),
    '/admin/referrals': async () => renderAdminLayout(renderAdminReferrals(), '/admin/referrals'),
    '/admin/retailers': async () => renderAdminLayout(renderRetailerProfile(), '/admin/retailers'),
    '/admin/videos': async () => renderAdminLayout(await renderAdminVideos(), '/admin/videos'),
    '/admin/inventory': async () => renderAdminLayout(await renderAdminInventory(), '/admin/inventory'),
    '/admin/catalogue': async () => renderAdminLayout(await renderAdminCatalogue(), '/admin/catalogue'),
    '/admin/finance': async () => renderAdminLayout(await renderAdminFinance(), '/admin/finance'),
    '/admin/users': async () => renderAdminLayout(await renderAdminUsers(), '/admin/users'),
    '/admin/schemes': async () => renderAdminLayout(await renderAdminSchemes(), '/admin/schemes'),
    '/admin/config': async () => renderAdminLayout(await renderAdminConfig(), '/admin/config'),

    '/order-school': () => renderOrder('school'),
    '/order-distributor': () => renderOrder('distributor'),

    '/business-opportunity': renderBusinessLanding,
    '/new-schools': renderSchoolsLanding,
    '/distributors': renderDistributorsLanding,
    '/about': renderAbout,
    '/contact': renderContact,
    '/404': async () => '<h1>404 - Page Not Found</h1>'
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    // Render Shell
    document.getElementById('header').innerHTML = renderHeader();
    document.getElementById('footer').innerHTML = renderFooter();

    // Initialize header interactions
    initHeader();

    // Initialize Router
    const router = new Router(routes);

    // Initialize Global Components
    initFlyout();

    // Global Event Listeners
    setupGlobalListeners();

    // Layout Manager
    window.addEventListener('routeChanged', (e) => {
        const path = e.detail.path;
        const header = document.getElementById('header');
        const footer = document.getElementById('footer');

        // ROUTE PROTECTION - Check if user can access this route
        if (!protectRoute(path)) {
            return; // protectRoute handles redirect
        }

        // Re-render header to reflect auth state changes
        header.innerHTML = renderHeader();
        initHeader();

        // Visibility Logic
        // 1. Header: Hide on all Portal Apps AND Business Landing Pages
        const shouldHideHeader = path === '/dashboard' ||
            path.startsWith('/partner/') ||
            path.startsWith('/admin') || // Changed to startWith /admin to cover /admin/ and /admin
            path === '/portal-select' ||
            path === '/business-opportunity' ||
            path === '/distributors' ||
            path === '/new-schools' ||
            path === '/login' || // Typically hide header on login too
            path === '/student-login' ||
            path === '/partner-register' ||
            path === '/student-register' ||
            path === '/register';

        // 2. Footer: Hide on Portal Apps
        const shouldHideFooter = path === '/dashboard' ||
            path.startsWith('/partner/') ||
            path.startsWith('/admin') ||
            path === '/portal-select' ||
            path === '/login' ||
            path === '/student-login' ||
            path === '/partner-register' ||
            path === '/student-register' ||
            path === '/register';

        header.style.display = shouldHideHeader ? 'none' : 'block';
        footer.style.display = shouldHideFooter ? 'none' : 'block';

        // Adjust body padding
        document.body.style.paddingTop = shouldHideHeader ? '0' : '';
    });
});

function setupGlobalListeners() {
    // Mobile Menu Toggle
    document.addEventListener('click', (e) => {
        if (e.target.closest('#mobile-menu-btn')) {
            const nav = document.querySelector('.nav-links');
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            if (nav.style.display === 'flex') {
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '80px';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.background = 'white';
                nav.style.padding = '20px';
                nav.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }
        }
    });
}

// Order Type Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('order-type-modal');
    if (!modal) return; // Guard clause

    const overlay = document.getElementById('overlay');
    const closeBtn = modal.querySelector('.close-modal');
    const options = modal.querySelectorAll('.order-option');

    function openModal() {
        modal.classList.add('active');
        overlay.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
        // Only remove overlay active if flyout is not active
        if (!document.getElementById('book-detail-flyout').classList.contains('active')) {
            overlay.classList.remove('active');
        }
    }

    window.addEventListener('openOrderModal', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    options.forEach(option => {
        option.addEventListener('click', () => {
            const type = option.dataset.type;
            closeModal();
            // Close flyout as well
            document.getElementById('book-detail-flyout').classList.remove('active');
            document.getElementById('overlay').classList.remove('active');

            window.location.hash = `/order-${type}`;
        });
    });
});
