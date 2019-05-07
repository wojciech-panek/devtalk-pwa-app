import { takeLatest, put, all, take, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import firebase from 'firebase';

import reportError from '../../shared/utils/reportError';
import { UserAuthTypes, UserAuthActions } from './userAuth.redux';
import { selectOnlineStatus, StartupTypes } from '../startup';
import loginFormMessages from '../../routes/home/loginForm/loginForm.messages';
import newGameFormMessages from '../../routes/home/newGameForm/newGameForm.messages';



function* signIn({ email, password, formik }) {
  try {
    const { user: { uid, isAnonymous } } = yield firebase.auth().signInWithEmailAndPassword(email, password);
    yield put(UserAuthActions.setUserData(uid, isAnonymous));
  } catch (error) {
    yield reportError(error);
    formik.setErrors({ email: loginFormMessages.emailInvalidError, password: loginFormMessages.passwordInvalidError });
  } finally {
    formik.setSubmitting(false);
  }
}

function* createUser({ email, password, formik }) {
  try {
    const { user: { uid, isAnonymous } } = yield firebase.auth().createUserWithEmailAndPassword(email, password);
    yield put(UserAuthActions.setUserData(uid, isAnonymous));
  } catch (error) {
    if (error.code && error.code === 'auth/email-already-in-use') {
      formik.setErrors({ email: newGameFormMessages.emailExistsError });
    } else if (error.code && error.code === 'auth/weak-password') {
      formik.setErrors({ password: newGameFormMessages.passwordWeakError });
    } else {
      formik.setErrors({ email: newGameFormMessages.emailUnknownError });
    }
    yield reportError(error);
  } finally {
    formik.setSubmitting(false);
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
    yield firebase.messaging().requestPermission();
    const token = yield firebase.messaging().getToken();
    yield firebase.database().ref(`notifications/${uid}/fcmToken`).set(token);
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
      takeLatest(UserAuthTypes.SIGN_IN, signIn),
      takeLatest(UserAuthTypes.CREATE_USER, createUser),
      takeLatest(UserAuthTypes.SIGN_OUT, signOutFromFirebase),
      takeLatest(UserAuthTypes.SET_USER_DATA, setUserData),
    ]);
  } catch (error) {
    /* istanbul ignore next */
    yield reportError(error);
  }
}
