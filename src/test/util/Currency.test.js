import Currency from 'lib/util/Currency';


describe('Currency', () => {

  describe('format()', () => {
    test('convert numbers to numeric string separated by commas.', () => {
      expect(Currency.format(1234567)).toBe('1,234,567');
    });
    test('convert numbers to numeric string separated by commas.', () => {
      expect(Currency.format('1234567')).toBe('1,234,567');
    });
  });

  describe('normalize()', () => {
    test('normalize numeric string separated by commas.', () => {
      expect(Currency.normalize('1,234,567')).toBe('1234567');
    });
  });

  describe('toSeparatedNumber()', () => {
    test('separate every 3 digits with a comma.', () => {
      expect(Currency.toSeparatedNumber('123456')).toBe('123,456');
      expect(Currency.toSeparatedNumber('1234567')).toBe('1,234,567');
      expect(Currency.toSeparatedNumber('12345678')).toBe('12,345,678');
      expect(Currency.toSeparatedNumber('123456789012345678901234567890')).toBe('123,456,789,012,345,678,901,234,567,890');
      expect(Currency.toSeparatedNumber('1234', ':', 2)).toBe('12:34');
      expect(Currency.toSeparatedNumber('12345', ':', 2)).toBe('1:23:45');
    });
  });

});
