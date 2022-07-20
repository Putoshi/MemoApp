import { configureStore } from '@reduxjs/toolkit';
import memoReducer from './MemoSlice.js';

export const store = configureStore({
  reducer: {
    memoReducer
  },
});