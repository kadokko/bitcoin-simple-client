import { KJUR } from 'jsrsasign';
import { AddrPrefix } from 'lib/constant';
import { Int } from 'lib/type/Int';
import { Base58Check } from 'lib/util/Base58';
import { Secp256k1, Generator, Point } from 'lib/util/Secp256k1';
import Hash from 'lib/util/Hash';
import Hex from 'lib/util/Hex';
import Num from 'lib/util/Num';
import Str from 'lib/util/Str';


class Hmac512 {
  static digest(pass, data) {
    return new KJUR.crypto.Mac({
      alg: 'HmacSHA512',
      pass: { hex: pass },
    }).doFinalHex(data);
  }
}


class HDKey {

  PRVKEY_PAD = '00';
  G = Generator.getPoint();

  constructor(prvKey, pubKey, chainCode, depth, fingerprint, childNum) {
    this.prvKey = prvKey;
    this.pubKey = pubKey;
    this.chainCode = chainCode;
    this.depth = depth;
    this.fingerprint = fingerprint;
    this.childNum = childNum;
  }

  extPrv() {
    return this.toExtKey(AddrPrefix().xprvkey, this.prvKey, this.PRVKEY_PAD);
  }

  extPub() {
    return this.toExtKey(AddrPrefix().xpubkey, this.pubKey);
  }

  // m: master private key
  // M: master public  key
  derive(path) {
    if (Str.firstChar(path).toLowerCase() !== 'm') {
      throw new Error('invalid hd key path');
    }
    const isPrv = Str.firstChar(path) === 'm';
    for (let idx of path.split('/').slice(1)) {
      if (!isPrv && idx.substr(-1) === "'") {
        throw new Error('public key can not have harden type.');
      }
      if (isPrv && idx.substr(-1) === "'") {
        idx = parseInt(idx.substr(0, idx.length - 1), 10) + (2 ** 31);
      } else {
        idx = parseInt(idx, 10);
      }
      if (isPrv) {
        this.derivePrvChildKey(idx);
      } else {
        this.derivePubChildKey(idx);
      }
    }
    return this;
  }

  derivePrvChildKey(childNum) {
    if (this.prvKey == null) throw new Error('Unable to derive the secret key from the public key.');
    const harden = childNum >= (2 ** 31);
    const parentPrvKey = this.prvKey;
    const parentPubKey = this.pubKey;
    const parentChainCode = this.chainCode;
    const data = harden
      ? this.PRVKEY_PAD + Hex.zeropad(parentPrvKey) + Num.toHex(childNum, 8)
      : parentPubKey + Num.toHex(childNum, 8);
    const I = Hmac512.digest(parentChainCode, data);
    const k = Int(I.substr(0, 64)).add(Int(parentPrvKey));
    // TODO .mod(Secp256k1.n);

    this.prvKey = k.mod(Int(Secp256k1.n)).toHex();
    this.pubKey = Hex.zeropad(this.G.mul(this.prvKey).compressedPubkey());
    this.chainCode = I.substr(64);
    this.depth += 1;
    this.fingerprint = Hash.hash160(parentPubKey).substr(0, 8);
    this.childNum = childNum;
  }

  derivePubChildKey(childNum) {
    if (childNum >= (2 ** 31)) throw new Error('child number must be less then 2**31. (pubkey must not be harden.)');
    const parentPubKey = this.pubKey;
    const parentChainCode = this.chainCode;
    const data = parentPubKey + Num.toHex(childNum, 8);
    const I = Hmac512.digest(parentChainCode, data);
    const p1 = Point.from(parentPubKey);
    const p2 = Point.from(this.G.mul(I.substr(0, 64)).compressedPubkey());
    const p3 = p1.add(p2);

    this.prvKey = null;
    this.pubKey = p3.compressedPubkey();
    this.chainCode = I.substr(64);
    this.depth += 1;
    this.fingerprint = Hash.hash160(parentPubKey).substr(0, 8);
    this.childNum = childNum;
  }

  neuter() {
    const hdkey = HDKey.fromExtKey(this.extPub());
    this.prvKey = hdkey.prvKey;
    this.pubKey = hdkey.pubKey;
    this.depth = hdkey.depth;
    this.fingerprint = hdkey.fingerprint;
    this.childNum = hdkey.childNum;
    this.chainCode = hdkey.chainCode;
  }

  toExtKey(verByte, key, pad='') {
    const raw = verByte
      + Hex.zeropad(this.depth) + this.fingerprint
      + Num.toHex(this.childNum, 8)
      + this.chainCode + pad + key;
    return Base58Check.encode(raw);
  }

  static fromExtKey(key) {
    const raw = Base58Check.decode(key);
    const verByte = raw.substr(0, 8);
    const depth = parseInt(raw.substr(8, 2), 16);
    const fingerprint = raw.substr(10, 8);
    const childNum = parseInt(raw.substr(18, 8), 16);
    const chainCode = raw.substr(26, 64);
    let prvKey;
    let pubKey;
    switch (verByte) {
      case AddrPrefix().xprvkey:
        prvKey = raw.substr(92);
        pubKey = Generator.getPoint().mul(prvKey).compressedPubkey();
        break;
      case AddrPrefix().xpubkey:
        prvKey = null;
        pubKey = raw.substr(90);
        break;
      default:
        throw new Error('invalid key');
    }
    return new HDKey(prvKey, pubKey, chainCode, depth, fingerprint, childNum);
  }

  static generate(seed) {
    if (seed.length < 16 * 2 || seed.length > 64 * 2) {
      throw new Error('seed length must be between 16 and 64 bytes (128 bits - 512 bits).');
    }
    const I = Hmac512.digest(Str.hex('Bitcoin seed'), seed);
    const Il = I.substr(0, 64);
    const Ir = I.substr(64);
    const prvKey = Il;
    const chainCode = Ir;
    const pubKey = Generator.getPoint().mul(prvKey).compressedPubkey();
    const depth = 0;
    const fingerprint = Num.toHex(0, 8);
    const childNum = 0;
    if (Int(Il).isZero() || Int(Il).ge(Int(Secp256k1.n))) {
      throw new Error('the mastar key is invalid.');
    }
    return new HDKey(prvKey, pubKey, chainCode, depth, fingerprint, childNum);
  }

}

export default HDKey;
