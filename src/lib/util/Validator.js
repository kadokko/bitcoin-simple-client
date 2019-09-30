import { DecInt } from 'lib/type/Int';
import Str from 'lib/util/Str';


class Validator {

  static isNum(v) {
    return this.isNotEmpty(v) && !Number.isNaN(v);
  }

  static isNumber(v) {
    return this.isNotEmpty(v) && typeof v === 'number';
  }

  static isString(v) {
    return this.isNotEmpty(v) && typeof v === 'string';
  }

  static isInt(v) {
    return this.isNotEmpty(v) && (Number.isInteger(v) || this.isIntString(v));
  }

  static isPositiveInt(v) {
    return this.isNotEmpty(v) && (this.isPositiveIntString(String(v)) || (Number.isInteger(v) && Number.isInteger(v) >= 0));
  }

  static isHex(v) {
    return this.isString(v) && this.isHexString(v);
  }

  static isBit(v) {
    return this.isString(v) && this.isBitString(v);
  }

  static isCurrency(v) {
    return this.isNotEmpty(v) && this.isString(v) && this.isPositiveInt(Str.removeChar(v, ','));
  }

  static isAlphaNumeric(v) {
    return this.isNotEmpty(v) && this.isAlphaNumericString(String(v));
  }

  static isAlphaNumericSpace(v) {
    return this.isNotEmpty(v) && this.isAlphaNumericSpaceString(String(v));
  }

  static isAlphaNumericUnderscoreWhiteSpace(v) {
    return this.isNotEmpty(v) && this.isAlphaNumericUnderscoreWhiteSpaceString(String(v));
  }

  static range(v, min, max) {
    const n = DecInt(v);
    return n.ge(DecInt(min)) && n.le(DecInt(max));
  }

  static isEmpty(v) {
    return v == null || v === '' || (typeof v === 'object' && Object.keys(v).length === 0);
  }

  static isNotEmpty(v) {
    return !this.isEmpty(v);
  }

  static isByteLen(v, size) {
    if (v == null) {
      return false;
    }
    return v.length === size * 2;
  }

  static isHexString(v) {
    return /^[0-9a-fA-F]+$/.test(v);
  }

  static isBitString(v) {
    return /^[01]+$/.test(v);
  }

  static isIntString(v) {
    return /^-?\d+$/.test(v);
  }

  static isPositiveIntString(v) {
    return v === '0' || /^[1-9]+[0-9]*$/.test(v);
  }

  static isAlphaNumericString(v) {
    return /^[0-9a-zA-Z]+$/.test(v);
  }

  static isAlphaNumericSpaceString(v) {
    return /^[0-9a-zA-Z ]+$/.test(v);
  }

  static isAlphaNumericUnderscoreWhiteSpaceString(v) {
    return /^[0-9a-zA-Z_ \r\n]+$/.test(v);
  }

  // TODO to be accurate
  static isClass(instance, className) {
    return instance.constructor.name === className;
  }

}

export default Validator;
