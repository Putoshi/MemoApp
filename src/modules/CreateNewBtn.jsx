import React from 'react';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {addMemo, sortMemo} from './store/MemoSlice.js';
import Const from './const/Const.js';

const CreateNewBtn = (prop) => {
  const dispatch = useDispatch();

  // ソートオーダーの設定
  const sortBy = Const.SORT_ORDER.DATE_DOWN;

  /**
   * メモの新規作成ボタンハンドラー
   */
  const onClickCreateNewBtn = (folder) => {
    // メモの新規追加
    dispatch(
      addMemo({
        title: '',
        folder
      }),
    );
    // ソート
    dispatch(
      sortMemo({
        sortBy
      }),
    );
  };

  return (
    <div className='MemoList'>
      <button className='MemoList__createNewBtn'
        onClick={() => onClickCreateNewBtn(prop.folder)}
      >
        <FontAwesomeIcon icon={faPlus}/>
      </button>
    </div>

  );
};

export default CreateNewBtn;
