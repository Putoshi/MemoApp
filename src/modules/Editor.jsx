import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Const from './const/Const.js';

const Editor = () => {
  const dispatch = useDispatch();
  const memos = useSelector((state) => state.memoReducer.memos);
  const selectedListID = useSelector((state) => state.memoReducer.selected);

  // ソートオーダーの設定
  const sortBy = Const.SORT_ORDER.DATE_DOWN;

  return (
    <div className='Editor'>
      <div className='Editor__wrapper'>
        {
          memos.filter((memo) => memo.id === selectedListID).map((memo) => (
            <div className='Editor__inner' key={memo.id} >
              <div className='Editor__title'>
                <input
                  type='text'
                  maxLength={30}
                  defaultValue={memo.title}
                  // onChange={(e) => onChangeTitle(e, memo.id)}
                  className=''
                />

              </div>

              <div className='Editor__body'>
                <textarea
                  type='text'
                  defaultValue={memo.data}
                  // onChange={(e) => onChangeTitle(e, memo.id)}
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
