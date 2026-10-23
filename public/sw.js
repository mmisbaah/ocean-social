/* Offline support: cache the app shell and pictures, then serve from cache when offline. */
const CACHE = "oceansocial-v1";
const SHELL = ["/", "/manifest.webmanifest", "/browser-icon-v2.png", "/assets/beach.webp", "/assets/dolphin.webp", "/assets/icon-192.png", "/assets/avatars/avatar-01.webp", "/assets/avatars/avatar-02.webp", "/assets/avatars/avatar-03.webp", "/assets/avatars/avatar-04.webp", "/assets/avatars/avatar-05.webp", "/assets/avatars/avatar-06.webp", "/assets/avatars/avatar-07.webp", "/assets/avatars/avatar-08.webp", "/assets/avatars/avatar-09.webp", "/assets/avatars/avatar-10.webp", "/assets/avatars/avatar-11.webp", "/assets/avatars/avatar-12.webp", "/assets/avatars/avatar-13.webp", "/assets/avatars/avatar-14.webp", "/assets/avatars/avatar-15.webp", "/assets/avatars/avatar-16.webp", "/assets/avatars/avatar-17.webp", "/assets/avatars/avatar-18.webp"];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(request).then(response => {
    if (response.ok) { const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(request, copy)); }
    return response;
  }).catch(() => caches.match(request).then(hit => hit || caches.match("/"))));
});
