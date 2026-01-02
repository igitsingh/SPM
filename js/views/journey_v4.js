export async function renderJourney() {
    return `
        <div class="journey-page fade-in">
            <!-- Hero Section -->
            <div class="journey-hero" style="background: var(--gradient-primary); padding: 120px 0; color: white; text-align: center; position: relative; overflow: hidden;">
                <div class="container">
                    <h1 style="font-size: 3.5rem; font-weight: 800; margin-bottom: 24px; text-transform: uppercase; letter-spacing: -1px; text-shadow: 0 4px 15px rgba(0,0,0,0.3); color: #ffffff !important;">
                        Start Your Journey with Suman Prakashan Mandir Today!
                    </h1>
                    <p style="font-size: 1.4rem; max-width: 800px; margin: 0 auto 40px; opacity: 1; line-height: 1.6; color: #ffffff !important; font-weight: 500;">
                        Join a legacy of excellence. Partner with us to bring premium NEP-aligned educational content to schools and students across the nation.
                    </p>
                    <button class="btn btn-primary" onclick="document.getElementById('journey-form').scrollIntoView({behavior: 'smooth'})" style="padding: 16px 40px; font-size: 1.2rem; border-radius: 50px; background: #ffc107; color: #000; font-weight: 700;">
                        Get Started Now
                    </button>
                </div>
                <!-- Decorative Wave -->
                <div style="position: absolute; bottom: 0; left: 0; width: 100%; overflow: hidden; line-height: 0;">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" style="position: relative; display: block; width: calc(100% + 1.3px); height: 60px;">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" style="fill: #ffffff;"></path>
                    </svg>
                </div>
            </div>

            <!-- Benefits Section -->
            <div class="section container" style="padding-top: 80px; padding-bottom: 80px;">
                <div class="text-center mb-16">
                    <h2 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 16px; color: #333;">Why Partner with Suman Prakashan Mandir?</h2>
                    <p class="text-muted" style="font-size: 1.1rem;">We provide more than just books; we provide a pathway to success.</p>
                </div>
                
                <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px;">
                    <div class="card text-center" style="padding: 40px;">
                        <div style="font-size: 3rem; margin-bottom: 20px;">📚</div>
                        <h3 style="font-size: 1.5rem; margin-bottom: 12px; font-weight: 700;">Premium Content</h3>
                        <p class="text-muted">NEP 2020 aligned curriculum designed by experts to meet modern educational standards.</p>
                    </div>
                    <div class="card text-center" style="padding: 40px;">
                        <div style="font-size: 3rem; margin-bottom: 20px;">💰</div>
                        <h3 style="font-size: 1.5rem; margin-bottom: 12px; font-weight: 700;">High Margins</h3>
                        <p class="text-muted">Attractive profit margins for distributors and retailers to ensure sustainable business growth.</p>
                    </div>
                    <div class="card text-center" style="padding: 40px;">
                        <div style="font-size: 3rem; margin-bottom: 20px;">🤝</div>
                        <h3 style="font-size: 1.5rem; margin-bottom: 12px; font-weight: 700;">Marketing Support</h3>
                        <p class="text-muted">We provide marketing materials, samples, and dedicated support to help you sell better.</p>
                    </div>
                </div>
            </div>

            <!-- Contact Form Section -->
            <div id="journey-form" class="section" style="background: #f8f9fa; padding-top: 80px; padding-bottom: 80px;">
                <div class="container" style="max-width: 800px;">
                    <div class="card" style="padding: 40px; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.08);">
                        <div class="text-center mb-8">
                            <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 12px;">Register Your Interest</h2>
                            <p class="text-muted">Fill out the form below and our team will get back to you within 24 hours.</p>
                        </div>

                        <form onsubmit="event.preventDefault(); alert('Thank you for your interest! We will contact you shortly.');">
                            <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                                <div class="input-group">
                                    <label class="input-label">Full Name</label>
                                    <input type="text" class="input-field" placeholder="John Doe" required>
                                </div>
                                <div class="input-group">
                                    <label class="input-label">Phone Number</label>
                                    <input type="tel" class="input-field" placeholder="+91 98765 43210" required>
                                </div>
                            </div>

                            <div class="input-group">
                                <label class="input-label">Email Address</label>
                                <input type="email" class="input-field" placeholder="john@example.com" required>
                            </div>

                            <div class="input-group">
                                <label class="input-label">I am interested as a:</label>
                                <select class="input-field" style="background: white;" required>
                                    <option value="">Select an option</option>
                                    <option value="school">School Representative</option>
                                    <option value="distributor">Distributor</option>
                                    <option value="retailer">Retailer</option>
                                </select>
                            </div>

                            <div class="input-group">
                                <label class="input-label">Message (Optional)</label>
                                <textarea class="input-field" rows="4" placeholder="Tell us more about your requirements..."></textarea>
                            </div>

                            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 16px; font-size: 1.1rem; border-radius: 8px;">Submit Application</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
}
