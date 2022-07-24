import { createSlice } from '@reduxjs/toolkit';
import Random from '../libs/Random.js';
import Datetime from '../libs/date/Datetime.js';

export const memoSlice = createSlice({
  name: 'memo',
  initialState: {
    memos: [],
  },
  reducers: {
    addMemo: (state, action) => {
      const id = Random.getRandomUid();
      const createdAt = new Datetime(new Date()).toString(Datetime.CALENDAR);
      // バリデーション入れる
      const newMemo = {
        id,
        createdAt,
        ...action.payload
      };
      state.memos.push(newMemo);
    },
    updateMemo: (state, action) => {
      // const targetMemo = state.memos.find((memo) => memo.id === action.payload.id);
      // バリデーション入れる
      const newMemos = state.memos.filter(
        (memo) => memo.id !== action.payload.id,
      );
      state.memos = [...newMemos, action.payload];
    },
    deleteMemo: (state, action) => {
      console.log(action.payload.id);
      const newMemos = state.memos.filter(
        (memo) => memo.id !== action.payload.id,
      );
      state.memos = newMemos;
    },
  },
});

export const { addMemo, updateMemo, deleteMemo } = memoSlice.actions;

export default memoSlice.reducer;
