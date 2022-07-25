import React from 'react';
import DeleteBtn from './DeleteBtn.jsx';
import FolderRemoveBtn from './FolderRemoveBtn.jsx';

/**
 * メモの編集画面のヘッダーメニュー
 * @param prop id:メモのID、folderId:フォルダのID
 * @returns {JSX.Element}
 * @constructor
 */
const EditorMenu = (prop) => {
  const {
    id, // メモのID
    folderId // フォルダのID
  } = prop;

  return (
    <div className='Editor__menu'>
      <div className='Editor__menu__circleBtn'>
        <DeleteBtn id={prop.id}/>
      </div>
      <div className='Editor__menu__btn'>
        {(folderId !== 'uncategorized') && <FolderRemoveBtn id={id} folderId={folderId}/> }
      </div>
    </div>
  );
};

export default EditorMenu;
