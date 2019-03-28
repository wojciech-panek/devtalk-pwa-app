import { createActions, createReducer } from 'reduxsauce';
import { Record } from 'immutable';


export const { Types: PwaTypes, Creators: PwaActions } = createActions({
  startListeningForPwaEvent: [],
  stopListeningForPwaEvent: [],
  pwaEventReceived: [],
  clearPwaData: null,
  callPrompt: null,
}, { prefix: 'PWA_' });

const PwaRecord = new Record({
  canShowPromptButton: false,
}, 'pwa');

export const INITIAL_STATE = new PwaRecord();

const clearPwaData = () => INITIAL_STATE;

const pwaEventReceived = (state) => ({ ...state, canShowPromptButton: true });

export const reducer = createReducer(INITIAL_STATE, {
  [PwaTypes.CLEAR_PWA_DATA]: clearPwaData,
  [PwaTypes.PWA_EVENT_RECEIVED]: pwaEventReceived,
});
