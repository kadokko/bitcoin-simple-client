import { Script } from 'lib/model/base';
import Hash from 'lib/util/Hash';
import ScriptAnalizer from 'lib/util/ScriptAnalizer';


describe('ScriptAnalizer', () => {

  describe('type()', () => {

    test('classify p2wpkh script.', () => {
      const script = new Script('OP_0 1234567890123456789012345678901234567890');
      expect(ScriptAnalizer.type(script.toHex()))
        .toBe('P2WPKH');
    });

    test('classify p2wsh script.', () => {
      const redeemScript = new Script('OP_TRUE');
      const redeemScriptHex = redeemScript.serialize();
      const redeemScriptHash = Hash.sha256(redeemScriptHex);
      const script = new Script('OP_0 ' + redeemScriptHash);
      expect(ScriptAnalizer.type(script.toHex()))
        .toBe('P2WSH');
    });

    test('classify p2pkh script.', () => {
      const script = new Script('OP_DUP OP_HASH160 1234567890123456789012345678901234567890 OP_EQUALVERIFY OP_CHECKSIG');
      expect(ScriptAnalizer.type(script.toHex()))
        .toBe('P2PKH');
    });

    test('classify p2sh script.', () => {
      const script = new Script('OP_HASH160 1234567890123456789012345678901234567890 OP_EQUAL');
      expect(ScriptAnalizer.type(script.toHex()))
        .toBe('P2SH');
    });

    test('classify p2pk script.', () => {
      const script = new Script('123456789012345678901234567890123456789012345678901234567890123456 OP_CHECKSIG');
      expect(ScriptAnalizer.type(script.toHex()))
        .toBe('P2PK');
    });

  });

});
