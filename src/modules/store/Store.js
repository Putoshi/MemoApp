import {combineReducers, configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import memoSlice from '../MemoSlice.js';
import {save, load} from 'redux-localstorage-simple';

const LOCALSTORAGE_KEY = 'my_memo_app';

// rootReducer の準備
const rootReducer = combineReducers({
  memoReducer: memoSlice
});

// setup 関数を用意してエクスポートする。
export const setupStore = () => {
  const middlewares = (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(save({ namespace: LOCALSTORAGE_KEY }))
    .concat(logger);

  return configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    preloadedState: load(),
  });
};


export const store = setupStore();

store.subscribe(() => {
  console.log('subscribe');
});


// export const store = configureStore({
//   reducer: {
//     memoReducer,
//   },
//   preloadedState: load(),
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save({ namespace: LOCALSTORAGE_KEY })),
// });

