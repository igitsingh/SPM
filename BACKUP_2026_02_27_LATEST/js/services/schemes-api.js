import { API_URL, store } from '../store.js';

export const schemesApi = {
    async getAll(activeOnly = false) {
        if (!store.state.token) return [];
        try {
            const res = await fetch(`${API_URL}/schemes?active=${activeOnly}`, {
                headers: { 'Authorization': `Bearer ${store.state.token}` }
            });
            return await res.json();
        } catch (e) { return []; }
    },
    async create(data) {
        const res = await fetch(`${API_URL}/schemes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${store.state.token}` },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to create scheme');
        return res.json();
    },
    async toggle(id) {
        await fetch(`${API_URL}/schemes/${id}/toggle`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${store.state.token}` }
        });
    },
    async delete(id) {
        await fetch(`${API_URL}/schemes/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${store.state.token}` }
        });
    }
};
