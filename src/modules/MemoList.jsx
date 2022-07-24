import React from 'react';
import {useSelector} from 'react-redux';
// import { useState, useEffect, useMemo } from 'react';

const MemoList = () => {
  const memos = useSelector((state) => state.memoReducer.memos);
  // console.log(memos);

  // const memoItems = memos.map((value) => <li key={value.id}>{value.title}</li>);

  return (
    <React.Fragment>
      {/* <div>aaa</div>*/}
      {/* <ul>{memoItems}</ul>*/}
      <ul>
        {
          memos.map((memo, index) => (
            <li key={memo.id}>
              {memo.title}
            </li>
          ))
        }
      </ul>
    </React.Fragment>
  );
};

export default MemoList;
