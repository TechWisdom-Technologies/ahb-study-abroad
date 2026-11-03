// This app does not use a service worker.
// A browser may still request /sw.js if a worker from another app was previously
// registered on this origin (e.g. localhost:3000). This file replaces it with a
// no-op that unregisters itself and clears any stale caches.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: "window" });
      clients.forEach((client) => client.navigate(client.url));
    })()
  );
});

