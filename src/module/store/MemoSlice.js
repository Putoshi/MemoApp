import { createSlice } from '@reduxjs/toolkit';

export const memoSlice = createSlice({
  name: 'memoslice',
  initialState: {
    memos: []
  },
  reducers: {
    addMemo: (state, action) => {

      // バリデーション入れる
      console.log(action.payload);
      state.memos.push(action.payload);
    },
    updateMemo: (state, action) => {
      // const targetMemo = state.memos.find((memo) => memo.id === action.payload.id);
      // バリデーション入れる
      const newMemos = state.memos.filter(memo => memo.id !== action.payload.id);
      state.memos = [
        ...newMemos,
        action.payload
      ];
    },
    deleteMemo: (state, action) => {
      console.log(action.payload.id);
      const newMemos = state.memos.filter(memo => memo.id !== action.payload.id);
      state.memos = newMemos;
    }
  },
});

export const { addMemo, updateMemo, deleteMemo } = memoSlice.actions;

export default memoSlice.reducer;
