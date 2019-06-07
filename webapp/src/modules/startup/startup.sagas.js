import { takeLatest, all, put, select, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import firebase from 'firebase/app';
import 'firebase/messaging';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import { StartupTypes, StartupActions, selectOnlineStatus } from '../startup';
import reportError from '../../shared/utils/reportError';


function* registerServiceWorker() {
  runtime.register();
}

function* initializeFirebaseApp() {
  try {
    const isOnline = yield select(selectOnlineStatus);

    if (isOnline && !firebase.apps.length) {
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

const listenForOnlineSyncChannel = () => eventChannel((emitter) => {
  const emitStatus = () => emitter(navigator.onLine);

  window.addEventListener('online', emitStatus);
  window.addEventListener('offline', emitStatus);

  return () => {
    window.removeEventListener('online', emitStatus);
    window.removeEventListener('navigator.onLine', emitStatus);
  };
});

function* listenForOnlineSync() {
  try {
    const listenForOnlineSyncChan = yield listenForOnlineSyncChannel();

    while (true) { // eslint-disable-line
      const isOnline = yield take(listenForOnlineSyncChan);

      yield put(StartupActions.setOnlineStatus(isOnline));
    }
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

function* startup() {
  try {
    if (navigator) {
      yield put(StartupActions.setOnlineStatus(navigator.onLine));
    }
    yield put(StartupActions.listenForOnlineSync());
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
    takeLatest(StartupTypes.LISTEN_FOR_ONLINE_SYNC, listenForOnlineSync),
  ]);
}
