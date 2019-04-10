import { Map, Record, fromJS } from 'immutable';

import { createActions, createReducer } from '../utils/entityRegistry';
import { WAREHOUSE_LEVELS } from '../../routes/home/game/game.constants';


export const { Types: GameTypes, Creators: GameActions } = createActions({
  listenForGames: null,
  setGameData: ['data'],
  findUserGame: null,
  findUserGameFail: null,
  create: null,
  checkIfUserGameExists: ['uid'],
  gameCreated: null,
  syncGameData: null,
  sellFood: ['foodType', 'foodCost', 'foodAmount', 'fieldIndex'],
  produceFood: ['foodType', 'fieldIndex', 'amount'],
  pokeAnimal: ['fieldIndex'],
}, { prefix: 'GAME_' });

export const GameRecord = new Record({
  data: Map(),
}, 'game');

export const INITIAL_STATE = new GameRecord();

const setGameData = (state, { data }) => state.set('data', fromJS(data));

const sellFood = (state, { foodCost, foodAmount, fieldIndex }) => state
  .updateIn(['data', 'coins'], (coins) => coins + foodCost * foodAmount)
  .setIn(['data', 'fields', fieldIndex, 'foodAmount'], 0)
  .setIn(['data', 'fields', fieldIndex, 'startProductionTimestamp'], new Date().toISOString())
  .setIn(['data', 'fields', fieldIndex, 'pokeCount'], 0);

const produceFood = (state, { fieldIndex, amount }) => state
  .updateIn(
    ['data', 'fields', fieldIndex, 'foodAmount'],
    (foodAmount) => Math.min(
      foodAmount + amount,
      WAREHOUSE_LEVELS[state.getIn(['data', 'fields', fieldIndex, 'warehouseLevel'])].foodMaxAmount,
    )
  )
  .setIn(['data', 'fields', fieldIndex, 'pokeCount'], 0)
  .updateIn(['data', 'fields', fieldIndex, 'startProductionTimestamp'], (prevDate) => {
    const maxAmount = WAREHOUSE_LEVELS[state.getIn(['data', 'fields', fieldIndex, 'warehouseLevel'])].foodMaxAmount;
    const currentAmount = state.getIn(['data', 'fields', fieldIndex, 'foodAmount']) + amount;

    if (currentAmount >= maxAmount) {
      return prevDate;
    }
    return new Date().toISOString();
  });

const pokeAnimal = (state, { fieldIndex }) => state
  .updateIn(
    ['data', 'fields', fieldIndex, 'pokeCount'],
    (pokeCount) => pokeCount + 1,
  );

export const reducer = createReducer(INITIAL_STATE, {
  [GameTypes.SET_GAME_DATA]: setGameData,
  [GameTypes.SELL_FOOD]: sellFood,
  [GameTypes.POKE_ANIMAL]: pokeAnimal,
  [GameTypes.PRODUCE_FOOD]: produceFood,
}, { types: GameTypes });
