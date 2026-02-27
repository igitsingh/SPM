import { configApi } from '../../services/config-api.js';

export async function renderAdminConfig() {
    let configs = [];
    try {
        configs = await configApi.getAll();
    } catch (e) { }

    // Sort: ACADEMIC_SESSION first
    configs.sort((a, b) => a.key.localeCompare(b.key));

    setTimeout(setupConfigInteractions, 100);

    return `
        <div class="spm-main-content">
            <h1 class="spm-heading text-2xl font-bold mb-6">System Configuration</h1>
            
            <div class="spm-card bg-blue-50 border border-blue-100 mb-6">
                <h3 class="font-bold text-blue-900 mb-2">ℹ️ Note</h3>
                <p class="text-sm text-blue-800">These settings affect the global behavior of the portal. Changes are applied immediately.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${renderConfigForms(configs)}
            </div>
        </div>
    `;
}

function renderConfigForms(configs) {
    if (!configs || !configs.length) return '<div class="p-8 text-center col-span-2 text-gray-500 italic">No configurations loaded. Ensure backend has seeded defaults.</div>';

    return configs.map(c => `
         <div class="spm-card shadow-sm hover:shadow-md transition-shadow">
            <form class="config-form" data-key="${c.key}">
                <div class="flex justify-between items-center mb-1">
                    <label class="font-bold text-gray-800 text-sm">${formatKey(c.key)}</label>
                    <span class="text-[10px] text-gray-400 font-mono bg-gray-100 px-1 rounded">${c.key}</span>
                </div>
                <p class="text-xs text-gray-500 mb-3">${c.description || 'System setting'}</p>
                
                <div class="flex gap-2">
                    <input type="text" name="value" value="${c.value}" class="spm-input flex-1 text-sm">
                    <button type="submit" class="spm-btn spm-btn-primary px-3 py-1 text-xs">Update</button>
                </div>
            </form>
        </div>
    `).join('');
}

function formatKey(key) {
    // ACCOUNT_SETTINGS -> Account Settings
    return key.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
}

function setupConfigInteractions() {
    document.querySelectorAll('.config-form').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const key = form.dataset.key;
            const value = form.elements['value'].value;
            const btn = form.querySelector('button');
            const originalText = btn.textContent;

            try {
                btn.textContent = '...';
                btn.disabled = true;
                await configApi.update({ key, value });
                btn.textContent = 'Saved!';
                btn.classList.add('bg-green-600', 'border-green-600');

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.classList.remove('bg-green-600', 'border-green-600');
                }, 2000);
            } catch (err) {
                alert('Failed to update: ' + err.message);
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    });
}
