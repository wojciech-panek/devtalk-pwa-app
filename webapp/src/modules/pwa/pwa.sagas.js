import { put, takeLatest, all, take, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import reportError from '../../shared/utils/reportError';
import { PwaTypes, PwaActions, PWA_EVENT } from './';


const createPwaEventChannel = () => eventChannel(emit => {
  const eventHandler = event => setTimeout(() => {
    emit(event);
  });
  return () => window.removeEventListener(PWA_EVENT, eventHandler);
});

function* closePwaEventChannel(channel) {
  while (true) {
    yield take(PwaTypes.STOP_LISTENING_FOR_PWA_EVENT);
    channel.close();
  }
}

function* startListeningForPwaEvent() {
  window.addEventListener(PWA_EVENT, e => {
    let event = e;
    event.preventDefault();
    event.prompt();
    event.userChoice
      .then(function (choiceResult) {
        console.log(choiceResult);
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        event = null;
      });
  });
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
