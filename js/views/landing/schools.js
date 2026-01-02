export async function renderSchoolsLanding() {
    return `
        <div class="landing-page fade-in">
            <!-- Hero Section -->
            <div class="hero-section" style="background: linear-gradient(135deg, #56CCF2 0%, #2F80ED 100%); padding: 100px 0; color: white; text-align: center;">
                <div class="container">
                    <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 20px; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">
                        Perfect NEP-Based Book Sets for New Schools<br>
                        <span style="font-size: 2rem; display: block; margin-top: 10px; font-weight: 600;">(नए स्कूलों के लिए बेहतरीन NEP किताबें)</span>
                    </h1>
                    <p style="font-size: 1.3rem; max-width: 800px; margin: 0 auto 30px; opacity: 0.95;">
                        Looking for NEP 2020 aligned books for your new school? We offer affordable, high-quality CBSE pattern books for Nursery to Class 5.
                        <br><br>
                        नर्सरी से 5वीं तक का पूरा सेट, जो आपके बजट में फिट हो।
                    </p>
                    <a href="#/contact" class="btn" style="background: white; color: #2F80ED; padding: 16px 40px; font-size: 1.2rem; border-radius: 50px; font-weight: 700; text-decoration: none; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                        Request Sample Set (सैंपल मंगाएं)
                    </a>
                </div>
            </div>

            <!-- Understanding NEP Section -->
            <div class="section container" style="padding: 80px 20px;">
                <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 50px; align-items: center;">
                    <div>
                        <h2 style="font-size: 2.5rem; font-weight: 800; color: #333; margin-bottom: 20px;">Understanding NEP 2020<br>(NEP 2020 को समझें)</h2>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: #555; margin-bottom: 20px;">
                            The New Education Policy (NEP) 2020 focuses on foundational literacy and numeracy. Our books are designed to make learning fun and interactive, reducing the burden on children while maximizing learning outcomes.
                        </p>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
                            NEP 2020 का उद्देश्य बच्चों की नींव को मजबूत करना है। हमारी किताबें इसी सोच के साथ बनाई गई हैं - सरल, रोचक और ज्ञानवर्धक।
                        </p>
                    </div>
                    <div style="background: #f0f8ff; padding: 40px; border-radius: 20px; text-align: center;">
                        <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 20px; color: #2F80ED;">Our Mapping</h3>
                        <ul style="text-align: left; list-style: none; padding: 0;">
                            <li style="margin-bottom: 15px; padding-left: 25px; position: relative;">
                                <span style="position: absolute; left: 0; color: #2F80ED;">✓</span>
                                <strong>Nursery/KG:</strong> Activity-based learning (Rhymes, Colors, Alphabet).
                            </li>
                            <li style="margin-bottom: 15px; padding-left: 25px; position: relative;">
                                <span style="position: absolute; left: 0; color: #2F80ED;">✓</span>
                                <strong>Class 1-5:</strong> Concept-building with real-life examples.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Why Paradise for Budget Schools -->
            <div class="section" style="background: #fff9c4; padding: 80px 0;">
                <div class="container">
                    <div class="text-center mb-12">
                        <h2 style="font-size: 2.5rem; font-weight: 800; color: #333; margin-bottom: 10px;">Why Paradise is Best for Budget Schools</h2>
                    </div>
                    <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                        <div class="card" style="padding: 30px;">
                            <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 10px;">Affordable Pricing</h3>
                            <p class="text-muted">Premium quality at prices parents love. Designed for budget private schools.</p>
                        </div>
                        <div class="card" style="padding: 30px;">
                            <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 10px;">Complete Solution</h3>
                            <p class="text-muted">One publisher for all subjects (Hindi, English, Math, EVS, etc.). No need to mix and match.</p>
                        </div>
                        <div class="card" style="padding: 30px;">
                            <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 10px;">Teacher Friendly</h3>
                            <p class="text-muted">Structured lesson plans and easy-to-teach content to support your staff.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Starter Package Offer -->
            <div class="section container" style="padding: 80px 20px; text-align: center;">
                <div style="background: linear-gradient(45deg, #11998e, #38ef7d); color: white; padding: 50px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <h2 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 20px;">Foundation Success Kit Offer</h2>
                    <p style="font-size: 1.2rem; margin-bottom: 30px;">
                        Get a special <strong>40% discount</strong> on your first bulk order! Perfect for new schools starting this session.
                        <br>
                        (पहले ऑर्डर पर विशेष छूट!)
                    </p>
                    <a href="#/contact" class="btn" style="background: white; color: #11998e; padding: 16px 40px; font-size: 1.2rem; border-radius: 50px; font-weight: 700; text-decoration: none;">
                        Claim Offer Now
                    </a>
                </div>
            </div>
        </div>
    `;
}
