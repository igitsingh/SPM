/**
 * Reusable Announcements Card Component
 * Usage: renderAnnouncementsCard(announcementsArray)
 */

export function renderAnnouncementsCard(announcements = []) {
    // Empty State
    if (!announcements || announcements.length === 0) {
        return `
            <div class="spm-card">
                <div class="spm-card-header">
                    <h3 class="spm-card-title">Announcements</h3>
                </div>
                <div class="text-center" style="padding: 40px 20px; color: var(--text-muted);">
                    <p>No active announcements right now. Check back later.</p>
                </div>
            </div>
        `;
    }

    // List View
    return `
        <section class="spm-card">
            <div class="spm-card-header">
                <h3 class="spm-card-title">Announcements</h3>
            </div>
            <div style="max-height: 500px; overflow-y: auto;">
                <div class="spm-announcement-list">
                    ${announcements.map(item => renderAnnouncementItem(item)).join('')}
                </div>
            </div>
        </section>
    `;
}

function renderAnnouncementItem(item) {
    // Determine badge class
    let badgeClass = '';
    let badgeLabel = item.type || '';

    switch (item.type?.toLowerCase()) {
        case 'new':
            badgeClass = 'spm-badge-new';
            break;
        case 'important':
            badgeClass = 'spm-badge-important';
            break;
        case 'logistics':
            badgeClass = 'spm-badge-logistics';
            break;
        default:
            badgeClass = 'spm-badge-info';
    }

    return `
        <div class="spm-announcement-item">
            <div class="spm-announcement-dot"></div>
            
            <div class="spm-announcement-content">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>

            <div class="spm-announcement-meta">
                <span class="spm-announcement-date">${item.date}</span>
                ${item.type ? `<span class="spm-badge ${badgeClass}" style="font-size: 0.65rem; padding: 2px 6px;">${badgeLabel}</span>` : ''}
            </div>
        </div>
    `;
}

/* 
// Example Data Structure
const sampleData = [
    {
        date: 'Dec 05, 2025',
        title: 'New 2025–26 Editions Available',
        description: 'Books for Class 1–5 (UP Board) refreshed with latest NEP guidelines. Order early.',
        type: 'New'
    },
    {
        date: 'Nov 20, 2025',
        title: 'Price Revision Notice',
        description: 'Marginal price increase of 5% applicable from Jan 1st due to paper costs.',
        type: 'Important'
    },
    {
        date: 'Nov 01, 2025',
        title: 'Transport Delay - North Zone',
        description: 'Heavy rains appearing in Uttarakhand may delay shipments by 2-3 days.',
        type: 'Logistics'
    }
];
*/
