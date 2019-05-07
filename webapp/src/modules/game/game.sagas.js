import { put, takeLatest, take, all, fork, select } from 'redux-saga/effects';
import firebase from 'firebase';
import ticker from 'redux-saga-ticker';

import reportError from '../../shared/utils/reportError';
import { createSaga } from '../utils/entityRegistry';
import { selectUserUid, UserAuthTypes } from '../userAuth';
import { isoToTimestamp } from '../../shared/utils/date';
import { GameTypes, GameActions } from './game.redux';
import { selectUserGame } from './game.selectors';
import { GAME_COLLECTION, NEW_GAME_DATA } from './game.constants';
import { WAREHOUSE_LEVELS } from '../../routes/home/game/game.constants';


const registrySaga = createSaga({
  actions: GameActions,
  types: GameTypes,
});

export function* findUserGame() {
  try {
    const userUid = yield select(selectUserUid);
    const currentGame = yield select(selectUserGame);

    const gameDataSnapshot = yield firebase
      .database()
      .ref(GAME_COLLECTION)
      .child(userUid)
      .once('value');

    const gameData = gameDataSnapshot.val();

    if (!gameData) {
      yield put(GameActions.findUserGameFail());
    } else {
      const gameDataTimestamp = isoToTimestamp(gameData.updateTimestamp);
      const currentGameDataTimestamp = isoToTimestamp(currentGame.get('updateTimestamp'));
      if (gameData && (isNaN(currentGameDataTimestamp) || gameDataTimestamp > currentGameDataTimestamp)) {
        yield put(GameActions.setGameData(gameData));
      }
      if (gameData && (isNaN(currentGameDataTimestamp) || gameDataTimestamp < currentGameDataTimestamp)) {
        yield put(GameActions.syncGameData());
      }
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

export function* buyAnimal() {
  yield put(GameActions.syncGameData());
}

export function* upgradeWarehouse() {
  yield put(GameActions.syncGameData());
}

export function* runGameTicker() {
  const gameTicker = ticker(100);
  while (true) {
    yield take(gameTicker);
    const gameData = yield select(selectUserGame);
    const now = Date.now();
    let anyFoodProduced = false;

    for (let i = 0; i < (gameData.get('fields') ? gameData.get('fields').size : 0); i++) {
      const {
        startProductionTimestamp, productionDuration, pokeCount, warehouseLevel, foodAmount, foodType, amount,
      } = gameData.getIn(['fields', i]).toJS();

      const elapseTime = now - isoToTimestamp(startProductionTimestamp);
      const produced = Math.floor((elapseTime + pokeCount * 1000) / (productionDuration * 1000));
      const warehouseSpace = WAREHOUSE_LEVELS[warehouseLevel].foodMaxAmount - foodAmount;
      const foodToProduce = Math.min(produced * amount, warehouseSpace);

      if (foodToProduce > 0) {
        anyFoodProduced = true;
        yield put(GameActions.produceFood(foodType, i, foodToProduce));
      }
    }

    if (anyFoodProduced) {
      yield put(GameActions.syncGameData());
    }
  }
}

export function* watchGame() {
  try {
    yield all([
      fork(registrySaga),
      fork(runGameTicker),
      takeLatest(UserAuthTypes.SET_USER_DATA, findUserGame),
      takeLatest(GameTypes.SYNC_GAME_DATA, syncGameData),
      takeLatest(GameTypes.SELL_FOOD, sellFood),
      takeLatest(GameTypes.BUY_ANIMAL, buyAnimal),
      takeLatest(GameTypes.UPGRADE_WAREHOUSE, upgradeWarehouse),
      takeLatest(GameTypes.FIND_USER_GAME_FAIL, createNewGame),
      takeLatest(GameTypes.CREATE, createNewGame),
    ]);
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}
