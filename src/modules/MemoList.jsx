import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import {addMemo, updateMemo, deleteMemo, sortMemo} from './MemoSlice.js';
import Datetime from '../libs/date/Datetime.js';
import Const from './const/Const.js';
// import { useState, useEffect, useMemo } from 'react';

const MemoList = () => {
  const dispatch = useDispatch();
  const memos = useSelector((state) => state.memoReducer.memos);

  // ソートオーダーの設定
  const sortBy = Const.SortOrder.DATE_DOWN;

  // 初期化時にソートする
  useEffect(() => {
    dispatch(
      sortMemo({
        sortBy
      }),
    );
  }, []);

  /**
   * リストの削除ボタンクリック
   * @param id
   */
  const onClickDeleteBtn = (id) => {
    console.log('onClickDeleteBtn');
    dispatch(
      deleteMemo({
        id
      }),
    );
  };

  /**
   * リストのタイトル編集ハンドラー
   * @param id
   */
  const onChangeTitle = (e, id) => {
    dispatch(
      updateMemo({
        id,
        title: e.target.value
      }),
    );

    dispatch(
      sortMemo({
        sortBy
      }),
    );
  };

  const formatDateString = (createdAt) => {
    return new Datetime(new Date(createdAt)).toString(Datetime.CALENDAR);
  };

  /**
   * 新たなメモの作成
   */
  const onClickCreateNewBtn = () => {
    dispatch(
      addMemo({
        title: ''
      }),
    );
    dispatch(
      sortMemo({
        sortBy
      }),
    );
  };

  // console.log(memos);

  // const memoItems = memos.map((value) => <li key={value.id}>{value.title}</li>);

  const dragStart = (e, position) => {
    console.log('dragStart');
    // dragItem.current = position;
    // console.log(e.target.innerHTML);
  };

  const dragEnter = (e, position) => {
    console.log('dragEnter');
    // dragOverItem.current = position;
    // console.log(e.target.innerHTML);
  };

  const drop = (e) => {
    console.log('drop');
    // const copyListItems = [...list];
    // const dragItemContent = copyListItems[dragItem.current];
    // copyListItems.splice(dragItem.current, 1);
    // copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    // dragItem.current = null;
    // dragOverItem.current = null;
    // setList(copyListItems);
  };

  return (
    <div className='MemoList'>
      <div>
        <div>
          <button className='MemoList__creatNewBtn'
            onClick={() => onClickCreateNewBtn()}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
      <div className='MemoList__container'>
        {
          memos.map((memo, index) => (
            <div key={memo.id}
              className='MemoThumbnail'
              onDragStart={(e) => dragStart(e)}
              onDragEnter={(e) => dragEnter(e)}
              onDragEnd={drop}
              draggable
            >
              <div className='MemoThumbnail__container'>
                <div className='MemoThumbnail__inner'>
                  <div className='MemoThumbnail__date'>{formatDateString(memo.updatedAt)}</div>

                  <div className='MemoThumbnail__title'>
                    <input
                      type='text'
                      maxLength={30}
                      defaultValue={memo.title}
                      // onChange={e => {
                      //   const page = e.target.value ? Number(e.target.value) - 1 : 0
                      //   table.setPageIndex(page)
                      // }}
                      onChange={(e) => onChangeTitle(e, memo.id)}
                      className=''
                    />
                    <i className='MemoThumbnail__title__icon' onClick={() => onClickDeleteBtn(memo.id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </i>

                  </div>
                  <div className='MemoThumbnail__folder'>
                    <i>
                      {/* <FontAwesomeIcon icon={faPlusLarge} />*/}
                    </i>
                  </div>
                </div>
              </div>
            </div>
          ))
        }

      </div>


    </div>

  );
};

export default MemoList;
