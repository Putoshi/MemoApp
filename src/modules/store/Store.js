import {combineReducers, configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import Const from '../const/Const.js';
import memoSlice from '../MemoSlice.js';
import {save, load} from 'redux-localstorage-simple';

// rootReducerの準備
const rootReducer = combineReducers({
  memoReducer: memoSlice,
});

// setup関数
export const setupStore = () => {
  const middlewares = (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(save({ namespace: Const.LOCALSTORAGE_KEY }))
    .concat(logger);

  return configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    preloadedState: load({ namespace: Const.LOCALSTORAGE_KEY }),
  });
};

export const store = setupStore();
