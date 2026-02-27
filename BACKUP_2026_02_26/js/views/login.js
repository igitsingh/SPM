import { userApi } from '../services/user-api.js';
import { store } from '../store.js';

export const renderLogin = () => {
    // We attach the listener via a helper or global for simplicity in this architecture,
    // BUT since Router calls hydrateViews, we can rely on a simpler approach: 
    // We'll attach the function to window for now or use the hydrate pattern if possible.
    // Given the constraints, let's use a standard inline onclick or better yet, attach finding the element.

    // Actually, the cleanest way in this "string-based component" setup without a framework 
    // is to defer the binding.

    // Logic is handled by hydrateViews() -> hydrateLogin() in interactions.js

    return `
    <div class="spm-login-container" style="
        min-height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    ">
        <div class="spm-card" style="width: 100%; max-width: 400px; padding: 40px; text-align: center;">
            <div style="margin-bottom: 30px; font-size: 3rem;">🔐</div>
            <h2 style="margin-bottom: 10px; color: var(--text-primary);">Partner Login</h2>
            <p style="margin-bottom: 30px; color: var(--text-secondary);">Access your dashboard and orders</p>
            
            <form id="loginForm" style="display: flex; flex-direction: column; gap: 20px;">
                <div class="form-group">
                    <input type="email" id="email" class="spm-input" placeholder="Email Address" required 
                        style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px;">
                </div>
                <div class="form-group">
                    <input type="password" id="password" class="spm-input" placeholder="Password" required
                        style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px;">
                </div>
                <button type="submit" class="spm-btn spm-btn-primary" style="width: 100%; justify-content: center;">
                    Sign In
                </button>
            </form>

            <div style="margin-top: 20px; font-size: 0.9em; color: var(--text-secondary);">
                Don't have an account? <a href="#/register" style="color: var(--primary-color); text-decoration: none; font-weight: 500;">Register here</a>
            </div>
            
                <p style="font-size: 0.8rem; color: #888; margin-bottom: 10px;">Quick Demo Access</p>
                <div style="display: grid; grid-template-columns: 1fr; gap: 10px;">
                    <button type="button" 
                        onclick="document.getElementById('email').value='partner@demo.com'; document.getElementById('password').value='partner123';"
                        style="padding: 8px; border: 1px solid #ccc; background: white; border-radius: 4px; font-size: 0.85rem; cursor: pointer; color: #555;">
                        🏪 Partner (Retailer)
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
};
