const CACHE_NAME = "myapp-cache-v0205";
const urlsToCache = [
    "./",
    "./index.html",
    "./style0200.css",
    "./app.js",
    "./manifest.json"
];

self.addEventListener("install", e => {
    self.skipWaiting(); // 即時反映
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => response || fetch(e.request))
    );
});

// 有効化（古いキャッシュ削除）
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// 🔥 手動更新トリガー
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});