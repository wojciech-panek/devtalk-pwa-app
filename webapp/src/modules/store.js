import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import * as localForage from 'localforage';
import immutableTransform from 'redux-persist-transform-immutable';
import { persistStore, persistReducer } from 'redux-persist';

import autoMergeLevel2Immutable from '../shared/utils/autoMergeLevel2Immutable';
import createReducer, { records } from './reducers';
import rootSaga from './sagas';


const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  transforms: [immutableTransform({ records })],
  key: 'root',
  storage: localForage,
  stateReconciler: autoMergeLevel2Immutable,
};

export default function configureStore(initialState = {}) {
  const middlewares = [
    sagaMiddleware,
  ];

  const enhancers = [];

  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  } else if (process.env.NODE_ENV === 'development') {
    const { persistState } = require('redux-devtools');

    const getDebugSessionKey = () => {
      const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
      return (matches && matches.length > 0) ? matches[1] : null;
    };

    Array.prototype.push.apply(enhancers, [
      require('../shared/utils/devtools.component').default.instrument(),
      persistState(getDebugSessionKey(), (state) => fromJS(state)),
    ]);
  }

  const persistedReducer = persistReducer(persistConfig, createReducer());

  const store = createStore(
    persistedReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers,
    )
  );

  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const createReducers = require('./reducers').default;
      const nextReducers = createReducers(store.asyncReducers);

      store.replaceReducer(nextReducers);
    });
  }

  return { store, persistor };
}
