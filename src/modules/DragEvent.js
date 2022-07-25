import {updateMemo, selectMemo, sortMemo} from './store/MemoSlice.js';
import Const from '../const/Const.js';

/**
 * SideNavのメモリストをドラッグした時のイベントハンドラー
 * @type {{actions: {onDrop: DragEvent.actions.onDrop, onDragOver: DragEvent.actions.onDragOver}}}
 */
export const DragEvent = {
  actions: {
    onDragOver: (e) => {
      e.stopPropagation();
      e.preventDefault();
    },
    onDrop: (e, dispatch, folderId) => {
      const memoId = e.dataTransfer.getData('text/plain');

      // ソートオーダーの設定
      const sortBy = Const.SORT_ORDER.DATE_DOWN;

      // メモのフォルダを更新
      dispatch(
        updateMemo({
          id: memoId,
          folder: folderId,
        })
      );

      // 更新したメモを選択
      dispatch(
        selectMemo({
          id: memoId
        }),
      );

      // ソート
      dispatch(
        sortMemo({
          sortBy
        }),
      );

      if (e.stopPropagation) {
        e.stopPropagation();
      }
    },
  }
};

export const { onDragOver, onDrop } = DragEvent.actions;
