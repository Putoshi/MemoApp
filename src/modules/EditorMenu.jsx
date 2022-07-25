import React from 'react';
import DeleteBtn from './DeleteBtn.jsx';
import FolderBtn from './FolderBtn.jsx';

const EditorMenu = (prop) => {
  return (
    <div className='Editor__menu'>
      <div className='Editor__menu__circleBtn'>
        <DeleteBtn id={prop.id}/>
      </div>
      <div className='Editor__menu__btn'>
        {(prop.folder !== 'uncategorized') && <FolderBtn id={prop.id} folder={prop.folder}/> }
      </div>
    </div>
  );
};

export default EditorMenu;
