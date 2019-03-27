import { createSelector } from 'reselect';

export const selectUser = (state) => state.userAuth;

export const selectUserIsAnonymous = createSelector(
  selectUser,
  (state) => state.get('isAnonymous', true),
);

export const selectUserUid = createSelector(
  selectUser,
  (state) => state.get('uid', ''),
);
