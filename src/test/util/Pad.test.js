import Pad from 'lib/util/Pad';


describe('Pad', () => {

  describe('lpad(): default padding character is zero. ', () => {
    test('can pad when the source data type is numeric.', () => {
      expect(Pad.lpad(123, 10)).toBe('0000000123');
    });
    test('can pad when the source data type is string (decimal number).', () => {
      expect(Pad.lpad('123', 10)).toBe('0000000123');
    });
    test('can pad when the source data type is string (hex number).', () => {
      expect(Pad.lpad('abcd', 10)).toBe('000000abcd');
    });
  });

  describe('lpad(): specified padding character is white space. ', () => {
    test('can pad when the source data type is numeric.', () => {
      expect(Pad.lpad(123, 5, ' ')).toBe('  123');
    });
  });


});
