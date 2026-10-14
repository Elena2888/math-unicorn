const CACHE_NAME = 'math-unicorn-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './unicorn_base.png',
  './unicorn_cap.png',
  './unicorn_sweater.png',
  './unicorn_pants.png',
  './unicorn_sneakers.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
