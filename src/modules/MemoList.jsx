import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import {addMemo, updateMemo, deleteMemo, sortMemo, selectMemo} from './MemoSlice.js';
import Datetime from '../libs/date/Datetime.js';
import Const from './const/Const.js';
// import { useState, useEffect, useMemo } from 'react';

const MemoList = () => {
  const dispatch = useDispatch();
  const memos = useSelector((state) => state.memoReducer.memos);
  const selectedListID = useSelector((state) => state.memoReducer.selected);

  // ソートオーダーの設定
  const sortBy = Const.SortOrder.DATE_DOWN;


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
          id: memos[0].id
        })
      );
    }
  }, []);

  /**
   * リスト選択時ハンドラー
   * @param id 選択したリストID
   */
  const onClickList = (id) => {
    dispatch(
      selectMemo({
        id
      }),
    );
  };

  /**
   * リストの削除ボタンクリック
   * @param id 削除するリストID
   */
  const onClickDeleteBtn = (e, id) => {
    console.log('onClickDeleteBtn');
    dispatch(
      deleteMemo({
        id
      }),
    );

    // リストの選択イベントも走ってしまう為、イベントのバブリング停止する
    e.stopPropagation();
  };

  /**
   * リストのタイトル編集ハンドラー
   * @param id タイトル更新するリストID
   */
  const onChangeTitle = (e, id) => {
    // メモの新規追加
    dispatch(
      updateMemo({
        id,
        title: e.target.value
      }),
    );

    // ソート
    dispatch(
      sortMemo({
        sortBy
      }),
    );
  };

  /**
   * UnixTimeから日付フォーマットに変換
   * @param updatedAt UnixTime
   * @returns {*} #{year}/#{month}/#{date} 形式のString
   */
  const formatDateString = (updatedAt) => {
    return new Datetime(new Date(updatedAt)).toString(Datetime.CALENDAR);
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
              onClick={(e) => onClickList(memo.id)}
              onDragStart={(e) => dragStart(e)}
              onDragEnter={(e) => dragEnter(e)}
              onDragEnd={drop}
              draggable
            >
              <div className={(selectedListID === memo.id) ? 'MemoThumbnail__container selected' : 'MemoThumbnail__container'}>
                <div className='MemoThumbnail__inner'>
                  <div className='MemoThumbnail__date'>{formatDateString(memo.updatedAt)}</div>

                  <div className='MemoThumbnail__title'>
                    <input
                      type='text'
                      maxLength={30}
                      defaultValue={memo.title}
                      onChange={(e) => onChangeTitle(e, memo.id)}
                      className=''
                    />
                    <i className='MemoThumbnail__title__icon' onClick={(e) => onClickDeleteBtn(e, memo.id)}>
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
