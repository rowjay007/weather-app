const CACHED = "v1";
const ASSETS = ["/index.html", "/css/style.css", "/js/script.js"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHED).then((cache) => {
      return cache.addAll([]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  console.log(e.request.url);

  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
