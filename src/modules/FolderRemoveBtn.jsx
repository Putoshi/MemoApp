import React from 'react';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {updateMemo} from './store/MemoSlice.js';
import Const from '../const/Const.js';

/**
 * 編集画面メニューバー内のフォルダー解除ボタン
 * @param prop id:メモのID、folderId:フォルダのID
 * @returns {JSX.Element}
 * @constructor
 */
const FolderRemoveBtn = (prop) => {
  const dispatch = useDispatch();

  const {
    id, // メモのID
    folderId // フォルダのID
  } = prop;

  /**
   * リストの削除ボタンハンドラー
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

  /**
   * フォルダの表示名をIDで索引
   * @param id メモのID
   * @returns {*} 表示名
   */
  const getFolderNameById = (id) => {
    return Const.FOLDER_GROUP.find((folder) => folder.id === id).name;
  };

  /**
   * フォルダのラベル色をIDで索引
   * @param id メモのID
   * @returns {{labelColor2: *, labelColor1: *}} ラベル色をObjで返却
   */
  const getFolderColorById = (id) => {
    const targetFolderData = Const.FOLDER_GROUP.find((folder) => folder.id === id);
    return {
      labelColor1: targetFolderData.labelColor1,
      labelColor2: targetFolderData.labelColor2
    };
  };

  return (
    <div className='FolderBtn'
      style={{ background: `linear-gradient(${getFolderColorById(folderId).labelColor1}, ${getFolderColorById(folderId).labelColor2})` }}
    >
      <p>{getFolderNameById(folderId)}</p>
      <i className='Folder__icon'
        onClick={(e) => onClickFolderRemoveBtn(e, id)}
      >
        <FontAwesomeIcon icon={faXmark}/>
      </i>
    </div>
  );
};

export default FolderRemoveBtn;
