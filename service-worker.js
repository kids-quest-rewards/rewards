const CACHE_NAME = 'kids-quest-offline-v1';

const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  '/splash-1920x1080.png',
  '/splash-512.png',
  '/splash-1024.png',
  '/maskable-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).catch(() => {
        return caches.match('/offline.html');
      });
    })
  );
});
