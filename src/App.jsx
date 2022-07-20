import {useState, useEffect, useMemo} from 'react';
import reactLogo from './assets/react.svg';

import {makeData} from './module/MemoData.js';

import './App.styl';


const App = () => {
  const [data, setData] = useState(() => makeData(3));

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

  // const columns = useMemo(
  //   () => [
  //     {
  //       header: 'Memo',
  //       footer: props => props.column.id,
  //       columns: [
  //         {
  //           accessorKey: 'createdAt',
  //           footer: props => props.column.id,
  //         },
  //         {
  //           accessorKey: 'title',
  //           footer: props => props.column.id,
  //         },
  //         {
  //           accessorKey: 'path',
  //           footer: props => props.column.id,
  //         }
  //       ],
  //     }
  //   ],
  //   []
  // );

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

              <div className='MemoThumbnail'
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
    </div>
  );
};

export default App;


