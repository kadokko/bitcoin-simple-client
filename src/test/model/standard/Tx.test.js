import { Vin, Vout, Script } from 'lib/model/base';
import { Tx } from 'lib/model/standard';


describe('Tx', () => {

  describe('serialize()', () => {

    test('convert tx object to tx hex.', () => {
      const vin = new Vin(
        '02d6f2f7556e641cde1b95dd2d96d2dd21e42ed98b7efd28420fbaded183e913',
        0,
        new Script('304402205eec8e42a5e5a7c18baa493bf20beb4729cf03dd76bdec790eb0e0828d067ca402204fc2b789cd5d4afdfe02e227fd4906e7ba60668f75f1a3c5e098d829051a6a8701'),
        4294967294,
      );

      const amount1 = 4799996220;
      const scriptPubKey1 = new Script('OP_HASH160 2c2fbdb772e53649108095749285ff47949bbcd5 OP_EQUAL');
      const vout1 = new Vout(amount1, scriptPubKey1);

      const amount2 = 200000000;
      const scriptPubKey2 = new Script('OP_DUP OP_HASH160 b62df1e86228d96efff38e49798b79ced9f27348 OP_EQUALVERIFY OP_CHECKSIG');
      const vout2 = new Vout(amount2, scriptPubKey2);

      const tx = new Tx();
      tx.addVin(vin);
      tx.addVout(vout1);
      tx.addVout(vout2);

      // script sig
      // 48: length of scriptsig (all script sig's elements)
      // 47: length of signature (one script sig's element)
      const hex = ''
                // version
                + '02000000'
                // vin
                + '01'
                + '13e983d1deba0f4228fd7e8bd92ee421ddd2962ddd951bde1c646e55f7f2d602'
                + '00000000'
                + '48'
                + '47304402205eec8e42a5e5a7c18baa493bf20beb4729cf03dd76bdec790eb0e0828d067ca402204fc2b789cd5d4afdfe02e227fd4906e7ba60668f75f1a3c5e098d829051a6a8701'
                + 'feffffff'
                // vout
                + '02'
                // vout 1
                + '3c211a1e01000000'
                + '17'
                + 'a9142c2fbdb772e53649108095749285ff47949bbcd587'
                // vout 2
                + '00c2eb0b00000000'
                + '19'
                + '76a914b62df1e86228d96efff38e49798b79ced9f2734888ac'
                // locktime
                + '00000000';
      expect(tx.serialize()).toBe(hex);
    });

    test('convert object to hex. (script sig is empty)', () => {
      const vin = new Vin(
        '02d6f2f7556e641cde1b95dd2d96d2dd21e42ed98b7efd28420fbaded183e913',
        0,
        new Script(''),
        4294967294,
      );

      const amount1 = 4799996220;
      const scriptPubKey1 = new Script('OP_HASH160 2c2fbdb772e53649108095749285ff47949bbcd5 OP_EQUAL');
      const vout1 = new Vout(amount1, scriptPubKey1);

      const amount2 = 200000000;
      const scriptPubKey2 = new Script('OP_DUP OP_HASH160 b62df1e86228d96efff38e49798b79ced9f27348 OP_EQUALVERIFY OP_CHECKSIG');
      const vout2 = new Vout(amount2, scriptPubKey2);

      const tx = new Tx();
      tx.addVin(vin);
      tx.addVout(vout1);
      tx.addVout(vout2);
      const hex = '02000000'
                // vin
                + '01'
                + '13e983d1deba0f4228fd7e8bd92ee421ddd2962ddd951bde1c646e55f7f2d602'
                + '00000000'
                + '00'
                + 'feffffff'
                // vout
                + '02'
                + '3c211a1e01000000'
                + '17a9142c2fbdb772e53649108095749285ff47949bbcd587'
                + '00c2eb0b00000000'
                + '1976a914b62df1e86228d96efff38e49798b79ced9f2734888ac'
                // locktime
                + '00000000';
      expect(tx.serialize()).toBe(hex);
    });

  });

});
