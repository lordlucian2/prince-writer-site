// Dual newsletter signup modals
function showNewsletterModal(type) {
    let modal = document.getElementById('newsletterModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'newsletterModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3 id="modalTitle">Sign Up for Updates</h3>
                <form id="newsletterForm">
                    <input type="hidden" name="subscriber_type" id="subscriberType" value="">
                    <label>Full name *</label>
                    <input type="text" id="subName" required data-fs-field>
                    <label>Email address *</label>
                    <input type="email" id="subEmail" required data-fs-field>
                    <span data-fs-error="email"></span>
                    <label>Phone (optional, for WhatsApp updates)</label>
                    <input type="tel" id="subPhone">
                    <button type="submit" class="btn-submit-order">Subscribe →</button>
                </form>
                <div id="newsletterSuccess" style="display:none; margin-top:1rem; padding:1rem; background:#e8f5e9; border-radius:8px;"></div>
            </div>
        `;
        document.body.appendChild(modal);
        document.querySelector('.close-modal').addEventListener('click', () => modal.style.display = 'none');
        window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
    }
    
    const title = type === 'readers' ? '📚 For Readers' : '🎬 For Producers';
    const typeValue = type === 'readers' ? 'reader' : 'producer';
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('subscriberType').value = typeValue;
    modal.style.display = 'block';
    
    const form = document.getElementById('newsletterForm');
    form.onsubmit = async function(e) {
        e.preventDefault();
        const name = document.getElementById('subName').value;
        const email = document.getElementById('subEmail').value;
        const phone = document.getElementById('subPhone').value;
        const subType = document.getElementById('subscriberType').value;
        
        const formData = {
            name: name,
            email: email,
            phone: phone,
            subscriber_type: subType,
            _subject: `Newsletter Signup: ${subType} - ${name}`
        };
        
        try {
            const response = await fetch('https://formspree.io/f/xojbyazd', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const successDiv = document.getElementById('newsletterSuccess');
                successDiv.innerHTML = `<strong>✅ Thanks, ${name}!</strong> Check your email to confirm (if you set up double opt-in). You'll hear from me soon.`;
                successDiv.style.display = 'block';
                form.reset();
                setTimeout(() => modal.style.display = 'none', 3000);
            } else {
                alert('Error. Please try again or use WhatsApp.');
            }
        } catch (err) {
            alert('Network error. Please try again.');
        }
    };
}
