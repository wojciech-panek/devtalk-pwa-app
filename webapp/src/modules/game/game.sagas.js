import { put, takeLatest, all, fork, select } from 'redux-saga/effects';
import firebase from 'firebase';

import reportError from '../../shared/utils/reportError';
import { createSaga } from '../utils/entityRegistry';
import { selectUserUid, UserAuthTypes } from '../userAuth';
import { GameTypes, GameActions } from './game.redux';
import { GAME_COLLECTION, NEW_GAME_DATA } from './game.constans';


const registrySaga = createSaga({
  actions: GameActions,
  types: GameTypes,
});

export function* findUserGame() {
  try {
    const userUid = yield select(selectUserUid);

    const gameData = yield firebase
      .firestore()
      .collection(GAME_COLLECTION)
      .doc(userUid)
      .get();

    if (gameData.exists) {
      yield put(GameActions.setGameData(gameData.data()));
    } else {
      yield put(GameActions.findUserGameFail());
    }
  } catch (error) {
    /* istanbul ignore next */
    yield reportError(error);
  }
}

export function* createNewGame() {
  const userUid = yield select(selectUserUid);

  yield firebase
    .firestore()
    .collection(GAME_COLLECTION)
    .doc(userUid)
    .set(NEW_GAME_DATA, { merge: true });

  yield put(GameActions.setGameData(NEW_GAME_DATA));
}

export function* watchGame() {
  try {
    yield all([
      fork(registrySaga),
      takeLatest(UserAuthTypes.SET_USER_DATA, findUserGame),
      takeLatest(GameTypes.FIND_USER_GAME_FAIL, createNewGame),
      takeLatest(GameTypes.CREATE, createNewGame),
    ]);
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}
