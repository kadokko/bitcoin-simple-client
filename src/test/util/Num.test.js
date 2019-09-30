import Num from 'lib/util/Num';


describe('Num', () => {

  describe('toHex()', () => {

    test('decimal number to 2 digit hex.', () => {
      expect(Num.toHex(0, 2)).toBe('00');
      expect(Num.toHex(20, 2)).toBe('14');
      expect(Num.toHex(255, 2)).toBe('ff');
    });

    test('decimal number to 4 digit hex.', () => {
      expect(Num.toHex(65535, 4)).toBe('ffff');
    });

    test('decimal number to 8 digit hex.', () => {
      expect(Num.toHex(4294967295, 8)).toBe('ffffffff');
    });

    test('decimal number to 16 digit hex.', () => {
      expect(Num.toHex(Number.MAX_SAFE_INTEGER, 16)).toBe('001fffffffffffff');
    });

  });

  describe('toVarInt()', () => {

    test('decimal number to 1 byte varint.', () => {
      expect(Num.toVarInt(0)).toBe('00');
      expect(Num.toVarInt(20)).toBe('14');
      expect(Num.toVarInt(252)).toBe('fc');
    });

    test('decimal number to 3 bytes varint.', () => {
      expect(Num.toVarInt(65535)).toBe('fdffff');
    });

    test('decimal number to 5 bytes varint.', () => {
      expect(Num.toVarInt(4294967295)).toBe('feffffffff');
    });

    test('decimal number to 9 bytes varint.', () => {
      expect(Num.toVarInt(Number.MAX_SAFE_INTEGER)).toBe('ff001fffffffffffff');
    });
  });

  describe('toVarIntRev()', () => {

    test('decimal number to 1 byte reverse varint.', () => {
      expect(Num.toVarIntRev(0)).toBe('00');
      expect(Num.toVarIntRev(20)).toBe('14');
      expect(Num.toVarIntRev(252)).toBe('fc');
    });

    test('decimal number to 3 bytes reverse varint.', () => {
      expect(Num.toVarIntRev(65535)).toBe('fffffd');
    });

    test('decimal number to 5 bytes reverse varint.', () => {
      expect(Num.toVarIntRev(4294967295)).toBe('fffffffffe');
    });

    test('decimal number to 9 bytes reverse varint.', () => {
      expect(Num.toVarIntRev(Number.MAX_SAFE_INTEGER)).toBe('ffffffffffff1f00ff');
    });
  });

  describe('checkPositive()', () => {

    test('not throw an exception if value is less than 0.', () => {
      expect(() => Num.checkPositive(-1)).toThrow('Invalid number. n = -1');
    });

  });

  describe('exponentToDecimal()', () => {

    test('convert exponent value to decimal format string.', () => {
      expect(Num.exponentToDecimal(1.23e-7)).toBe('0.000000123');
    });

  });

});
