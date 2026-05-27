// First 5 Pages preview – link to actual PDF files
function getPreviewUrl(scriptTitle) {
    // Map script title to filename (space to underscore)
    const mapping = {
        'Reels of Dust': 'Reels_of_Dust_first5.pdf.html',
        'Clay Hands (Short)': 'Clay_Hands_Short_first5.pdf.html',
        'The Last Palm Tree': 'The_Last_Palm_Tree_first5.pdf.html',
        'Monrovia South': 'Monrovia_South_first5.pdf.html',
        'Spirit of October Adaptation': 'Spirit_of_October_Adaptation_first5.pdf.html'
    };
    const filename = mapping[scriptTitle];
    if (filename) {
        return `../pdfs/${filename}`;
    } else {
        return null;
    }
}

// Handle "First 5 Pages" buttons
document.querySelectorAll('.btn-preview').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const scriptTitle = this.getAttribute('data-script');
        const url = getPreviewUrl(scriptTitle);
        if (url) {
            window.open(url, '_blank');
        } else {
            alert('Preview not yet available. Please request full script.');
        }
    });
});

// Handle "Request Full Script" buttons
document.querySelectorAll('.btn-request').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const scriptTitle = this.getAttribute('data-script');
        const subject = encodeURIComponent(`Script Request: ${scriptTitle} (Full Script)`);
        window.location.href = `../contact/?subject=${subject}&script=${encodeURIComponent(scriptTitle)}`;
    });
});
