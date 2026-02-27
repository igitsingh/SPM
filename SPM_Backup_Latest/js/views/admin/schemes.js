import { schemesApi } from '../../services/schemes-api.js';

export async function renderAdminSchemes() {
    let schemes = [];
    try {
        schemes = await schemesApi.getAll();
    } catch (e) { }

    setTimeout(setupSchemeInteractions, 100);

    return `
        <div class="spm-main-content">
             <div class="flex justify-between items-center mb-6">
                <div>
                    <h1 class="spm-heading text-2xl font-bold">Schemes & Discounts</h1>
                    <p class="text-gray-500 text-sm">Configure automated discounts and offers.</p>
                </div>
                <button id="add-scheme-btn" class="spm-btn spm-btn-primary">+ Create New Scheme</button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="schemes-list">
                ${renderSchemeCards(schemes)}
            </div>
        </div>

        <!-- Scheme Modal -->
        <div id="scheme-modal" class="modal-overlay" style="display: none; align-items: center; justify-content: center; z-index: 2000;">
            <div class="spm-card w-full max-w-lg p-0 overflow-hidden animate-slide-up shadow-2xl">
                 <div class="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                    <h3 class="font-bold text-lg text-gray-800">Create Discount Scheme</h3>
                    <button id="close-modal-btn" class="text-2xl text-gray-400 hover:text-red-500">&times;</button>
                </div>
                <div class="p-6">
                    <form id="scheme-form" class="space-y-4">
                        <div>
                            <label class="block mb-1 font-medium text-sm text-gray-700">Scheme Name</label>
                            <input type="text" name="name" required class="spm-input w-full" placeholder="e.g. Diwali Bonanza">
                        </div>
                        <div>
                            <label class="block mb-1 font-medium text-sm text-gray-700">Description</label>
                            <textarea name="description" rows="2" class="spm-input w-full"></textarea>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block mb-1 font-medium text-sm text-gray-700">Type</label>
                                <select name="type" class="spm-select w-full">
                                    <option value="PERCENT">Percentage (%)</option>
                                    <option value="FLAT">Flat Amount (₹)</option>
                                </select>
                            </div>
                            <div>
                                <label class="block mb-1 font-medium text-sm text-gray-700">Value</label>
                                <input type="number" name="value" required min="1" step="0.01" class="spm-input w-full">
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block mb-1 font-medium text-sm text-gray-700">Valid From</label>
                                <input type="date" name="validFrom" required class="spm-input w-full" value="${new Date().toISOString().split('T')[0]}">
                            </div>
                            <div>
                                <label class="block mb-1 font-medium text-sm text-gray-700">Valid Until (Optional)</label>
                                <input type="date" name="validUntil" class="spm-input w-full">
                            </div>
                        </div>

                        <div>
                            <label class="block mb-1 font-medium text-sm text-gray-700">Min Order Value (₹)</label>
                            <input type="number" name="minOrderValue" value="0" class="spm-input w-full">
                        </div>

                        <button type="submit" class="spm-btn spm-btn-primary w-full py-2 mt-4">Save Scheme</button>
                    </form>
                </div>
            </div>
        </div>
    `;
}

function renderSchemeCards(schemes) {
    if (!schemes || !schemes.length) return '<div class="col-span-2 text-center text-gray-500 p-8 bg-gray-50 rounded border border-dashed border-gray-300">No active schemes found. Create one to get started.</div>';

    return schemes.map(s => `
        <div class="spm-card relative border-l-4 ${s.isActive ? 'border-green-500' : 'border-gray-300'} hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="font-bold text-lg text-gray-800">${s.name}</h3>
                    <p class="text-sm text-gray-500 mb-2">${s.description || 'No description'}</p>
                    
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-2xl font-bold text-blue-600">
                            ${s.type === 'FLAT' ? '₹' : ''}${s.value}${s.type === 'PERCENT' ? '%' : ''}
                        </span>
                        <span class="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-700 rounded uppercase">OFF</span>
                    </div>
                </div>
                <div class="text-right">
                     <span class="inline-block px-2 py-1 text-xs rounded font-bold ${s.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}">
                        ${s.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                    <div class="mt-2 space-x-1">
                        <button class="text-gray-400 hover:text-blue-600 toggle-btn text-lg p-1" data-id="${s.id}" title="${s.isActive ? 'Deactivate' : 'Activate'}">
                            ${s.isActive ? '⏸️' : '▶️'}
                        </button>
                         <button class="text-gray-400 hover:text-red-600 delete-btn text-lg p-1" data-id="${s.id}" title="Delete">
                            🗑️
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="mt-4 pt-3 border-t text-xs text-gray-500 flex justify-between">
                <div>Min Order: <b>₹${s.minOrderValue || 0}</b></div>
                <div>Valid: ${new Date(s.validFrom).toLocaleDateString()} - ${s.validUntil ? new Date(s.validUntil).toLocaleDateString() : 'Forever'}</div>
            </div>
        </div>
    `).join('');
}

function setupSchemeInteractions() {
    const modal = document.getElementById('scheme-modal');
    const form = document.getElementById('scheme-form');

    document.getElementById('add-scheme-btn').addEventListener('click', () => {
        modal.style.display = 'flex';
        form.reset();
        // Reset date to today
        form.elements['validFrom'].value = new Date().toISOString().split('T')[0];
    });

    document.getElementById('close-modal-btn').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const data = Object.fromEntries(fd.entries());
        data.value = parseFloat(data.value);
        data.minOrderValue = parseFloat(data.minOrderValue);

        // Handle optional validUntil
        if (!data.validUntil) delete data.validUntil;

        try {
            await schemesApi.create(data);
            alert('Scheme created successfully!');
            window.location.reload();
        } catch (err) {
            alert('Error: ' + err.message);
        }
    });

    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            try {
                await schemesApi.toggle(btn.dataset.id);
                window.location.reload();
            } catch (e) { alert(e.message); }
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            if (confirm('Delete this scheme permanently?')) {
                try {
                    await schemesApi.delete(btn.dataset.id);
                    window.location.reload();
                } catch (e) { alert(e.message); }
            }
        });
    });
}
