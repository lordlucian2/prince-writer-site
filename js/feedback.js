// Feedback widget – floating button + modal form
(function() {
    // Create widget container
    const widget = document.createElement('div');
    widget.id = 'feedbackWidget';
    widget.style.position = 'fixed';
    widget.style.bottom = '20px';
    widget.style.right = '20px';
    widget.style.zIndex = '9999';
    widget.innerHTML = `
        <button id="feedbackBtn" style="background:#b87c4f; color:white; border:none; border-radius:50px; padding:12px 16px; cursor:pointer; font-weight:bold; box-shadow:0 2px 10px rgba(0,0,0,0.2);">
            💬 Feedback
        </button>
        <div id="feedbackModal" style="display:none; position:fixed; bottom:80px; right:20px; width:300px; background:white; border-radius:12px; padding:1rem; box-shadow:0 4px 20px rgba(0,0,0,0.15); z-index:10000;">
            <div style="display:flex; justify-content:space-between; margin-bottom:1rem;">
                <strong>Send Feedback</strong>
                <button id="closeFeedback" style="background:none; border:none; font-size:1.2rem; cursor:pointer;">&times;</button>
            </div>
            <form id="feedbackForm">
                <input type="hidden" name="inquiryType" value="feedback">
                <label style="display:block; margin-bottom:5px;">Name (optional)</label>
                <input type="text" name="name" style="width:100%; padding:0.4rem; margin-bottom:0.75rem; border:1px solid #ccc; border-radius:6px;">
                <label style="display:block; margin-bottom:5px;">Email (if you want a reply)</label>
                <input type="email" name="email" style="width:100%; padding:0.4rem; margin-bottom:0.75rem; border:1px solid #ccc; border-radius:6px;">
                <label style="display:block; margin-bottom:5px;">Feedback / Bug report *</label>
                <textarea name="message" rows="4" required style="width:100%; padding:0.4rem; margin-bottom:0.75rem; border:1px solid #ccc; border-radius:6px;"></textarea>
                <button type="submit" style="background:#2c3e2f; color:white; border:none; padding:8px 12px; border-radius:40px; width:100%; cursor:pointer;">Send Feedback</button>
                <div id="feedbackSuccess" style="display:none; margin-top:10px; color:green; font-size:0.85rem;"></div>
            </form>
        </div>
    `;
    document.body.appendChild(widget);

    const btn = document.getElementById('feedbackBtn');
    const modal = document.getElementById('feedbackModal');
    const closeBtn = document.getElementById('closeFeedback');
    const form = document.getElementById('feedbackForm');
    const successDiv = document.getElementById('feedbackSuccess');

    btn.addEventListener('click', () => {
        modal.style.display = 'block';
    });
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data._subject = `Website Feedback: ${data.message.substring(0,50)}`;
        
        try {
            const response = await fetch('https://formspree.io/f/xojbyazd', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                successDiv.innerHTML = '✅ Thanks for your feedback!';
                successDiv.style.display = 'block';
                form.reset();
                setTimeout(() => {
                    modal.style.display = 'none';
                    successDiv.style.display = 'none';
                }, 2000);
            } else {
                alert('Error sending feedback. Please email directly.');
            }
        } catch (err) {
            alert('Network error. Please try again.');
        }
    });
})();
