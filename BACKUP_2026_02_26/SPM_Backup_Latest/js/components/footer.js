export function renderFooter() {
    return `
        <div style="background: #1a1a1a; color: white; padding: 80px 20px 30px; font-family: var(--font-main);">
            <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 60px; margin-bottom: 60px;">
                <!-- Brand -->
                <div>
                    <div style="display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 24px;">
                        <div style="color: #FFD700; font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 800; line-height: 0.75; letter-spacing: 1.5px; text-transform: lowercase; margin: 0; margin-right: -1.5px; padding: 0;">spm</div>
                        <div style="color: white; font-size: 0.55rem; font-weight: 800; letter-spacing: 6.5px; margin-top: 18px; margin-right: -6.5px; margin-bottom: 0; line-height: 1; text-transform: uppercase;">PUBLICATION</div>
                    </div>
                    <p style="color: #999; font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
                        Preserving Knowledge. Passing on a Legacy.<br>
                        Serving education since generations.
                    </p>
                    <div class="flex gap-4" style="opacity: 0.7; color: white;">
                        <a href="#" style="color: white; text-decoration: none;"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                        <a href="#" style="color: white; text-decoration: none;"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
                        <a href="#" style="color: white; text-decoration: none;"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></a>
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
                        <li style="display: flex; gap: 12px; align-items: flex-start;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; margin-top: 3px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            <span>Pandav Nagar, Meerut,<br>Uttar Pradesh, India</span>
                        </li>
                        <li style="display: flex; gap: 12px; align-items: center;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            <span>+91 98765 43210</span>
                        </li>
                        <li style="display: flex; gap: 12px; align-items: center;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            <span>info@sumanprakashan.com</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- Mobile-only quick links pill strip -->
            <div class="spm-mobile-footer-links">
                <a href="#/">Home</a>
                <a href="#/catalogue">Catalogue</a>
                <a href="#/video-library">Videos</a>
                <a href="#/about">About</a>
                <a href="#/contact">Contact</a>
                <a href="#/login">Partner Login</a>
            </div>

            <div style="max-width: 1200px; margin: 0 auto; border-top: 1px solid #333; padding-top: 30px; display: flex; flex-wrap: wrap; justify-content: space-between; color: #666; font-size: 0.85rem;">
                <div>&copy; ${new Date().getFullYear()} Suman Prakashan Mandir. All rights reserved.</div>
                <div style="display: flex; gap: 20px;">
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                </div>
            </div>

            <div style="text-align: center; margin-top: 60px; color: rgba(255,255,255,0.15); font-size: 0.75rem; letter-spacing: 6px; text-transform: uppercase; font-weight: 800; font-family: 'Inter', sans-serif;">
                HOUSE OF FLOYDS CREATION
            </div>
        </div>
    `;
}
