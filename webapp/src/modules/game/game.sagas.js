import { put, takeLatest } from 'redux-saga/effects';
import reportError from '../../shared/utils/reportError';

import { GameTypes, GameActions } from './game.redux';


export function* watchGame() {
  try {
    console.log('Game saga started!');
  } catch(error) {
    /* istanbul ignore next */
    reportError(error);
  }
}
