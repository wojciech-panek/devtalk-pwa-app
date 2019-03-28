import { put, takeLatest, all, select, take, fork } from 'redux-saga/effects';
import reportError from '../../shared/utils/reportError';

import { PwaTypes, PwaActions, selectPwaEvent } from './';
import { PWA_EVENT } from '../../theme/media';
import { eventChannel } from 'redux-saga';


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

const createPwaEventChannel = () => eventChannel(emit => {
  const eventHandler = event => emit(event);
  window.addEventListener(PWA_EVENT, eventHandler);
  return () => window.removeEventListener(PWA_EVENT, eventHandler);
});

function* closePwaEventChannel(channel) {
  while (true) {
    yield take(PwaTypes.STOP_LISTENING_FOR_PWA_EVENT);
    channel.close();
  }
}

function* startListeningForPwaEvent() {
  const channel = createPwaEventChannel();

  yield fork(closePwaEventChannel, channel);

  while (true) { // eslint-disable-line
    const event = yield take(channel);
    yield take(PwaTypes.CALL_PROMPT);

    event.prompt();
    yield put(PwaActions.stopListeningForPwaEvent());
  }
}

export function* watchPwa() {
  try {
    yield all([
      takeLatest(PwaTypes.START_LISTENING_FOR_PWA_EVENT, startListeningForPwaEvent),
      takeLatest(PwaTypes.CALL_PROMPT, callPrompt),
    ]);
  } catch(error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

// window.addEventListener(PWA_EVENT, this.handlePwaEvent);
