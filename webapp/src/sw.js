// Activate worker immediately
self.addEventListener('install', (event) => event.waitUntil(self.skipWaiting()));

// Become available to all pages
self.addEventListener('activate', (event) => {
  console.log('sw activated');
  event.waitUntil(self.clients.claim());
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
          if (request.url.endsWith('.png') || request.url.endsWith('.jpg')) {
            return caches.open('v1').then(cache => {
              cache.put(request, resp.clone());
              return resp;
            });
          }

          return resp;
        });
    });
  event.respondWith(response);
});
