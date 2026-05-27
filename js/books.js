// Dual-mode switcher (keep existing)
const modeBooks = document.getElementById('modeBooks');
const modeFilms = document.getElementById('modeFilms');
const bookGrid = document.getElementById('bookGrid');

if (modeBooks && modeFilms) {
    modeBooks.addEventListener('click', () => {
        modeBooks.classList.add('active');
        modeFilms.classList.remove('active');
        bookGrid.style.display = 'grid';
    });
    modeFilms.addEventListener('click', () => {
        modeFilms.classList.add('active');
        modeBooks.classList.remove('active');
        alert("Film adaptations of these books coming soon. Check Script Vault for original screenplays.");
        bookGrid.style.display = 'grid';
    });
}

// Mobile money buttons: open modal
document.querySelectorAll('.btn-momo').forEach(btn => {
    btn.addEventListener('click', function() {
        const bookTitle = this.getAttribute('data-book');
        if (typeof showOrderModal === 'function') {
            showOrderModal(bookTitle);
        } else {
            alert("Order system loading. Please refresh or use WhatsApp.");
        }
    });
});
