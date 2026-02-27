import { API_URL } from '../store.js';

export const videoApi = {
    async getAll(filters = {}) {
        // Clean filters
        const clean = {};
        for (let k in filters) if (filters[k]) clean[k] = filters[k];
        const queryParams = new URLSearchParams(clean).toString();

        try {
            const res = await fetch(`${API_URL}/videos?${queryParams}`);
            if (!res.ok) throw new Error('Failed to fetch videos');
            return await res.json();
        } catch (e) {
            console.error(e);
            return []; // Return empty if failed (or offline)
        }
    },

    async create(videoData) {
        const res = await fetch(`${API_URL}/videos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(videoData)
        });
        if (!res.ok) throw new Error('Failed to create video');
        return res.json();
    },

    async update(id, videoData) {
        const res = await fetch(`${API_URL}/videos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(videoData)
        });
        if (!res.ok) throw new Error('Failed to update video');
        return res.json();
    },

    async delete(id) {
        const res = await fetch(`${API_URL}/videos/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Failed to delete video');
        return res.json();
    }
};
