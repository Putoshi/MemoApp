import {createSlice} from '@reduxjs/toolkit';
import Random from '../libs/Random.js';
import Const from './const/Const.js';

export const memoSlice = createSlice({

  name: 'memo',

  initialState: {
    selected: null,
    memos: [],
  },

  reducers: {

    /**
     * メモの追加
     * @param state
     * @param action
     */
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

      // リスト先頭のメモを選択状態にする
      state.selected = id;
    },

    /**
     * メモの更新
     * @param state
     * @param action
     */
    updateMemo: (state, action) => {
      const targetMemo = state.memos.find((memo) => memo.id === action.payload.id);
      targetMemo.updatedAt = new Date().getTime();
      targetMemo.title = action.payload.title;
    },

    /**
     * メモの削除
     * @param state
     * @param action
     */
    deleteMemo: (state, action) => {
      const newMemos = state.memos.filter(
        (memo) => memo.id !== action.payload.id,
      );
      state.memos = newMemos;

      // リスト先頭のメモを選択状態にする
      console.log(state.memos[0].id);
      state.selected = state.memos[0].id;
    },

    /**
     * メモのソート
     * @param state
     * @param action
     */
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
        sortResult = state.memos.sort((a, b) => {
          return (a.updatedAt > b.updatedAt) ? -1 : 1;
        });
        break;
      }

      state.memos = sortResult;
    },

    /**
     * 選択したメモのIDを保持
     * @param state
     * @param action
     */
    selectMemo: (state, action) => {
      state.selected = action.payload.id;
    },
  },
});

export const { addMemo, updateMemo, deleteMemo, sortMemo, selectMemo } = memoSlice.actions;

export default memoSlice.reducer;
