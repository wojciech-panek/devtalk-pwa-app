import { all, fork } from 'redux-saga/effects';

import reportError from '../shared/utils/reportError';
import { watchMaintainers } from './maintainers/maintainers.sagas';
import { watchStartup } from './startup/startup.sagas';
import { watchUserAuth } from './userAuth/userAuth.sagas';
//<-- IMPORT MODULE SAGA -->


export default function* rootSaga() {
  try {
    yield all([
      fork(watchMaintainers),
      fork(watchStartup),
      fork(watchUserAuth),
      //<-- INJECT MODULE SAGA -->
    ]);
  } catch (e) {
    yield reportError(e);
  }
}
