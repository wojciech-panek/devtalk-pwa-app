import { combineReducers } from 'redux';
import { reducer as localesReducer, LocalesRecord } from './locales/locales.redux';
import { reducer as maintainersReducer, MaintainersRecord } from './maintainers/maintainers.redux';
//<-- IMPORT MODULE REDUCER -->

export const records = [
  MaintainersRecord,
  LocalesRecord,
];

export default function createReducer() {
  return combineReducers({
    maintainers: maintainersReducer,
    locales: localesReducer,
    //<-- INJECT MODULE REDUCER -->
  });
}
