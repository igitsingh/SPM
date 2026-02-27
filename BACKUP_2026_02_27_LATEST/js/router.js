/**
 * Simple Hash Router
 */
import { hydrateViews } from './interactions.js';
import { renderPartnerLayout } from './components/partner-layout.js';
import { renderOrderDetails } from './views/partner/order-details.js';

export class Router {
    constructor(routes) {
        this.routes = routes;
        this.root = document.getElementById('main-content');
        window.addEventListener('hashchange', () => this.loadRoute());
        this.loadRoute(); // Initial load
    }

    async loadRoute() {
        // Reset scroll immediately
        window.scrollTo(0, 0);

        const hash = window.location.hash.slice(1) || '/';
        let [path, query] = hash.split('?');
        if (path.length > 1 && path.endsWith('/')) {
            path = path.slice(0, -1);
        }

        let route = this.routes[path];

        // Dynamic Route Handling: /orders/:id
        if (!route && path.startsWith('/orders/')) {
            const id = path.split('/')[2];
            route = async () => {
                const content = await renderOrderDetails(id);
                // Wrap in Partner Layout
                return renderPartnerLayout(content, '/partner/orders');
            };
        }

        if (!route) route = this.routes['/404'];

        if (route) {
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                // Handle dropdown parent active state if needed
                link.classList.toggle('active', link.getAttribute('href') === `#${path}`);
            });

            // Render view
            // We await it in case it's async (fetching data)
            const content = await route();
            this.root.innerHTML = content;

            // Dispatch event for components
            window.dispatchEvent(new CustomEvent('routeChanged', { detail: { path } }));

            // NEW: Hydrate interactive elements
            // We wrap in a small timeout to ensure DOM is ready, though innerHTML is synchronous
            requestAnimationFrame(() => {
                hydrateViews(path);
            });
        }
    }

    navigate(path) {
        window.location.hash = path;
    }
}
