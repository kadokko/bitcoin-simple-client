import Hex from 'lib/util/Hex';


describe('Hex', () => {

  describe('len()', () => {
    test('length of hex string by hex.', () => {
      expect(Hex.len('1234567890123456789012345678901234567890')).toBe('14');
    });
  });

  describe('zeropad()', () => {
    test('padding zero if the number of hex string is odd digit.', () => {
      expect(Hex.zeropad('123')).toBe('0123');
    });
    test('not padding zero if the number of hex string is even digit.', () => {
      expect(Hex.zeropad('1234')).toBe('1234');
    });
    test('padding zero if the number of hex number is odd digit.', () => {
      expect(Hex.zeropad(123)).toBe('0123');
    });
    test('not padding zero if the number of hex number is even digit.', () => {
      expect(Hex.zeropad(1234)).toBe('1234');
    });
  });

  describe('rev()', () => {

    test('rearrange hexadecimal numbers in reverse order.', () => {
      expect(Hex.rev('1234567890abcdef')).toBe('efcdab9078563412');
    });

  });

});
