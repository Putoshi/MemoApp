import React from 'react';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {updateMemo} from './store/MemoSlice.js';
import Const from './const/Const.js';

const FolderBtn = (prop) => {
  const dispatch = useDispatch();

  /**
   * リストの削除ボタンクリック
   * @param id 削除するリストID
   */
  const onClickFolderRemoveBtn = (e, id) => {
    dispatch(
      updateMemo({
        id,
        folder: 'uncategorized'
      }),
    );
    // リストの選択イベントも走ってしまう為、イベントのバブリング停止する
    e.stopPropagation();
  };


  const getFolderNameById = (id) => {
    return Const.FOLDER_GROUP.find((folder) => folder.id === id).name;
  };

  const getFolderColorById = (id) => {
    const targetFolderData = Const.FOLDER_GROUP.find((folder) => folder.id === id);
    return {
      labelColor1: targetFolderData.labelColor1,
      labelColor2: targetFolderData.labelColor2
    };
  };

  return (
    <div className='FolderBtn'
      style={{background: `linear-gradient(${getFolderColorById(prop.folder).labelColor1}, ${getFolderColorById(prop.folder).labelColor2})`}}
    >
      <p>{getFolderNameById(prop.folder)}</p>
      <i className='Folder__icon'
        onClick={(e) => onClickFolderRemoveBtn(e, prop.id)}
      >
        <FontAwesomeIcon icon={faXmark}/>
      </i>
    </div>
  );
};

export default FolderBtn;
