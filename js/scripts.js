// Create dummy PDF blobs for "First 5 Pages" preview
// In production, replace with actual PDF files in /pdfs/ folder

function createDummyPDF(scriptTitle) {
    // This creates a simple text blob as a placeholder PDF
    const content = `FIRST 5 PAGES OF: ${scriptTitle}\n\n[This is a placeholder. Replace with actual PDF of first 5 pages.]\n\nFADE IN:\nINT. MONROVIA KITCHEN - DAY\n\nA woman peels plantains. The radio crackles with election results.\n\n... (first 5 pages content would go here) ...`;
    const blob = new Blob([content], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
}

// Handle "First 5 Pages" buttons
document.querySelectorAll('.btn-preview').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const scriptTitle = this.getAttribute('data-script');
        const pdfUrl = createDummyPDF(scriptTitle);
        window.open(pdfUrl, '_blank');
        // In production: window.open(`/pdfs/${scriptTitle.replace(/\s/g,'_')}_first5.pdf`, '_blank');
    });
});

// Handle "Request Full Script" buttons
document.querySelectorAll('.btn-request').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const scriptTitle = this.getAttribute('data-script');
        // Redirect to contact form with pre-filled subject
        const subject = encodeURIComponent(`Script Request: ${scriptTitle} (Full Script)`);
        window.location.href = `../contact/?subject=${subject}&script=${encodeURIComponent(scriptTitle)}`;
    });
});
