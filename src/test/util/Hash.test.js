import Hash from 'lib/util/Hash';


describe('Hash', () => {

  describe('sha256()', () => {
    test('create sha256 hash hex.', () => {
      expect(Hash.sha256('abcd'))
        .toBe('123d4c7ef2d1600a1b3a0f6addc60a10f05a3495c9409f2ecbf4cc095d000a6b');
    });
  });

  describe('ripemd160', () => {
    test('create ripemd160 hash hex.', () => {
      expect(Hash.ripemd160('abcd'))
        .toBe('a21c2817130deaa1105afb3b858dbd219ee2da44');
    });
  });

  describe('hash256()', () => {
    test('create hash256 hash hex. (the number of hexadecimal is even.)', () => {
      expect(Hash.hash256('abcd'))
        .toBe('179980f6862aedb22205ac97c8af29c77e25d02e189b52926bb1d93796bb3c94');
    });
    test('create hash256 hash hex. (the number of hexadecimal is odd.)', () => {
      expect(Hash.hash256('123'))
        .toBe('90751de889547e2a9f0e50a9f202b1e4a9a17bb0aeb72f664ca97301ca1cb0de');
    });
  });

  describe('hash160()', () => {
    test('create hash160 hash hex. (the number of hexadecimal is even.)', () => {
      expect(Hash.hash160('abcd'))
        .toBe('4671c47a9d20c240a291661520d4af51df08fb0b');
    });
    test('create hash160 hash hex. (the number of hexadecimal is odd.)', () => {
      expect(Hash.hash160('123'))
        .toBe('2811ba143dc41f0f395ce9fe8234022760137b19');
    });
  });

});
