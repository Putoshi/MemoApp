import React from 'react';
import Const from './const/Const.js';
import MemoGroup from './MemoGroup.jsx';
import {updateMemo} from './MemoSlice.js';
import {useDispatch} from 'react-redux';

const FolderGroup = () => {
  const dispatch = useDispatch();

  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const onDrop = (e, folderId) => {
    const memoId = e.dataTransfer.getData('text/plain');

    // メモの新規追加
    dispatch(
      updateMemo({
        id:memoId,
        folder: folderId
      }),
    );

    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };
  return (
    <div className={'FolderGroup'}>
      {
        Const.FOLDER_GROUP.filter((folder) => folder.id !== 'uncategorized').map((folder) => (
          <div
            className={'Folder'}
            key={folder.id}
            onDragOver={(e) => {
              onDragOver(e);
            }}
            onDrop={(e) => {
              onDrop(e, folder.id);
            }}
          >
            <div
              className={'FolderLabel'}
              style={{backgroundColor: folder.lavelColor}}
            >
              <div className={'FolderLabel__inner'}>{folder.name}</div>
            </div>
            <MemoGroup folderName={folder.id}></MemoGroup>

          </div>

        ))
      }
    </div>

  );
};

export default FolderGroup;
