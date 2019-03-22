import { combineReducers } from 'redux';
import { reducer as localesReducer, LocalesRecord } from './locales/locales.redux';
import { reducer as maintainersReducer, MaintainersRecord } from './maintainers/maintainers.redux';
import { reducer as userAuthReducer, UserAuthRecord } from './userAuth/userAuth.redux';
//<-- IMPORT MODULE REDUCER -->

export const records = [
  MaintainersRecord,
  LocalesRecord,
  UserAuthRecord,
];

export default function createReducer() {
  return combineReducers({
    maintainers: maintainersReducer,
    locales: localesReducer,
    userAuth: userAuthReducer,
    //<-- INJECT MODULE REDUCER -->
  });
}
