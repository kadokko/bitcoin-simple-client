import { Vin, Script } from 'lib/model/base';


describe('Vin', () => {

  describe('propeties', () => {

    test('scriptSig.', () => {
      const txid = '123456789012345678901234567890123456789012345678901234';
      const vout = 0;
      const sequence = 1234;
      const vin = new Vin(txid, vout, sequence);
      expect(vin.txid).toBe(txid);
    });

  });

  describe('serialize()', () => {

    test('to hex.', () => {
      const txid = '966e83f27fd984e174a302884bc4f847007f401021eed7aa7d834ea714e8e154';
      const vout = 0;
      const scriptSig = '';
      const sequence = 4294967294;
      const vin = new Vin(txid, vout, scriptSig, sequence);
      vin.scriptSig = new Script('3044022075be9cf7d73994890a24241b563762d47f31295f359735f151735d57c8f4adb002205ceca67d9d4ee0ae3b9314a2c6f7a38801e67636d8a768a7ea8ca474bc477ce401');

      const hex = '54e1e814a74e837daad7ee2110407f0047f8c44b8802a374e184d97ff2836e96'
                + '00000000'
                + '48'
                + '473044022075be9cf7d73994890a24241b563762d47f31295f359735f151735d57c8f4adb002205ceca67d9d4ee0ae3b9314a2c6f7a38801e67636d8a768a7ea8ca474bc477ce401'
                + 'feffffff';
      expect(vin.serialize()).toBe(hex);
    });

  });

});
