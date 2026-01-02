import { API_URL, store } from '../store.js';

export const financeApi = {
    async getStats() {
        if (!store.state.token) return { totalOutstanding: 0, collectedToday: 0 };
        try {
            const res = await fetch(`${API_URL}/payments/stats`, {
                headers: { 'Authorization': `Bearer ${store.state.token}` }
            });
            return await res.json();
        } catch (e) { return {}; }
    },

    async getHistory(limit = 20) {
        if (!store.state.token) return [];
        try {
            const res = await fetch(`${API_URL}/payments?limit=${limit}`, {
                headers: { 'Authorization': `Bearer ${store.state.token}` }
            });
            return await res.json();
        } catch (e) { return []; }
    },

    async createPayment(data) {
        if (!store.state.token) throw new Error('Unauthorized');
        const res = await fetch(`${API_URL}/payments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.state.token}`
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to record payment');
        return await res.json();
    }
};
