import { createSelector } from 'reselect';

export const selectUser = (state) => state.userAuth;

export const selectUserIsAnonymous = createSelector(
  selectUser,
  (state) => state.get('isAnonymous', true),
);
