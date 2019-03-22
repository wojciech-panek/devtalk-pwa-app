import { Record } from 'immutable';
import { createActions, createReducer } from 'reduxsauce';

export const {
  Types: UserAuthTypes,
  Creators: UserAuthActions,
} = createActions({
  setUserData: ['user'],
  clearUserData: null,
  signOut: null,
  signInViaGoogle: null,
  listenForFirebaseAuth: null,
}, { prefix: 'USER_AUTH_' });

export const UserAuthRecord = new Record({
  uid: null,
  isAnonymous: true,
}, 'userAuth');

const INITIAL_STATE = new UserAuthRecord();

const clearUserData = () => INITIAL_STATE;

const setUserData = (state, { user }) => state.merge({
  ...user,
});

export const reducer = createReducer(INITIAL_STATE, {
  [UserAuthTypes.SET_USER_DATA]: setUserData,
  [UserAuthTypes.CLEAR_USER_DATA]: clearUserData,
}, { types: UserAuthTypes });
