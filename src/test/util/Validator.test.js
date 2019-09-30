import Validator from 'lib/util/Validator';


describe('Validator', () => {

  describe('isString()', () => {
    test('return true when the value is string', () => {
      expect(Validator.isString('123')).toBe(true);
    });
    test('return false when the value is not string', () => {
      expect(Validator.isString('')).toBe(false);
      expect(Validator.isString(undefined)).toBe(false);
      expect(Validator.isString(null)).toBe(false);
      expect(Validator.isString(123)).toBe(false);
    });
  });

  describe('isNum()', () => {
    test('return true when the value is a number', () => {
      expect(Validator.isNum('123')).toBe(true);
      expect(Validator.isNum(123)).toBe(true);
      expect(Validator.isNum(1.23)).toBe(true);
      expect(Validator.isNum('1.23')).toBe(true);
    });
    test('return false when the value is not a number', () => {
      expect(Validator.isNum('')).toBe(false);
      expect(Validator.isNum(undefined)).toBe(false);
      expect(Validator.isNum(null)).toBe(false);
    });
  });

  describe('isNumber()', () => {
    test('return true when the value is a number type', () => {
      expect(Validator.isNumber(123)).toBe(true);
    });
    test('return false when the value is not a number type', () => {
      expect(Validator.isNumber('')).toBe(false);
      expect(Validator.isNumber(undefined)).toBe(false);
      expect(Validator.isNumber(null)).toBe(false);
      expect(Validator.isNumber('123')).toBe(false);
    });
  });

  describe('isInt()', () => {
    test('return true when the value is a int number or a int string.', () => {
      expect(Validator.isInt('123')).toBe(true);
      expect(Validator.isInt(123)).toBe(true);
    });
    test('return false when the value is not a number', () => {
      expect(Validator.isInt('')).toBe(false);
      expect(Validator.isInt(undefined)).toBe(false);
      expect(Validator.isInt(null)).toBe(false);
      expect(Validator.isInt(1.23)).toBe(false);
      expect(Validator.isInt('1.23')).toBe(false);
    });
  });

  describe('isPositiveInt()', () => {
    test('return true when the value is positive integer', () => {
      expect(Validator.isPositiveInt(0)).toBe(true);
      expect(Validator.isPositiveInt(123)).toBe(true);
      expect(Validator.isPositiveInt('0')).toBe(true);
      expect(Validator.isPositiveInt('123')).toBe(true);
    });
    test('return false when the value is not positive integer', () => {
      expect(Validator.isPositiveInt('')).toBe(false);
      expect(Validator.isPositiveInt(undefined)).toBe(false);
      expect(Validator.isPositiveInt(null)).toBe(false);
      expect(Validator.isPositiveInt(1.23)).toBe(false);
      expect(Validator.isPositiveInt('1.23')).toBe(false);
      expect(Validator.isPositiveInt('123abc')).toBe(false);
      expect(Validator.isPositiveInt('0123')).toBe(false);
      expect(Validator.isPositiveInt('-123')).toBe(false);
    });
  });

  describe('isHex()', () => {
    test('return true when the value is hex string', () => {
      expect(Validator.isHex('0f11')).toBe(true);
    });
    test('return false when the value is not hex string', () => {
      expect(Validator.isHex('')).toBe(false);
      expect(Validator.isHex(undefined)).toBe(false);
      expect(Validator.isHex(null)).toBe(false);
      expect(Validator.isHex(1234)).toBe(false);
      expect(Validator.isHex('0g11')).toBe(false);
    });
  });

  describe('isBit()', () => {
    test('return true when the value is bit string', () => {
      expect(Validator.isBit('010101')).toBe(true);
    });
    test('return false when the value is not bit string', () => {
      expect(Validator.isBit('')).toBe(false);
      expect(Validator.isBit(undefined)).toBe(false);
      expect(Validator.isBit(null)).toBe(false);
      expect(Validator.isBit(1234)).toBe(false);
      expect(Validator.isBit('0g11')).toBe(false);
    });
  });

  describe('isCurrency()', () => {
    test('return true when the value is currency string', () => {
      expect(Validator.isCurrency('12,345,678')).toBe(true);
      expect(Validator.isCurrency('12345678')).toBe(true);
    });
    test('return false when the value is not currency string', () => {
      expect(Validator.isCurrency('')).toBe(false);
      expect(Validator.isCurrency(undefined)).toBe(false);
      expect(Validator.isCurrency(null)).toBe(false);
      expect(Validator.isCurrency(1234)).toBe(false);
      expect(Validator.isCurrency('0g11')).toBe(false);
    });
  });

  describe('isAlphaNumeric()', () => {
    test('return true when the value is alphanumeric', () => {
      expect(Validator.isAlphaNumeric('012abcxyzABcxYZ789')).toBe(true);
      expect(Validator.isAlphaNumeric(1234)).toBe(true);
    });
    test('return false when the value is not alphanumeric', () => {
      expect(Validator.isAlphaNumeric('ＡＢＣ')).toBe(false);
      expect(Validator.isAlphaNumeric('-123')).toBe(false);
      expect(Validator.isAlphaNumeric('<')).toBe(false);
      expect(Validator.isAlphaNumeric('')).toBe(false);
      expect(Validator.isAlphaNumeric(undefined)).toBe(false);
      expect(Validator.isAlphaNumeric(null)).toBe(false);
    });
  });

  describe('isAlphaNumericSpace()', () => {
    test('return true when the value is alphanumeric or space', () => {
      expect(Validator.isAlphaNumericSpace('012abcxyzABcxYZ789')).toBe(true);
      expect(Validator.isAlphaNumericSpace(1234)).toBe(true);
      expect(Validator.isAlphaNumericSpace(' 012 abcxyzABcxYZ789 ')).toBe(true);
    });
    test('return false when the value is not alphanumeric or space', () => {
      expect(Validator.isAlphaNumericSpace('ＡＢＣ')).toBe(false);
      expect(Validator.isAlphaNumericSpace('-123')).toBe(false);
      expect(Validator.isAlphaNumericSpace('<')).toBe(false);
      expect(Validator.isAlphaNumericSpace('')).toBe(false);
      expect(Validator.isAlphaNumericSpace(undefined)).toBe(false);
      expect(Validator.isAlphaNumericSpace(null)).toBe(false);
    });
  });

  describe('isAlphaNumericUnderscoreWhiteSpace()', () => {
    test('return true when the value is alphanumeric or underscore or space or cr or lf', () => {
      expect(Validator.isAlphaNumericUnderscoreWhiteSpace('_012abcxyzABcxYZ7_89_')).toBe(true);
      expect(Validator.isAlphaNumericUnderscoreWhiteSpace(1234)).toBe(true);
      expect(Validator.isAlphaNumericUnderscoreWhiteSpace('___')).toBe(true);
      expect(Validator.isAlphaNumericUnderscoreWhiteSpace(' _1 a_ ')).toBe(true);
      expect(Validator.isAlphaNumericUnderscoreWhiteSpace(' _1 a_ \r \n')).toBe(true);
    });
    test('return false when the value is not alphanumeric or underscore or space or cr or lf', () => {
      expect(Validator.isAlphaNumericUnderscoreWhiteSpace('ＡＢＣ')).toBe(false);
      expect(Validator.isAlphaNumericUnderscoreWhiteSpace('-123')).toBe(false);
      expect(Validator.isAlphaNumericUnderscoreWhiteSpace('<')).toBe(false);
      expect(Validator.isAlphaNumericUnderscoreWhiteSpace('')).toBe(false);
      expect(Validator.isAlphaNumericUnderscoreWhiteSpace(undefined)).toBe(false);
      expect(Validator.isAlphaNumericUnderscoreWhiteSpace(null)).toBe(false);
    });
  });

  describe('isEmpty()', () => {
    test('return true when the value is empty', () => {
      expect(Validator.isEmpty('')).toBe(true);
      expect(Validator.isEmpty(undefined)).toBe(true);
      expect(Validator.isEmpty(null)).toBe(true);
      expect(Validator.isEmpty({})).toBe(true);
    });
    test('return false when the value is not empty', () => {
      expect(Validator.isEmpty('abc')).toBe(false);
      expect(Validator.isEmpty(123)).toBe(false);
    });
  });

  describe('isNotEmpty()', () => {
    test('return true when the value is not empty', () => {
      expect(Validator.isNotEmpty('abc')).toBe(true);
      expect(Validator.isNotEmpty(123)).toBe(true);
    });
    test('return false when the value is empty', () => {
      expect(Validator.isNotEmpty('')).toBe(false);
      expect(Validator.isNotEmpty(undefined)).toBe(false);
      expect(Validator.isNotEmpty(null)).toBe(false);
    });
  });

  describe('isByteLen()', () => {
    test('return true when the value length is specified byte length', () => {
      expect(Validator.isByteLen('0123', 2)).toBe(true);
      expect(Validator.isByteLen('  ', 1)).toBe(true);
      expect(Validator.isByteLen('', 0)).toBe(true);
      expect(Validator.isByteLen('123', 1.5)).toBe(true);
    });
    test('return false when the value length is not specified byte length', () => {
      expect(Validator.isByteLen(1234, 2)).toBe(false);
      expect(Validator.isByteLen(undefined)).toBe(false);
      expect(Validator.isByteLen(null)).toBe(false);
    });
  });

  describe('isHexString()', () => {
    test('return true when the value is hex string', () => {
      expect(Validator.isHexString('123abc')).toBe(true);
      expect(Validator.isHexString(123)).toBe(true);
    });
    test('return false when the value is not hex string', () => {
      expect(Validator.isHexString('0efg')).toBe(false);
    });
  });

  describe('isBitString()', () => {
    test('return true when the value is bit string', () => {
      expect(Validator.isBitString('010101')).toBe(true);
      expect(Validator.isBitString(0)).toBe(true);
      expect(Validator.isBitString(1)).toBe(true);
    });
    test('return false when the value is not bit string', () => {
      expect(Validator.isBitString('0efg')).toBe(false);
      expect(Validator.isBitString(2)).toBe(false);
    });
  });

  describe('isIntString()', () => {
    test('return true when the value is int string', () => {
      expect(Validator.isIntString('12345')).toBe(true);
      expect(Validator.isIntString('-12345')).toBe(true);
      expect(Validator.isIntString(12345)).toBe(true);
    });
    test('return false when the value is not int string', () => {
      expect(Validator.isIntString('0efg')).toBe(false);
    });
  });

  describe('isPositiveIntString()', () => {
    test('return true when the value is integer string', () => {
      expect(Validator.isPositiveIntString('0')).toBe(true);
      expect(Validator.isPositiveIntString('123')).toBe(true);
    });
    test('return false when the value is not integer string', () => {
      expect(Validator.isPositiveIntString('123abc')).toBe(false);
      expect(Validator.isPositiveIntString('0123')).toBe(false);
      expect(Validator.isPositiveIntString('-123')).toBe(false);
      expect(Validator.isPositiveIntString('')).toBe(false);
      expect(Validator.isPositiveIntString(' ')).toBe(false);
    });
  });

  describe('isAlphaNumericString()', () => {
    test('return true when the value is alphanumeric', () => {
      expect(Validator.isAlphaNumericString('012abcxyzABcxYZ789')).toBe(true);
    });
    test('return false when the value is not alphanumeric', () => {
      expect(Validator.isAlphaNumericString('ＡＢＣ')).toBe(false);
      expect(Validator.isAlphaNumericString('-123')).toBe(false);
      expect(Validator.isAlphaNumericString('<')).toBe(false);
    });
  });

  describe('range()', () => {
    const min = '0';
    const max = '18446744073709551615'; // ffffffffffffffff
    test('return true if the number is in the range between min and max', () => {
      expect(Validator.range(0, min, max)).toBe(true);
      expect(Validator.range(1, min, max)).toBe(true);
      expect(Validator.range('18446744073709551615', min, max)).toBe(true);
    });
    test('return false if the number is not in the range between min and max', () => {
      expect(Validator.range(-1, min, max)).toBe(false);
      expect(Validator.range('18446744073709551616', min, max)).toBe(false);
    });
  });

  describe('isClass()', () => {
    class Abc {}
    const instance = new Abc();
    test('return true when the class name of the instance is the specified name', () => {
      expect(Validator.isClass(instance, 'Abc')).toBe(true);
    });
    test('return false when the class name of the instance is not the specified name', () => {
      expect(Validator.isClass(instance, 'Abcde')).toBe(false);
    });
  });

});
