import { put, takeLatest, all, take, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import reportError from '../../shared/utils/reportError';
import { PwaTypes, PwaActions, PWA_EVENT } from './';


const createPwaEventChannel = () => eventChannel(emit => {
  const eventHandler = event => setTimeout(() => {
    emit(event);
  });
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
  try {
    const channel = yield createPwaEventChannel();

    yield fork(closePwaEventChannel, channel);

    while (true) { // eslint-disable-line
      let event = yield take(channel);
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      event.preventDefault();

      yield put(PwaActions.pwaEventReceived());
      yield take(PwaTypes.CALL_PROMPT);

      if (event) {
        yield event.prompt();
        const x = yield event.userChoice;
        console.log(x);
      }
    }
  } catch (e) {
    console.error(e);
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
