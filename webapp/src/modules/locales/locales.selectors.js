import { createSelector } from 'reselect';


const selectLocalesDomain = state => state.locales;

export const selectLocalesLanguage = createSelector(
  selectLocalesDomain, state => state.get('language')
);
