import { API_URL, store } from '../store.js';

export const partnerApi = {
    async search(term) {
        if (!store.state.token) return [];
        const query = term ? `?search=${term}` : '';
        try {
            const res = await fetch(`${API_URL}/partners${query}`, {
                headers: { 'Authorization': `Bearer ${store.state.token}` }
            });
            return await res.json();
        } catch (e) { return []; }
    }
};
