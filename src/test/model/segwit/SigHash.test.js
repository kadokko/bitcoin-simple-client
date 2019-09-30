import { Vin, Vout, Script } from 'lib/model/base';
import { Tx, SigHashPreImage, Witness } from 'lib/model/segwit';
import Hex from 'lib/util/Hex';
import Hash from 'lib/util/Hash';
import Unit from 'lib/util/Unit';


// test vector
// https://github.com/bitcoin/bips/blob/master/bip-0143.mediawiki
describe('SigHashPreImage', () => {

  describe('serialize()', () => {

    test('signature hash.', () => {

      // 9f96ade4b41d5433f4eda31e1738ec2b36f6e7d1420d94a6af99801a88f7f7ff
      // 8ac60eb9575db5b2d987e29f301b5b819ea83a5c6579d282d189cc04b8e151ef
      const vin0 = new Vin(Hex.rev('fff7f7881a8099afa6940d42d1e7f6362bec38171ea3edf433541db4e4ad969f'), 0, new Script(''), 4294967278);
      const vin1 = new Vin(Hex.rev('ef51e1b804cc89d182d279655c3aa89e815b1b309fe287d9b2b55d57b90ec68a'), 1, new Script(''), 4294967295);
      expect(vin0.serialize()).toBe('fff7f7881a8099afa6940d42d1e7f6362bec38171ea3edf433541db4e4ad969f0000000000eeffffff');
      expect(vin1.serialize()).toBe('ef51e1b804cc89d182d279655c3aa89e815b1b309fe287d9b2b55d57b90ec68a0100000000ffffffff');

      const scriptPubKey0 = new Script('OP_DUP OP_HASH160 8280b37df378db99f66f85c95a783a76ac7a6d59 OP_EQUALVERIFY OP_CHECKSIG');
      const scriptPubKey1 = new Script('OP_DUP OP_HASH160 3bde42dbee7e4dbe6a21b2d50ce2f0167faa8159 OP_EQUALVERIFY OP_CHECKSIG');
      const vout0 = new Vout(112340000, scriptPubKey0);
      const vout1 = new Vout(223450000, scriptPubKey1);
      expect(vout0.serialize()).toBe('202cb206000000001976a9148280b37df378db99f66f85c95a783a76ac7a6d5988ac');
      expect(vout1.serialize()).toBe('9093510d000000001976a9143bde42dbee7e4dbe6a21b2d50ce2f0167faa815988ac');

      const vins = [ vin0, vin1 ];
      const vouts = [ vout0, vout1 ];
      const tx = new Tx(1, vins, vouts, 17);
      const sigHashPreImage = new SigHashPreImage(tx);
      expect(sigHashPreImage.hashPrevOuts()).toBe('96b827c8483d4e9b96712b6713a7b68d6e8003a781feba36c31143470b4efd37');
      expect(sigHashPreImage.hashPrevSeqs()).toBe('52b0a642eea2fb7ae638c36f6252b6750293dbe574a806984b8e4d8548339a3b');
      expect(sigHashPreImage.hashOutputs()).toBe('863ef3e1a92afbfdb97f31ad0fc7683ee943e9abcf2501590ff8f6551f47e5e5');

      // sighash preimage for vin0
      const utxo0ScriptCode = new Script('OP_DUP OP_HASH160 1d0f172a0ecb48aee1be1f2687d2963ae33f71a1 OP_EQUALVERIFY OP_CHECKSIG');
      const sigHashPreImage1 = sigHashPreImage.serialize(1, utxo0ScriptCode.toHex(), Unit.toSat(6));
      expect(sigHashPreImage1).toBe('0100000096b827c8483d4e9b96712b6713a7b68d6e8003a781feba36c31143470b4efd3752b0a642eea2fb7ae638c36f6252b6750293dbe574a806984b8e4d8548339a3bef51e1b804cc89d182d279655c3aa89e815b1b309fe287d9b2b55d57b90ec68a010000001976a9141d0f172a0ecb48aee1be1f2687d2963ae33f71a188ac0046c32300000000ffffffff863ef3e1a92afbfdb97f31ad0fc7683ee943e9abcf2501590ff8f6551f47e5e51100000001000000');

      // sighash preimage for vin0
      const sigHash1 = Hash.hash256(sigHashPreImage1);
      expect(sigHash1).toBe('c37af31116d1b27caf68aae9e3ac82f1477929014d5b917657d0eb49478cb670');
    });
  });

  describe('Tx', () => {

    describe('serialize()', () => {

      test('p2wpkh: the inputs come from a p2pk and a p2wpkh.', () => {
        // vin
        const vin0 = new Vin(Hex.rev('fff7f7881a8099afa6940d42d1e7f6362bec38171ea3edf433541db4e4ad969f'), 0, new Script(''), 4294967278);
        const vin1 = new Vin(Hex.rev('ef51e1b804cc89d182d279655c3aa89e815b1b309fe287d9b2b55d57b90ec68a'), 1, new Script(''), 4294967295);
        // vout
        const vout0 = new Vout(112340000, new Script('OP_DUP OP_HASH160 8280b37df378db99f66f85c95a783a76ac7a6d59 OP_EQUALVERIFY OP_CHECKSIG'));
        const vout1 = new Vout(223450000, new Script('OP_DUP OP_HASH160 3bde42dbee7e4dbe6a21b2d50ce2f0167faa8159 OP_EQUALVERIFY OP_CHECKSIG'));
        // witness
        const witness0 = new Witness();
        const witness1 = new Witness();
        witness1.add(new Script('304402203609e17b84f6a7d30c80bfa610b5b4542f32a8a0d5447a12fb1366d7f01cc44a0220573a954c4518331561406f90300e8f3358f51928d43c212a8caed02de67eebee01'));
        witness1.add(new Script('025476c2e83188368da1ff3e292e7acafcdb3566bb0ad253f62fc70f07aeee6357'));
        // transaction
        const tx = new Tx(1, [], [], 17);
        tx.addVin(vin0);
        tx.addVin(vin1);
        tx.addVout(vout0);
        tx.addVout(vout1);
        tx.addWitness(witness0);
        tx.addWitness(witness1);
        const scriptSig0 ='30450221008b9d1dc26ba6a9cb62127b02742fa9d754cd3bebf337f7a55d114c8e5cdd30be022040529b194ba3f9281a99f2b1c0a19c0489bc22ede944ccf4ecbab4cc618ef3ed01';
        const vin0upd = new Vin(Hex.rev('fff7f7881a8099afa6940d42d1e7f6362bec38171ea3edf433541db4e4ad969f'), 0, new Script(scriptSig0), 4294967278);
        tx.updateVin(0, vin0upd);
        expect(tx.serialize()).toBe('01000000000102fff7f7881a8099afa6940d42d1e7f6362bec38171ea3edf433541db4e4ad969f00000000494830450221008b9d1dc26ba6a9cb62127b02742fa9d754cd3bebf337f7a55d114c8e5cdd30be022040529b194ba3f9281a99f2b1c0a19c0489bc22ede944ccf4ecbab4cc618ef3ed01eeffffffef51e1b804cc89d182d279655c3aa89e815b1b309fe287d9b2b55d57b90ec68a0100000000ffffffff02202cb206000000001976a9148280b37df378db99f66f85c95a783a76ac7a6d5988ac9093510d000000001976a9143bde42dbee7e4dbe6a21b2d50ce2f0167faa815988ac000247304402203609e17b84f6a7d30c80bfa610b5b4542f32a8a0d5447a12fb1366d7f01cc44a0220573a954c4518331561406f90300e8f3358f51928d43c212a8caed02de67eebee0121025476c2e83188368da1ff3e292e7acafcdb3566bb0ad253f62fc70f07aeee635711000000');
      });
    });
  });
});
