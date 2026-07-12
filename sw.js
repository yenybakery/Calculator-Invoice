const CACHE_NAME = 'yeny-gorden-v1';

// PERBAIKAN: Menambahkan titik (./) dan jalur akar ('/') agar kompatibel dengan sub-folder GitHub Pages
const assets = [
  './',
  './index.html',
  './invoice.html',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Menggunakan cache.addAll yang sudah diperbaiki jalurnya
      return cache.addAll(assets);
    }).then(() => self.skipWaiting()) // Memaksa SW baru langsung aktif tanpa menunggu
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim()) // Langsung ambil kendali halaman saat aktif
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request).catch(() => {
        // Antisipasi jika offline dan aset tidak ada di cache agar tidak crash
        console.log("Mode offline: Aset tidak ditemukan di cache.");
      });
    })
  );
});
