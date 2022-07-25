import {defineEnum} from '../libs/Enum.js';

/**
 * ソートオーダーの列挙型
 * @type {{DATE_DOWN: string, DATE_UP: string}}
 */
export const SORT_ORDER = defineEnum({
  DATE_UP:'DATE_UP', // 更新日時昇順
  DATE_DOWN:'DATE_DOWN' // 更新日時降順
});
