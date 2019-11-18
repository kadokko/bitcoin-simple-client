import { Vin, Vout, Script } from 'lib/model/base';
import { Tx, SigHash } from 'lib/model/standard';


describe('SigHash', () => {

  describe('create()', () => {

    test('create signature hash.', () => {
      // vin
      const vin = new Vin(
        '519dba4d8e45da770a8b0a37bc70af85913660a6212ce3f07b3d1f2808b930b4',
        0,
        new Script('21030b4a068528264a436a8c7e77aebe9960df67b79dd26c4d76f525ce4b4e5b6a34ac'),
        4294967295,
      );
      // vout
      const amount = 4999900000;
      const scriptPubKey = new Script('039ca3cda30f8eb6aae01dc999786edfaec1696ad5ae2455bc2212440d2feec45f OP_CHECKSIG');
      const vout = new Vout(amount, scriptPubKey);
      // tx
      const tx = new Tx();
      tx.addVin(vin);
      tx.addVout(vout);
      // sig hash
      const sigHash = SigHash.create(tx, 0);
      expect(sigHash).toBe('86f35c8c241e0e0a69150a0ca0a175720d53181ad12ea22fd5e2275b443c42f5');
    });

  });

});
