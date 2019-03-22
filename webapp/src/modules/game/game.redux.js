import { createActions, createReducer } from 'reduxsauce';
import { Record } from 'immutable';


export const { Types: GameTypes, Creators: GameActions } = createActions({
  fetchData: null,
}, { prefix: 'GAME_' });

export const GameRecord = new Record({
});

export const INITIAL_STATE = new GameRecord({});

export const reducer = createReducer(INITIAL_STATE, {
});
