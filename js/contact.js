// Get URL parameters (from Script Vault request)
const urlParams = new URLSearchParams(window.location.search);
const scriptTitle = urlParams.get('script');
const subjectParam = urlParams.get('subject');

if (subjectParam) {
    const subjectField = document.getElementById('subject');
    if (subjectField) subjectField.value = decodeURIComponent(subjectParam);
} else if (scriptTitle) {
    const subjectField = document.getElementById('subject');
    if (subjectField) subjectField.value = `Script Request: ${decodeURIComponent(scriptTitle)} (Full Script)`;
}

if (scriptTitle || (subjectParam && subjectParam.toLowerCase().includes('script'))) {
    const inquirySelect = document.getElementById('inquiryType');
    if (inquirySelect) inquirySelect.value = 'script_option';
}

// WhatsApp pre-filled message
const whatsappNumber = '231771620083';
const defaultMsg = "Hello Prince, I'm interested in your work (books/scripts).";
const whatsappLink = document.getElementById('whatsappLink');
if (whatsappLink) {
    whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMsg)}`;
    whatsappLink.addEventListener('click', function(e) {
        const nameField = document.getElementById('name');
        const inquiryField = document.getElementById('inquiryType');
        if (nameField && nameField.value && inquiryField && inquiryField.value) {
            const inquiryText = inquiryField.options[inquiryField.selectedIndex]?.text || 'inquiry';
            const msg = `Hello Prince, I'm ${nameField.value}. I'm interested in: ${inquiryText}. I found you via your website.`;
            this.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
        }
    });
}
