/**
 * Create the store with dynamic reducers
 */

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { createReducer } from './reducers';

export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with saga middleware
  const middlewares = [sagaMiddleware];

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['director', 'detector', 'conversation'],
  };

  const reducer = createReducer();
  const persistedReducer = persistReducer(persistConfig, reducer);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: [...getDefaultMiddleware(), ...middlewares],
    devTools: process.env.NODE_ENV !== 'production',
  });

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(persistReducer(persistConfig, createReducer()));
    });
  }

  return store;
}
