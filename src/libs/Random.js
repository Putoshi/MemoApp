/**
 * Randamな文字列、数値を返すクラス
 */
export default class Random {
  /**
   * This Function is used to generate a v4 UUID using a cryptographically secure random number generator.
   * @returns {string}
   */
  static getRandomUid() {
    return String(self.crypto.randomUUID());
  }
}
