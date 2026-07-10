self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('yeny-gorden-v1').then((cache) => {
      return cache.addAll(['index.html', 'invoice.html', 'manifest.json']);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
