import { API_URL, store } from '../store.js';

export const catalogueApi = {
    async getAll(filters = {}) {
        // Clean empty filters
        const cleanFilters = {};
        for (const key in filters) {
            if (filters[key]) cleanFilters[key] = filters[key];
        }
        const queryParams = new URLSearchParams(cleanFilters).toString();

        // 1. Try live backend first
        try {
            const res = await fetch(`${API_URL}/books?${queryParams}`);
            if (!res.ok) throw new Error('Backend unavailable');
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) return data;
            throw new Error('Empty response from backend');
        } catch (e) {
            console.warn('[Catalogue] Backend unavailable, falling back to local JSON:', e.message);
        }

        // 2. Fallback: load from local catalogue_2026.json
        try {
            const res = await fetch('/catalogue_2026.json');
            if (!res.ok) throw new Error('Local JSON not found');
            const data = await res.json();
            const books = data.books || [];

            // Normalise to match the shape catalogue.js expects from the backend
            return books.map((b, i) => ({
                ...b,
                id: b.code || String(i + 1),       // use book code as id
                priceRetail: b.price || 0,           // catalogue.js reads priceRetail
                coverImage: null,                    // handled via b.image below
                image: b.image || null,              // keep raw image path for fallback
                isActive: b.isActive !== false,
            }));
        } catch (e) {
            console.error('[Catalogue] Local JSON fallback also failed:', e);
            return [];
        }
    },

    async create(bookData) {
        if (!store.state.token) throw new Error("Unauthorized");
        const res = await fetch(`${API_URL}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.state.token}`
            },
            body: JSON.stringify(bookData)
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Failed to create book');
        }
        return res.json();
    },

    async update(id, bookData) {
        if (!store.state.token) throw new Error("Unauthorized");
        const res = await fetch(`${API_URL}/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.state.token}`
            },
            body: JSON.stringify(bookData)
        });
        if (!res.ok) throw new Error('Failed to update book');
        return res.json();
    },

    async delete(id) {
        if (!store.state.token) throw new Error("Unauthorized");
        const res = await fetch(`${API_URL}/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${store.state.token}`
            }
        });
        if (!res.ok) throw new Error('Failed to delete book');
        return res.json();
    },

    async bulkCreate(books) {
        if (!store.state.token) throw new Error("Unauthorized");
        const res = await fetch(`${API_URL}/books/bulk`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.state.token}`
            },
            body: JSON.stringify(books)
        });
        if (!res.ok) throw new Error('Failed to bulk upload');
        return res.json();
    }
};
