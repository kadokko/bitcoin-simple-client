import crypto from 'crypto';
import Hex from './Hex';


class Hash {

  static sha256(hexStr) {
    return Hex.zeropad(crypto
      .createHash('sha256')
      .update(Hex.zeropad(hexStr), 'hex')
      .digest('hex'));
  }

  static ripemd160(hexStr) {
    return Hex.zeropad(crypto
      .createHash('ripemd160')
      .update(Hex.zeropad(hexStr), 'hex')
      .digest('hex'));
  }

  static hash256(hexStr) {
    return this.sha256(this.sha256(hexStr));
  }

  static hash160(hexStr) {
    return this.ripemd160(this.sha256(hexStr));
  }

}

export default Hash;
