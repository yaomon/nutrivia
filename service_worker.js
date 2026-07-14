const CACHE = "nutrivia-rogue-v2";

self.addEventListener("install", (e) => {
    self.skipWaiting();
    e.waitUntil(
        caches
            .open(CACHE)
            .then((cache) => cache.addAll(["./", "./images/logo192.png"]))
    );
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(
                    keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
                )
            )
            .then(() => self.clients.claim())
    );
});

// Network first, cache fallback — always fresh while online, still works offline.
// cache: "no-cache" forces revalidation so the HTTP cache can't serve stale files.
self.addEventListener("fetch", (e) => {
    if (e.request.method !== "GET") return;
    e.respondWith(
        fetch(e.request, { cache: "no-cache" })
            .then((response) => {
                const copy = response.clone();
                caches.open(CACHE).then((cache) => cache.put(e.request, copy));
                return response;
            })
            .catch(() => caches.match(e.request))
    );
});
