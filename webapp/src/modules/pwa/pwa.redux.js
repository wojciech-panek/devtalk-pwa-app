import { createActions, createReducer } from 'reduxsauce';
import { Record } from 'immutable';


export const { Types: PwaTypes, Creators: PwaActions } = createActions({
  saveEventReference: ['event'],
  startListeningForPwaEvent: [],
  stopListeningForPwaEvent: [],
  pwaEventReceived: [],
  clearPwaData: null,
  callPrompt: null,
}, { prefix: 'PWA_' });

const PwaRecord = {
  event: {},
  canShowPromptButton: false,
};

export const INITIAL_STATE = PwaRecord;

const clearPwaData = () => INITIAL_STATE;

const saveEventReference = (state, { event }) => {
  console.warn('PwaActions event:', PwaActions);
  state.event = event;
  console.warn('state:', state);
  return state;
};

const pwaEventReceived = (state) => ({ ...state, canShowPromptButton: true });

export const reducer = createReducer(INITIAL_STATE, {
  [PwaTypes.SAVE_EVENT_REFERENCE]: saveEventReference,
  [PwaTypes.CLEAR_PWA_DATA]: clearPwaData,
  [PwaTypes.PWA_EVENT_RECEIVED]: pwaEventReceived,
});
