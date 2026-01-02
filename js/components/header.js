import { isAuthenticated, getUserRole, ROLES } from '../utils/auth.js';
import { store } from '../store.js';
// CACHE BUSTER: Version 2025-12-10-01:44 - Navigation menu fixes applied


export function renderHeader() {
    const authenticated = isAuthenticated();
    const role = getUserRole();
    const user = store.state.user;

    // Determine what navigation to show
    let rightNav = '';

    if (!authenticated) {
        // Guest navigation
        rightNav = `
            <a href="#/catalogue" class="nav-link" style="color: white !important;">Catalogue</a>
            
            <div class="dropdown">
                <span class="nav-link" style="cursor: pointer; position: relative; color: white !important;">
                    Orders ▾
                    <img src="images/new-badge.svg" class="nav-badge-icon" alt="New">
                </span>
                <div class="dropdown-content">
                    <a href="#/order?type=school">School Order</a>
                    <a href="#/order?type=distributor">Distributor Order</a>
                    <a href="#/order?type=retailer">Retailer Order</a>
                </div>
            </div>
            
            <a href="#/portal-select" class="nav-link" style="color: black !important; background: #FFD700; padding: 8px 16px; font-weight: 600; border-radius: 0;">For Business</a>
            <a href="#/student-login" class="nav-link" style="color: #667eea !important; font-weight: 600;">Login</a>
            <a href="#/student-register" class="nav-link" style="color: white !important; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 8px 16px; font-weight: 600; border-radius: 6px;">Register</a>
        `;
    } else if (role === 'customer') {
        // Student/Parent navigation
        rightNav = `
            <a href="#/catalogue" class="nav-link" style="color: white !important;">Catalogue</a>
            <a href="#/students/orders" class="nav-link" style="color: white !important;">My Orders</a>
            <a href="#/students/dashboard" class="nav-link" style="color: white !important;">My Dashboard</a>
            <a href="#/contact" class="nav-link" style="color: white !important;">Contact</a>
            <a href="#" class="nav-link" id="logout-btn" style="color: #ff4444 !important; font-weight: 600;">Logout</a>
        `;
    }
    // Partners and Admins don't see the public header (they have their own layouts)

    return `
        <div class="navbar-wrapper">
            <div class="container navbar">
                <div class="navbar-main">
                    <a href="#/" class="logo flex items-center">
                        <div class="logo-text" style="font-family: var(--font-main); font-weight: 800; font-size: 1.5rem; color: #ffffff; letter-spacing: 0.5px;">
                            SPMLearning
                        </div>
                    </a>

                    <nav class="nav-links" style="display: flex !important; gap: 20px; align-items: center; width: 100% !important;">
                        <!-- LEFT GROUP -->
                        <div class="nav-group-left" style="display: flex; gap: 20px; align-items: center;">
                            <a href="#/" class="nav-link">Home</a>
                            
                            <div class="dropdown">
                                <span class="nav-link" style="cursor: pointer;">Kindergarten ▾</span>
                                <div class="dropdown-content">
                                    <a href="#/catalogue?class=Nursery">Nursery Books</a>
                                    <a href="#/catalogue?class=LKG">Pre Nursery Books</a>
                                    <a href="#/catalogue?class=UKG">Pre Primer Books</a>
                                    <a href="#/catalogue?class=UKG">Primer Books</a>
                                </div>
                            </div>
    
                            <div class="dropdown">
                                <span class="nav-link" style="cursor: pointer;">Children Books ▾</span>
                                <div class="dropdown-content">
                                    <a href="#/catalogue?category=Story">Story Books</a>
                                    <a href="#/catalogue?category=Coloring">Coloring Books</a>
                                    <a href="#/catalogue?category=Activity">Activity Books</a>
                                </div>
                            </div>
    
                            <div class="dropdown">
                                <span class="nav-link" style="cursor: pointer; position: relative;">
                                    Students Corner ▾
                                    <img src="images/new-badge.svg" class="nav-badge-icon" alt="New">
                                </span>
                                <div class="dropdown-content">
                                    <a href="#/video-library">Video Library</a>
                                    <a href="#/">Syllabus</a>
                                    <a href="#/">Exam Datesheets</a>
                                    <a href="#/">Time Management</a>
                                    <a href="#/">Mind Mapping</a>
                                    <a href="#/">Earn with Study</a>
                                    <a href="#/">Student Leisure</a>
                                    <a href="#/">Blogs</a>
                                </div>
                            </div>
                        </div>

                        <!-- RIGHT GROUP - Dynamic based on auth -->
                        <div class="nav-group-right" style="display: flex !important; gap: 20px; align-items: center; margin-left: auto !important; min-width: 400px; flex-shrink: 0; min-height: 40px; padding: 5px 10px; visibility: visible !important; opacity: 1 !important; z-index: 100;">
                            ${rightNav}
                        </div>
                    </nav>
                </div>

                <button id="mobile-menu-btn" style="display: none; position: absolute; right: 20px; top: 20px; font-size: 1.5rem;">☰</button>
            </div>
        </div>
        <style>
            @media (max-width: 768px) {
                #mobile-menu-btn { display: block; }
                .navbar { padding: 10px 20px; }
                .nav-links { display: none; } /* Hide by default on mobile */
                .logo { margin-bottom: 0; }
                .navbar-main { align-items: flex-start; }
            }
        </style>
    `;
}

// Initialize header interactions
export function initHeader() {
    // Logout button handler
    document.addEventListener('click', (e) => {
        if (e.target.id === 'logout-btn') {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                store.logout();
            }
        }
    });
}
