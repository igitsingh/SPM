/**
 * Student/Parent Dashboard
 */

export function renderStudentDashboard() {
    return `
        <div class="student-dashboard" style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
            <div class="container" style="max-width: 1200px; margin: 0 auto;">
                <!-- Header -->
                <div style="text-align: center; color: white; margin-bottom: 40px;">
                    <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 10px;">Welcome to Your Dashboard</h1>
                    <p style="font-size: 1.1rem; opacity: 0.9;">Manage your orders, track deliveries, and explore our catalogue</p>
                </div>

                <!-- Quick Stats -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 40px;">
                    <div class="stat-card" style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                        <div style="font-size: 2.5rem; color: #667eea; margin-bottom: 10px;">📚</div>
                        <h3 style="font-size: 1.8rem; font-weight: 700; color: #333; margin-bottom: 5px;">0</h3>
                        <p style="color: #666; font-size: 0.95rem;">Total Orders</p>
                    </div>

                    <div class="stat-card" style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                        <div style="font-size: 2.5rem; color: #FFD700; margin-bottom: 10px;">📦</div>
                        <h3 style="font-size: 1.8rem; font-weight: 700; color: #333; margin-bottom: 5px;">0</h3>
                        <p style="color: #666; font-size: 0.95rem;">Pending Deliveries</p>
                    </div>

                    <div class="stat-card" style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                        <div style="font-size: 2.5rem; color: #4CAF50; margin-bottom: 10px;">✓</div>
                        <h3 style="font-size: 1.8rem; font-weight: 700; color: #333; margin-bottom: 5px;">0</h3>
                        <p style="color: #666; font-size: 0.95rem;">Completed Orders</p>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin-bottom: 40px;">
                    <h2 style="font-size: 1.5rem; font-weight: 700; color: #333; margin-bottom: 30px;">Quick Actions</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                        <a href="#/catalogue" class="action-btn" style="display: block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; text-decoration: none; font-weight: 600; transition: transform 0.2s;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">📖</div>
                            Browse Catalogue
                        </a>

                        <a href="#/students/orders" class="action-btn" style="display: block; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; text-decoration: none; font-weight: 600; transition: transform 0.2s;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">📋</div>
                            My Orders
                        </a>

                        <a href="#/video-library" class="action-btn" style="display: block; background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; text-decoration: none; font-weight: 600; transition: transform 0.2s;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">🎥</div>
                            Video Library
                        </a>

                        <a href="#/contact" class="action-btn" style="display: block; background: linear-gradient(135deg, #FF6B6B 0%, #EE5A6F 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; text-decoration: none; font-weight: 600; transition: transform 0.2s;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">📞</div>
                            Contact Support
                        </a>
                    </div>
                </div>

                <!-- Recent Orders (Empty State) -->
                <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <h2 style="font-size: 1.5rem; font-weight: 700; color: #333; margin-bottom: 30px;">Recent Orders</h2>
                    <div style="text-align: center; padding: 60px 20px; color: #999;">
                        <div style="font-size: 4rem; margin-bottom: 20px;">📦</div>
                        <p style="font-size: 1.1rem; margin-bottom: 20px;">No orders yet</p>
                        <a href="#/catalogue" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 600;">
                            Start Shopping
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <style>
            .action-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(0,0,0,0.15);
            }

            .stat-card {
                transition: transform 0.2s;
            }

            .stat-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 8px 24px rgba(0,0,0,0.15) !important;
            }
        </style>
    `;
}
