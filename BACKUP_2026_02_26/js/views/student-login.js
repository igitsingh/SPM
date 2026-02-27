export const renderStudentLogin = () => {
    return `
    <div class="spm-login-container" style="
        min-height: 90vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 20px;
    ">
        <div class="spm-card" style="width: 100%; max-width: 450px; padding: 40px; text-align: center; background: white; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.2);">
            <div style="margin-bottom: 20px; font-size: 3rem;">🎓</div>
            <h2 style="margin-bottom: 10px; color: #333;">Student/Parent Login</h2>
            <p style="margin-bottom: 30px; color: #666;">Access your account and explore books</p>
            
            <form id="studentLoginForm" style="display: flex; flex-direction: column; gap: 15px; text-align: left;">
                
                <div class="form-group">
                    <label style="font-size:0.9em; font-weight:600; color:#555; display:block; margin-bottom:4px;">Email Address</label>
                    <input type="email" id="student-login-email" class="spm-input" placeholder="name@example.com" required 
                        style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
                </div>

                <div class="form-group">
                    <label style="font-size:0.9em; font-weight:600; color:#555; display:block; margin-bottom:4px;">Password</label>
                    <input type="password" id="student-login-password" class="spm-input" placeholder="Enter your password" required
                        style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
                </div>

                <button type="submit" class="spm-btn" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
                    Sign In
                </button>
            </form>

            <div style="margin-top: 20px; font-size: 0.9em; color: #666;">
                Don't have an account? <a href="#/student-register" style="color: #667eea; text-decoration: none; font-weight: 500;">Register here</a>
            </div>
            
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;">
                <button id="demo-student-btn" class="btn-outline" style="
                    width: 100%;
                    padding: 10px;
                    border: 2px solid #667eea;
                    background: white;
                    color: #667eea;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 0.9rem;
                ">
                    🎭 Use Demo Account
                </button>
            </div>
            
            <div style="margin-top: 15px; font-size: 0.85em; color: #999;">
                <a href="#/" style="color: #666; text-decoration: none;">← Back to Home</a>
            </div>
        </div>
    </div>
    `;
};
