const CACHE_NAME = 'prince-site-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/books/index.html',
    '/scripts/index.html',
    '/about/index.html',
    '/contact/index.html',
    '/hire/index.html',
    '/adaptations/index.html',
    '/css/style.css',
    '/css/books.css',
    '/css/scripts.css',
    '/css/contact.css',
    '/css/about.css',
    '/css/hire.css',
    '/css/adaptations.css',
    '/js/main.js',
    '/js/books.js',
    '/js/scripts.js',
    '/js/contact.js',
    '/js/order-modal.js',
    '/js/newsletter.js',
    '/js/lowdata.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            })
        ))
    );
});
