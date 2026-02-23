import { store } from '../store.js';
import { getCoverImage, getUnitGradient } from '../utils/book-covers.js';

// Fixed discount table per price range (consistent, not random)
function getDiscount(price) {
    if (price < 100) return 10;
    if (price < 200) return 12;
    if (price < 350) return 15;
    return 18;
}

export function renderBookCard(book) {
    const discount = getDiscount(book.price);
    const originalPrice = Math.round(book.price * (100 / (100 - discount)));

    // ── Resolve cover image ──────────────────────────────────────────────────
    const generatedCover = getCoverImage(book.unit, book.subject, book.category);
    const gradient = getUnitGradient(book.unit);

    // Build the cover element: real image if found, gradient + title if not
    let coverContent;
    if (generatedCover) {
        coverContent = `
            <img src="${generatedCover}"
                 alt="${book.title}"
                 loading="lazy"
                 style="width:100%;height:100%;object-fit:cover;"
                 onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"><div class="book-cover-fallback" style="display:none;width:100%;height:100%;background:${gradient};flex-direction:column;align-items:center;justify-content:center;padding:16px;text-align:center;"><div style="font-size:2.5rem;margin-bottom:10px;"></div><div style="font-size:0.75rem;font-weight:700;color:rgba(255,255,255,.9);line-height:1.3;">${book.title}</div></div>
        `;
    } else {
        // No generated cover yet — styled gradient placeholder
        coverContent = `
            <div class="book-cover-fallback" style="width:100%;height:100%;background:${gradient};display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px;text-align:center;border-radius:4px;"><div style="font-size:2.8rem;margin-bottom:12px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.3));"></div><div style="font-size:0.78rem;font-weight:700;color:rgba(255,255,255,.95);line-height:1.35;max-width:90%;">${book.title}</div>
                ${book.unit ? `<div style="margin-top:8px;font-size:0.62rem;background:rgba(255,255,255,.2);color:white;padding:3px 8px;border-radius:20px;letter-spacing:.5px;">${book.unit}</div>` : ''}
            </div>
        `;
    }

    // ── Subject / class badge ────────────────────────────────────────────────
    const subjectLabel = book.subject || book.category || '';
    const classBadge = book.class && book.class !== 'N/A' ? `Class ${book.class}` : '';

    return `
        <div class="book-card"
             onclick="window.dispatchEvent(new CustomEvent('openBookDetail', { detail: '${book.id}' }))"
             style="cursor:pointer;"><div class="book-cover" style="position:relative;overflow:hidden;border-radius:8px;aspect-ratio:3/4;"><span class="discount-badge"
                      style="position:absolute;top:10px;left:10px;background:#ffc107;color:#333;font-weight:700;font-size:0.75rem;padding:4px 8px;border-radius:5px;z-index:2;">
                    -${discount}%
                </span>
                ${coverContent}
            </div><div class="book-info" style="padding:10px 4px 0;text-align:center;"><h3 title="${book.title}"
                    style="font-size:0.88rem;font-weight:600;color:#1a1a2e;margin-bottom:4px;min-height:36px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;line-height:1.3;">
                    ${book.title}
                </h3><div style="display:flex;justify-content:center;gap:6px;margin-bottom:8px;flex-wrap:wrap;">
                    ${classBadge ? `<span style="font-size:0.7rem;background:#e0e7ff;color:#3730a3;padding:2px 7px;border-radius:12px;font-weight:600;">${classBadge}</span>` : ''}
                    ${subjectLabel ? `<span style="font-size:0.7rem;background:#f0fdf4;color:#166534;padding:2px 7px;border-radius:12px;font-weight:600;">${subjectLabel}</span>` : ''}
                </div><div style="display:flex;justify-content:center;align-items:center;gap:8px;margin-bottom:10px;"><span style="font-weight:700;color:#1145a4;font-size:1.05rem;">₹${book.price}</span><span style="text-decoration:line-through;color:#9ca3af;font-size:0.85rem;">₹${originalPrice}</span></div><button class="btn-add-cart"
                        onclick="event.stopPropagation();"
                        style="width:100%;background:#1145a4;color:white;border:none;padding:9px;border-radius:20px;font-size:0.78rem;font-weight:600;letter-spacing:.5px;text-transform:uppercase;cursor:pointer;transition:background .2s;"
                        onmouseover="this.style.background='#FFD700';this.style.color='#000';"
                        onmouseout="this.style.background='#1145a4';this.style.color='white';">
                    Add to Cart
                </button></div></div>
    `;
}
