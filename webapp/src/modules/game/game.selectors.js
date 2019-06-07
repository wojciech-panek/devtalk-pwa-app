import { createSelector } from 'reselect';
import { Map } from 'immutable';


export const selectGameDomain = state => state.game;

export const selectUserLoggedIn = createSelector(
  selectGameDomain,
  (state) => state.get('userLoggedIn', false)
);

export const selectUserGame = createSelector(
  selectGameDomain,
  (state) => state.get('data', Map())
);

