import { Vin, Vout } from 'lib/model/base';
import { Tx } from 'lib/model/segwit';
import Witness from 'lib/model/segwit/Witness';


describe.skip('Tx', () => {

  describe('serialize()', () => {

    // TODO implement
    test('convert object to hex.', () => {
      const tx = new Tx();
      const vin = new Vin();
      const vout = new Vout();
      const witness = new Witness();
      tx.addVin(vin);
      tx.addVout(vout);
      tx.addWitness(witness);
      const hex = '';
      expect(tx.serialize()).toBe(hex);
    });

  });

});
