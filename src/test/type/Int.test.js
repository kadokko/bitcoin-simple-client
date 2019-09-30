import { Int, DecInt } from 'lib/type/Int';


describe('Int', () => {

  describe('...()', () => {

    let a;
    let b;

    test('the  result type of the Int class calculation is the InnerInt class.', () => {
      a = Int('0a');
      b = Int('03');
      expect(a.add(b).constructor.name).toBe('InnerInt');
    });

    test('pass a hex string or the Int class itself to the constructor', () => {
      a = Int('0e');
      b = Int(a);
      expect(a.toHex()).toBe(b.toHex());
    });

    test('add()', () => {
      // Int
      a = Int('0a');
      b = Int('03');
      expect(a.add(b).toHex()).toBe('0d');
      // Hex
      a = Int('0a');
      b = '03';
      expect(a.add(b).toHex()).toBe('0d');
      // Num
      a = Int(10);
      b = 5;
      expect(a.add(b).toHex()).toBe('0f');
    });

    test('sub()', () => {
      // Int
      a = Int('0a');
      b = Int('03');
      expect(a.sub(b).toHex()).toBe('07');
      // Hex
      a = Int('0a');
      b = '03';
      expect(a.sub(b).toHex()).toBe('07');
    });

    test('mul()', () => {
      // Int
      a = Int('0a');
      b = Int('03');
      expect(a.mul(b).toHex()).toBe('1e');
      // Hex
      a = Int('0a');
      b = '03';
      expect(a.mul(b).toHex()).toBe('1e');
    });

    test('div()', () => {
      // Int
      a = Int('0a');
      b = Int('03');
      expect(a.div(b).toHex()).toBe('03');
      // Hex
      a = Int('0a');
      b = '03';
      expect(a.div(b).toHex()).toBe('03');
    });

    test('mod()', () => {
      // Int
      a = Int('0a');
      b = Int('03');
      expect(a.mod(b).toHex()).toBe('01');
      // Hex
      a = Int('0a');
      b = '03';
      expect(a.mod(b).toHex()).toBe('01');
    });

    test('modPow()', () => {
      // Int
      a = Int('0a');
      b = Int('03');
      expect(a.modPow(b).toHex()).toBe('03e8');
      // Hex
      a = Int('0a');
      b = '03';
      expect(a.modPow(b).toHex()).toBe('03e8');
    });

    test('pow()', () => {
      // Int
      a = Int('02');
      b = Int('03');
      expect(a.modPow(b).toHex()).toBe('08');
      // Hex
      a = Int('02');
      b = '03';
      expect(a.modPow(b).toHex()).toBe('08');
    });

    test('sqr()', () => {
      expect(Int('03').sqr().toHex()).toBe('09');
    });

    test('sqrt()', () => {
      // Int
      a = Int('09');
      // secp256k1 p
      expect(a.sqrt().toHex()).toBe('fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2c');
    });

    test('eq()', () => {
      // Int
      a = Int('0a');
      b = Int('0a');
      expect(a.eq(b)).toBe(true);
      // Hex
      a = Int('0a');
      b = '0a';
      expect(a.eq(b)).toBe(true);
    });

    test('ge()', () => {
      // Int
      a = Int('0a');
      b = Int('09');
      expect(a.ge(b)).toBe(true);
      expect(a.ge(a)).toBe(true);
      expect(b.ge(a)).toBe(false);
      // Hex
      a = Int('0a');
      b = '09';
      expect(a.ge(b)).toBe(true);
      expect(a.ge(a)).toBe(true);
      a = '0a';
      b = Int('09');
      expect(b.ge(a)).toBe(false);
    });

    test('gt()', () => {
      a = Int('0a');
      b = Int('09');
      expect(a.gt(b)).toBe(true);
      a = Int('0a');
      b = '09';
      expect(a.gt(b)).toBe(true);
    });

    test('le()', () => {
      a = Int('09');
      b = Int('0a');
      expect(a.le(b)).toBe(true);
      a = Int('0a');
      b = Int('0a');
      expect(a.le(b)).toBe(true);
      a = Int('0a');
      b = '09';
      expect(a.le(b)).toBe(false);
    });

    test('lt()', () => {
      a = Int('09');
      b = Int('0a');
      expect(a.lt(b)).toBe(true);
      a = Int('0a');
      b = Int('0a');
      expect(a.lt(b)).toBe(false);
      a = Int('0a');
      b = '09';
      expect(a.lt(b)).toBe(false);
    });

    test('isZero()', () => {
      expect(Int('00').isZero()).toBe(true);
      expect(Int('0a').isZero()).toBe(false);
    });

    test('isNeg()', () => {
      expect(Int(-1).isNeg()).toBe(true);
      expect(Int(0).isNeg()).toBe(false);
      expect(Int(1).isNeg()).toBe(false);
    });

    test('isEven()', () => {
      expect(Int(2).isEven()).toBe(true);
      expect(Int(0).isEven()).toBe(true);
      expect(Int(1).isEven()).toBe(false);
      expect(Int(-1).isEven()).toBe(false);
      expect(Int(-2).isEven()).toBe(true);
    });

    test('isOdd()', () => {
      expect(Int(1).isOdd()).toBe(true);
      expect(Int(0).isOdd()).toBe(false);
      expect(Int(2).isOdd()).toBe(false);
      expect(Int(-1).isOdd()).toBe(true);
      expect(Int(-2).isOdd()).toBe(false);
    });

    test('toJSNumber()', () => {
      expect(Int('0a').toJSNumber()).toBe(10);
    });

    test('toHex()', () => {
      expect(Int('00').toHex()).toBe('00');
      expect(Int('0a').toHex()).toBe('0a');
    });

    test('toBit()', () => {
      expect(Int('11').toBit()).toBe('10001');
    });

    test('toString()', () => {
      expect(Int('00').toString()).toBe('0');
      expect(Int('0a').toString()).toBe('10');
      expect(Int('00').toString(10)).toBe('0');
      expect(Int('0a').toString(10)).toBe('10');
      expect(Int('00').toString(16)).toBe('0');
      expect(Int('0a').toString(16)).toBe('a');
    });

  });

});

describe('DecInt', () => {

  describe('...()', () => {
    const hex15 = '999999999999999';
    const int15 = DecInt(hex15);
    expect(int15.toString()).toBe(hex15);

    const hex30 = '999999999999999999999999999999';
    const int30 = DecInt(hex30);
    expect(int30.toString()).toBe(hex30);
  });

});
