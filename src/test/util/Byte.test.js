import Byte from 'lib/util/Byte';


describe('Byte', () => {

  describe('arrayToHex()', () => {
    test('byte array to hexadecimal string.', () => {
      expect(Byte.arrayToHex([ 1, 10, 16 ])).toBe('010a10');
    });
  });

});
