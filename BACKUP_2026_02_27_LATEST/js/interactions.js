import { store } from './store.js';
import { userApi } from './services/user-api.js';
import { redirectToDashboard } from './utils/auth.js';

function hydrateRegister() {
    const form = document.getElementById('registerForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const phone = document.getElementById('reg-phone').value;
            const shopName = document.getElementById('reg-shop').value;
            const btn = form.querySelector('button');

            try {
                btn.textContent = 'Creating Account...';
                btn.disabled = true;

                // 1. Register User
                const userData = {
                    name,
                    email,
                    password,
                    phone,
                    role: 'partner', // Default to partner
                    subRole: 'retailer', // Default subroll
                    shopName
                };

                await userApi.register(userData);

                alert('Registration Successful! Please Login.');
                window.location.hash = '/login';

            } catch (err) {
                alert('Registration Failed: ' + err.message);
            } finally {
                btn.textContent = 'Register';
                btn.disabled = false;
            }
        });
    }
}

function hydratePartnerRegister() {
    const form = document.getElementById('partnerRegisterForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const partnerType = document.getElementById('partner-type').value;
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const phone = document.getElementById('reg-phone').value;
            const shopName = document.getElementById('reg-shop').value;
            const btn = form.querySelector('button');

            if (!partnerType) {
                alert('Please select a partner type');
                return;
            }

            try {
                btn.textContent = 'Creating Account...';
                btn.disabled = true;

                const userData = {
                    name,
                    email,
                    password,
                    phone,
                    role: 'partner',
                    subRole: partnerType, // school, distributor, or retailer
                    shopName
                };

                await userApi.register(userData);

                alert('Registration Successful! Please Login.');
                window.location.hash = '/login';

            } catch (err) {
                alert('Registration Failed: ' + err.message);
            } finally {
                btn.textContent = 'Register as Partner';
                btn.disabled = false;
            }
        });
    }
}

function hydrateStudentRegister() {
    const form = document.getElementById('studentRegisterForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const userType = document.getElementById('user-type').value;
            const name = document.getElementById('student-name').value;
            const email = document.getElementById('student-email').value;
            const password = document.getElementById('student-password').value;
            const phone = document.getElementById('student-phone').value;
            const btn = form.querySelector('button');

            if (!userType) {
                alert('Please select if you are a student or parent');
                return;
            }

            try {
                btn.textContent = 'Creating Account...';
                btn.disabled = true;

                const userData = {
                    name,
                    email,
                    password,
                    phone,
                    role: 'customer',
                    subRole: userType // student or parent
                };

                await userApi.register(userData);

                alert('Registration Successful! Please Login.');
                window.location.hash = '/student-login';

            } catch (err) {
                alert('Registration Failed: ' + err.message);
            } finally {
                btn.textContent = 'Create Account';
                btn.disabled = false;
            }
        });
    }
}

function hydrateStudentLogin() {
    const form = document.getElementById('studentLoginForm');
    const demoBtn = document.getElementById('demo-student-btn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('student-login-email').value;
            const password = document.getElementById('student-login-password').value;
            const btn = form.querySelector('button[type="submit"]');

            try {
                btn.textContent = 'Signing In...';
                btn.disabled = true;

                const result = await store.login(email, password);

                if (result.success) {
                    alert('Login Successful!');
                    redirectToDashboard(); // Redirect to appropriate dashboard
                } else {
                    alert('Login Failed: ' + result.message);
                }

            } catch (err) {
                alert('Login Error: ' + err.message);
            } finally {
                btn.textContent = 'Sign In';
                btn.disabled = false;
            }
        });
    }

    if (demoBtn) {
        demoBtn.addEventListener('click', async () => {
            try {
                demoBtn.textContent = 'Logging in...';
                demoBtn.disabled = true;

                const result = await store.login('demo@student.com', 'demo123');

                if (result.success) {
                    alert('Demo Login Successful!');
                    redirectToDashboard();
                } else {
                    alert('Demo Login Failed. Using fallback...');
                    redirectToDashboard();
                }

            } catch (err) {
                console.error('Demo login error:', err);
                window.location.hash = '/';
            } finally {
                demoBtn.textContent = '🎭 Use Demo Account';
                demoBtn.disabled = false;
            }
        });
    }
}

export function hydrateViews(path) {
    console.log('Hydrating view for path:', path);

    if (path === '/login') {
        hydrateLogin();
        return; // Login page has specific isolated logic
    } else if (path === '/admin/login') {
        hydrateAdminLogin();
        return;
    } else if (path === '/register') {
        hydrateRegister();
        return; // Register page has specific isolated logic
    } else if (path === '/partner-register') {
        hydratePartnerRegister();
        return;
    } else if (path === '/student-register') {
        hydrateStudentRegister();
        return;
    } else if (path === '/student-login') {
        hydrateStudentLogin();
        return;
    }

    // 1. Global: Admin Sidebar Mobile Toggle
    attachSidebarToggle();

    // 2. Global: Mobile Menu Toggle
    attachMobileMenuToggle();

    // 3. Specific components based on path
    if (path === '/admin/orders') {
        hydrateOrdersManagement();
    } else if (path === '/dashboard') {
        hydratePartnerDashboard(); // Partner
    } else if (path === '/partner/order' || path === '/partner/catalogue') {
        hydratePartnerDashboard(); // Re-use listeners
    } else if (path === '/admin/retailer-profile') {
        hydrateRetailerProfile();
    } else if (path === '/admin/dashboard') {
        hydrateAnalyticsDashboard(); // Admin
    }

    // 4. Global Tab System (if present on page)
    hydrateGlobalTabs();
}

/**
 * Mobile Sidebar Toggle (Admin)
 */
function attachSidebarToggle() {
    const toggleBtn = document.querySelector('.spm-mobile-toggle');
    const sidebar = document.querySelector('.spm-admin-sidebar');

    if (toggleBtn && sidebar) {
        // Remove old listener to avoid duplicates if re-rendering
        const newBtn = toggleBtn.cloneNode(true);
        toggleBtn.parentNode.replaceChild(newBtn, toggleBtn);

        newBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing immediately
            sidebar.classList.toggle('open');
            console.log('Sidebar toggled');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 1024 && sidebar.classList.contains('open')) {
                if (!sidebar.contains(e.target) && !newBtn.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            }
        });
    }
}

/**
 * Mobile Menu Toggle (Public Site)
 */
function attachMobileMenuToggle() {
    // Note: The public header might be using inline onclick="toggleMobileMenu()".
    // We can leave that if it works, or attach here for robustness.
    const icon = document.querySelector('.mobile-menu-icon');
    const menu = document.getElementById('mobileMenu');

    if (icon && menu) {
        // We assume global toggle function might be missing or broken, so we wire it up manually
        window.toggleMobileMenu = function () {
            menu.classList.toggle('active');
        };
    }
}

/**
 * Tab System Logic
 * Finds .spm-tabs and handles transitions
 */
function hydrateGlobalTabs() {
    const tabs = document.querySelectorAll('.spm-tab');
    if (tabs.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from siblings
            const parent = tab.parentNode;
            parent.querySelectorAll('.spm-tab').forEach(t => t.classList.remove('active'));
            // Add active to self
            tab.classList.add('active');

            // In a real app, this would switch content. 
            // For this UI demo, we might just show a toast or log.
            const filterName = tab.innerText.trim();
            console.log('Tab switched to:', filterName);

            // If we are on Orders page, maybe filter table?
            // This is optional for visual demo unless requested.
        });
    });
}

/**
 * Orders Management Interactivity
 */
function hydrateOrdersManagement() {
    // Select All Checkbox
    const headerCheck = document.querySelector('thead input[type="checkbox"]');
    if (headerCheck) {
        headerCheck.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            document.querySelectorAll('tbody input[type="checkbox"]').forEach(box => {
                box.checked = isChecked;
            });
            toggleBulkActions(isChecked);
        });
    }

    // Row Checkboxes
    document.querySelectorAll('tbody input[type="checkbox"]').forEach(box => {
        box.addEventListener('change', () => {
            // Check if any selected
            const anyChecked = document.querySelector('tbody input[type="checkbox"]:checked');
            toggleBulkActions(!!anyChecked);
        });
    });

    // Pagination Buttons
    document.querySelectorAll('.spm-page-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('disabled')) return;
            document.querySelectorAll('.spm-page-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Filters - Reset Button
    const resetBtn = document.querySelector('.spm-filter-bar button');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            document.querySelectorAll('.spm-search-input').forEach(i => i.value = '');
            document.querySelectorAll('.spm-select').forEach(s => s.selectedIndex = 0);
            alert('Filters cleared');
        });
    }
}

function toggleBulkActions(show) {
    // We could dynamically inject a bulk action bar or just log it
    if (show) {
        console.log('Show Bulk Actions');
        // If we had a hidden Bulk Bar in DOM, we would unhide it here.
    }
}

/**
 * Partner Dashboard Interactivity
 */
function hydratePartnerDashboard() {
    // Quick Action Buttons
    const actionCards = document.querySelectorAll('.spm-card[onclick]');
    // Wait, the partner layout might render standard <a> tags inside or not.
    // Let's look at how dashboard.js rendered them.
    // It rendered: <div class="spm-card ... cursor: pointer;"> ... </div>
    // We should make them clickable if they are not already <a> links.

    // Actually, dashboard.js used <a> tags for "Place New Order" etc? 
    // Let's check dashboard.js content later. 
    // Assuming generic buttons need simple feedback:
    document.querySelectorAll('.spm-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // If it's a link, let it navigate. If it's a button, show feedback.
            if (btn.tagName === 'BUTTON') {
                const text = btn.innerText;
                alert(`Action triggered: ${text}`);
            }
        });
    });
}

/**
 * Retailer Profile Interactivity
 */
function hydrateRetailerProfile() {
    const buttons = document.querySelectorAll('button.spm-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.innerText.includes('Statement')) {
                alert('Statement sent to retailer email!');
            } else if (btn.innerText.includes('Order')) {
                window.location.hash = '#/admin/orders'; // Redirect example
            } else if (btn.innerText.includes('Note')) {
                const note = prompt('Enter internal note:');
                if (note) alert('Note added.');
            }
        });
    });
}

/**
 * Analytics Dashboard Interactivity
 */
function hydrateAnalyticsDashboard() {
    const selects = document.querySelectorAll('select.spm-select');
    selects.forEach(sel => {
        sel.addEventListener('change', () => {
            console.log('Filter changed:', sel.value);
            // In a real app, we'd re-fetch data here.
        });
    });
}

/**
 * Login Page Logic
 */
function hydrateLogin() {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Signing in...';
            btn.disabled = true;

            const result = await store.login(email, password);

            if (result.success) {
                // Redirect to appropriate dashboard based on role
                redirectToDashboard();
            } else {
                alert('Login Failed: ' + (result.message || 'Check credentials'));
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }
}

function hydrateAdminLogin() {
    const form = document.getElementById('adminLoginForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('admin-email').value;
            const password = document.getElementById('admin-password').value;
            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Authenticating...';
            btn.disabled = true;

            const result = await store.login(email, password);

            if (result.success) {
                // Check if user is admin
                const user = store.state.user;
                if (user && user.role === 'admin') {
                    window.location.hash = '/admin/dashboard';
                } else {
                    alert('Access Denied. You do not have admin privileges.');
                    store.logout(); // Clear invalid session
                    btn.innerText = originalText;
                    btn.disabled = false;
                }

            } else {
                alert('Admin Login Failed: ' + (result.message || 'Invalid credentials'));
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }
}
//...
