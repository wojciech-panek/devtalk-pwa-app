import SagaTester from 'redux-saga-tester';
import { expect } from 'chai';
import { fromJS } from 'immutable';

import mockApi from '../../../shared/utils/mockApi';
import { watchGame } from '../game.sagas';
import {
  GameActions,
  GameTypes
} from '../game.redux';


describe('Game: sagas', () => {
  const defaultState = fromJS({});

  const getSagaTester = (initialState = {}) => {
    const sagaTester = new SagaTester({
      initialState: defaultState.mergeDeep(initialState),
    });
    sagaTester.start(watchGame);
    return sagaTester;
  };

  it('should implement a test', () => {
    const sagaTester = getSagaTester();

    sagaTester.dispatch(GameActions.noop());

    expect(sagaTester.getCalledActions()).to.deep.equal([GameActions.noop()]);
  });
});
