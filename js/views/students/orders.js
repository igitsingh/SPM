/**
 * Student/Parent Orders Page
 */

export function renderStudentOrders() {
    return `
        <div class="student-orders" style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
            <div class="container" style="max-width: 1200px; margin: 0 auto;">
                <!-- Header -->
                <div style="background: white; border-radius: 12px; padding: 30px; margin-bottom: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <h1 style="font-size: 2rem; font-weight: 800; color: #333; margin-bottom: 10px;">My Orders</h1>
                    <p style="color: #666; font-size: 1rem;">Track and manage all your book orders</p>
                </div>

                <!-- Orders List (Empty State) -->
                <div style="background: white; border-radius: 12px; padding: 60px 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center;">
                    <div style="font-size: 5rem; margin-bottom: 20px; opacity: 0.3;">📦</div>
                    <h2 style="font-size: 1.8rem; font-weight: 700; color: #333; margin-bottom: 15px;">No Orders Yet</h2>
                    <p style="color: #666; font-size: 1.1rem; margin-bottom: 30px; max-width: 500px; margin-left: auto; margin-right: auto;">
                        You haven't placed any orders yet. Browse our catalogue to find the perfect books for your studies!
                    </p>
                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        <a href="#/catalogue" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 1rem;">
                            Browse Catalogue
                        </a>
                        <a href="#/students/dashboard" style="display: inline-block; background: white; color: #667eea; border: 2px solid #667eea; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 1rem;">
                            Back to Dashboard
                        </a>
                    </div>
                </div>

                <!-- Future: When orders exist, show this structure -->
                <!--
                <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <div class="order-item" style="border-bottom: 1px solid #eee; padding: 20px 0;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                            <div>
                                <h3 style="font-size: 1.2rem; font-weight: 700; color: #333; margin-bottom: 5px;">Order #12345</h3>
                                <p style="color: #666; font-size: 0.9rem;">Placed on: Jan 15, 2025</p>
                            </div>
                            <span style="background: #4CAF50; color: white; padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">Delivered</span>
                        </div>
                        <div style="color: #666; font-size: 0.95rem; margin-bottom: 10px;">
                            <strong>Items:</strong> 3 books
                        </div>
                        <div style="color: #333; font-size: 1.1rem; font-weight: 700; margin-bottom: 15px;">
                            Total: ₹1,250
                        </div>
                        <a href="#/students/orders/12345" style="color: #667eea; text-decoration: none; font-weight: 600; font-size: 0.95rem;">
                            View Details →
                        </a>
                    </div>
                </div>
                -->
            </div>
        </div>
    `;
}
