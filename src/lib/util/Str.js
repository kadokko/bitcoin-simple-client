import Hex from './Hex';
import Seq from './Seq';


class Str {

  static lstrip(str, pattern) {
    const regexp = new RegExp('^(' + pattern + '){1,}(.*)$');
    const result = str.match(regexp);
    return result !== null ? result[2] : str;
  }

  static hex(str) {
    return str
      .split('')
      .map(c => (
        Hex.zeropad(c.charCodeAt(0).toString(16))
      ))
      .join('');
  }

  static split(str, n) {
    return Seq.generate(str.length)
      .filter(i => i % n === 0)
      .map(i => str.substring(i, i + n));
  }

  static removeDelimiter(str, delimiter = ' ') {
    if (str == null) return '';
    return str
      .replace(/\r/g, delimiter)
      .replace(/\n/g, delimiter)
      .replace(/\s+/g, delimiter)
      .trim();
  }

  static removeChar(str, char) {
    return str
      .replace(new RegExp(char, 'g'), '')
      .trim();
  }

  static removeChars(str, chars) {
    if (str == null) return '';
    let result = str;
    for (let i = 0; i < chars.length; i++) {
      result = Str.removeChar(result, chars[i]);
    }
    return result;
  }

  static removeSpace(str) {
    if (str == null) return '';
    return Str.removeChars(str, [ ' ', '\n', '\r' ]);
  }

  static firstChar(str) {
    if (str == null) return '';
    return str.substr(0, 1);
  }

  static lastChar(str) {
    if (str == null) return '';
    return str.substr(-1);
  }
}

export default Str;
