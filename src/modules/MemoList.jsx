import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {addMemo, sortMemo, selectMemo, updateMemo} from './MemoSlice.js';
import MemoGroup from './MemoGroup.jsx';
import FolderGroup from './FolderGroup.jsx';
import Const from './const/Const.js';

const MemoList = () => {
  const dispatch = useDispatch();
  const memos = useSelector((state) => state.memoReducer.memos);
  const selectedListID = useSelector((state) => state.memoReducer.selected);

  // ソートオーダーの設定
  const sortBy = Const.SORT_ORDER.DATE_DOWN;


  useEffect(() => {
    // 初期化時にソートする
    dispatch(
      sortMemo({
        sortBy
      }),
    );

    // 初期化時に選択状態にあるリストを確認して、存在しない場合は先頭のリストを選択
    const selectedMemo = memos.find((memo) => memo.id === selectedListID);
    if (!selectedMemo) {
      dispatch(
        selectMemo({
          id: (memos.length > 0) ? memos[0].id : null
        })
      );
    }
  }, []);

  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const onDrop = (e, folderId) => {
    const memoId = e.dataTransfer.getData('text/plain');

    // メモの新規追加
    dispatch(
      updateMemo({
        id:memoId,
        folder: folderId
      }),
    );

    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };


  /**
   * メモの新規作成ボタンハンドラー
   */
  const onClickCreateNewBtn = () => {
    // メモの新規追加
    dispatch(
      addMemo({
        title: ''
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
      <div>
        <button className='MemoList__creatNewBtn'
          onClick={() => onClickCreateNewBtn()}
        >
          <FontAwesomeIcon icon={faPlus}/>
        </button>
      </div>

      <div
        className={'Folder'}
        onDragOver={(e) => {
          onDragOver(e);
        }}
        onDrop={(e) => {
          onDrop(e, 'uncategorized');
        }}
      >
        <MemoGroup
          folderName={'uncategorized'}
        />
      </div>


      <div>
        <FolderGroup>
        </FolderGroup>
      </div>


    </div>

  );
};

export default MemoList;
