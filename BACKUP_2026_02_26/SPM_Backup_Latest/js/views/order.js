import { catalogueApi } from '../services/catalogue-api.js';
import { store } from '../store.js';

let books = [];

export async function renderOrder(type = 'school') {
    try {
        const raw = await catalogueApi.getAll();
        books = raw.map(b => ({
            ...b,
            id: b.id,
            code: b.code || '',
            title: b.title,
            class: b.class || 'N/A',
            price: Number(b.priceRetail) || 0,
            image: b.coverImage || '',
        }));
    } catch (e) {
        console.error("Failed to load order books", e);
        books = [];
    }
    setTimeout(() => attachOrderListeners(type), 100);

    const title = type.charAt(0).toUpperCase() + type.slice(1) + ' Order';
    const isDistributor = type === 'distributor';

    // Form Fields based on type
    let extraFields = '';
    if (type === 'school') {
        extraFields = `
            <div class="input-group"><label class="input-label">School Name</label><input type="text" name="schoolName" class="input-field" required></div>
            <div class="input-group"><label class="input-label">Contact Person</label><input type="text" name="contactPerson" class="input-field" required></div>
            <div class="input-group"><label class="input-label">GST Number</label><input type="text" name="gst" class="input-field"></div>
        `;
    } else if (type === 'distributor') {
        extraFields = `
            <div class="input-group"><label class="input-label">Distributor Shop Name</label><input type="text" name="shopName" class="input-field" required></div>
            <div class="input-group"><label class="input-label">Distributor Code</label><input type="text" name="distCode" class="input-field"></div>
            <div class="input-group"><label class="input-label">GST Number</label><input type="text" name="gst" class="input-field" required></div>
        `;
    } else {
        extraFields = `
            <div class="input-group"><label class="input-label">Shop Name</label><input type="text" name="shopName" class="input-field" required></div>
            <div class="input-group"><label class="input-label">Owner Name</label><input type="text" name="ownerName" class="input-field" required></div>
        `;
    }

    return `
        <div class="container section">
            <h1 class="text-center" style="margin-bottom: 40px;">${title} Portal</h1>
            
            <div class="order-layout">
                <div class="order-form-section">
                    <h3 style="margin-bottom: 24px; border-bottom: 1px solid var(--border-light); padding-bottom: 12px;">1. Buyer Details</h3>
                    <form id="order-form">
                        <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 16px;">
                            ${extraFields}
                            <div class="input-group"><label class="input-label">Mobile Number</label><input type="tel" name="mobile" class="input-field" required></div>
                            <div class="input-group"><label class="input-label">Email</label><input type="email" name="email" class="input-field" required></div>
                        </div>
                        <div class="input-group"><label class="input-label">Full Address</label><textarea name="address" class="input-field" rows="3" required></textarea></div>
                    </form>

                    <h3 style="margin: 40px 0 24px; border-bottom: 1px solid var(--border-light); padding-bottom: 12px;">2. Select Books</h3>
                    
                    ${isDistributor ? `
                        <div class="input-group" style="background: #fff3e0; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
                            <label class="input-label">Wholesale Discount (%)</label>
                            <input type="number" id="discount-input" class="input-field" value="0" min="0" max="100" style="width: 100px;">
                        </div>
                    ` : ''}

                    <div style="max-height: 600px; overflow-y: auto; border: 1px solid var(--border-light); border-radius: 8px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead style="background: var(--bg-body); position: sticky; top: 0;">
                                <tr>
                                    <th style="padding: 12px; text-align: left;">Code</th>
                                    <th style="padding: 12px; text-align: left;">Title</th>
                                    <th style="padding: 12px; text-align: left;">Class</th>
                                    <th style="padding: 12px; text-align: right;">Price</th>
                                    <th style="padding: 12px; text-align: center; width: 120px;">Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${books.map(book => `
                                    <tr style="border-bottom: 1px solid var(--border-light);">
                                        <td style="padding: 12px; font-size: 0.9rem; color: var(--text-muted);">${book.code}</td>
                                        <td style="padding: 12px; font-weight: 500;">${book.title}</td>
                                        <td style="padding: 12px; color: var(--text-muted);">${book.class || '-'}</td>
                                        <td style="padding: 12px; text-align: right;">₹${book.price}</td>
                                        <td style="padding: 12px;">
                                            <input type="number" min="0" class="input-field book-qty" 
                                                data-id="${book.id}" data-price="${book.price}" 
                                                style="padding: 6px; text-align: center;" placeholder="0">
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <aside class="order-summary-sidebar">
                    <h3 style="margin-bottom: 20px;">Order Summary</h3>
                    <div id="summary-items" style="max-height: 300px; overflow-y: auto; margin-bottom: 20px; font-size: 0.9rem;">
                        <p style="color: var(--text-muted); text-align: center;">No items selected</p>
                    </div>
                    
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span id="summary-subtotal">₹0</span>
                    </div>
                    ${isDistributor ? `
                    <div class="summary-row" style="color: var(--secondary);">
                        <span>Discount</span>
                        <span id="summary-discount">-₹0</span>
                    </div>
                    ` : ''}
                    <div class="summary-total">
                        <div class="flex justify-between">
                            <span>Total</span>
                            <span id="summary-total">₹0</span>
                        </div>
                    </div>

                    <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 12px;">
                        <button id="btn-preview" class="btn-outline" style="width: 100%;">Preview & Print</button>
                        <button id="btn-submit" class="btn-primary" style="width: 100%;">Save Order</button>
                        <button id="btn-export-order" style="font-size: 0.8rem; text-decoration: underline; color: var(--text-muted);">Export JSON</button>
                    </div>
                </aside>
            </div>
        </div>

        <!-- Print Modal (Hidden by default) -->
        <div id="print-modal" class="modal-overlay" style="z-index: 2000;">
            <div style="background: white; width: 90%; max-width: 800px; margin: 40px auto; padding: 40px; border-radius: 8px; max-height: 90vh; overflow-y: auto;">
                <div id="print-content"></div>
                <div class="flex justify-center gap-4" style="margin-top: 40px;">
                    <button onclick="window.print()" class="btn btn-primary">Print Now</button>
                    <button onclick="document.getElementById('print-modal').classList.remove('active')" class="btn btn-outline">Close</button>
                </div>
            </div>
        </div>
    `;
}

function attachOrderListeners(type) {
    const qtyInputs = document.querySelectorAll('.book-qty');
    const summaryItems = document.getElementById('summary-items');
    const subtotalEl = document.getElementById('summary-subtotal');
    const totalEl = document.getElementById('summary-total');
    const discountInput = document.getElementById('discount-input');
    const discountEl = document.getElementById('summary-discount');

    let selectedBooks = {};

    function updateSummary() {
        let subtotal = 0;
        let html = '';

        Object.values(selectedBooks).forEach(item => {
            if (item.qty > 0) {
                const itemTotal = item.qty * item.price;
                subtotal += itemTotal;
                html += `
                    <div class="flex justify-between" style="margin-bottom: 8px;">
                        <span style="flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 10px;">${item.title}</span>
                        <span style="color: var(--text-muted);">x${item.qty}</span>
                        <span style="font-weight: 500; margin-left: 10px;">₹${itemTotal}</span>
                    </div>
                `;
            }
        });

        if (html === '') html = '<p style="color: var(--text-muted); text-align: center;">No items selected</p>';

        summaryItems.innerHTML = html;
        subtotalEl.textContent = `₹${subtotal}`;

        let total = subtotal;
        if (type === 'distributor' && discountInput) {
            const discountPercent = parseFloat(discountInput.value) || 0;
            const discountAmount = Math.round((subtotal * discountPercent) / 100);
            total = subtotal - discountAmount;
            if (discountEl) discountEl.textContent = `-₹${discountAmount}`;
        }

        totalEl.textContent = `₹${total}`;
        return { subtotal, total, items: Object.values(selectedBooks).filter(i => i.qty > 0) };
    }

    qtyInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const id = e.target.dataset.id;
            const price = parseInt(e.target.dataset.price);
            const qty = parseInt(e.target.value) || 0;
            const title = books.find(b => b.id === id).title;

            if (qty > 0) {
                selectedBooks[id] = { id, title, price, qty };
            } else {
                delete selectedBooks[id];
            }
            updateSummary();
        });
    });

    if (discountInput) {
        discountInput.addEventListener('input', updateSummary);
    }

    // Preview & Print
    document.getElementById('btn-preview').addEventListener('click', () => {
        const form = document.getElementById('order-form');
        if (!form.checkValidity()) {
            alert('Please fill in all required buyer details first.');
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const buyerDetails = Object.fromEntries(formData.entries());
        const { total, items } = updateSummary();

        if (items.length === 0) {
            alert('Please select at least one book.');
            return;
        }

        const orderId = 'ORD-' + Date.now().toString().slice(-6);
        const date = new Date().toLocaleDateString();

        const printHtml = `
            <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="color: var(--primary); margin-bottom: 10px;">PARADISE PUBLICATION</h1>
                <p>Meerut, Uttar Pradesh | +91 98765 43210</p>
                <h2 style="margin-top: 20px; border-top: 2px solid #eee; padding-top: 20px;">${type.toUpperCase()} ORDER INVOICE</h2>
            </div>

            <div class="flex justify-between" style="margin-bottom: 40px;">
                <div>
                    <strong>Bill To:</strong><br>
                    ${buyerDetails.schoolName || buyerDetails.shopName || buyerDetails.ownerName}<br>
                    ${buyerDetails.address || ''}<br>
                    Phone: ${buyerDetails.mobile}<br>
                    GST: ${buyerDetails.gst || 'N/A'}
                </div>
                <div style="text-align: right;">
                    <strong>Order ID:</strong> ${orderId}<br>
                    <strong>Date:</strong> ${date}
                </div>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px;">
                <thead>
                    <tr style="border-bottom: 2px solid #000;">
                        <th style="text-align: left; padding: 10px;">Item</th>
                        <th style="text-align: center; padding: 10px;">Qty</th>
                        <th style="text-align: right; padding: 10px;">Price</th>
                        <th style="text-align: right; padding: 10px;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${items.map(item => `
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 10px;">${item.title}</td>
                            <td style="text-align: center; padding: 10px;">${item.qty}</td>
                            <td style="text-align: right; padding: 10px;">₹${item.price}</td>
                            <td style="text-align: right; padding: 10px;">₹${item.qty * item.price}</td>
                        </tr>
                    `).join('')}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" style="text-align: right; padding: 20px 10px; font-weight: bold;">Grand Total</td>
                        <td style="text-align: right; padding: 20px 10px; font-weight: bold; font-size: 1.2rem;">₹${total}</td>
                    </tr>
                </tfoot>
            </table>

            <div style="text-align: center; font-size: 0.8rem; color: #666; margin-top: 60px;">
                <p>Thank you for choosing Paradise Publication. This is a computer generated invoice.</p>
            </div>
        `;

        document.getElementById('print-content').innerHTML = printHtml;
        document.getElementById('print-modal').classList.add('active');
    });

    // Save Order
    document.getElementById('btn-submit').addEventListener('click', () => {
        const form = document.getElementById('order-form');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const buyerDetails = Object.fromEntries(formData.entries());
        const { items } = updateSummary();

        if (items.length === 0) return alert('Cart is empty');

        // Save order to store (synced with admin)
        const newOrder = store.saveOrder(buyerDetails);

        alert(`Order ${newOrder.id} placed successfully! Redirecting to dashboard...`);

        // Clear Cart is handled by saveOrder, now redirect
        window.location.hash = '#/dashboard';
    });
}
