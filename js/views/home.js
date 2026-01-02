import { catalogueApi } from '../services/catalogue-api.js';
import { renderBookCard } from '../components/book-card.js';

export async function renderHome() {
    let books = [];
    try {
        const data = await catalogueApi.getAll();
        books = data.map(b => ({
            ...b,
            id: b.id,
            code: b.code || '',
            title: b.title,
            category: b.category || 'General',
            class: b.class || 'N/A',
            price: Number(b.priceRetail) || 0,
            image: b.coverImage || 'https://via.placeholder.com/150?text=No+Cover',
            description: b.description || ''
        }));
    } catch (e) {
        console.error("Failed to load books for home:", e);
    }

    // fallback if empty
    if (books.length === 0) {
        // Just return a simplified view or continue with empty arrays to act as graceful degradation
    }

    // Data filtering
    const boardBooks = books.filter(b => b.category === 'Broad Book' || b.category === 'Board Book').slice(0, 4);
    // If no board books, just take first 4
    const displayBoardBooks = boardBooks.length > 0 ? boardBooks : books.slice(0, 4);

    const kindergartenBooks = books.filter(b => b.class && (b.class.includes('Nursery') || b.class.includes('KG'))).slice(0, 4);
    const displayKindergarten = kindergartenBooks.length > 0 ? kindergartenBooks : books.slice(5, 9);

    // Sort by some criteria or random for bestsellers if not explicitly marked
    const bestsellers = books.slice(10, 14);

    const bundleBook1 = books[15] || books[0] || {};
    const bundleBook2 = books[16] || books[1] || {};

    return `
        <!-- Hero Section -->
        <div class="hero">
            <div class="container hero-container">
                <div class="hero-text fade-in">
                    <span class="hero-badge">New Education Policy 2020</span>
                    <h1>
                        Preserving Knowledge. <br>
                        <span>Passing on a Legacy.</span>
                    </h1>
                    <p>Suman Prakashan Mandir — A family-run publishing house serving education, culture, and literature for generations.</p>
                    <div class="flex gap-4">
                        <a href="#/catalogue" class="btn btn-primary" style="padding: 16px 32px; font-size: 1.1rem; border-radius: 30px;">Explore Books</a>
                        <a href="#/about" class="btn btn-outline" style="border-radius: 30px;">Our Story</a>
                    </div>
                </div>
                <div class="hero-visual fade-in" style="animation-delay: 0.2s;">
                    <div class="hero-book">
                        <img src="${books[0]?.image || ''}" alt="Book 1" style="width: 100%; border-radius: 8px;">
                    </div>
                    <div class="hero-book">
                        <img src="${books[20]?.image || books[1]?.image || ''}" alt="Book 2" style="width: 100%; border-radius: 8px;">
                    </div>
                    <div class="hero-book">
                        <img src="${books[45]?.image || books[2]?.image || ''}" alt="Book 3" style="width: 100%; border-radius: 8px;">
                    </div>
                </div>
            </div>
            <div class="hero-wave">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
                </svg>
            </div>
        </div>
        
        <div class="spm-promo-bar" style="background: #FFD700; color: #222; text-align: center; padding: 12px; font-weight: 600; font-size: 1rem;">
            Use Code: <strong>SPM10</strong> and Get 10% OFF on all orders!
        </div>

        <!-- Business Highlight Section -->
        <div class="highlight-section">
            <div class="container text-center">
                <h2 class="highlight-title">🚀 Want to Start Your Own Profitable Book Business?</h2>
                <p class="highlight-subtitle">Join our network of successful distributors and retailers. Low investment, high returns, and premium NEP-aligned content.</p>
                <a href="#/business-opportunity" class="btn highlight-btn">Start Your Journey</a>
            </div>
        </div>

        <!-- Board Books Section -->
        <div class="section container" style="padding-top: 80px; padding-bottom: 80px;">
            <div class="text-center mb-12">
                <h2 style="font-size: 3rem; margin-bottom: 16px; font-weight: 800;">Board Books by Category</h2>
                <p class="text-muted" style="font-size: 1.1rem; letter-spacing: 0.5px;">Books for the upcoming academic session of 2025-26</p>
            </div>
            
            <div class="tabs-header">
                <button class="tab-btn active">HANDBOOK</button>
                <button class="tab-btn">TEXT BOOK</button>
                <button class="tab-btn">LAB MANUAL</button>
            </div>

            <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
                ${displayBoardBooks.map(book => renderBookCard(book)).join('')}
            </div>
        </div>

        <!-- Kindergarten Section -->
        <div class="section" style="background: #e0f7fa; padding-top: 100px; padding-bottom: 100px;">
            <div class="container">
                <div class="text-center mb-12">
                    <h2 style="font-size: 3rem; margin-bottom: 16px; font-weight: 800;">Books for Kindergarten</h2>
                    <p class="text-muted" style="font-size: 1.1rem; letter-spacing: 0.5px;">Unique and interactive range of books designed to make learning fun!</p>
                </div>
                <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
                    ${displayKindergarten.map(book => renderBookCard(book)).join('')}
                </div>
            </div>
        </div>

        <!-- Bestsellers Section -->
        <div class="section container" style="padding-top: 80px; padding-bottom: 80px;">
            <div class="text-center mb-12">
                <h2 style="font-size: 3rem; margin-bottom: 16px; font-weight: 800;">Bestseller for Academic Books</h2>
                <p class="text-muted" style="font-size: 1.1rem; letter-spacing: 0.5px;">Books for the upcoming academic session of 2025-26</p>
            </div>
            <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
                ${bestsellers.map(book => renderBookCard(book)).join('')}
            </div>
            <div class="text-center" style="margin-top: 60px;">
                <button class="btn btn-primary" style="border-radius: 30px; padding: 12px 40px;">View All Books</button>
            </div>
        </div>

        <!-- Reels Section -->
        <div class="section container" style="padding-top: 40px; padding-bottom: 100px;">
            <div class="reels-container">
                <div class="reel-item">
                    <video src="./assets/videos/reel.mp4" autoplay muted loop playsinline></video>
                    <div class="reel-overlay">
                        <span>Sundar Kanda</span>
                        <p>Rs. 1,274.00</p>
                    </div>
                </div>
                <div class="reel-item">
                    <video src="./assets/videos/reel.mp4" autoplay muted loop playsinline></video>
                    <div class="reel-overlay">
                        <span>500 Activities</span>
                        <p>Rs. 936.00</p>
                    </div>
                </div>
                <div class="reel-item">
                    <video src="./assets/videos/reel.mp4" autoplay muted loop playsinline></video>
                    <div class="reel-overlay">
                        <span>Devotional Lord</span>
                        <p>Rs. 300.00</p>
                    </div>
                </div>
                <div class="reel-item">
                    <video src="./assets/videos/reel.mp4" autoplay muted loop playsinline></video>
                    <div class="reel-overlay">
                        <span>ICSE Chemistry</span>
                        <p>Rs. 1,395.00</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bundles Section -->
        <div class="section container">
            <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 30px;">
                <div class="bundle-banner bundle-green">
                    <div class="bundle-content">
                        <p style="color: #666; margin-bottom: 8px;">Buy more, Save more</p>
                        <h3 style="font-size: 2rem; color: #2e7d32; margin-bottom: 20px;">Book Bundles for the Kindergarten</h3>
                        <button class="btn" style="background: #2e7d32; color: white; border-radius: 30px; padding: 10px 30px;">Explore</button>
                    </div>
                    <img src="${bundleBook1.image || 'https://via.placeholder.com/200?text=Bundle'}" style="position: absolute; right: -20px; bottom: -20px; width: 200px; transform: rotate(-15deg);" alt="Bundle">
                </div>
                <div class="bundle-banner bundle-beige">
                    <div class="bundle-content">
                        <p style="color: #666; margin-bottom: 8px;">Buy more, Save more</p>
                        <h3 style="font-size: 2rem; color: #e65100; margin-bottom: 20px;">Book Bundles for the Children Books</h3>
                        <button class="btn" style="background: #e65100; color: white; border-radius: 30px; padding: 10px 30px;">Explore</button>
                    </div>
                    <img src="${bundleBook2.image || 'https://via.placeholder.com/200?text=Bundle'}" style="position: absolute; right: -20px; bottom: -20px; width: 200px; transform: rotate(15deg);" alt="Bundle">
                </div>
            </div>
        </div>

        <!-- Journey Stats -->
        <div class="section" style="background: #fff9c4; padding-top: 80px; padding-bottom: 80px;">
            <div class="container">
                <div class="text-center mb-16">
                    <h2 style="font-size: 3rem; margin-bottom: 16px; font-weight: 800;">An Overview of Our Journey...</h2>
                    <p class="text-muted" style="font-size: 1.1rem;">Engaged in publishing textbooks since 1995.</p>
                </div>
                <div class="stats-container">
                    <div class="stat-item">
                        <div class="stat-number">50 +</div>
                        <div class="stat-label">Years of Experience</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">250 +</div>
                        <div class="stat-label">Titles</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">1,000 +</div>
                        <div class="stat-label">Schools</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">400 +</div>
                        <div class="stat-label">Distributors</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Testimonials -->
        <div class="section container" style="padding-top: 60px; padding-bottom: 80px;">
            <div class="text-center mb-8" style="margin-bottom: 30px;">
                <h2 style="font-size: 3rem; font-weight: 800;">What do teachers say about Suman Prakashan Mandir?</h2>
            </div>
            <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 60px;">
                <div class="testimonial-card">
                    <div class="stars">★★★★★</div>
                    <p style="font-size: 1.25rem; color: #555; margin-bottom: 30px; line-height: 1.8; font-style: italic;">
                        "Helped a lot and i have seen many students have scored 100% marks in physics past 10 years"
                    </p>
                    <div class="flex justify-between items-center border-top pt-6" style="border-top: 1px solid #eee; padding-top: 24px;">
                        <strong style="font-size: 1.1rem;">Rajesh Srivastava</strong>
                        <span class="text-muted">Lecturer LPC</span>
                    </div>
                </div>
                <div class="testimonial-card">
                    <div class="stars">★★★★★</div>
                    <p style="font-size: 1.25rem; color: #555; margin-bottom: 30px; line-height: 1.8; font-style: italic;">
                        "Content are in very simple language and supported by labeled diagram in neat way to help students learn easy"
                    </p>
                    <div class="flex justify-between items-center border-top pt-6" style="border-top: 1px solid #eee; padding-top: 24px;">
                        <strong style="font-size: 1.1rem;">Brian Dmore</strong>
                        <span class="text-muted">Francis College</span>
                    </div>
                </div>
            </div>
        </div>


    `;
}
