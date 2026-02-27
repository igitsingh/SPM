import { API_URL, store } from '../store.js';

export const configApi = {
    async getAll() {
        if (!store.state.token) return [];
        try {
            const res = await fetch(`${API_URL}/system-config`, {
                headers: { 'Authorization': `Bearer ${store.state.token}` }
            });
            return await res.json();
        } catch (e) { return []; }
    },
    async update(data) {
        const res = await fetch(`${API_URL}/system-config`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${store.state.token}` },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to update config');
        return res.json();
    }
};
