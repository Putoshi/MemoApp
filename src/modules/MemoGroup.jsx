import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {updateMemo, deleteMemo, sortMemo, selectMemo} from './MemoSlice.js';
import Datetime from '../libs/date/Datetime.js';
import Const from './const/Const.js';

const MemoGroup = (props) => {
  const dispatch = useDispatch();
  const memos = useSelector((state) => state.memoReducer.memos);
  const selectedListID = useSelector((state) => state.memoReducer.selected);

  // ソートオーダーの設定
  const sortBy = Const.SORT_ORDER.DATE_DOWN;

  // フォルダ属性
  const { folderName } = props;

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


  const dragStart = (e, id) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  };

  return (
    <div className='MemoGroup'>
      {
        memos.filter((memo) => memo.folder === folderName).map((memo) => (
          <div key={memo.id}
            className='MemoThumbnail'
            onClick={() => onClickList(memo.id)}
            onDragStart={(e) => dragStart(e, memo.id)}
            draggable
          >
            <div
              className={(selectedListID === memo.id) ? 'MemoThumbnail__container selected' : 'MemoThumbnail__container'}>
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
                  <i className='MemoThumbnail__title__icon'
                    onClick={(e) => onClickDeleteBtn(e, memo.id)}>
                    <FontAwesomeIcon icon={faTrashCan}/>
                  </i>

                </div>
              </div>
            </div>
          </div>
        ))
      }

    </div>

  );
};

export default MemoGroup;
