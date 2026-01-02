export function renderFooter() {
    return `
        <div style="background: #1a1a1a; color: white; padding: 80px 20px 30px; font-family: var(--font-main);">
            <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 60px; margin-bottom: 60px;">
                <!-- Brand -->
                <div>
                    <h3 style="color: var(--primary); margin-bottom: 24px; font-size: 1.4rem;">Suman Prakashan Mandir</h3>
                    <p style="color: #999; font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
                        Preserving Knowledge. Passing on a Legacy.<br>
                        Serving education since generations.
                    </p>
                    <div class="flex gap-4" style="opacity: 0.7;">
                        <span style="font-size: 1.2rem; cursor: pointer;">📘</span>
                        <span style="font-size: 1.2rem; cursor: pointer;">📸</span>
                        <span style="font-size: 1.2rem; cursor: pointer;">🐦</span>
                    </div>
                </div>
                
                <!-- Links 1 -->
                <div>
                    <h4 style="margin-bottom: 24px; color: #fff; font-weight: 600;">Explore</h4>
                    <ul style="list-style: none; padding: 0; color: #aaa; font-size: 0.95rem; display: flex; flex-direction: column; gap: 14px;">
                        <li><a href="#/" style="color: inherit; text-decoration: none; transition: color 0.2s;">Home</a></li>
                        <li><a href="#/catalogue" style="color: inherit; text-decoration: none; transition: color 0.2s;">Books Catalogue</a></li>
                        <li><a href="#/about" style="color: inherit; text-decoration: none; transition: color 0.2s;">About Us</a></li>
                        <li><a href="#/contact" style="color: inherit; text-decoration: none; transition: color 0.2s;">Contact Us</a></li>
                    </ul>
                </div>

                <!-- Links 2 -->
                <div>
                    <h4 style="margin-bottom: 24px; color: #fff; font-weight: 600;">Partners</h4>
                    <ul style="list-style: none; padding: 0; color: #aaa; font-size: 0.95rem; display: flex; flex-direction: column; gap: 14px;">
                        <li><a href="#/business-opportunity" style="color: inherit; text-decoration: none; transition: color 0.2s;">Distribution Opportunity</a></li>
                        <li><a href="#/login" style="color: inherit; text-decoration: none; transition: color 0.2s;">Partner Login</a></li>
                        <li><a href="#/portal-select" style="color: inherit; text-decoration: none; transition: color 0.2s;">Portal Access</a></li>
                    </ul>
                </div>

                <!-- Contact -->
                <div>
                    <h4 style="margin-bottom: 24px; color: #fff; font-weight: 600;">Get in Touch</h4>
                    <ul style="list-style: none; padding: 0; color: #aaa; font-size: 0.95rem; display: flex; flex-direction: column; gap: 14px;">
                        <li style="display: flex; gap: 10px;"><span>📍</span> <span>Pandav Nagar, Meerut,<br>Uttar Pradesh, India</span></li>
                        <li style="display: flex; gap: 10px;"><span>📞</span> <span>+91 98765 43210</span></li>
                        <li style="display: flex; gap: 10px;"><span>✉️</span> <span>info@sumanprakashan.com</span></li>
                    </ul>
                </div>
            </div>
            
            <div style="max-width: 1200px; margin: 0 auto; border-top: 1px solid #333; padding-top: 30px; display: flex; flex-wrap: wrap; justify-content: space-between; color: #666; font-size: 0.85rem;">
                <div>&copy; ${new Date().getFullYear()} Suman Prakashan Mandir. All rights reserved.</div>
                <div style="display: flex; gap: 20px;">
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                </div>
            </div>
        </div>
    `;
}
