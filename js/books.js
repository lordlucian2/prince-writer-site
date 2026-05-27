// Dual-mode switcher for Bookshelf page
const modeBooks = document.getElementById('modeBooks');
const modeFilms = document.getElementById('modeFilms');
const bookGrid = document.getElementById('bookGrid');

if (modeBooks && modeFilms) {
    modeBooks.addEventListener('click', () => {
        modeBooks.classList.add('active');
        modeFilms.classList.remove('active');
        // In future: switch to book view (already default)
        bookGrid.style.display = 'grid';
    });

    modeFilms.addEventListener('click', () => {
        modeFilms.classList.add('active');
        modeBooks.classList.remove('active');
        // For now, alert that film adaptation info is coming
        alert("Film adaptations of these books coming soon. Check Script Vault for original screenplays.");
        bookGrid.style.display = 'grid'; // keep showing books for now
    });
}

// Mobile money buttons: placeholders for now
document.querySelectorAll('.btn-momo').forEach(btn => {
    btn.addEventListener('click', function() {
        const bookTitle = this.getAttribute('data-book');
        alert(`Mobile Money payment for "${bookTitle}":\n\nSend amount to Orange/Lonestar number [INSERT NUMBER].\nReference: BOOK-${bookTitle.replace(/\s/g,'')}\nYou will receive PDF by WhatsApp/email.`);
    });
});
