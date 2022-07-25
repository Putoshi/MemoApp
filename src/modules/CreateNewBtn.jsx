import React from 'react';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {addMemo, sortMemo} from './store/MemoSlice.js';
import Const from '../const/Const.js';
import RefBank from './RefBank.js';

/**
 * メモの新規作成ボタン関数
 * @param prop folderId:フォルダのID
 * @returns {JSX.Element}
 * @constructor
 */
const CreateNewBtn = (prop) => {
  const dispatch = useDispatch();

  // ソートオーダーの設定
  const sortBy = Const.SORT_ORDER.DATE_DOWN;

  // フォルダのID
  const { folderId } = prop;

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

    // 編集画面のタイトルInputにフォーカス当てる
    const titleInputElm = RefBank.get('titleInputElm');
    if (titleInputElm.current) {
      requestAnimationFrame(() => {
        titleInputElm.current.focus();
      });
    }
  };

  return (
    <div className='MemoList'>
      <button className='MemoList__createNewBtn'
        onClick={() => onClickCreateNewBtn(folderId)}
      >
        <FontAwesomeIcon icon={faPlus}/>
      </button>
    </div>
  );
};

export default CreateNewBtn;
