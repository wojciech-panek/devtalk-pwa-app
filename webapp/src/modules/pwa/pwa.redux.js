import { createActions, createReducer } from 'reduxsauce';
import { Record } from 'immutable';


export const { Types: PwaTypes, Creators: PwaActions } = createActions({
  saveEventReference: ['event'],
  clearPwaData: null,
  callPrompt: null,
}, { prefix: 'PWA_' });

const PwaRecord = new Record({
  event: {},
});

export const INITIAL_STATE = new PwaRecord();

const clearPwaData = () => INITIAL_STATE;

const saveEventReference = (state, { event }) => {
  state.event = event;
  return state;
};

export const reducer = createReducer(INITIAL_STATE, {
  [PwaTypes.SAVE_EVENT_REFERENCE]: saveEventReference,
  [PwaTypes.CLEAR_PWA_DATA]: clearPwaData,
});
