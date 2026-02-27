/**
 * Reusable Admin Alert Components
 * 1. Retailer Attention Card
 * 2. Low Stock Alert Card
 */

/**
 * Renders the "Retailers Requiring Attention" Card
 * @param {Array} items - Array of { type: 'warning'|'danger'|'info', count: number, message: string }
 */
export function renderRetailerAttentionCard(items = []) {
    return `
        <div class="spm-card" style="height: 100%;">
            <div class="spm-card-header">
                <h3 class="spm-card-title">Retailers Requiring Attention</h3>
            </div>
            <div style="display: flex; flex-direction: column;">
                ${items.map(item => `
                    <div class="spm-alert-list-item">
                        <div class="spm-alert-icon ${item.type}">
                            ${getIconForType(item.type)}
                        </div>
                        <div class="spm-alert-content">
                            <strong>${item.count} retailers</strong> ${item.message}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div style="margin-top: 16px; text-align: right;">
                <a href="#/admin/retailers" style="font-size: 0.85rem; font-weight: 600; color: var(--secondary);">View Details →</a>
            </div>
        </div>
    `;
}

/**
 * Renders the "Low Stock Alerts" Card
 * @param {Array} stockItems - Array of { title: string, board: string, stock: number, severity: 'critical'|'low' }
 */
export function renderLowStockCard(stockItems = []) {
    return `
        <div class="spm-card" style="height: 100%;">
            <div class="spm-card-header">
                <h3 class="spm-card-title">Low Stock Alerts</h3>
            </div>
            
            <div class="spm-stock-item spm-stock-header">
                <div>Title / Code</div>
                <div>Board</div>
                <div class="text-right">Stock</div>
                <div class="text-center">Severity</div>
            </div>

            <div style="max-height: 250px; overflow-y: auto;">
                ${stockItems.map(item => `
                    <div class="spm-stock-item">
                        <div style="font-weight: 500;">${item.title}</div>
                        <div style="color: var(--text-muted); font-size: 0.85rem;">${item.board}</div>
                        <div class="text-right" style="font-family: monospace;">${item.stock}</div>
                        <div class="text-center">
                            <span class="spm-badge ${item.severity === 'critical' ? 'spm-badge-danger' : 'spm-badge-warning'}" 
                                  style="font-size: 0.65rem; padding: 2px 6px;">
                                ${item.severity.toUpperCase()}
                            </span>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div style="margin-top: 16px; text-align: right;">
                <a href="#/admin/inventory" style="font-size: 0.85rem; font-weight: 600; color: var(--secondary);">View Full Inventory →</a>
            </div>
        </div>
    `;
}

function getIconForType(type) {
    switch (type) {
        case 'danger': return '⚠️';
        case 'warning': return '⚡';
        case 'info': return 'ℹ️';
        default: return '•';
    }
}
