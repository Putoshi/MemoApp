import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Const from './const/Const.js';
import Datetime from '../libs/date/Datetime.js';
import {updateMemo, sortMemo} from './store/MemoSlice.js';

const Editor = () => {
  const dispatch = useDispatch();
  const selectedListID = useSelector((state) => state.memoReducer.selected);
  const getMemoById = (id, _memos) => {
    return _memos.find((memo) => memo.id === id);
  };

  const titleInputElm = useRef('');

  const memos = useSelector((state) => {
    if (state.memoReducer.memos.length > 0) {
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
   * UnixTimeから日付フォーマットに変換
   * @param updatedAt UnixTime
   * @returns {*} #{year}/#{month}/#{date} 形式のString
   */
  const formatDateString = (updatedAt) => {
    return new Datetime(new Date(updatedAt)).toString(Datetime.CALENDAR_TIME);
  };

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

  const onChangeBody = (e, id) => {
    // メモのタイトル更新
    dispatch(
      updateMemo({
        id,
        data: e.target.value,
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
    <div className='Editor'>
      <div className='Editor__wrapper'>
        {
          memos.filter((memo) => memo.id === selectedListID).map((memo) => (
            <div className='Editor__inner' key={memo.id} >

              <div className='Editor__menu'></div>

              <div className='Editor__title'>
                <p className='Editor__date'>{formatDateString(memo.updatedAt)}</p>
                <input
                  ref={titleInputElm}
                  type='text'
                  maxLength={30}
                  defaultValue={memo.title}
                  onChange={(e) => onChangeTitle(e, memo.id)}
                  className=''
                />
              </div>

              <div className='Editor__body'>
                <textarea
                  type='text'
                  defaultValue={memo.data}
                  onChange={(e) => onChangeBody(e, memo.id)}
                  className=''
                />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Editor;
