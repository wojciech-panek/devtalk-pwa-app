const RUNTIME = 'runtime';

// Activate worker immediately
self.addEventListener('install', (event) => event.waitUntil(self.skipWaiting()));

// Become available to all pages
self.addEventListener('activate', event => {
  const currentCaches = [RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );

  console.log('Service Worker activated');
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  const response = caches
    .match(request)
    .then((response) => {
      if (response) {
        return response;
      }

      return fetch(request)
        .then(resp => {
          if (event.request.url.startsWith(self.location.origin)) {
            return caches.open(RUNTIME).then(cache => {
              cache.put(request, resp.clone());
              return resp;
            });
          } else { return resp; };
        });
    });
  event.respondWith(response);
});
