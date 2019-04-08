import { put, takeLatest, all, fork, select } from 'redux-saga/effects';
import firebase from 'firebase';

import reportError from '../../shared/utils/reportError';
import { createSaga } from '../utils/entityRegistry';
import { selectUserUid, UserAuthTypes } from '../userAuth';
import { GameTypes, GameActions } from './game.redux';
import { GAME_COLLECTION, NEW_GAME_DATA } from './game.constants';


const registrySaga = createSaga({
  actions: GameActions,
  types: GameTypes,
});

export function* findUserGame() {
  try {
    const userUid = yield select(selectUserUid);

    const gameDataSnapshot = yield firebase
      .database()
      .ref(GAME_COLLECTION)
      .child(userUid)
      .once('value');

    const gameData = gameDataSnapshot.val();

    if (gameData) {
      yield put(GameActions.setGameData(gameData));
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
    .database()
    .ref(GAME_COLLECTION)
    .child(userUid)
    .set(NEW_GAME_DATA);

  yield put(GameActions.setGameData(NEW_GAME_DATA));
}

export function* syncGameData() {
  const swRegistration = yield navigator.serviceWorker.ready;
  swRegistration.sync.register('syncGameData');
}

export function* sellFood() {
  yield put(GameActions.syncGameData());
}

export function* produceFood() {
  yield put(GameActions.syncGameData());
}

export function* watchGame() {
  try {
    yield all([
      fork(registrySaga),
      takeLatest(UserAuthTypes.SET_USER_DATA, findUserGame),
      takeLatest(GameTypes.SYNC_GAME_DATA, syncGameData),
      takeLatest(GameTypes.SELL_FOOD, sellFood),
      takeLatest(GameTypes.PRODUCE_FOOD, produceFood),
      takeLatest(GameTypes.FIND_USER_GAME_FAIL, createNewGame),
      takeLatest(GameTypes.CREATE, createNewGame),
    ]);
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}
