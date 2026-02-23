/**
 * Authentication & Authorization Utilities
 * Handles role-based access control and route protection
 */

import { store } from '../store.js';

// User Roles
export const ROLES = {
    STUDENT: 'customer',
    PARENT: 'customer',
    SCHOOL: 'partner',
    DISTRIBUTOR: 'partner',
    RETAILER: 'partner',
    ADMIN: 'admin',
    GUEST: 'guest'
};

// Sub-roles for partners and customers
export const SUB_ROLES = {
    STUDENT: 'student',
    PARENT: 'parent',
    SCHOOL: 'school',
    DISTRIBUTOR: 'distributor',
    RETAILER: 'retailer'
};

/**
 * Get current user from store
 */
export function getCurrentUser() {
    return store.state.user;
}

/**
 * Check if user is logged in
 */
export function isAuthenticated() {
    return !!store.state.token && !!store.state.user;
}

/**
 * Get user's role
 */
export function getUserRole() {
    const user = getCurrentUser();
    if (!user) return ROLES.GUEST;
    return user.role;
}

/**
 * Get user's sub-role (for partners and customers)
 */
export function getUserSubRole() {
    const user = getCurrentUser();
    if (!user) return null;
    return user.subRole || null;
}

/**
 * Check if user is a student or parent
 */
export function isCustomer() {
    return getUserRole() === ROLES.STUDENT;
}

/**
 * Check if user is a partner (school/distributor/retailer)
 */
export function isPartner() {
    return getUserRole() === ROLES.SCHOOL;
}

/**
 * Check if user is admin
 */
export function isAdmin() {
    return getUserRole() === ROLES.ADMIN;
}

/**
 * Check if user has specific sub-role
 */
export function hasSubRole(subRole) {
    return getUserSubRole() === subRole;
}

/**
 * Get dashboard route based on user role
 */
export function getDashboardRoute() {
    const role = getUserRole();
    const subRole = getUserSubRole();

    if (role === 'admin') {
        return '/admin/dashboard';
    } else if (role === 'partner') {
        // All partners (school/distributor/retailer) go to partner dashboard
        return '/dashboard';
    } else if (role === 'customer') {
        // Students and parents go to student dashboard
        return '/students/dashboard';
    }

    return '/';
}

/**
 * Redirect to appropriate dashboard
 */
export function redirectToDashboard() {
    const route = getDashboardRoute();
    window.location.hash = route;
}

/**
 * Redirect to login with optional next parameter
 */
export function redirectToLogin(nextPath = null) {
    if (nextPath) {
        window.location.hash = `/login?next=${encodeURIComponent(nextPath)}`;
    } else {
        window.location.hash = '/login';
    }
}

/**
 * Check if user can access a specific route
 * Returns { allowed: boolean, reason: string }
 */
export function canAccessRoute(path) {
    const user = getCurrentUser();
    const role = getUserRole();
    const subRole = getUserSubRole();

    // Public routes - anyone can access
    const publicRoutes = [
        '/',
        '/catalogue',
        '/about',
        '/contact',
        '/login',
        '/student-login',
        '/admin/login',
        '/register',
        '/student-register',
        '/partner-register',
        '/business-opportunity',
        '/new-schools',
        '/distributors',
        '/video-library',
        '/forbusiness'
    ];

    if (publicRoutes.includes(path)) {
        return { allowed: true };
    }

    // Routes that require login but no specific role
    if (!isAuthenticated()) {
        return {
            allowed: false,
            reason: 'You must be logged in to access this page.',
            redirect: '/login'
        };
    }

    // Admin routes - only admins
    if (path.startsWith('/admin')) {
        if (role !== 'admin') {
            return {
                allowed: false,
                reason: 'You are not authorized to access the Admin Panel. Admin access only.',
                redirect: getDashboardRoute()
            };
        }
        return { allowed: true };
    }

    // Partner routes - only partners
    if (path.startsWith('/partner') || path === '/dashboard') {
        if (role !== 'partner') {
            return {
                allowed: false,
                reason: 'You are not authorized to access the Partner Portal. Partner access only.',
                redirect: getDashboardRoute()
            };
        }
        return { allowed: true };
    }

    // Student/Parent routes
    if (path.startsWith('/students')) {
        if (role !== 'customer') {
            return {
                allowed: false,
                reason: 'You are not authorized to access the Student Portal. Student/Parent access only.',
                redirect: getDashboardRoute()
            };
        }
        return { allowed: true };
    }

    // Portal selection page - require login
    if (path === '/portal-select') {
        if (!isAuthenticated()) {
            return {
                allowed: false,
                reason: 'Please login to access the Business Portal.',
                redirect: '/login?next=/portal-select'
            };
        }
        // Only partners should access portal select
        if (role !== 'partner') {
            return {
                allowed: false,
                reason: 'You are not authorized to access the Partner Business Portal. Partner access only.',
                redirect: getDashboardRoute()
            };
        }
        return { allowed: true };
    }

    // Legacy order routes - block these for now
    if (path === '/order-school' || path === '/order-distributor' || path === '/order-retailer') {
        return {
            allowed: false,
            reason: 'Please use the Partner Portal to place orders.',
            redirect: '/dashboard'
        };
    }

    // Default: allow if authenticated
    return { allowed: true };
}

/**
 * Protect a route - call this before rendering
 * Returns true if allowed, false if blocked (and handles redirect)
 */
export function protectRoute(path) {
    const check = canAccessRoute(path);

    if (!check.allowed) {
        // Show error message
        if (check.reason) {
            alert(check.reason);
        }

        // Redirect
        if (check.redirect) {
            window.location.hash = check.redirect;
        } else {
            window.location.hash = '/';
        }

        return false;
    }

    return true;
}

/**
 * Get navigation items based on user role
 */
export function getNavigationItems() {
    const role = getUserRole();
    const subRole = getUserSubRole();
    const authenticated = isAuthenticated();

    // Guest/Public navigation
    if (!authenticated) {
        return {
            left: [
                { label: 'Home', href: '#/' },
                {
                    label: 'Kindergarten ▾',
                    dropdown: [
                        { label: 'Nursery Books', href: '#/catalogue?class=Nursery' },
                        { label: 'Pre Nursery Books', href: '#/catalogue?class=LKG' },
                        { label: 'Pre Primer Books', href: '#/catalogue?class=UKG' },
                        { label: 'Primer Books', href: '#/catalogue?class=UKG' }
                    ]
                },
                {
                    label: 'Children Books ▾',
                    dropdown: [
                        { label: 'Story Books', href: '#/catalogue?category=Story' },
                        { label: 'Coloring Books', href: '#/catalogue?category=Coloring' },
                        { label: 'Activity Books', href: '#/catalogue?category=Activity' }
                    ]
                },
                {
                    label: 'Students Corner ▾',
                    badge: true,
                    dropdown: [
                        { label: 'Video Library', href: '#/video-library' },
                        { label: 'Syllabus', href: '#/' },
                        { label: 'Exam Datesheets', href: '#/' },
                        { label: 'Time Management', href: '#/' },
                        { label: 'Mind Mapping', href: '#/' },
                        { label: 'Earn with Study', href: '#/' },
                        { label: 'Student Leisure', href: '#/' },
                        { label: 'Blogs', href: '#/' }
                    ]
                }
            ],
            right: [
                { label: 'Catalogue', href: '#/catalogue' },
                { label: 'For Business', href: '#/portal-select', style: 'color: white; background: #FFD700; padding: 8px 16px; font-weight: 600; border-radius: 0;' },
                { label: 'Login', href: '#/student-login', style: 'color: #667eea; font-weight: 600;' },
                { label: 'Register', href: '#/student-register', style: 'color: white; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 8px 16px; font-weight: 600; border-radius: 6px;' }
            ]
        };
    }

    // Student/Parent navigation
    if (role === ROLES.STUDENT || role === ROLES.PARENT) {
        return {
            left: [
                { label: 'Home', href: '#/' },
                { label: 'Catalogue', href: '#/catalogue' },
                { label: 'My Dashboard', href: '#/students/dashboard' }
            ],
            right: [
                { label: 'My Orders', href: '#/students/orders' },
                { label: 'Contact', href: '#/contact' },
                { label: 'Logout', href: '#/logout', onClick: () => store.logout() }
            ]
        };
    }

    // Partner navigation - they should use partner layout, not public header
    if (role === ROLES.SCHOOL || role === ROLES.DISTRIBUTOR || role === ROLES.RETAILER) {
        return {
            left: [],
            right: []
        };
    }

    // Admin navigation - they should use admin layout, not public header
    if (role === ROLES.ADMIN) {
        return {
            left: [],
            right: []
        };
    }

    // Default fallback
    return { left: [], right: [] };
}
