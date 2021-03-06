const assets = [
  "/index.html",
  "/offline.html",
  "/offline-dino.png",
  "/manifest-icon-192.maskable.png",
  "/manifest-icon-512.maskable.png",
  "/icon.png",
  "/favicon.ico",
  "https://fonts.googleapis.com/css2?family=Cambay:wght@400;700&display=swap",
];
/* eslint-disable no-restricted-globals */

const cacheVer = "static-v3";

self.addEventListener("install", (event) => {
  console.log("SW: Service worker installingâ€¦");
  // self.skipWaiting();
  event.waitUntil(
    caches
      .open(cacheVer)
      .then((cache) =>
        cache
          .addAll(assets)
          .catch((e) =>
            console.log("SW: Some resoureces could not be fetch on the server!")
          )
      )
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key === cacheVer) {
            // eslint-disable-next-line array-callback-return
            return;
          }
          return caches.delete(key);
        })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      console.log("SW: Intercepted request", e);
      const cacheHit = await caches
        .match(e)
        .catch((error) =>
          console.error("SW: Something went wrong while accessing cache! " + e)
        );

      if (cacheHit) return cacheHit;

      const fetchedData = await fetch(e.request).catch(() =>
        caches.match("offline.html")
      );

      if (!e.request.url.includes("/api/")) {
        const cache = await caches.open(cacheVer);
        console.log("SW: Caching new file: " + e.request.url);
        cache.put(e.request, fetchedData.clone());
      }

      return fetchedData;
    })()
  );
});

self.addEventListener("push", (e) => {
  // e.waitUntil(
  //   self.registration.showNotification(e.data.title, {
  //     body: e.data.,
  //   })
  // );
  if (!self.Notification || !self.Notification.permission === "granted") {
    return;
  }

  // let pushData = { title: "", body: "", expiry: "" };
  // if (e.data) pushData = { ...e.data.json() };
  // else {
  //   console.log("SW: Unexpected notification data! Aborting...");
  //   return;
  // }

  self.registration.showNotification("Expiry Notification", {
    body: e.data.text(),
    icon: "manifest-icon-192.maskable.png",
  });
});
