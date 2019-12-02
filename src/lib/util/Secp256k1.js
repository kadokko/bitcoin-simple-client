import { Int, DecInt } from 'lib/type/Int';


export class Secp256k1 {
  static Gx = '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798';
  static Gy = '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8';
  static a = '0000000000000000000000000000000000000000000000000000000000000000';
  static b = '0000000000000000000000000000000000000000000000000000000000000007';
  static p = 'fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f';
  static n = 'fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141';
}

const p = Int(Secp256k1.p);
const n = Int(Secp256k1.n);
const a = Int(Secp256k1.a);
const b = Int(Secp256k1.b);
const two = DecInt(2);
const three = DecInt(3);


export class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  compressedPubkey() {
    const y = Int(this.y).isNeg() ? n.sub(this.y).toHex() : this.y;
    return (Int(y).isEven() ? '02' : '03') + this.x;
  }

  uncompressedPubkey() {
    return '04' + this.x + this.y;
  }

  // Secp256k1
  // curve  : y**2 = x**3 + 7
  // linear : y = ax + b
  // https://en.wikipedia.org/wiki/Elliptic_curve_point_multiplication
  add(point) {
    const x1 = Int(this.x);
    const y1 = Int(this.y);
    const x2 = Int(point.x);
    const y2 = Int(point.y);
    const l = (y2.sub(y1)).mul(x2.sub(x1).modInv(p)).mod(p);
    const x3 = l.sqr().sub(x1).sub(x2).mod(p);
    const y3 = l.mul(x1.sub(x3)).sub(y1).mod(p).toPos(p);
    return new Point(x3.toHex(), y3.toHex());
  }

  sub(point) {
    return this.add(new Point(point.x, Int(point.y).mul(-1).add(p).toHex()));
  }

  double() {
    const x = Int(this.x);
    const y = Int(this.y);
    const s = x.sqr().mul(three).add(a).mul(y.mul(two).modInv(p)).mod(p);
    const x3 = s.sqr().sub(x.mul(two)).mod(p);
    const y3 = s.mul(x.sub(x3)).sub(y).mod(p).toPos(p);
    return new Point(x3.toHex(), y3.toHex());
  }

  mul(k) {
    const bits = Int(k).toBit().split('');
    const P = new Point(this.x, this.y);
    let Q = P;
    for (const bit of bits.slice(1)) {
      Q = Q.double();
      if (bit === '1') {
        Q = Q.add(P);
      }
    }
    return Q;
  }

  static from(pubkey) {
    const verBytes = pubkey.substr(0, 2);
    if (verBytes === '02' || verBytes === '03') {
      const isOdd = parseInt(verBytes, 16) % 2 === 1;
      const x = pubkey.substr(2);
      const y = this.getY(x, isOdd);
      return new Point(x, y);
    }
    if (verBytes === '04') {
      const x = pubkey.substr(2, 66 - 2);
      const y = pubkey.substr(66);
      return new Point(x, y);
    }
    throw new Error('invalid pubkey.');
  }

  static getY(xcoord, isOdd) {
    const x = Int(xcoord);
    const sqrt = x.pow(three).mod(p).add(b).mod(p).sqrt();
    return (sqrt.isOdd() === isOdd ? sqrt : p.sub(sqrt)).toHex();
  }

}

export class Generator {
  static getPoint() {
    return new Point(Secp256k1.Gx, Secp256k1.Gy);
  }
}
