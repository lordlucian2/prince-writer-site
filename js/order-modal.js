// Order modal for mobile money purchases
function showOrderModal(bookTitle) {
    let modal = document.getElementById('orderModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'orderModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Complete Your Order</h3>
                <p><strong>Book:</strong> <span id="modalBookTitle"></span></p>
                <form id="orderForm">
                    <label>Full name *</label>
                    <input type="text" id="buyerName" required>
                    <label>Phone number (Orange/Lonestar) *</label>
                    <input type="tel" id="buyerPhone" required placeholder="e.g., 0771234567">
                    <label>Email (to receive PDF)</label>
                    <input type="email" id="buyerEmail">
                    <label>Preferred payment method</label>
                    <select id="paymentMethod">
                        <option value="orange">Orange Money</option>
                        <option value="lonestar">Lonestar MTN</option>
                    </select>
                    <button type="submit" class="btn-submit-order">Submit Order →</button>
                </form>
                <div id="orderInstructions" style="display:none; margin-top:1rem; padding:1rem; background:#e8f5e9; border-radius:8px;"></div>
            </div>
        `;
        document.body.appendChild(modal);
        document.querySelector('.close-modal').addEventListener('click', () => modal.style.display = 'none');
        window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
    }
    document.getElementById('modalBookTitle').innerText = bookTitle;
    modal.style.display = 'block';

    const orderForm = document.getElementById('orderForm');
    orderForm.onsubmit = async function(e) {
        e.preventDefault();
        const buyerName = document.getElementById('buyerName').value;
        const buyerPhone = document.getElementById('buyerPhone').value;
        const buyerEmail = document.getElementById('buyerEmail').value;
        const paymentMethod = document.getElementById('paymentMethod').value;

        const formData = {
            book: bookTitle,
            name: buyerName,
            phone: buyerPhone,
            email: buyerEmail,
            payment_method: paymentMethod,
            _subject: `New Book Order: ${bookTitle} from ${buyerName}`
        };

        try {
            const response = await fetch('https://formspree.io/f/xojbyazd', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                showInstructions(bookTitle, paymentMethod, buyerPhone, buyerName, buyerEmail);
                orderForm.reset();
            } else {
                alert('Error submitting order. Please use WhatsApp for now.');
            }
        } catch (err) {
            alert('Network error. Please contact via WhatsApp.');
        }
    };
}

function showInstructions(bookTitle, paymentMethod, buyerPhone, buyerName, buyerEmail) {
    const instructionsDiv = document.getElementById('orderInstructions');
    const momoNumber = paymentMethod === 'orange' ? '0771620083' : '0881285925';
    const provider = paymentMethod === 'orange' ? 'Orange Money' : 'Lonestar MTN';
    let price = '5,000 LRD';
    if (bookTitle === 'Clay Hands') price = '6,000 LRD';
    else if (bookTitle === 'Spirit of October') price = '4,500 LRD';
    instructionsDiv.innerHTML = `
        <strong>✅ Order received!</strong><br><br>
        Please send <strong>${price}</strong> to:<br>
        <strong>${provider}: ${momoNumber}</strong><br>
        Reference: <strong>BOOK-${bookTitle.replace(/\s/g,'')}</strong><br><br>
        After payment, send screenshot to <a href="https://wa.me/231771620083" target="_blank">WhatsApp</a> or email ${buyerEmail}.<br>
        You will receive the PDF within 24 hours.
    `;
    instructionsDiv.style.display = 'block';
    document.getElementById('orderForm').style.display = 'none';

    const order = { book: bookTitle, name: buyerName, phone: buyerPhone, email: buyerEmail, timestamp: new Date().toISOString() };
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}
