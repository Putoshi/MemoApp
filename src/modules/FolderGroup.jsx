import React from 'react';
import Const from './const/Const.js';
import MemoGroup from './MemoGroup.jsx';
import {onDragOver, onDrop} from './DragEvent.js';
import {useDispatch} from 'react-redux';

const FolderGroup = () => {
  const dispatch = useDispatch();

  return (
    <div className={'FolderGroup'}>
      {
        Const.FOLDER_GROUP.filter((folder) => folder.id !== 'uncategorized').map((folder) => (
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
              <div className={'FolderLabel__inner'}>{folder.name} 📂</div>
            </div>
            <MemoGroup folderName={folder.id}></MemoGroup>

          </div>

        ))
      }
    </div>

  );
};

export default FolderGroup;
