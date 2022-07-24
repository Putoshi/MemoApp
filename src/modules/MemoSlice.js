import {createSlice} from '@reduxjs/toolkit';
import Random from '../libs/Random.js';
import Const from './const/Const.js';

export const memoSlice = createSlice({
  name: 'memo',
  initialState: {
    memos: [],
  },
  reducers: {
    addMemo: (state, action) => {
      const id = Random.getRandomUid();
      const createdAt = new Date().getTime();
      const updatedAt = new Date().getTime();
      // バリデーション入れる
      const newMemo = {
        id,
        createdAt,
        updatedAt,
        ...action.payload
      };
      state.memos.push(newMemo);
      // state.memos.slice().sort((x, y) => {
      //   console.log(x);
      //   return x.createdAt < y.createdAt;
      // });
    },
    updateMemo: (state, action) => {
      const targetMemo = state.memos.find((memo) => memo.id === action.payload.id);
      targetMemo.updatedAt = new Date().getTime();
      targetMemo.title = action.payload.title;
      // state.memos.slice().sort((x, y) => {
      //   console.log(x);
      //   return x.createdAt > y.createdAt;
      // });
      // thesorted = rawutimes.sort(function(x, y){
      //   return x - y;
      // });
    },
    deleteMemo: (state, action) => {
      const newMemos = state.memos.filter(
        (memo) => memo.id !== action.payload.id,
      );
      state.memos = newMemos;
    },
    sortMemo: (state, action) => {
      let sortResult = state.memos;
      switch (action.payload.sortBy) {
      // updatedAtの昇順ソート
      case Const.SortOrder.DATE_UP:
        console.log(Const.SortOrder.DATE_UP);
        sortResult = state.memos.sort((a, b) => {
          return (a.updatedAt < b.updatedAt) ? -1 : 1;
        });
        break;


      // updatedAtの降順ソート
      case Const.SortOrder.DATE_DOWN:
        console.log(Const.SortOrder.DATE_DOWN);
        sortResult = state.memos.sort((a, b) => {
          return (a.updatedAt > b.updatedAt) ? -1 : 1;
        });
        break;
      }

      state.memos = sortResult;
      // if (action.payload.sortBy === Const.SortOrder.DATE_DOWN) {
      //   const sortResult = state.memos.sort((a, b) => {
      //     return (a.updatedAt > b.updatedAt) ? -1 : 1; // オブジェクトの降順ソート
      //   });
      //   state.memos = sortResult;
      // }
    }
  },
});

export const { addMemo, updateMemo, deleteMemo, sortMemo } = memoSlice.actions;

export default memoSlice.reducer;
