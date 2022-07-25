import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addMemo, sortMemo, selectMemo} from './store/MemoSlice.js';
import MemoGroup from './MemoGroup.jsx';
import CreateNewBtn from './CreateNewBtn.jsx';
import FolderGroup from './FolderGroup.jsx';
import {onDragOver, onDrop} from './DragEvent.js';
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

  return (
    <div className='MemoList'>

      <div className='Frame'
        onDragOver={(e) => {
          onDragOver(e);
        }}
        onDrop={(e) => {
          onDrop(e, dispatch, 'uncategorized');
        }}
      >
        <div className='Frame__label'>
          <CreateNewBtn folder='uncategorized' />
        </div>

        <div className={'Folder'} >
          <MemoGroup
            folderName={'uncategorized'}
          />
        </div>

      </div>


      <div>
        <FolderGroup />
      </div>


    </div>

  );
};

export default MemoList;
