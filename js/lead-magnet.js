// Lead magnet modals
function showLeadMagnet(type) {
    let modal = document.getElementById('leadMagnetModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'leadMagnetModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3 id="leadTitle">Get Your Free Download</h3>
                <form id="leadForm">
                    <label>Full name *</label>
                    <input type="text" id="leadName" required>
                    <label>Email address *</label>
                    <input type="email" id="leadEmail" required>
                    <label>Phone (optional)</label>
                    <input type="tel" id="leadPhone">
                    <input type="hidden" id="leadType" value="">
                    <button type="submit" class="btn-submit-order">Send →</button>
                </form>
                <div id="leadSuccess" style="display:none; margin-top:1rem; padding:1rem; background:#e8f5e9; border-radius:8px;"></div>
            </div>
        `;
        document.body.appendChild(modal);
        document.querySelector('.close-modal').addEventListener('click', () => modal.style.display = 'none');
        window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
    }
    
    const title = type === 'readers' ? '📖 Get First Chapter: The Palm Wine Thief' : '🎬 Get Free Short Script: Clay Hands';
    document.getElementById('leadTitle').innerText = title;
    document.getElementById('leadType').value = type;
    modal.style.display = 'block';
    
    const form = document.getElementById('leadForm');
    form.onsubmit = async function(e) {
        e.preventDefault();
        const name = document.getElementById('leadName').value;
        const email = document.getElementById('leadEmail').value;
        const phone = document.getElementById('leadPhone').value;
        const leadType = document.getElementById('leadType').value;
        
        const formData = {
            name: name,
            email: email,
            phone: phone,
            lead_type: leadType,
            _subject: `Lead Magnet: ${leadType} - ${name}`
        };
        
        try {
            const response = await fetch('https://formspree.io/f/xojbyazd', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const downloadLink = leadType === 'readers' 
                    ? 'https://prince-writer.vercel.app/pdfs/first-chapter-palm-wine-thief.pdf' 
                    : 'https://prince-writer.vercel.app/pdfs/clay-hands-short-script.pdf';
                const successDiv = document.getElementById('leadSuccess');
                successDiv.innerHTML = `<strong>✅ Thanks, ${name}!</strong> <a href="${downloadLink}" target="_blank">Click here to download your free gift</a>. You'll also receive occasional updates (unsubscribe anytime).`;
                successDiv.style.display = 'block';
                form.reset();
                setTimeout(() => modal.style.display = 'none', 5000);
            } else {
                alert('Error. Please try again or use WhatsApp.');
            }
        } catch (err) {
            alert('Network error. Please try again.');
        }
    };
}
