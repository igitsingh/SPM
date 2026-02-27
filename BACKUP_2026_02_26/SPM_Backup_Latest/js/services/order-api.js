import { API_URL, store } from '../store.js';

export const orderApi = {
    async getAll(filters = {}) {
        if (!store.state.token) return [];
        const query = new URLSearchParams(filters).toString();
        try {
            const res = await fetch(`${API_URL}/orders?${query}`, {
                headers: { 'Authorization': `Bearer ${store.state.token}` }
            });
            return await res.json();
        } catch (e) { return []; }
    },

    async getOne(id) {
        if (!store.state.token) return null;
        try {
            const res = await fetch(`${API_URL}/orders/${id}`, {
                headers: { 'Authorization': `Bearer ${store.state.token}` }
            });
            return await res.json();
        } catch (e) { return null; }
    },

    async create(data) {
        const res = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.state.token}`
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Failed to create order');
        }
        return res.json();
    },

    async updateStatus(id, status, notes) {
        const res = await fetch(`${API_URL}/orders/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.state.token}`
            },
            body: JSON.stringify({ status, notes })
        });
        if (!res.ok) throw new Error('Failed to update status');
        return res.json();
    }
};
