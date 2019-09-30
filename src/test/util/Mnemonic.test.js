import { Dictionary, Mnemonic } from 'lib/util/Mnemonic';


describe('Dictionary', () => {

  describe('index()', () => {
    test('...', () => {
      expect(Dictionary.index('ability')).toBe(1);
    });
  });

});

// test vector
// https://github.com/trezor/python-mnemonic/blob/master/vectors.json
describe('Mnemonic', () => {

  describe('toEntropy()', () => {

    // ENT:128
    test('....', () => {
      const words = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
      const actual = Mnemonic.toEntropy(words);
      const expected = '00000000000000000000000000000000';
      expect(actual).toBe(expected);
    });

    // ENT:224
    test('....', () => {
      const words = 'legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth useful legal will';
      const actual = Mnemonic.toEntropy(words);
      const expected = '7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f';
      expect(actual).toBe(expected);
    });

    // ENT:256
    test('....', () => {
      const words = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art';
      const actual = Mnemonic.toEntropy(words);
      const expected = '0000000000000000000000000000000000000000000000000000000000000000';
      expect(actual).toBe(expected);
    });

  });

  describe('Mnemonic', () => {

    describe('toWords()', () => {

      // ENT:128
      test('....', () => {
        const entropy = '00000000000000000000000000000000';
        const actual = Mnemonic.toWords(entropy);
        const expected = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
        expect(actual).toBe(expected);
      });

      // ENT = 224
      test('....', () => {
        const entropy = '7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f';
        const actual = Mnemonic.toWords(entropy);
        const expected = 'legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth useful legal will';
        expect(actual).toBe(expected);
      });

      // ENT = 256
      test('....', () => {
        const entropy = '0000000000000000000000000000000000000000000000000000000000000000';
        const actual = Mnemonic.toWords(entropy);
        const expected = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art';
        expect(actual).toBe(expected);
      });

    });

  });

});
