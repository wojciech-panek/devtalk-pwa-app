import { Map, Record, fromJS } from 'immutable';

import { createActions, createReducer } from '../utils/entityRegistry';


export const { Types: GameTypes, Creators: GameActions } = createActions({
  listenForGames: null,
  setGameData: ['data'],
  findUserGame: null,
  findUserGameFail: null,
  create: null,
  checkIfUserGameExists: ['uid'],
  gameCreated: null,
}, { prefix: 'GAME_' });

export const GameRecord = new Record({
  data: Map(),
}, 'game');

export const INITIAL_STATE = new GameRecord();

const setGameData = (state, { data }) => state.set('data', fromJS(data));

export const reducer = createReducer(INITIAL_STATE, {
  [GameTypes.SET_GAME_DATA]: setGameData,
}, { types: GameTypes });
