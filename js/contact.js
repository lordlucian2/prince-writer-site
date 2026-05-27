// Get URL parameters (from Script Vault request)
const urlParams = new URLSearchParams(window.location.search);
const scriptTitle = urlParams.get('script');
const subjectParam = urlParams.get('subject');

// Pre-fill subject field if coming from script request
if (subjectParam) {
    const subjectField = document.getElementById('subject');
    if (subjectField) {
        subjectField.value = decodeURIComponent(subjectParam);
    }
} else if (scriptTitle) {
    const subjectField = document.getElementById('subject');
    if (subjectField) {
        subjectField.value = `Script Request: ${decodeURIComponent(scriptTitle)} (Full Script)`;
    }
}

// Pre-fill inquiry type dropdown if script related
if (scriptTitle || (subjectParam && subjectParam.toLowerCase().includes('script'))) {
    const inquirySelect = document.getElementById('inquiryType');
    if (inquirySelect) {
        inquirySelect.value = 'script_option';
    }
}

// WhatsApp pre-filled message
const whatsappNumber = '231777123456'; // REPLACE WITH ACTUAL LIBERIAN NUMBER (without +)
function getWhatsAppMessage() {
    const name = document.getElementById('name')?.value || 'there';
    const inquiry = document.getElementById('inquiryType')?.options[document.getElementById('inquiryType')?.selectedIndex]?.text || 'inquiry';
    return `Hello Prince, I'm ${name}. I'm interested in: ${inquiry}. I found you via your website.`;
}

// Update WhatsApp link dynamically (or use static fallback)
const whatsappLink = document.getElementById('whatsappLink');
if (whatsappLink) {
    // Static default message
    const defaultMsg = "Hello Prince, I'm interested in your work (books/scripts).";
    whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMsg)}`;
    
    // Optional: if you want to capture form fields before opening, add event listener
    whatsappLink.addEventListener('click', function(e) {
        // If user has filled name/inquiry, use that
        const nameField = document.getElementById('name');
        const inquiryField = document.getElementById('inquiryType');
        if (nameField && nameField.value && inquiryField && inquiryField.value) {
            const inquiryText = inquiryField.options[inquiryField.selectedIndex]?.text || 'inquiry';
            const msg = `Hello Prince, I'm ${nameField.value}. I'm interested in: ${inquiryText}. I found you via your website.`;
            this.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
        }
    });
}

// Form submission: for now, just alert and redirect (no backend yet)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // In production: send to email via Formspree, Netlify Forms, or custom backend
        const formData = new FormData(contactForm);
        let message = "Message sent! (Demo mode)\n\n";
        for (let [key, value] of formData.entries()) {
            message += `${key}: ${value}\n`;
        }
        alert(message + "\n\nIn production, this would email Prince. For now, please use WhatsApp.");
        contactForm.reset();
    });
}
