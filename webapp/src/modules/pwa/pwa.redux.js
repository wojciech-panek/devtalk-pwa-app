import { createActions, createReducer } from 'reduxsauce';
import { Record } from 'immutable';


export const { Types: PwaTypes, Creators: PwaActions } = createActions({
  saveEventReference: ['event'],
  clearPwaData: null,
  callPrompt: null,
}, { prefix: 'PWA_' });

const PwaRecord = {
  event: {},
};

export const INITIAL_STATE = PwaRecord;

const clearPwaData = () => INITIAL_STATE;

const saveEventReference = (state, { event }) => {
  console.warn('PwaActions event:', PwaActions);
  state.event = event;
  console.warn('state:', state);
  return state;
};

export const reducer = createReducer(INITIAL_STATE, {
  [PwaTypes.SAVE_EVENT_REFERENCE]: saveEventReference,
  [PwaTypes.CLEAR_PWA_DATA]: clearPwaData,
});
