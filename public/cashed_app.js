//Installation Event
const CACHED = "v2";

self.addEventListener("install", (e) => {
  console.log("Service Installed");
});

//Event Activation
self.addEventListener("activate", (e) => {
  console.log("Service Activated");
  //Removing Unwanted Caches

  e.waitUntil(
    caches.keys.then((CACHED) => {
      return Promise.all(
        CACHED.map((cache) => {
          if (cache !== CACHED) {
            console.log("Clearing old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

//Fetching Events

self.addEventListener("fetch", (e) => {
  console.log("Servicer worker: Fetching");
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        //Cloning response

        const CLONERESPONSE = res.clone();
        //Opening Cache
        caches.open(CACHED).then((cache) => {
          //Adding response to cache
          cache.put(e.request, CLONERESPONSE);
        });
        return res;
      })
      .catch((err) => caches.match(e.request).then((res) => res))
  );
});
