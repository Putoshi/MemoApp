import React, {useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Const from './const/Const.js';
import Datetime from '../libs/date/Datetime.js';
import {updateMemo, sortMemo} from './store/MemoSlice.js';
import EditorMenu from './EditorMenu.jsx';
import RefBank from './RefBank.js';

/**
 * メモの編集画面
 * @returns {JSX.Element}
 * @constructor
 */
const Editor = () => {
  const dispatch = useDispatch();

  // 選択中のメモID
  const selectedMemoID = useSelector((state) => state.memoReducer.selected);

  /**
   * メモをIDで索引する関数
   * @param id メモのID
   * @param _memos 索引する対象
   * @returns {*} 索引結果のメモ
   */
  const getMemoById = (id, _memos) => {
    return _memos.find((memo) => memo.id === id);
  };

  /**
   * メモのタイトル InputRef
   * @type {React.MutableRefObject<string>}
   */
  const titleInputElm = useRef(null);

  const memos = useSelector((state) => {
    if (state.memoReducer.memos.length > 0) {
      if (titleInputElm.current) {
        titleInputElm.current.value = getMemoById(selectedMemoID, state.memoReducer.memos).title;
      }
    }
    return state.memoReducer.memos;
  });

  // ソートオーダーの設定
  const sortBy = Const.SORT_ORDER.DATE_DOWN;

  useEffect(() => {
    // メモのタイトル InputRefを保持
    RefBank.add('titleInputElm', titleInputElm);
  }, []);

  /**
   * UnixTimeから日付フォーマットに変換
   * @param updatedAt UnixTime
   * @returns {*} #{year}/#{month}/#{date} 形式のString
   */
  const formatDateString = (updatedAt) => {
    return new Datetime(new Date(updatedAt)).toString(Datetime.CALENDAR_TIME);
  };

  /**
   * メモタイトルの編集ハンドラー
   * @param e イベント
   * @param id メモのID
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
   * メモ飛雲分の編集ハンドラー
   * @param e イベント
   * @param id メモのID
   */
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
          memos.filter((memo) => memo.id === selectedMemoID).map((memo) => (
            <div className='Editor__inner' key={memo.id} >

              <EditorMenu id={memo.id} folderId={memo.folder} />

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
