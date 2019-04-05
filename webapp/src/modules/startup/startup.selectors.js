import { createSelector } from 'reselect';

export const selectStartup = state => state.startup;

export const selectOnlineStatus = createSelector(
  selectStartup,
  (user) => user.get('isOnline', false),
);
