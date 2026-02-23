/**
 * Simple State Management
 */

export const API_URL = 'http://localhost:4001';
const STORE_KEY = 'paradise_cart';

export const store = {
    state: {
        cart: JSON.parse(localStorage.getItem(STORE_KEY)) || [],
        user: JSON.parse(localStorage.getItem('spm_user')) || null,
        token: localStorage.getItem('spm_token') || null,
        currentOrder: null
    },

    listeners: [],

    subscribe(callback) {
        this.listeners.push(callback);
    },

    notify() {
        this.listeners.forEach(cb => cb(this.state));
        localStorage.setItem(STORE_KEY, JSON.stringify(this.state.cart));
    },

    // --- AUTHENTICATION ---
    async login(email, password) {
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.message || 'Login failed');
            }

            const data = await res.json();
            // data = { access_token, user }
            this.state.token = data.access_token;
            this.state.user = data.user;

            localStorage.setItem('spm_token', data.access_token);
            localStorage.setItem('spm_user', JSON.stringify(data.user));

            return { success: true };
        } catch (err) {
            console.error(err);
            return { success: false, message: err.message };
        }
    },

    logout() {
        this.state.token = null;
        this.state.user = null;
        localStorage.removeItem('spm_token');
        localStorage.removeItem('spm_user');
        window.location.hash = '/login';
    },

    // --- CART ---
    addToCart(book, quantity = 1) {
        const existing = this.state.cart.find(item => item.id === book.id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.state.cart.push({ ...book, quantity });
        }
        this.notify();
    },

    updateQuantity(bookId, quantity) {
        const item = this.state.cart.find(item => item.id === bookId);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                this.removeFromCart(bookId);
            } else {
                this.notify();
            }
        }
    },

    removeFromCart(bookId) {
        this.state.cart = this.state.cart.filter(item => item.id !== bookId);
        this.notify();
    },

    clearCart() {
        this.state.cart = [];
        this.notify();
    },

    getCartTotal() {
        return this.state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    // --- API ORDERS ---
    async saveOrder(orderDetails) {
        if (!this.state.token) {
            alert('Please login to place an order');
            return null;
        }

        // Convert Cart to API DTO format
        // DTO: { items: [ { bookId, qty } ] }
        const payload = {
            items: this.state.cart.map(item => ({
                bookId: item.id, // Ensure frontend book object has 'id' matching UUID
                qty: item.quantity
            }))
        };

        try {
            const res = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.state.token}`
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to place order');
            const newOrder = await res.json();

            this.clearCart();
            return newOrder;
        } catch (err) {
            console.error('Order Error:', err);
            alert('Error placing order: ' + err.message);
            return null;
        }
    },

    async getOrders() {
        if (!this.state.token) return [];

        try {
            const res = await fetch(`${API_URL}/orders`, {
                headers: { 'Authorization': `Bearer ${this.state.token}` }
            });
            if (res.ok) {
                const orders = await res.json();
                return orders; // Returns real API orders
            }
        } catch (err) {
            console.warn('API Fetch failed, showing cache/mock', err);
        }
        return [];
    },

    async getOrder(id) {
        if (!this.state.token) return null;
        try {
            const res = await fetch(`${API_URL}/orders/${id}`, {
                headers: { 'Authorization': `Bearer ${this.state.token}` }
            });
            if (res.ok) return await res.json();
            throw new Error('Order not found');
        } catch (err) {
            console.error(err);
            return null;
        }
    }
};
