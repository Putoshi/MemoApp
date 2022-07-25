import React from 'react';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {deleteMemo} from './store/MemoSlice.js';

/**
 * メモの削除ボタン関数
 * @param prop id:メモのID
 * @returns {JSX.Element}
 * @constructor
 */
const DeleteBtn = (prop) => {
  const dispatch = useDispatch();

  // メモID
  const memoId = prop.id;

  /**
   * リストの削除ボタンクリック
   * @param e イベント
   * @param id 削除するメモID
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
        onClick={(e) => onClickDeleteBtn(e, memoId)}>
        <FontAwesomeIcon icon={faTrashCan}/>
      </i>
    </React.Fragment>
  );
};

export default DeleteBtn;
