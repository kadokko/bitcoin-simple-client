import { Int } from 'lib/type/Int';
import Hash from './Hash';
import Str from './Str';


export class Base58 {

  static BASE58_CHARS = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'.split('');

  static encode(hex) {
    const lpad = '1'.repeat((hex.length - Str.lstrip(hex, '00').length) / 2);
    const chars = [];
    let d = Int(hex);
    while (d.gt(0)) {
      chars.push(this.BASE58_CHARS[d.mod(58).toJSNumber()]);
      d = d.div(58);
    }
    return lpad + chars.reverse().join('');
  }

  static decode(b58Str) {
    const str = Str.lstrip(b58Str, '1');
    const lpad = '00'.repeat(b58Str.length - str.length);
    if (str === '') {
      return lpad;
    }
    let d = Int(0);
    for (const c of str) {
      let idx = 0;
      for (const [ i, bc ] of this.BASE58_CHARS.entries()) {
        if (c === bc) {
          idx = i;
          break;
        }
      }
      d = d.mul(58).add(idx);
    }
    return lpad + d.toHex();
  }
}


export class Base58Check {

  static encode(hexStr) {
    const hash = Hash.hash256(hexStr);
    return Base58.encode(hexStr + hash.slice(0, 8));
  }

  static decode(b58Str) {
    const decoded = Base58.decode(b58Str);
    const checksum = decoded.slice(-8);
    const checkval = Hash.hash256(decoded.slice(0, -8)).slice(0, 8);
    if (checksum !== checkval) {
      throw new Error('invalid base58 encoded string.');
    }
    return decoded.slice(0, -8);
  }
}
