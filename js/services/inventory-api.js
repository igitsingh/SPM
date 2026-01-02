import { API_URL, store } from '../store.js';

export const inventoryApi = {
    async getLogs(limit = 20) {
        if (!store.state.token) return [];
        try {
            const res = await fetch(`${API_URL}/inventory/logs?limit=${limit}`, {
                headers: { 'Authorization': `Bearer ${store.state.token}` }
            });
            if (!res.ok) throw new Error('Failed to fetch logs');
            return await res.json();
        } catch (e) {
            console.error(e);
            return [];
        }
    },

    async getLowStock() {
        if (!store.state.token) return [];
        try {
            const res = await fetch(`${API_URL}/inventory/low-stock`, {
                headers: { 'Authorization': `Bearer ${store.state.token}` }
            });
            return await res.json();
        } catch (e) { return []; }
    },

    async adjustStock(bookId, type, quantity, reason) {
        if (!store.state.token) throw new Error('Unauthorized');
        const res = await fetch(`${API_URL}/inventory/adjust`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.state.token}`
            },
            body: JSON.stringify({ bookId, type, quantity: parseInt(quantity), reason })
        });
        if (!res.ok) {
            if (res.status === 401) {
                throw new Error('Session expired. Please login again.');
            }
            const errText = await res.text();
            throw new Error(`Failed: ${res.status} ${res.statusText} - ${errText}`);
        }
        return await res.json();
    }
};
