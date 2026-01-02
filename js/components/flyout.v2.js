import { catalogueApi } from '../services/catalogue-api.js';
import { store } from '../store.js';

let books = [];

export function initFlyout() {
    const flyout = document.getElementById('book-detail-flyout');
    const overlay = document.getElementById('overlay');

    function closeFlyout() {
        flyout.classList.remove('active');
        overlay.classList.remove('active');
    }

    overlay.addEventListener('click', closeFlyout);

    window.addEventListener('openBookDetail', async (e) => {
        if (books.length === 0) {
            try {
                const raw = await catalogueApi.getAll();
                books = raw.map(b => ({
                    ...b,
                    id: b.id,
                    code: b.code || '',
                    title: b.title,
                    class: b.class || 'N/A',
                    price: Number(b.priceRetail) || 0,
                    image: b.coverImage || '',
                }));
            } catch (e) { console.error("Flyout data error", e); }
        }

        const bookId = e.detail;
        const book = books.find(b => b.id === bookId);

        if (!book) return;

        flyout.innerHTML = `
            <div class="flyout-header">
                <h3>Book Details</h3>
                <button onclick="document.getElementById('overlay').click()" style="font-size: 1.5rem;">&times;</button>
            </div>
            <div class="flyout-body">
                <div style="text-align: center; margin-bottom: 24px;">
                    <img src="${book.image}" alt="${book.seo?.image_alt || book.title}" style="max-width: 200px; margin: 0 auto; border-radius: 8px; box-shadow: var(--shadow-md);">
                </div>
                
                <div style="margin-bottom: 24px;">
                    <span style="background: rgba(255, 123, 0, 0.1); color: var(--primary); padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">${book.category}</span>
                    <h2 style="margin: 12px 0 8px; font-size: 1.8rem;">${book.seo?.h1_title || book.title}</h2>
                    <div style="color: var(--text-muted); font-size: 1.1rem;">Code: <strong>${book.code}</strong></div>
            <div class="book-cover-large">
                <img src="${book.image}" alt="${book.seo?.image_alt || book.title}">
            </div>
            
            <div class="book-details-content">
                <div class="book-header">
                    <h2>${book.seo?.h1_title || book.title}</h2>
                    <span class="price">Rs. ${book.price}</span>
                </div>

                ${book.seo?.bilingual_blurb ? `
                <div class="bilingual-blurb" style="background: #f0f8ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #2F80ED;">
                    <p style="font-style: italic; color: #555; margin: 0;">${book.seo.bilingual_blurb}</p>
                </div>
                ` : ''}

                <div class="detail-section">
                    <h3>Overview</h3>
                    <p>${book.seo?.overview || book.description}</p>
                </div>

                ${book.seo?.features ? `
                <div style="margin-bottom: 20px;">
                    <h5 style="margin-bottom: 8px; font-size: 1rem; color: var(--text-dark);">Key Features</h5>
                    <ul style="padding-left: 20px; color: var(--text-muted); font-size: 0.95rem;">
                        ${book.seo.features.map(item => `<li style="margin-bottom: 4px;">${item}</li>`).join('')}
                    </ul>
                </div>` : ''}

                ${book.seo?.toc ? `
                <div style="margin-bottom: 20px;">
                    <h5 style="margin-bottom: 8px; font-size: 1rem; color: var(--text-dark);">Table of Contents</h5>
                    <ul style="padding-left: 20px; color: var(--text-muted); font-size: 0.95rem;">
                        ${book.seo.toc.map(item => `<li style="margin-bottom: 4px;">${item}</li>`).join('')}
                    </ul>
                </div>` : ''}

                ${book.seo?.nep_alignment ? `
                <div style="margin-bottom: 20px;">
                    <h5 style="margin-bottom: 8px; font-size: 1rem; color: var(--text-dark);">NEP 2020 Alignment</h5>
                    <ul style="padding-left: 20px; color: var(--text-muted); font-size: 0.95rem;">
                        ${book.seo.nep_alignment.map(item => `<li style="margin-bottom: 4px;">${item}</li>`).join('')}
                    </ul>
                </div>` : ''}

                ${book.seo?.keywords ? `
                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-light);">
                    <h5 style="margin-bottom: 12px; font-size: 0.9rem; color: var(--text-muted);">Keywords</h5>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${book.seo.keywords.map(k => `
                            <span style="background: var(--bg-light); color: var(--text-muted); padding: 4px 10px; border-radius: 4px; font-size: 0.8rem;">${k}</span>
                        `).join('')}
                    </div>
                </div>` : ''}
            </div>
            <div class="flyout-footer">
                <button class="btn btn-primary" style="width: 100%;" onclick="window.dispatchEvent(new CustomEvent('openOrderModal'))">Start Order to Add Books</button>
            </div>
        `;

        flyout.classList.add('active');
        overlay.classList.add('active');
    });
}
