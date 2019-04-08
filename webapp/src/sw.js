import { getStoredState } from 'redux-persist';
import firebase from 'firebase';

import { selectUserUid } from './modules/userAuth';
import { selectUserGame } from './modules/game';
import { persistConfig } from './modules/store';
import { GAME_COLLECTION } from './modules/game/game.constants';

const RUNTIME = 'runtime';

// Activate worker immediately
self.addEventListener('install', (event) => event.waitUntil(self.skipWaiting()));

// Become available to all pages
self.addEventListener('activate', event => {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  });

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
          } else {
            return resp;
          };
        });
    });
  event.respondWith(response);
});

self.addEventListener('sync', () => {
  getStoredState(persistConfig).then((state) => {
    const userUid = selectUserUid(state);
    const data = selectUserGame(state);

    firebase
      .database()
      .ref(GAME_COLLECTION)
      .child(userUid)
      .set(data.toJS());
  });
});
