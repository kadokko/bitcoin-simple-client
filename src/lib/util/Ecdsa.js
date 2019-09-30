import { Int } from 'lib/type/Int';
import { KJUR, KEYUTIL } from 'jsrsasign';
import KeyConv from 'lib/util/KeyConv';


class Key {

  constructor(key) {
    this.key = key;
  }

  getPrv() {
    return this.key.prvKeyObj.prvKeyHex;
  }

  getPub() {
    const { x, y } = this.key.prvKeyObj.getPublicKeyXYHex();
    return (Int(y).mod(2).eq(0) ? '02' : '03') + x;
  }

  getUnCompressedPub() {
    return this.key.prvKeyObj.pubKeyHex;
  }
}


class Ecdsa {

  static generate() {
    const key = KEYUTIL.generateKeypair('EC', 'secp256k1');
    return new Key(key);
  }

  static sign(data, privkey) {
    const ec = new KJUR.crypto.ECDSA({ curve: 'secp256k1' });
    let signature = '';
    while (signature.length !== 140) {
      signature = ec.signHex(data, privkey);
    }
    return signature;
  }

  static verify(data, signature, compressedPubkey) {
    const ec = new KJUR.crypto.ECDSA({ curve: 'secp256k1' });
    const pubkey = KeyConv.toUnCompressedPub(compressedPubkey);
    return ec.verifyHex(data, signature, pubkey);
  }

}

export default Ecdsa;
