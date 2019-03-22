import { expect } from 'chai';
import { fromJS } from 'immutable';

import {
  reducer as gameReducer,
  GameActions,
  GameTypes,
} from '../game.redux';


describe('Game: redux', () => {
  const state = fromJS({
  });

  describe('reducer', () => {
    it('should return initial state', () => {
      expect(gameReducer(undefined, {}).toJS()).to.deep.equal(state.toJS());
    });

    it('should return state on unknown action', () => {
      expect(gameReducer(state, { type: 'unknown-action' }).toJS()).to.deep.equal(state.toJS());
    });
  });
});
