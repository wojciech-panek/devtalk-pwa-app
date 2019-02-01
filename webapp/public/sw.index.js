// Activate worker immediately
self.addEventListener('install', (event) => event.waitUntil(self.skipWaiting()));

// Become available to all pages
self.addEventListener('activate', (event) => {
  console.log('sw activated');
  event.waitUntil(self.clients.claim());
});
