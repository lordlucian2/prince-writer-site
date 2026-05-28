// Load books from localStorage (admin CMS) or use defaults
function loadBooks() {
    let books = JSON.parse(localStorage.getItem('booksData') || '[]');
    if (books.length === 0) {
        // Default fallback
        books = [
            { title: "The Palm Wine Thief", genre: "Literary Fiction", priceLocal: "5,000 LRD", priceIntl: "$25 USD", synopsis: "A boy who finds lost things uncovers a conspiracy beneath Monrovia's palm wine bars.", coverUrl: "" },
            { title: "Spirit of October", genre: "Magical Realism", priceLocal: "4,500 LRD", priceIntl: "$22 USD", synopsis: "During election season, a boy sees ghosts of future leaders.", coverUrl: "" },
            { title: "Clay Hands", genre: "Short Stories", priceLocal: "6,000 LRD", priceIntl: "$30 USD", synopsis: "Ten stories of craft, survival, and clay pottery in post-war Liberia.", coverUrl: "" }
        ];
    }
    return books;
}

function renderBookGrid() {
    const books = loadBooks();
    const grid = document.getElementById('bookGrid');
    if (!grid) return;
    grid.innerHTML = '';
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <img src="${book.coverUrl || '../images/book-placeholder-1.jpg'}" alt="${book.title} cover" onerror="this.src='https://placehold.co/300x400?text=${encodeURIComponent(book.title)}'">
            <h3>${escapeHtml(book.title)}</h3>
            <p class="genre">${escapeHtml(book.genre)}</p>
            <p class="synopsis">${escapeHtml(book.synopsis)}</p>
            <div class="price-row">
                <span class="price-local">${escapeHtml(book.priceLocal)}</span>
                <span class="price-intl">${escapeHtml(book.priceIntl)}</span>
            </div>
            <div class="buy-options">
                <button class="btn-momo" data-book="${escapeHtml(book.title)}">📱 Buy with Mobile Money</button>
                <a href="#" class="btn-intl">Amazon/Kindle</a>
            </div>
            <a href="${book.title.toLowerCase().replace(/ /g, '-')}.html" class="btn-details">Details →</a>
        `;
        grid.appendChild(card);
    });
    // Re-attach mobile money listeners
    document.querySelectorAll('.btn-momo').forEach(btn => {
        btn.addEventListener('click', function() {
            if (typeof showOrderModal === 'function') showOrderModal(this.getAttribute('data-book'));
            else alert("Order system loading...");
        });
    });
}

function escapeHtml(str) { if(!str) return ''; return str.replace(/[&<>]/g, function(m){if(m==='&') return '&amp;'; if(m==='<') return '&lt;'; if(m==='>') return '&gt;'; return m;}); }

// Dual-mode switcher (keep existing)
const modeBooks = document.getElementById('modeBooks');
const modeFilms = document.getElementById('modeFilms');
if (modeBooks && modeFilms) {
    modeBooks.addEventListener('click', () => {
        modeBooks.classList.add('active');
        modeFilms.classList.remove('active');
        document.getElementById('bookGrid').style.display = 'grid';
    });
    modeFilms.addEventListener('click', () => {
        modeFilms.classList.add('active');
        modeBooks.classList.remove('active');
        alert("Film adaptations of these books coming soon. Check Script Vault for original screenplays.");
        document.getElementById('bookGrid').style.display = 'grid';
    });
}

// Initial render
renderBookGrid();
