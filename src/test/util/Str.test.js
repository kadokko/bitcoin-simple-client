import Str from 'lib/util/Str';


describe('Str', () => {

  describe('lstrip()', () => {
    test('...', () => {
      expect(Str.lstrip('001234', '00')).toBe('1234');
      expect(Str.lstrip('0001234', '00')).toBe('01234');
      expect(Str.lstrip('00001234', '00')).toBe('1234');
      expect(Str.lstrip('000001234', '00')).toBe('01234');
    });
    test('...', () => {
      expect(Str.lstrip('1', '1')).toBe('');
      expect(Str.lstrip('11', '1')).toBe('');
    });
  });

  describe('hex()', () => {
    test('decode a string and convert it to hexadecimal.', () => {
      expect(Str.hex('hello world')).toBe('68656c6c6f20776f726c64');
    });
  });

  describe('split()', () => {
    test('separate the string by n characters. each element is the same size.', () => {
      expect(Str.split('0102030405', 2)).toMatchObject([ '01', '02', '03', '04', '05' ]);
      expect(Str.split('0102030405', 5)).toMatchObject([ '01020', '30405' ]);
    });
    test('separate the string by n characters. each element is not the same size.', () => {
      expect(Str.split('0102030405', 3)).toMatchObject([ '010', '203', '040', '5' ]);
    });
  });

  describe('removeDelimiter()', () => {
    test('trim and replace multiple whitespace.', () => {
      expect(Str.removeDelimiter(' 12  34  56  ')).toBe('12 34 56');
    });
    test('trim and replace multiple whitespace, cr, lf.', () => {
      expect(Str.removeDelimiter('\n  \n  12  34  \n 56 \n \n')).toBe('12 34 56');
      expect(Str.removeDelimiter('\r\n  \r\n  12  34  \r\n 56 \n \r')).toBe('12 34 56');
    });
    test('return empty string if empty string.', () => {
      expect(Str.removeDelimiter('')).toBe('');
    });
    test('return empty string if undefined or null.', () => {
      expect(Str.removeDelimiter(undefined)).toBe('');
      expect(Str.removeDelimiter(null)).toBe('');
    });
  });

  describe('removeChar()', () => {
    test('remove specified character.', () => {
      expect(Str.removeChar('12,345,678', ',')).toBe('12345678');
      expect(Str.removeChar('', ',')).toBe('');
      expect(Str.removeChar('12345678', ',')).toBe('12345678');
      expect(Str.removeChar('12.345.678', '\\.')).toBe('12345678');
    });
    test('trim and remove specified character.', () => {
      expect(Str.removeChar(' 12,345,678  ', ',')).toBe('12345678');
    });
  });

  describe('removeChars()', () => {
    test('trim and remove specified characters.', () => {
      expect(Str.removeChars(' 12,3.45,6.78  ', [ ',', '\\.' ])).toBe('12345678');
      expect(Str.removeChars('\n  \n  12  34  \n 56 \n \n', [ ' ', '\n' ])).toBe('123456');
      expect(Str.removeChars('\r\n  \r\n  12  34  \r\n 56 \n \r', [ ' ', '\n', '\r' ])).toBe('123456');
      expect(Str.removeChars('', [ ',' ])).toBe('');
    });
    test('return empty string if empty string.', () => {
      expect(Str.removeChars('', [ ',' ])).toBe('');
    });
    test('return empty string if undefined or null.', () => {
      expect(Str.removeChars(undefined, [ ',' ])).toBe('');
      expect(Str.removeChars(null, [ ',' ])).toBe('');
    });
  });

  describe('removeSpace()', () => {
    test('trim and remove whitespace, cr, lf.', () => {
      expect(Str.removeSpace(' 12345678  ')).toBe('12345678');
      expect(Str.removeSpace('\n  \n  12  34  \n 56 \n \n')).toBe('123456');
      expect(Str.removeSpace('\r\n  \r\n  12  34  \r\n 56 \r \n')).toBe('123456');
    });
    test('return empty string if empty string.', () => {
      expect(Str.removeSpace('')).toBe('');
    });
    test('return empty string if undefined or null.', () => {
      expect(Str.removeSpace(undefined)).toBe('');
      expect(Str.removeSpace(null)).toBe('');
    });
  });

  describe('firstChar()', () => {
    test('cut out the first character of a string.', () => {
      expect(Str.firstChar('abc')).toBe('a');
    });
    test('return empty string if empty string.', () => {
      expect(Str.firstChar('')).toBe('');
    });
    test('return empty string if undefined or null.', () => {
      expect(Str.firstChar(undefined)).toBe('');
      expect(Str.firstChar(null)).toBe('');
    });
  });

  describe('lastChar()', () => {
    test('cut out the last character of a string.', () => {
      expect(Str.lastChar('abc')).toBe('c');
      expect(Str.lastChar('')).toBe('');
    });
    test('return empty string if empty string.', () => {
      expect(Str.lastChar('')).toBe('');
    });
    test('return empty string if undefined or null.', () => {
      expect(Str.lastChar(undefined)).toBe('');
      expect(Str.lastChar(null)).toBe('');
    });
  });

});
