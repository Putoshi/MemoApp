import {defineEnum} from '../../libs/Enum.js';

/**
 * ソートオーダーの列挙型
 * @type {{DATE_DOWN: string, DATE_UP: string}}
 */
export const SortOrder = defineEnum({
  DATE_UP:'DATE_UP',
  DATE_DOWN:'DATE_DOWN'
});
