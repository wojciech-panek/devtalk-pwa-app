import { put, takeLatest, all, take, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import reportError from '../../shared/utils/reportError';
import { PwaTypes, PwaActions, PWA_EVENT } from './';


const createPwaEventChannel = () => eventChannel(emit => {
  const eventHandler = event => emit(event);
  window.addEventListener(PWA_EVENT, eventHandler);
  return () => window.removeEventListener(PWA_EVENT, eventHandler);
});

function* closePwaEventChannel(channel) {
  while (true) {
    yield take(PwaTypes.STOP_LISTENING_FOR_PWA_EVENT);
    channel.close();
    console.warn('closePwaEventChannel');
  }
}

function* startListeningForPwaEvent() {
  const channel = createPwaEventChannel();

  yield fork(closePwaEventChannel, channel);

  while (true) { // eslint-disable-line
    const event = yield take(channel);
    event.preventDefault();
    yield put(PwaActions.pwaEventReceived());
    yield take(PwaTypes.CALL_PROMPT);

    event.prompt();
    yield put(PwaActions.stopListeningForPwaEvent());
  }
}

export function* watchPwa() {
  try {
    yield all([
      takeLatest(PwaTypes.START_LISTENING_FOR_PWA_EVENT, startListeningForPwaEvent),
    ]);
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}
