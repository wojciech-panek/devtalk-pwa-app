import { createActions as rsCreateActions, createReducer as rsCreateReducer } from 'reduxsauce';
import { eventChannel } from 'redux-saga';
import { takeEvery, fork, take, put } from 'redux-saga/effects';

export const createActions = (actions, options) => rsCreateActions({
  ...actions,
  updateItems: ['data'],
  startListening: ['dbRef', 'channelId'],
  stopListening: ['channelId'],
}, options);

export const createReducer = (initialState, actionHandlers) => {
  return rsCreateReducer(initialState, {
    ...actionHandlers,
  });
};

export const createSaga = ({ actions, types }) => {
  const createSnapshotEventChannel = (dbRef) => eventChannel(emit => {
    const listener = dbRef.onSnapshot((snapshot) => {
      setTimeout(() => {
        emit(snapshot);
      }, 0);
    });
    return () => listener();
  });

  function* closeChannelOnNewListenOrStopAction(channel, channelId) {
    while (true) {
      const { channelId: eventChannelId } = yield take([types.START_LISTENING, types.STOP_LISTENING]);
      if (eventChannelId === channelId) {
        channel.close();
        return;
      }
    }
  }

  function* startListeningForSnapshot(dbRef, channelId) {
    const channel = createSnapshotEventChannel(dbRef);

    yield fork(closeChannelOnNewListenOrStopAction, channel, channelId);

    while (true) { // eslint-disable-line
      const data = yield take(channel);

      yield put(actions.updateItems(data));
    }
  }

  function* startListeningForList(dbRef, channelId) {
    yield fork(startListeningForSnapshot, dbRef, channelId);
  }

  function* listenForData({ dbRef, channelId }) {
    yield fork(startListeningForList, dbRef, channelId);
  }

  return function* () {
    yield takeEvery(types.START_LISTENING, listenForData);
  };
};
