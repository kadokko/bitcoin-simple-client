import Validator from 'lib/util/Validator';


class Currency {

  static format = (value) => {
    const v = String(value).trim();
    return Validator.isCurrency(v) ? this.toSeparatedNumber(v) : v;
  };

  static normalize = (value) => {
    return String(value).replace(/,/g, '');
  };

  static toSeparatedNumber = (value, char=',', interval=3) => {
    const len = value.length;
    if (len <= interval) {
      return value;
    }
    const ret = [];
    for (let i = len; i > 0; i -= interval) {
      ret.unshift(value.slice(i - interval > 0 ? i - interval : 0, i));
    }
    return ret.join(char);
  }
}

export default Currency;
