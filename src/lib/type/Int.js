import { BN } from 'bn.js';
import Hex from 'lib/util/Hex';
import Validator from 'lib/util/Validator';


const context = BN.red('k256');

const hasProperty = (obj, name) => (
  obj instanceof Object && Object.hasOwnProperty.call(obj, name)
);

class InnerInt {

  constructor(n, base) {
    this.n = this.toInt(n, base);
  }

  add(m) {
    return new InnerInt(this.n.add(this.toInt(m)));
  }

  sub(m) {
    return new InnerInt(this.n.sub(this.toInt(m)));
  }

  mul(m) {
    return new InnerInt(this.n.mul(this.toInt(m)));
  }

  div(m) {
    return new InnerInt(this.n.div(this.toInt(m)));
  }

  mod(m) {
    return new InnerInt(this.n.mod(this.toInt(m)));
  }

  modPow(m) {
    return new InnerInt(this.n.toRed(context).redPow(this.toInt(m)).fromRed());
  }

  pow(m) {
    return new InnerInt(this.n.pow(this.toInt(m)));
  }

  sqr() {
    return new InnerInt(this.n.sqr());
  }

  sqrt() {
    return new InnerInt(this.n.toRed(context).redSqrt().fromRed());
  }

  eq(m) {
    return this.n.eq(this.toInt(m));
  }

  ge(m) {
    return this.n.gte(this.toInt(m));
  }

  gt(m) {
    return this.n.gt(this.toInt(m));
  }

  le(m) {
    return this.n.lte(this.toInt(m));
  }

  lt(m) {
    return this.n.lt(this.toInt(m));
  }

  isZero() {
    return this.n.isZero();
  }

  isNeg() {
    return this.n.isNeg();
  }

  isEven() {
    return this.n.isEven();
  }

  isOdd() {
    return this.n.isOdd();
  }

  toJSNumber() {
    return this.n.toNumber();
  }

  toHex() {
    return Hex.zeropad(this.n.toString(16));
  }

  toBit() {
    return this.n.toString(2);
  }

  toString(m=10) {
    return this.n.toString(m);
  }

  innerValue() {
    return this.n;
  }

  toInt = (m, base=16) => {
    if (Validator.isEmpty(m)) {
      throw new Error('invalid number');
    }
    if (Validator.isNumber(m)) {
      return new BN(m, 10);
    }
    // BN
    if (hasProperty(m, 'red')) {
      return m;
    }
    // InnerInt
    if (hasProperty(m, 'toInt')) {
      return m.innerValue();
    }
    if (base===16 && Validator.isHex(m)) {
      return new BN(m, 16);
    }
    if (base===10 && Validator.isInt(m)) {
      return new BN(m, 10);
    }
    if (base===2 && Validator.isBit(m)) {
      return new BN(m, 2);
    }
    throw new Error('invalid value : [ ' + m + ' ]');
  }
}

export const Int = n => (new InnerInt(n, 16));
export const DecInt = n => (new InnerInt(n, 10));
export const BitInt = n => (new InnerInt(n, 2));
