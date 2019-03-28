import { createSelector } from 'reselect';


export const selectPwaDomain = state => state.pwa;

export const selectPwaEvent = createSelector(
  selectPwaDomain,
  (state) => state.event,
);

export const selectCanShowPromptButton = createSelector(
  selectPwaDomain,
  (state) => state.canShowPromptButton,
);
