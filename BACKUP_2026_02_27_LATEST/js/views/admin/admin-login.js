import { userApi } from '../../services/user-api.js';

export const renderAdminLogin = () => {
    // Logic currently handled by hydration in interactions.js or can be inline if needed
    // We will use a unique ID 'adminLoginForm' so we can hydrate it specifically

    return `
    <div class="spm-login-container" style="
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #1e1e2d;
        color: #fff;
    ">
        <div class="spm-card" style="
            width: 100%; 
            max-width: 400px; 
            padding: 40px; 
            text-align: center;
            background: #2b2b40;
            border: 1px solid #3b3b55;
            box-shadow: 0 10px 40px rgba(0,0,0,0.4);
            color: #fff;
        ">
            <div style="margin-bottom: 30px; font-size: 3rem;">🔐</div>
            <h2 style="margin-bottom: 10px; color: #fff;">Admin Console</h2>
            <p style="margin-bottom: 30px; color: #aaa;">Secure Internal System Access</p>
            
            <form id="adminLoginForm" style="display: flex; flex-direction: column; gap: 20px;">
                <div class="form-group">
                    <input type="email" id="admin-email" class="spm-input" placeholder="Admin Email" required 
                        style="width: 100%; padding: 12px; background: #1e1e2d; border: 1px solid #444; color: #fff; border-radius: 8px;">
                </div>
                <div class="form-group">
                    <input type="password" id="admin-password" class="spm-input" placeholder="Password" required
                        style="width: 100%; padding: 12px; background: #1e1e2d; border: 1px solid #444; color: #fff; border-radius: 8px;">
                </div>
                <button type="submit" class="spm-btn" style="
                    width: 100%; 
                    justify-content: center; 
                    background: #7367f0; 
                    color: white; 
                    border: none;
                    padding: 12px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                ">
                    Access Console
                </button>
            </form>

            <div style="margin-top: 30px; border-top: 1px solid #3b3b55; padding-top: 20px;">
                <p style="font-size: 0.8rem; color: #888; margin-bottom: 10px;">Confidential Access Only</p>
                <div style="display: grid; grid-template-columns: 1fr; gap: 10px;">
                    <button type="button" 
                        onclick="document.getElementById('admin-email').value='admin@spm.com'; document.getElementById('admin-password').value='admin123';"
                        style="padding: 8px; border: 1px solid #3b3b55; background: #1e1e2d; border-radius: 4px; font-size: 0.85rem; cursor: pointer; color: #aaa;">
                        👨‍💼 Use Demo Admin
                    </button>
                </div>
            </div>
            
            <div style="margin-top: 20px;">
                 <a href="#/portal-select" style="font-size: 0.85rem; color: #7367f0; text-decoration: none;">&larr; Back to Portal Selection</a>
            </div>
        </div>
    </div>
    `;
};
