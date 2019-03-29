import { createSelector } from 'reselect';


export const selectPwaDomain = state => state.pwa;

export const selectCanShowPromptButton = createSelector(
  selectPwaDomain,
  (state) => state.canShowPromptButton,
);
