/**
 * Enumの実装クラス
 */
export default class Enum {
  constructor() {
    this.enums = [];
    this.lookups = {};
  }

  /**
   * enumを取得する
   * @return {array} enumオブジェクト
   */
  getEnums() {
    return this.enums;
  }

  /**
   * enumを追加する
   * @param {object} e enumの追加情報
   */
  addEnum(e) {
    this.enums.push(e);
  }

  /**
   * 名前を取得する
   * @param {string} name 名前
   * @return {string} 名前文字列
   */
  getByName(e) {
    return this[name];
  }

  /**
   * 値を取得する
   * @param  {string} field フィールド
   * @param  {object} value 値
   * @return {object} 設定した値
   */
  getByValue(field, value) {
    let lookup = this.lookups[field];
    if (lookup) {
      return lookup[value];
    }
    this.lookups[field] = (lookup = {});
    let k = this.enums.length - 1;
    for (; k >= 0; --k) {
      const m = this._enums[k];
      const j = m[field];
      lookup[j] = m;
      if (j === value) {
        return m;
      }
    }

    return null;
  }
}

/**
 * Enumを定義する
 * @param  {object} definition 定義内容
 * @return {object} enum
 */
export const defineEnum = (definition) => {
  let key = null;
  const e = new Enum();
  for (key in definition) {
    const j = definition[key];
    e[key] = j;
    e.addEnum(j);
  }
  return e;
};
