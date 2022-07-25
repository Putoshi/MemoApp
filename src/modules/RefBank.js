let instance = null;

/**
 * Refをシングルトンで保持するクラス
 */
class RefBank {
  constructor() {
    if (instance !== null) {
      throw new Error('SingleTon.getInstance()!!!');
    }
    if (instance === null) {
      instance = this;
    }
    this.refs = {};
    return instance;
  }

  /**
   * Refの追加
   * @param key 索引する時のkeyを指定
   * @param value 格納するRef
   */
  add(key, value) {
    this.refs[key] = value;
  }

  /**
   * Refの取得
   * @param key 索引する時のkeyを指定
   * @returns {*} 索引結果のRef
   */
  get(key) {
    return this.refs[key];
  }

  /**
   * Refの削除
   * @param key 索引する時のkeyを指定
   */
  remove(key) {
    if (this.refs[key]) {
      delete this.refs[key];
    }
  }

  static getInstance() {
    if (instance === null) {
      instance = new RefBank();
    }
    return instance;
  }
}

export default RefBank.getInstance();
