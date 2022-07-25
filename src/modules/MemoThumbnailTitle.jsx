import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {updateMemo, deleteMemo, sortMemo, selectMemo} from './store/MemoSlice.js';
import Datetime from '../libs/date/Datetime.js';
import Const from './const/Const.js';

const MemoThumbnailTitle = (prop) => {
  const dispatch = useDispatch();
  const selectedListID = useSelector((state) => state.memoReducer.selected);
  const getMemoById = (id, _memos) => {
    return _memos.find((memo) => memo.id === id);
  };
  const titleInputElm = useRef('');
  const memos = useSelector((state) => {
    if (prop.memo.id === selectedListID && state.memoReducer.memos.length > 0) {
      const targetMemo = getMemoById(selectedListID, state.memoReducer.memos);
      if (titleInputElm.current) {
        titleInputElm.current.value = targetMemo.title;
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


  const dragStart = (e, id) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  };

  return (
    <React.Fragment>
      <div
        className='MemoThumbnail'
        onClick={() => onClickList(prop.memo.id)}
        onDragStart={(e) => dragStart(e, prop.memo.id)}
        draggable
      >
        <div
          className={(selectedListID === prop.memo.id) ? 'MemoThumbnail__container selected' : 'MemoThumbnail__container'}>
          <div className='MemoThumbnail__inner'>
            <div className='MemoThumbnail__date'>{formatDateString(prop.memo.updatedAt)}</div>

            <div className='MemoThumbnail__title'>
              <input
                ref={titleInputElm}
                type='text'
                maxLength={30}
                defaultValue={prop.memo.title}
                onChange={(e) => onChangeTitle(e, prop.memo.id)}
                className=''
              />
              <i className='MemoThumbnail__title__icon'
                onClick={(e) => onClickDeleteBtn(e, prop.memo.id)}>
                <FontAwesomeIcon icon={faTrashCan}/>
              </i>

            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MemoThumbnailTitle;
