import { takeLatest, all, put } from 'redux-saga/effects';
import firebase from 'firebase/app';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import { StartupTypes } from '../startup';
import { PwaActions } from '../pwa';
import reportError from '../../shared/utils/reportError';


function* callOtherActions() {
  try {
    yield put(PwaActions.startListeningForPwaEvent());
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

function registerServiceWorker() {
  runtime.register();
}

function initializeFirebaseApp() {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  });
}

export function* watchStartup() {
  yield all([
    takeLatest(StartupTypes.STARTUP, initializeFirebaseApp),
    takeLatest(StartupTypes.STARTUP, registerServiceWorker),
    takeLatest(StartupTypes.STARTUP, callOtherActions),
  ]);
}
