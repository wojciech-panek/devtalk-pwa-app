import { put, takeLatest, all, select } from 'redux-saga/effects';
import reportError from '../../shared/utils/reportError';

import { PwaTypes, PwaActions, selectPwaEvent } from './';


function* callPrompt() {
  try {
    const pwaEvent = yield select(selectPwaEvent);

    if (pwaEvent) {
      pwaEvent.prompt();
      // Wait for the user to respond to the prompt
      const choiceResult = yield pwaEvent.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      yield put(PwaActions.clearPwaData);
    }
  } catch (error) {
    /* istanbul ignore next */
    yield reportError(error);
  }
}

export function* watchPwa() {
  try {
    yield all([
      takeLatest(PwaTypes.CALL_PROMPT, callPrompt),
    ]);
  } catch(error) {
    /* istanbul ignore next */
    reportError(error);
  }
}
