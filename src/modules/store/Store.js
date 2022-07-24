import {combineReducers, configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import memoSlice from '../MemoSlice.js';
import {save, load} from 'redux-localstorage-simple';

const LOCALSTORAGE_KEY = 'my_memo_app';

// rootReducerの準備
const rootReducer = combineReducers({
  memoReducer: memoSlice
});

// setup関数
export const setupStore = () => {
  const middlewares = (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(save({ namespace: LOCALSTORAGE_KEY }))
    .concat(logger);

  return configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    preloadedState: load({ namespace: LOCALSTORAGE_KEY }),
  });
};

export const store = setupStore();
