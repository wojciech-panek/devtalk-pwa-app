import { takeLatest, all, put, select } from 'redux-saga/effects';
import firebase from 'firebase/app';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import { StartupTypes, StartupActions, selectOnlineStatus } from '../startup';
import reportError from '../../shared/utils/reportError';


function* registerServiceWorker() {
  runtime.register();
}

function* initializeFirebaseApp() {
  try {
    const isOnline = yield select(selectOnlineStatus);

    if (isOnline) {
      firebase.initializeApp({
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      });
    }
  } catch (error) {
    yield reportError(error);
  }
}

const isReachable = (url) => {
  /**
   * Note: fetch() still "succeeds" for 404s on subdirectories,
   * which is ok when only testing for domain reachability.
   *
   * Example:
   *   https://google.com/noexist does not throw
   *   https://noexist.com/noexist does throw
   */
  return fetch(url, { method: 'HEAD', mode: 'no-cors' })
    .then((response) => {
      return response && (response.ok || response.type === 'opaque');
    })
    .catch(() => {
      return false;
    });
};

function* handleConnection() {
  if (navigator.onLine) {
    const isOnline = yield isReachable('https://apptension.com/');
    yield put(StartupActions.setOnlineStatus(isOnline));
  } else {
    yield put(StartupActions.setOnlineStatus(false));
  }
}

function* startup() {
  try {
    window.addEventListener('online', handleConnection);
    window.addEventListener('offline', handleConnection);

    yield put(StartupActions.initializeFirebaseApp());
    yield put(StartupActions.registerServiceWorker());
  } catch (error) {
    yield reportError(error);
  }
}

export function* watchStartup() {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(StartupTypes.INITIALIZE_FIREBASE_APP, initializeFirebaseApp),
    takeLatest(StartupTypes.SET_ONLINE_STATUS, initializeFirebaseApp),
    takeLatest(StartupTypes.REGISTER_SERVICE_WORKER, registerServiceWorker),
  ]);
}
