import { reducer as localesReducer } from './locales/locales.redux';
import { reducer as maintainersReducer } from './maintainers/maintainers.redux';
//<-- IMPORT MODULE REDUCER -->

export const records = [
  maintainersReducer,
  localesReducer,
];

export default function createReducer() {
  return ({
    maintainers: maintainersReducer,
    locales: localesReducer,
    //<-- INJECT MODULE REDUCER -->
  });
}
