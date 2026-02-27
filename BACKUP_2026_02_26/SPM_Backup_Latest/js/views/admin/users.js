import { userApi } from '../../services/user-api.js';

export async function renderAdminUsers() {
    const users = await userApi.getAdmins();

    setTimeout(setupUserInteractions, 100);

    return `
        <div class="spm-main-content">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h1 class="spm-heading text-2xl font-bold">User Management</h1>
                    <p class="text-gray-500 text-sm">Manage staff access and permissions.</p>
                </div>
                <button id="add-user-btn" class="spm-btn spm-btn-primary">+ Add New Staff</button>
            </div>

            <div class="spm-card overflow-hidden p-0 shadow-sm">
                <div class="overflow-x-auto">
                    <table class="spm-table w-full">
                        <thead class="bg-gray-50 text-gray-600 font-semibold border-b">
                            <tr>
                                <th class="p-4 text-left">User Details</th>
                                <th class="p-4 text-left">Assigned Role</th>
                                <th class="p-4 text-left">Status</th>
                                <th class="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${renderUserRows(users)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Add User Modal -->
        <div id="user-modal" class="modal-overlay" style="display: none; align-items: center; justify-content: center; z-index: 2000;">
            <div class="spm-card w-full max-w-md p-0 overflow-hidden animate-slide-up shadow-2xl">
                 <div class="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                    <h3 class="font-bold text-lg text-gray-800">Add New Staff</h3>
                    <button id="close-modal-btn" class="text-2xl text-gray-400 hover:text-red-500">&times;</button>
                </div>
                <div class="p-6">
                    <form id="user-form" class="space-y-4">
                        <div>
                            <label class="block mb-1 font-medium text-sm text-gray-700">Full Name</label>
                            <input type="text" name="name" required class="spm-input w-full" placeholder="e.g. John Doe">
                        </div>
                        <div>
                            <label class="block mb-1 font-medium text-sm text-gray-700">Email Address</label>
                            <input type="email" name="email" required class="spm-input w-full" placeholder="john@spm.com">
                        </div>
                        <div>
                            <label class="block mb-1 font-medium text-sm text-gray-700">Staff Role</label>
                            <select name="subRole" class="spm-select w-full">
                                <option value="STAFF">General Staff</option>
                                <option value="FINANCE">Finance Manager</option>
                                <option value="INVENTORY">Inventory Manager</option>
                                <option value="CATALOGUE">Catalogue Manager</option>
                                <option value="SUPER_ADMIN">Super Admin</option>
                            </select>
                        </div>
                        <div>
                            <label class="block mb-1 font-medium text-sm text-gray-700">Initial Password</label>
                            <input type="text" name="password" value="Welcome@123" required class="spm-input w-full bg-gray-50">
                            <p class="text-xs text-gray-500 mt-1">Share this password with the user safely.</p>
                        </div>
                       
                        <button type="submit" class="spm-btn spm-btn-primary w-full py-2 mt-4">Create Account</button>
                    </form>
                </div>
            </div>
        </div>
    `;
}

function renderUserRows(users) {
    if (!users || !users.length) return '<tr><td colspan="4" class="p-8 text-center text-gray-500">No staff users found.</td></tr>';

    return users.map(u => `
        <tr class="border-b hover:bg-gray-50 transition-colors">
            <td class="p-4">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                        ${u.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div class="font-bold text-gray-800 text-sm">${u.name}</div>
                        <div class="text-xs text-gray-500">${u.email}</div>
                    </div>
                </div>
            </td>
            <td class="p-4">
                <span class="px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100 shadow-sm">
                    ${u.subRole || 'ADMIN'}
                </span>
            </td>
            <td class="p-4">
                <span class="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${u.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    <span class="w-1.5 h-1.5 rounded-full ${u.isActive ? 'bg-green-600' : 'bg-red-600'}"></span>
                    ${u.isActive ? 'ACTIVE' : 'INACTIVE'}
                </span>
            </td>
            <td class="p-4 text-right space-x-3">
                <button class="text-xs font-medium text-gray-500 hover:text-blue-600 underline toggle-btn" data-id="${u.id}">
                    ${u.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button class="text-xs font-medium text-red-500 hover:text-red-700 underline reset-btn" data-id="${u.id}">Reset Pass</button>
            </td>
        </tr>
    `).join('');
}

function setupUserInteractions() {
    const modal = document.getElementById('user-modal');
    const form = document.getElementById('user-form');

    document.getElementById('add-user-btn').addEventListener('click', () => {
        modal.style.display = 'flex';
        form.reset();
    });

    document.getElementById('close-modal-btn').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const data = Object.fromEntries(fd.entries());
        data.role = 'admin'; // Force role enum

        try {
            await userApi.create(data);
            alert('User created successfully!');
            window.location.reload();
        } catch (err) {
            alert('Error: ' + err.message);
        }
    });

    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            if (confirm('Change user status?')) {
                try {
                    await userApi.toggle(btn.dataset.id);
                    window.location.reload();
                } catch (e) { alert(e.message); }
            }
        });
    });

    document.querySelectorAll('.reset-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            if (confirm('Reset password to Admin@123?')) {
                try {
                    await userApi.reset(btn.dataset.id);
                    alert('Password reset to Admin@123');
                } catch (e) { alert(e.message); }
            }
        });
    });
}
