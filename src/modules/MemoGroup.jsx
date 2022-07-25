import React from 'react';
import {useSelector} from 'react-redux';
import MemoThumbnailTitle from './MemoThumbnailTitle.jsx';

const MemoGroup = (props) => {
  const memos = useSelector((state) => state.memoReducer.memos);

  // フォルダ属性
  const { folderName } = props;
  return (
    <div className='MemoGroup'>
      {
        memos.filter((memo) => memo.folder === folderName).map((memo) => (
          <MemoThumbnailTitle memo={memo} key={memo.id}></MemoThumbnailTitle>
        ))
      }

    </div>

  );
};

export default MemoGroup;
