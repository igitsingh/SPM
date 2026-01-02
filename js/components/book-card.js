import { store } from '../store.js';

export function renderBookCard(book) {
    // Random discount for visual demo (10%, 15%, 20%)
    const discounts = [10, 15, 20];
    const discount = discounts[Math.floor(Math.random() * discounts.length)];
    const originalPrice = Math.round(book.price * (100 / (100 - discount)));

    return `
        <div class="book-card" onclick="window.dispatchEvent(new CustomEvent('openBookDetail', { detail: '${book.id}' }))">
            <div class="book-cover">
                <span class="discount-badge">-${discount}%</span>
                <img src="${book.image}" alt="${book.title}" loading="lazy">
            </div>
            <div class="book-info text-center">
                <h3 title="${book.title}" style="font-size: 1rem; margin-bottom: 6px; min-height: 40px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${book.title}</h3>
                <div style="font-size: 0.8rem; color: #666; margin-bottom: 8px;">
                    ${book.class}
                </div>
                <div class="flex justify-center items-center gap-2">
                    <span style="font-weight: 700; color: #333; font-size: 1.1rem;">Rs. ${book.price}</span>
                    <span style="text-decoration: line-through; color: #999; font-size: 0.9rem;">Rs. ${originalPrice}</span>
                </div>
                <button class="btn-add-cart">ADD TO CART</button>
            </div>
        </div>
    `;
}
