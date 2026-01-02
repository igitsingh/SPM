import { API_URL, store } from '../store.js';

export const catalogueApi = {
    async getAll(filters = {}) {
        // Clean empty filters
        const cleanFilters = {};
        for (const key in filters) {
            if (filters[key]) cleanFilters[key] = filters[key];
        }
        const queryParams = new URLSearchParams(cleanFilters).toString();

        try {
            const res = await fetch(`${API_URL}/books?${queryParams}`);
            if (!res.ok) throw new Error('Failed to fetch books');
            return await res.json();
        } catch (e) {
            console.error(e);
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
