import { createSelector } from 'reselect';
import { Map } from 'immutable';


export const selectGameDomain = state => state.game;

export const selectShouldDisplayInstruction = createSelector(
  selectGameDomain,
  (state) => state.get('shouldDisplayInstruction', false)
);

export const selectIsInstructionReaded = createSelector(
  selectGameDomain,
  (state) => state.get('isInstructionReaded', false)
);

export const selectUserGame = createSelector(
  selectGameDomain,
  (state) => state.get('data', Map())
);

