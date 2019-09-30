import Hex from './Hex';


class Num {

  static toVarIntRev(n) {
    const h = this.toVarInt(n);
    return Hex.rev(h);
  }

  static toVarInt(n) {
    const d = typeof (n) === 'number' ? n : Number(n);
    this.checkPositive(d);
    // 1 byte
    if (d < 0xfd) {
      return this.toHex(d, 2);
    }
    // 3 bytes : fd + 2bytes
    if (d <= 0xffff) {
      return 'fd' + this.toHex(d, 4);
    }
    // 5 bytes : fe + 4bytes
    if (d <= 0xffffffff) {
      return 'fe' + this.toHex(d, 8);
    }
    // 9 bytes : ff + 8bytes
    if (d <= 0xffffffffffffffff) {
      return 'ff' + this.toHex(d, 16);
    }
    throw new Error('the number is too big.');
  }

  static toHex(n, size) {
    const d = typeof (n) === 'number' ? n : Number(n);
    this.checkPositive(d);
    return ('0'.repeat(size) + d.toString(16)).slice(size * -1);
  }

  static toHexRev(n, size) {
    return Hex.rev(this.toHex(n, size));
  }

  static checkPositive(n) {
    if (n < 0) {
      throw new Error('Invalid number. n = ' + n);
    }
  }

  static exponentToDecimal(exp) {
    const value = String(exp);
    if (value.indexOf('e-') > 0) {
      const parts = value.split('e-');
      const coefficient = parts[0];
      const exponent = parts[1];
      return '0.' + '0'.repeat(parseInt(exponent, 10) - 1) + coefficient.replace('.', '');
    }
    return value;
  }
}

export default Num;
