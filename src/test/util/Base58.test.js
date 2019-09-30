import { Base58, Base58Check } from 'lib/util/Base58';


// test data
// https://github.com/bitcoin/bitcoin/blob/master/src/test/data/base58_encode_decode.json
describe('Base58', () => {

  describe('encode()', () => {
    test('convert hex string to base58 encoded string.', () => {
      expect(Base58.encode('00')).toBe('1');
      expect(Base58.encode('0000')).toBe('11');
      expect(Base58.encode('61')).toBe('2g');
      expect(Base58.encode('73696d706c792061206c6f6e6720737472696e67'))
        .toBe('2cFupjhnEsSn59qHXstmK2ffpLv2');
      expect(Base58.encode('000111d38e5fc9071ffcd20b4a763cc9ae4f252bb4e48fd66a835e252ada93ff480d6dd43dc62a641155a5'))
        .toBe('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
    });
  });

  describe('decode()', () => {
    test('convert base58 encoded string to hex string.', () => {
      expect(Base58.decode('1')).toBe('00');
      expect(Base58.decode('11')).toBe('0000');
      expect(Base58.decode('2g')).toBe('61');
      expect(Base58.decode('2cFupjhnEsSn59qHXstmK2ffpLv2'))
        .toBe('73696d706c792061206c6f6e6720737472696e67');
      expect(Base58.decode('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'))
        .toBe('000111d38e5fc9071ffcd20b4a763cc9ae4f252bb4e48fd66a835e252ada93ff480d6dd43dc62a641155a5');
    });
  });

});


describe('Base58Check', () => {

  describe('encode()', () => {
    test('convert hex string to base58check encoded string.', () => {
      // c4: version prefix (testnet script hash)
      expect(Base58Check.encode('c44671c47a9d20c240a291661520d4af51df08fb0b'))
        .toBe('2MyfhaR6cXxzwFFGXjnW7KuHCSZ5wsMCSvf');
    });
  });

  describe('decode()', () => {
    test('convert base58check encoded string to hex string.', () => {
      expect(Base58Check.decode('2MyfhaR6cXxzwFFGXjnW7KuHCSZ5wsMCSvf'))
        .toBe('c44671c47a9d20c240a291661520d4af51df08fb0b');
    });
  });

});
