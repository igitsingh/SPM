import { userApi } from '../services/user-api.js';

export const renderPartnerRegister = () => {
    return `
    <div class="spm-login-container" style="
        min-height: 90vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        padding: 20px;
    ">
        <div class="spm-card" style="width: 100%; max-width: 550px; padding: 40px; text-align: center; background: white; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 20px; font-size: 3rem;">📝</div>
            <h2 style="margin-bottom: 10px; color: #333; font-family: var(--font-main, sans-serif);">Partner Registration</h2>
            <p style="margin-bottom: 30px; color: #666;">Join our network of book sellers</p>
            
            <form id="partnerRegisterForm" style="display: flex; flex-direction: column; gap: 15px; text-align: left;">
                
                <div class="form-group">
                    <label style="font-size:0.9em; font-weight:600; color:#555; display:block; margin-bottom:4px;">Partner Type *</label>
                    <select id="partner-type" class="spm-input" required 
                        style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; background: white;">
                        <option value="">Select Partner Type</option>
                        <option value="school">🏫 School</option>
                        <option value="distributor">📦 Distributor</option>
                        <option value="retailer">🏪 Retailer</option>
                    </select>
                </div>

                <div class="form-group">
                    <label style="font-size:0.9em; font-weight:600; color:#555; display:block; margin-bottom:4px;">Full Name *</label>
                    <input type="text" id="reg-name" class="spm-input" placeholder="e.g. Rahul Kumar" required 
                        style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
                </div>

                <div class="form-group">
                    <label style="font-size:0.9em; font-weight:600; color:#555; display:block; margin-bottom:4px;">Email Address *</label>
                    <input type="email" id="reg-email" class="spm-input" placeholder="name@example.com" required 
                        style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
                </div>

                <div class="form-group">
                    <label style="font-size:0.9em; font-weight:600; color:#555; display:block; margin-bottom:4px;">Phone Number *</label>
                    <input type="tel" id="reg-phone" class="spm-input" placeholder="10-digit mobile number" required 
                        style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
                </div>
                
                <div class="form-group">
                    <label style="font-size:0.9em; font-weight:600; color:#555; display:block; margin-bottom:4px;">Shop / Business Name *</label>
                    <input type="text" id="reg-shop" class="spm-input" placeholder="e.g. Rahul Book Depot" required 
                        style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
                </div>

                <div class="form-group">
                    <label style="font-size:0.9em; font-weight:600; color:#555; display:block; margin-bottom:4px;">Password *</label>
                    <input type="password" id="reg-password" class="spm-input" placeholder="Create a strong password" required
                        style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
                </div>

                <button type="submit" class="spm-btn" style="
                    background: #FF7B00;
                    color: white;
                    padding: 12px;
                    border: none;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    width: 100%; 
                    margin-top: 10px;
                    font-size: 1rem;
                ">
                    Register as Partner
                </button>
            </form>

            <div style="margin-top: 20px; font-size: 0.9em; color: #666;">
                Already have an account? <a href="#/login" style="color: #FF7B00; text-decoration: none; font-weight: 500;">Login here</a>
            </div>
            
            <div style="margin-top: 15px; font-size: 0.85em; color: #999;">
                <a href="#/portal-select" style="color: #666; text-decoration: none;">← Back to Portal Selection</a>
            </div>
        </div>
    </div>
    `;
};
