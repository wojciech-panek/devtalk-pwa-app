import { createActions, createReducer } from 'reduxsauce';
import { Record } from 'immutable';


export const { Types: StartupTypes, Creators: StartupActions } = createActions({
  startup: null,
  initializeFirebaseApp: [],
  registerServiceWorker: [],
  setOnlineStatus: ['isOnline'],
}, { prefix: 'STARTUP_' });

export const StartupRecord = new Record({
  isOnline: false,
}, 'startup');

export const INITIAL_STATE = new StartupRecord();

const setOnlineStatus = (state, { isOnline }) => state.merge({ isOnline });

export const reducer = createReducer(INITIAL_STATE, {
  [StartupTypes.SET_ONLINE_STATUS]: setOnlineStatus,
});
