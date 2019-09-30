import { Script } from 'lib/model/base';


describe('Script', () => {

  const script = new Script('OP_0 1234567890abcdef1234567890abcdef12345678');

  describe('serialize()', () => {
    test('serialize script asm. (data size + data)', () => {
      expect(script.serialize())
        // eslint-disable-next-line
        .toBe('16' + '00' + '14' + '1234567890abcdef1234567890abcdef12345678');
    });
  });

  describe('toHex()', () => {
    test('convert script asm to hex. (data only)', () => {
      expect(script.toHex())
        // eslint-disable-next-line
        .toBe('00' + '14' + '1234567890abcdef1234567890abcdef12345678');
    });
  });

});
