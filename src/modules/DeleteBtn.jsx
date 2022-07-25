import React from 'react';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {deleteMemo} from './store/MemoSlice.js';

const DeleteBtn = (prop) => {
  const dispatch = useDispatch();

  /**
   * リストの削除ボタンクリック
   * @param id 削除するリストID
   */
  const onClickDeleteBtn = (e, id) => {
    dispatch(
      deleteMemo({
        id
      }),
    );
    // リストの選択イベントも走ってしまう為、イベントのバブリング停止する
    e.stopPropagation();
  };

  return (
    <React.Fragment>
      <i className='DeleteBtn__icon'
        onClick={(e) => onClickDeleteBtn(e, prop.id)}>
        <FontAwesomeIcon icon={faTrashCan}/>
      </i>
    </React.Fragment>
  );
};

export default DeleteBtn;
