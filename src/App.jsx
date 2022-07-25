import {useState, useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';


import {updateMemo} from './modules/MemoSlice.js';

// import reactLogo from './assets/react.svg';

import MemoList from './modules/MemoList.jsx';
import Editor from './modules/Editor.jsx';

import './App.styl';

const App = () => {
  console.log('App');
  // const [data, setData] = useState(() => makeMemo(0));

  const dispatch = useDispatch();

  /**
   * メモ更新
   */
  const onClickUpdateMemoBtn = () => {
    // dispatch(
    //   updateMemo({
    //     id: 'faubodufbao',
    //     title: 'sssss',
    //     path: 'favorite',
    //   }),
    // );
  };

  return (
    <div id='MemoApp'>
      <div className='SideNav'>
        <h1>Memo App 📝</h1>
        <div className='SideNav__inner'>
          <MemoList></MemoList>
        </div>
      </div>

      {/* <button*/}
      {/*  onClick={() => onClickUpdateMemoBtn()}*/}
      {/* >*/}
      {/*  UPDATE*/}
      {/* </button>*/}

      <Editor />

    </div>
  );
};

export default App;
