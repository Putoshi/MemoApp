import React from 'react';
import Const from './const/Const.js';
import MemoGroup from './MemoGroup.jsx';
import {onDragOver, onDrop} from './DragEvent.js';
import {useDispatch} from 'react-redux';
import CreateNewBtn from './CreateNewBtn.jsx';

/**
 * SideNav内のフォルダグループブロックの関数
 * @returns {JSX.Element}
 * @constructor
 */
const FolderGroup = () => {
  const dispatch = useDispatch();

  // 未分類以外のフォルダグループのデータを取得
  const folders = Const.FOLDER_GROUP.filter((folder) => folder.id !== 'uncategorized');

  return (
    <div className={'FolderGroup'}>
      {
        folders.map((folder) => (
          <div
            className={'Folder Frame'}
            key={folder.id}
            onDragOver={(e) => {
              onDragOver(e);
            }}
            onDrop={(e) => {
              onDrop(e, dispatch, folder.id);
            }}
          >
            <div
              className={'FolderLabel'}
              style={{background: `linear-gradient(${folder.labelColor1}, ${folder.labelColor2})`}}
            >
              <div className={'FolderLabel__inner'}>
                <p>{folder.name} 📂</p>
                <CreateNewBtn folderId={folder.id} />
              </div>
            </div>
            <MemoGroup folderId={folder.id}></MemoGroup>
          </div>
        ))
      }
    </div>
  );
};

export default FolderGroup;
