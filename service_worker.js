const CACHE = "nutrivia-rogue-v4";

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

// Two strategies, because the two kinds of asset want opposite things:
//
//   images/  -> CACHE FIRST. The ~200 food sprites and icons never change
//               content, and the collection screen asks for all of them at
//               once. Serving straight from the cache skips the network
//               entirely; anything missing is fetched and stored in passing.
//
//   everything else -> NETWORK FIRST with revalidation. Scripts and styles
//               aren't content-hashed, so a stale copy means running old
//               code. Revalidating gets a cheap 304 when nothing changed,
//               and the cache is still there as an offline fallback.
//
// NOTE: fetch by URL, not the original request — passing init options along
// with a navigation-mode Request throws, which silently served stale pages.
function isImage(url) {
    return /\/images\//.test(url) || /\.(png|jpe?g|gif|svg|webp)$/i.test(url);
}

self.addEventListener("fetch", (e) => {
    if (e.request.method !== "GET") return;
    if (new URL(e.request.url).origin !== self.location.origin) return;

    if (isImage(e.request.url)) {
        e.respondWith(
            caches.match(e.request).then(
                (hit) =>
                    hit ||
                    fetch(e.request).then((response) => {
                        const copy = response.clone();
                        caches
                            .open(CACHE)
                            .then((cache) => cache.put(e.request, copy));
                        return response;
                    })
            )
        );
        return;
    }

    e.respondWith(
        fetch(e.request.url, { cache: "no-cache" })
            .then((response) => {
                const copy = response.clone();
                caches.open(CACHE).then((cache) => cache.put(e.request, copy));
                return response;
            })
            .catch(() => caches.match(e.request))
    );
});
