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
  // useEffect(() => {
  //   dispatch(memoAction.createMemo({
  //     createdAt: '2022/07/23',
  //     title: 'aaa',
  //     path: 'favorite',
  //   }));
  // }, []);
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
    <div id='MemoApp'>
      <div className='GlobalNav'>
        <div className='GlobalNav__title'>
          <h1>Memo App</h1>
        </div>
      </div>

      <div className='SideNav'>
        <div className='SideNav__inner'>
          <div className='MemoList'>
            <div className='MemoList__container'>
              <div
                className='MemoThumbnail'
                onDragStart={(e) => dragStart(e)}
                onDragEnter={(e) => dragEnter(e)}
                onDragEnd={drop}
                draggable
              >
                <div className='MemoThumbnail__container'>
                  <div className='MemoThumbnail__inner'>
                    <div className='MemoThumbnail__date'>2022/07/20</div>
                    <div className='MemoThumbnail__title'>
                      <input
                        type=''
                        defaultValue='お買い物リスト'
                        // onChange={e => {
                        //   const page = e.target.value ? Number(e.target.value) - 1 : 0
                        //   table.setPageIndex(page)
                        // }}
                        className=''
                      />
                    </div>
                    <div className='MemoThumbnail__folder'>
                      <i></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <MemoList></MemoList>
      {/* <ul>{memoItems}</ul>*/}

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
