import { API_URL, store } from '../store.js';

export const userApi = {
    async getAdmins() {
        if (!store.state.token) return [];
        try {
            const res = await fetch(`${API_URL}/users/admins`, {
                headers: { 'Authorization': `Bearer ${store.state.token}` }
            });
            if (!res.ok) return [];
            return await res.json();
        } catch (e) { return []; }
    },

    async login(email, password) {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            const err = await res.json();
            // Try to be descriptive if possible
            throw new Error(err.message || 'Login failed');
        }
        return res.json(); // Returns { access_token, user }
    },

    async register(data) {
        // data: { email, password, name, phone, shopName, etc }
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Registration failed');
        }
        return res.json();
    },

    async create(data) {
        const res = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.state.token}`
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Failed to create user');
        }
        return res.json();
    },

    async toggle(id) {
        const res = await fetch(`${API_URL}/users/${id}/toggle`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${store.state.token}` }
        });
        if (!res.ok) throw new Error('Failed to toggle status');
    },

    async reset(id) {
        const res = await fetch(`${API_URL}/users/${id}/reset-password`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${store.state.token}` }
        });
        if (!res.ok) throw new Error('Failed to reset password');
    }
};
