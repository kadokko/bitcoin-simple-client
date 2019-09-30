import { Vin, Vout, Script } from 'lib/model/base';
import { Tx } from 'lib/model/standard';
import { Signer } from 'lib/util/Sign';
import VarInt from 'lib/util/VarInt';


describe('Signer', () => {

  describe('createSignature()', () => {
    test('create signature.', () => {
      const vin = new Vin(
        'a8211a755ee02724dbaa5483cc381538626966720fa9ff9e180f27180192ced0',
        1,
        new Script('76a91465f4a13e80c5da308664667c42040d587be3ff3888ac'),
        4294967293,
      );

      const fee = 10000; // satoshi
      const amount = 2 * (10 ** 8);
      const scriptPubKey = new Script('OP_DUP OP_HASH160 65f4a13e80c5da308664667c42040d587be3ff38 OP_EQUALVERIFY OP_CHECKSIG');
      const vout = new Vout(amount - fee, scriptPubKey);

      const tx = new Tx();
      tx.addVin(vin);
      tx.addVout(vout);

      const prvkey = '051fffe64ee4f901e4271f92fb297293b2b42cb53e9250a4c816b02c2e2e99c4';
      const signature = Signer.createSignature(tx.serialize(), prvkey);
      expect(signature.length).toBe(142);
    });
  });
});

describe('Tx', () => {

  describe('serialize()', () => {
    test('create signed tx hex.', () => {
      const vin = new Vin(
        'a8211a755ee02724dbaa5483cc381538626966720fa9ff9e180f27180192ced0',
        1,
        new Script('76a91465f4a13e80c5da308664667c42040d587be3ff3888ac'),
        4294967293,
      );

      const fee = 10000; // satoshi
      const amount = 2 * (10 ** 8);
      const scriptPubKey = new Script('OP_DUP OP_HASH160 65f4a13e80c5da308664667c42040d587be3ff38 OP_EQUALVERIFY OP_CHECKSIG');
      const vout = new Vout(amount - fee, scriptPubKey);

      const tx = new Tx();
      tx.addVin(vin);
      tx.addVout(vout);

      const prvkey = '051fffe64ee4f901e4271f92fb297293b2b42cb53e9250a4c816b02c2e2e99c4';
      const signature = Signer.createSignature(tx.serialize(), prvkey);
      expect(signature.length).toBe(142);

      const pubkey = '02c158f50a7bb9dbb681afa4173290ea03e284460c5ae3d83b481ed7e934b41844';
      const scriptSig = new Script(signature + ' ' + pubkey);
      expect(VarInt.lenRev(scriptSig.toHex())).toBe('6a');

      vin.scriptSig = scriptSig;
      const txSigned = new Tx();
      txSigned.addVin(vin);
      txSigned.addVout(vout);
      expect(txSigned.serialize()).toBe(
        // version
        '02000000'
        // vin
        + '01'
        + 'd0ce920118270f189effa90f72666962381538cc8354aadb2427e05e751a21a8'
        + '01000000'
        + scriptSig.serialize() // signature is different each time.
        + 'fdffffff'
        // vout
        + '01'
        + 'f09aeb0b00000000'
        + '19'
        + '76a91465f4a13e80c5da308664667c42040d587be3ff3888ac'
        // locktime
        + '00000000',
      );
    });
  });
});
