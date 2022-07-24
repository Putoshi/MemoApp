import {updateMemo, selectMemo} from './MemoSlice.js';

export const DragEvent = {
  actions: {
    onDragOver: (e) => {
      e.stopPropagation();
      e.preventDefault();
    },
    onDrop: (e, dispatch, folderId) => {
      const memoId = e.dataTransfer.getData('text/plain');
      console.log(memoId);

      // メモのフォルダを更新
      dispatch(
        updateMemo({
          id: memoId,
          folder: folderId
        })
      );

      // 更新したメモを選択
      dispatch(
        selectMemo({
          id: memoId
        }),
      );

      if (e.stopPropagation) {
        e.stopPropagation();
      }
    },
  }
};

export const { onDragOver, onDrop } = DragEvent.actions;
