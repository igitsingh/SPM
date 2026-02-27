export async function renderDistributorsLanding() {
    return `
        <div class="landing-page fade-in">
            <!-- Hero Section -->
            <div class="hero-section" style="background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%); padding: 100px 0; color: white; text-align: center;">
                <div class="container">
                    <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 20px; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">
                        Dealers & Distributors Zone<br>
                        <span style="font-size: 2rem; display: block; margin-top: 10px; font-weight: 600;">(डीलर्स और डिस्ट्रीब्यूटर्स के लिए)</span>
                    </h1>
                    <p style="font-size: 1.3rem; max-width: 800px; margin: 0 auto 30px; opacity: 0.95;">
                        Join Paradise Publication as a dealer/distributor. High profit margins, monopoly rights options, and full stock support.
                        <br><br>
                        अगर आपकी स्कूलों में पकड़ है या आपकी बुक शॉप है, तो हमारे साथ जुड़कर आप अपने बिज़नेस को नई ऊंचाइयों पर ले जा सकते हैं।
                    </p>
                    <a href="#/contact" class="btn" style="background: white; color: #4A00E0; padding: 16px 40px; font-size: 1.2rem; border-radius: 50px; font-weight: 700; text-decoration: none; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                        Join the Network
                    </a>
                </div>
            </div>

            <!-- What We Offer -->
            <div class="section container" style="padding: 80px 20px;">
                <div class="text-center mb-12">
                    <h2 style="font-size: 2.5rem; font-weight: 800; color: #333; margin-bottom: 10px;">Grow With Us (हमारे साथ आगे बढ़ें)</h2>
                    <p class="text-muted">We are looking for aggressive partners in Uttar Pradesh, Bihar, Rajasthan, and MP.</p>
                </div>
                <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                    <div class="card" style="padding: 30px; border-left: 5px solid #4A00E0;">
                        <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 10px;">Best Industry Margins</h3>
                        <p class="text-muted">Earn more on every set sold. We offer competitive margins to ensure your growth.</p>
                    </div>
                    <div class="card" style="padding: 30px; border-left: 5px solid #4A00E0;">
                        <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 10px;">Territory Protection</h3>
                        <p class="text-muted">We respect your area and network. Work without fear of internal competition.</p>
                    </div>
                    <div class="card" style="padding: 30px; border-left: 5px solid #4A00E0;">
                        <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 10px;">Fast Supply</h3>
                        <p class="text-muted">Located in Meerut, the publishing hub, ensuring quick logistics and stock replenishment.</p>
                    </div>
                </div>
            </div>

            <!-- FAQ Section -->
            <div class="section" style="background: #f4f4f4; padding: 80px 0;">
                <div class="container" style="max-width: 800px;">
                    <div class="text-center mb-12">
                        <h2 style="font-size: 2.5rem; font-weight: 800; color: #333; margin-bottom: 20px;">FAQ for Distributors</h2>
                    </div>
                    
                    <div style="background: white; padding: 30px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                        <h4 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; color: #4A00E0;">Q: Minimum investment? (कम से कम कितना निवेश?)</h4>
                        <p style="color: #555;">A: Very flexible starter packages available. You can start small and scale up as you build your network.</p>
                    </div>

                    <div style="background: white; padding: 30px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                        <h4 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; color: #4A00E0;">Q: Return policy? (वापसी की नीति?)</h4>
                        <p style="color: #555;">A: We have a friendly exchange policy for unsold stock (Terms & Conditions apply), so your risk is minimized.</p>
                    </div>

                    <div style="background: white; padding: 30px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                        <h4 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; color: #4A00E0;">Q: How do I apply? (आवेदन कैसे करें?)</h4>
                        <p style="color: #555;">A: Simply click the button below and fill out the registration form. Our team will contact you within 24 hours.</p>
                    </div>
                </div>
            </div>

            <!-- CTA -->
            <div class="section container" style="padding: 60px 0; text-align: center;">
                <a href="#/contact" class="btn btn-primary" style="padding: 16px 50px; font-size: 1.3rem; border-radius: 50px;">
                    Start Your Application
                </a>
            </div>
        </div>
    `;
}
