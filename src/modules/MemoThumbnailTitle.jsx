import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateMemo, sortMemo, selectMemo} from './store/MemoSlice.js';
import Datetime from '../libs/date/Datetime.js';
import Const from './const/Const.js';
import DeleteBtn from './DeleteBtn.jsx';

const MemoThumbnailTitle = (prop) => {
  const dispatch = useDispatch();

  const {
    id, // メモのID
    updatedAt, // メモの更新日
    title // メモのタイトル
  } = prop;

  // 選択中のメモID
  const selectedMemoID = useSelector((state) => state.memoReducer.selected);

  // メモをIDで索引
  const getMemoById = (id, _memos) => {
    return _memos.find((memo) => memo.id === id);
  };

  // 編集画面のタイトルInputRef
  const titleInputElm = useRef(null);

  useSelector((state) => {
    // メモが編集画面で更新された場合にリストの方のタイトルも更新する
    if (id === selectedMemoID && state.memoReducer.memos.length > 0) {
      if (titleInputElm.current) {
        titleInputElm.current.value = getMemoById(selectedMemoID, state.memoReducer.memos).title;
      }
    }
    return state.memoReducer.memos;
  });

  // ソートオーダーの設定
  const sortBy = Const.SORT_ORDER.DATE_DOWN;

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
   * リストのタイトル編集ハンドラー
   * @param id タイトル更新するリストID
   */
  const onChangeTitle = (e, id) => {
    // メモのタイトル更新
    dispatch(
      updateMemo({
        id,
        title: e.target.value,
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
   * メモリストのドラッグ開始ハンドラー
   * @param e イベント
   * @param id メモのID
   */
  const onDragStart = (e, id) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  };

  return (
    <div
      className='MemoThumbnail'
      onClick={() => onClickList(id)}
      onDragStart={(e) => onDragStart(e, id)}
      draggable
    >
      <div
        className={(selectedMemoID === id) ? 'MemoThumbnail__container selected' : 'MemoThumbnail__container'}>
        <div className='MemoThumbnail__inner'>
          <div className='MemoThumbnail__date'>{formatDateString(updatedAt)}</div>

          <div className='MemoThumbnail__title'>
            <input
              ref={titleInputElm}
              type='text'
              maxLength={30}
              defaultValue={title}
              onChange={(e) => onChangeTitle(e, id)}
              className=''
            />
            <DeleteBtn id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoThumbnailTitle;
