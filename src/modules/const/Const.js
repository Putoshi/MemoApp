import {SortOrder} from './SortOrder.js';

const ConstParam = {
  LOCALSTORAGE_KEY: 'my_memo_app', // LocalStorageに保存するKey
  FOLDER_GROUP: [
    {
      id:'uncategorized',
      name: 'UNCATEGORIZED',
      lavelColor: '#68e5b1',
    },
    {
      id:'favorite',
      name: 'FAVORITE',
      lavelColor: '#e59a68',
    },
    {
      id:'wip',
      name: 'WIP',
      lavelColor: '#dcc864',
    },
    {
      id:'archive',
      name: 'Archive',
      lavelColor: '#c6dc64',
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
