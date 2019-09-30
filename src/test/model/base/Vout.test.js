import { Vout, Script } from 'lib/model/base';
import Unit from 'lib/util/Unit';


describe('Vout', () => {

  describe('serialize()', () => {

    test('to hex.', () => {
      const value = Unit.toSat(2);
      const scriptPubKey = new Script('OP_DUP OP_HASH160 1234567890abcdef1234567890abcdef12345678 OP_EQUALVERIFY OP_CHECKSIG');
      const vout = new Vout(value, scriptPubKey);
      const hex = '00c2eb0b00000000'
                + '19'
                + '76a9141234567890abcdef1234567890abcdef1234567888ac';
      expect(vout.serialize()).toBe(hex);
    });

  });

});
