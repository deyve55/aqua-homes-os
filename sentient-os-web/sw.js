const CACHE_NAME = "aqua-sentient-os-v0.2.0";
const APP_FILES = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/ui-header.png",
  "./assets/ui-hero.png",
  "./assets/ui-deck.png",
  "./assets/ui-alerts.png",
  "./assets/ui-nav.png",
  "./assets/card-overview-front-v11.png",
  "./assets/card-site-intelligence-front-v11.png",
  "./assets/card-financial-command-front-v11.png",
  "./assets/card-operations-front-v11.png",
  "./assets/card-risk-monitor-front-v11.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request)),
  );
});
