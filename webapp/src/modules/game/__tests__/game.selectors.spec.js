import { expect } from 'chai';
import { fromJS } from 'immutable';

import { selectGameDomain } from '../game.selectors';


describe('Game: selectors', () => {
  const state = fromJS({
    game: {

    },
  });

  describe('selectGameDomain', () => {
    it('should select a domain', () => {
      expect(selectGameDomain(state)).to.equal(state.get('game'));
    });
  });
});
