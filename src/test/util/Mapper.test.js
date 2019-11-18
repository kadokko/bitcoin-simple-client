import { Vin, Vout, Script } from 'lib/model/base';
import { Tx } from 'lib/model/standard';
import { TxMapper } from 'lib/util/Mapper';


describe('TxMapper', () => {

  describe('toModel()', () => {

    test('convert tx object to tx model.', () => {
      // object
      const txObject = {
        version: '2',
        vins: [
          {
            txid: '519dba4d8e45da770a8b0a37bc70af85913660a6212ce3f07b3d1f2808b930b4',
            vout: 0,
            scriptSig: '030b4a068528264a436a8c7e77aebe9960df67b79dd26c4d76f525ce4b4e5b6a34 OP_CHECKSIG',
            sequence: '4294967295',
          },
        ],
        vouts: [
          {
            scriptPubKey: '029f9f1f6d402f8ef0ec74afa2d2ff1e801290df41d502f2b54f24c67cf331d12c OP_CHECKSIG',
            value: '4999000000',
          },
        ],
        locktime: 0,
      };
      // model
      const vin = new Vin(
        '519dba4d8e45da770a8b0a37bc70af85913660a6212ce3f07b3d1f2808b930b4',
        0,
        new Script('030b4a068528264a436a8c7e77aebe9960df67b79dd26c4d76f525ce4b4e5b6a34 OP_CHECKSIG'),
        4294967295,
      );
      const vout = new Vout(
        4999000000,
        new Script('029f9f1f6d402f8ef0ec74afa2d2ff1e801290df41d502f2b54f24c67cf331d12c OP_CHECKSIG'),
      );
      const tx = new Tx();
      tx.addVin(vin);
      tx.addVout(vout);

      expect(TxMapper.toModel(txObject).serialize()).toBe(tx.serialize());
    });

  });

});
