/* TrendPulse Service Worker
   - Torna o site instalável como app (PWA)
   - Base para push notifications (Firebase Cloud Messaging depois)
*/
const CACHE = "trendpulse-v1";
const ASSETS = ["./index.html", "./manifest.json"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

/* Quando integrar o Firebase Cloud Messaging, o push chega aqui: */
self.addEventListener("push", (e) => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || "TrendPulse 🔥", {
      body: data.body || "Nova oportunidade detectada. Veja como monetizar.",
      icon: "icon-192.png",
    })
  );
});
