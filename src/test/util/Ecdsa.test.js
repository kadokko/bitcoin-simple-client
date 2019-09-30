import Ecdsa from 'lib/util/Ecdsa';


describe('Ecdsa', () => {

  describe('generate()', () => {
    test('...', () => {
      const key = Ecdsa.generate();
      expect(key.getPrv().length).toBe(32 * 2);
      expect(key.getPub().length).toBe(2 + 32 * 2);
      expect(key.getUnCompressedPub().length).toBe(2 + 32 * 2 + 32 * 2);
    });
  });

  describe('sign() verify()', () => {
    const key = Ecdsa.generate();
    const data = '0102030405';
    test('...', () => {
      const signature = Ecdsa.sign(data, key.getPrv());
      expect(signature.length).toBe(140);
      expect(Ecdsa.verify(data, signature, key.getPub())).toBe(true);
    });
  });

});
