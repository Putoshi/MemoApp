import {createSlice} from '@reduxjs/toolkit';
import Random from '../../libs/Random.js';
import Const from '../const/Const.js';

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
        folder: action.payload.folder,
        data: '',
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

      // フォルダ移動の時に更新日時が変わってしまうとちょっと変なので、時間を更新しない
      let isFolderUpdate = false;

      if (action.payload.title !== undefined) {
        targetMemo.title = action.payload.title;
      }
      if (action.payload.folder !== undefined) {
        isFolderUpdate = (targetMemo.folder !== action.payload.folder);
        targetMemo.folder = action.payload.folder;
      }
      if (action.payload.data !== undefined) {
        targetMemo.data = action.payload.data;
      }
      if (!isFolderUpdate) {
        targetMemo.updatedAt = new Date().getTime();
      }
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
      state.selected = (state.memos.length) ? state.memos[0].id : null;
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
      case Const.SORT_ORDER.DATE_UP:
        console.log(Const.SORT_ORDER.DATE_UP);
        sortResult = state.memos.sort((a, b) => {
          return (a.updatedAt < b.updatedAt) ? -1 : 1;
        });
        break;


      // updatedAtの降順ソート
      case Const.SORT_ORDER.DATE_DOWN:
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