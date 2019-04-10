import { takeLatest, put, all, take, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import firebase from 'firebase';

import reportError from '../../shared/utils/reportError';
import { UserAuthTypes, UserAuthActions } from './userAuth.redux';
import { selectOnlineStatus, StartupTypes } from '../startup';



function* signInViaGoogle() {
  try {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const { user: { uid, isAnonymous } } = yield firebase.auth().signInWithPopup(googleProvider);

    yield put(UserAuthActions.setUserData(uid, isAnonymous));
  } catch (error) {
    yield reportError(error);
  }
}

function* signOutFromFirebase() {
  try {
    yield put(UserAuthActions.clearUserData());
    yield firebase.auth().signOut();
  } catch (error) {
    /* istanbul ignore next */
    yield reportError(error);
  }
}

const listenForAuth = () => eventChannel((emitter) => {
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    setTimeout(() => {
      if (user) {
        emitter({ user, authenticated: true });
      } else {
        emitter({ authenticated: false });
      }
    });
  });

  return () => unsubscribe();
});


function* listenForFirebaseAuth() {
  try {
    const isOnline = yield select(selectOnlineStatus);

    if (isOnline) {
      const listenForAuthChan = yield listenForAuth();

      while (true) { // eslint-disable-line
        const { authenticated, user } = yield take(listenForAuthChan);

        if (authenticated) {
          const { uid, isAnonymous } = user;
          yield put(UserAuthActions.setUserData(uid, isAnonymous));
        }
      }
    }
  } catch (error) {
    /* istanbul ignore next */
    yield reportError(error);
  }
}

function* setUserData({ uid }) {
  try {
    yield firebase.messaging.requestPermission();
    console.log(uid);
  } catch (error) {
    /* istanbul ignore next */
    yield reportError(error);
  }
}

export function* watchUserAuth() {
  try {
    yield all([
      takeLatest(StartupTypes.STARTUP, listenForFirebaseAuth),
      takeLatest(StartupTypes.SET_ONLINE_STATUS, listenForFirebaseAuth),
      takeLatest(UserAuthTypes.SIGN_IN_VIA_GOOGLE, signInViaGoogle),
      takeLatest(UserAuthTypes.SIGN_OUT, signOutFromFirebase),
      takeLatest(UserAuthTypes.SET_USER_DATA, setUserData),
    ]);
  } catch (error) {
    /* istanbul ignore next */
    yield reportError(error);
  }
}
