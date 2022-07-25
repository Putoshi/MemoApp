import React from 'react';
import {useSelector} from 'react-redux';
import MemoThumbnailTitle from './MemoThumbnailTitle.jsx';

/**
 * SideNav内のメモグループブロックの関数
 * @param prop folderId:フォルダのID
 * @returns {JSX.Element}
 * @constructor
 */
const MemoGroup = (prop) => {
  const memos = useSelector((state) => state.memoReducer.memos);

  // フォルダのID
  const { folderId } = prop;
  return (
    <div className='MemoGroup'>
      {
        memos.filter((memo) => memo.folder === folderId).map((memo) => (
          <MemoThumbnailTitle id={memo.id} updatedAt={memo.updatedAt} title={memo.title} key={memo.id}></MemoThumbnailTitle>
        ))
      }
    </div>
  );
};

export default MemoGroup;
