import { createSelector } from 'reselect';
import { Map } from 'immutable';


export const selectGameDomain = state => state.game;

export const selectUserGame = createSelector(
  selectGameDomain,
  (state) => state.get('data', Map())
);

