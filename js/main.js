// Placeholder for future features: dual-mode switcher, low-data mode, etc.
console.log("Prince Writer site loaded. Ready for books and scripts.");

// Register service worker for offline access
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('Service Worker registered', reg))
        .catch(err => console.log('SW registration failed', err));
}
