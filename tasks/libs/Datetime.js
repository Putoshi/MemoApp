/**
 * Dateを整形して出力するクラス
 */
export default class Datetime {
  static INFO = '#{year}.#{month}.#{date} #{hour}:#{min}:#{sec}';

  static CALENDAR = '#{year}/#{month}/#{date}';

  static CALENDAR_TIME = '#{year}/#{month}/#{date}  #{hour}:#{min}:#{sec}';

  static JP_TIME = '#{year}年#{month}月#{date}日 #{hour}時#{min}分';

  static CLOCK = '#{hour}:#{min}:#{sec}';

  static DIR_NAME = '#{year}#{month}#{date}_#{hour}#{min}#{sec}';

  constructor(date) {
    if (typeof (date) == 'string') {
      this.year = date.substr(0, 4);
      this.month = date.substr(4, 2);
      this.date = date.substr(6, 2);
      this.hour = date.substr(8, 2);
      this.min = date.substr(10, 2);
      this.sec = date.substr(12, 2);
    } else
    if (date instanceof Date) {
      this.year = String(date.getFullYear());
      this.month = Datetime.zeroPadding(date.getMonth() + 1);
      this.date = Datetime.zeroPadding(date.getDate());
      this.hour = Datetime.zeroPadding(date.getHours());
      this.min = Datetime.zeroPadding(date.getMinutes());
      this.sec = Datetime.zeroPadding(date.getSeconds());
    }
  }

  toString(format) {
    if (format) {
      let text = format;
      text = text.replace('#{year}', this.year);
      text = text.replace('#{month}', this.month);
      text = text.replace('#{date}', this.date);
      text = text.replace('#{hour}', this.hour);
      text = text.replace('#{min}', this.min);
      text = text.replace('#{sec}', this.sec);
      return text;
    }
    return this.year + this.month + this.date + this.hour + this.min + this.sec;
  }

  /**
   * 0埋め関数
   * @param num
   * @returns {string}
   */
  static zeroPadding(num) {
    if (num < 10) {
      return `0${num}`;
    }
    return String(num);
  }
}
