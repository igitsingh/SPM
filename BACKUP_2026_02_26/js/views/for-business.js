export const renderForBusiness = () => {
    return `
    <div class="spm-for-biz-wrapper">
        <style>
            .spm-for-biz-wrapper {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #0d3b8e 0%, #1565CC 100%);
                font-family: 'Outfit', 'Inter', system-ui, -apple-system, sans-serif;
                color: white;
                text-align: center;
                padding: 20px;
            }

            .spm-biz-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 60px;
                width: 100%;
                max-width: 1200px;
            }

            /* Logo in the Middle */
            .spm-biz-branding {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                margin-bottom: 20px;
            }

            .spm-biz-logo-text {
                font-family: 'Playfair Display', serif;
                font-size: 5rem;
                font-weight: 900;
                color: #FFD700;
                letter-spacing: 12px;
                line-height: 1;
                text-shadow: 0 4px 20px rgba(0,0,0,0.4);
            }

            .spm-biz-logo-tag {
                font-size: 1.2rem;
                font-weight: 700;
                color: rgba(255,255,255,0.9);
                letter-spacing: 8px;
                text-transform: uppercase;
                margin-top: 5px;
                background: rgba(255,255,255,0.1);
                padding: 8px 30px;
                border-radius: 100px;
                backdrop-filter: blur(10px);
            }

            /* Nav Grid */
            .spm-biz-nav-row {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 40px;
                flex-wrap: wrap;
            }

            .biz-nav-item {
                color: white;
                text-decoration: none;
                font-size: 1.25rem;
                font-weight: 600;
                padding: 12px 24px;
                border-radius: 12px;
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                position: relative;
            }

            .biz-nav-item:hover {
                background: rgba(255, 255, 255, 0.15);
                transform: translateY(-5px);
                color: #FFD700;
            }

            .biz-nav-btn {
                background: #FFD700;
                color: #0d3b8e !important;
                padding: 14px 32px;
                font-weight: 800;
                box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
            }

            .biz-nav-btn:hover {
                background: white;
                transform: translateY(-5px) scale(1.05);
            }

            /* Dropdown logic for Orders on this page */
            .biz-dropdown-wrap {
                position: relative;
            }
            .biz-dropdown-menu {
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%) translateY(20px);
                background: white;
                min-width: 220px;
                border-radius: 12px;
                padding: 8px;
                box-shadow: 0 15px 40px rgba(0,0,0,0.3);
                opacity: 0;
                visibility: hidden;
                transition: all 0.25s ease;
                display: flex;
                flex-direction: column;
                gap: 4px;
                z-index: 10;
            }
            .biz-dropdown-wrap:hover .biz-dropdown-menu {
                opacity: 1;
                visibility: visible;
                transform: translateX(-50%) translateY(10px);
            }
            .biz-dropdown-menu a {
                color: #333;
                text-decoration: none;
                padding: 12px 16px;
                font-size: 0.95rem;
                font-weight: 500;
                border-radius: 8px;
                text-align: left;
                transition: background 0.2s;
            }
            .biz-dropdown-menu a:hover {
                background: #f0f7ff;
                color: #1565C0;
            }

            .register-btn {
                background: rgba(255,255,255,0.1);
                border: 1px solid rgba(255,255,255,0.3);
            }

            @media (max-width: 768px) {
                .spm-biz-logo-text { font-size: 3rem; }
                .spm-biz-nav-row { flex-direction: column; gap: 15px; }
            }
        </style>

        <div class="spm-biz-container">
            
            <div class="spm-biz-branding">
                <div class="spm-biz-logo-text">SPM</div>
                <div class="spm-biz-logo-tag">for business</div>
            </div>

            <div class="spm-biz-nav-row">
                <a href="#/catalogue?mode=business" class="biz-nav-item">Catalogue</a>
                
                <div class="biz-dropdown-wrap">
                    <a href="javascript:void(0)" class="biz-nav-item">Orders ▾</a>
                    <div class="biz-dropdown-menu">
                        <a href="#/order?type=school&mode=business">🏫 School Order</a>
                        <a href="#/order?type=distributor&mode=business">🚛 Distributor Order</a>
                        <a href="#/order?type=retailer&mode=business">🛍️ Retailer Order</a>
                    </div>
                </div>

                <a href="#/forbusiness" class="biz-nav-item biz-nav-btn">For Business</a>
                
                <a href="#/student-login?mode=business" class="biz-nav-item">Login</a>
                <a href="#/student-register?mode=business" class="biz-nav-item register-btn">Register</a>
            </div>

        </div>
    </div>
    `;
}
