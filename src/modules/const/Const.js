import {SortOrder} from './SortOrder.js';

const ConstParam = {
  LOCALSTORAGE_KEY: 'my_memo_app', // LocalStorageに保存するKey
  FOLDER_GROUP: [
    {
      id:'uncategorized',
      name: 'UNCATEGORIZED',
      labelColor1: '#dcdcdc',
      labelColor2: '#dcdcdc',
    },
    {
      id:'favorite',
      name: 'FAVORITE',
      labelColor1: '#68e5b1',
      labelColor2: '#4ed09a',
    },
    {
      id:'wip',
      name: 'WIP',
      labelColor1: '#ffdd53',
      labelColor2: '#f3cf42',
    },
    {
      id:'archive',
      name: 'Archive',
      labelColor1: '#def579',
      labelColor2: '#e0f194',
    },
  ]
};

/**
 * 定数クラス
 */
export default {
  ...ConstParam,
  SORT_ORDER: SortOrder
};
