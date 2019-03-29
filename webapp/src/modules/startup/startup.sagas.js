import { takeLatest, all, put } from 'redux-saga/effects';
import firebase from 'firebase/app';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import { StartupTypes, StartupActions } from '../startup';
import { PwaActions } from '../pwa';
import reportError from '../../shared/utils/reportError';


function* registerServiceWorker() {
  try {
    runtime.register();
  } catch (error) {
    yield reportError(error);
  }
}

function* initializeFirebaseApp() {
  try {
    firebase.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    });
  } catch (error) {
    yield reportError(error);
  }
}

function* startup() {
  try {
    yield put(PwaActions.startListeningForPwaEvent());
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
    takeLatest(StartupTypes.REGISTER_SERVICE_WORKER, registerServiceWorker),
  ]);
}
