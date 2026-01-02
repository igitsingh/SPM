export function renderContact() {
    return `
        <div class="container section">
            <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 60px;">
                <div>
                    <h1 style="margin-bottom: 24px;">Get in Touch</h1>
                    <p style="color: var(--text-muted); margin-bottom: 40px;">
                        Have questions about our books or want to become a distributor? We'd love to hear from you.
                    </p>

                    <div style="margin-bottom: 40px;">
                        <div class="flex items-center gap-4" style="margin-bottom: 20px;">
                            <div style="width: 50px; height: 50px; background: rgba(255, 123, 0, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary); font-size: 1.2rem;">📍</div>
                            <div>
                                <h4 style="margin-bottom: 4px;">Visit Us</h4>
                                <p style="color: var(--text-muted);">Suman Prakashan Mandir, Pandav Nagar, Meerut, Uttar Pradesh, India</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4" style="margin-bottom: 20px;">
                            <div style="width: 50px; height: 50px; background: rgba(255, 123, 0, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary); font-size: 1.2rem;">📞</div>
                            <div>
                                <h4 style="margin-bottom: 4px;">Call Us</h4>
                                <p style="color: var(--text-muted);">+91 98765 43210</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div style="width: 50px; height: 50px; background: rgba(255, 123, 0, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary); font-size: 1.2rem;">✉️</div>
                            <div>
                                <h4 style="margin-bottom: 4px;">Email Us</h4>
                                <p style="color: var(--text-muted);">info@sumanprakashanmandir.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <h3 style="margin-bottom: 24px;">Send us a Message</h3>
                    <form onsubmit="event.preventDefault(); alert('Message sent!');">
                        <div class="input-group">
                            <label class="input-label">Your Name</label>
                            <input type="text" class="input-field" required>
                        </div>
                        <div class="input-group">
                            <label class="input-label">Email Address</label>
                            <input type="email" class="input-field" required>
                        </div>
                        <div class="input-group">
                            <label class="input-label">Message</label>
                            <textarea class="input-field" rows="4" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    `;
}
