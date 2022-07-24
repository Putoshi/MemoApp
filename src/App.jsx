import {useState, useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';


import {addMemo, updateMemo, deleteMemo} from './modules/MemoSlice.js';


// import reactLogo from './assets/react.svg';

// import { makeMemo } from './modules/MemoData.js';
import MemoList from './modules/MemoList.jsx';

import './App.styl';

const App = () => {
  // const [data, setData] = useState(() => makeMemo(0));
  // const memos = useSelector((state) => state.memoReducer.memos);
  // // console.log(memos);
  //
  // const memoItems = memos.map((value) => <li key={value.id}>{value.title}</li>);


  const dispatch = useDispatch();

  //
  // const memos = useSelector((state) => state.memoReducer.memos);
  // console.log(memos);


  /**
   * 新たなメモの作成
   */
  const onClickCreateNewMemoBtn = () => {
    console.log('createNewMemo');
    dispatch(
      addMemo({
        title: 'NEWNEW',
        path: 'favorite',
      }),
    );
  };

  /**
   * メモ更新
   */
  const onClickUpdateMemoBtn = () => {
    dispatch(
      updateMemo({
        id: 'faubodufbao',
        title: 'sssss',
        path: 'favorite',
      }),
    );
  };

  /**
   * メモ削除
   */
  const onClickDeleteMemoBtn = () => {
    dispatch(
      deleteMemo({
        id: 'faubodufbao',
      }),
    );
  };


  return (
    <div id='MemoApp'>
      <div className='GlobalNav'>
        <div className='GlobalNav__title'>
          <h1>Memo App</h1>
        </div>
      </div>

      <div className='SideNav'>
        <div className='SideNav__inner'>
          <MemoList></MemoList>
        </div>
      </div>

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

      <button
        onClick={() => onClickCreateNewMemoBtn()}
      >
        ADD
      </button>

      <button
        onClick={() => onClickUpdateMemoBtn()}
      >
        UPDATE
      </button>

      <button
        onClick={() => onClickDeleteMemoBtn()}
      >
        DELETE
      </button>
    </div>
  );
};

export default App;
