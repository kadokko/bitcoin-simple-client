import ScriptParser from 'lib/util/ScriptParser';


describe('ScriptParser', () => {

  describe('deserialize()', () => {

    test('ScriptPubKey p2pk', () => {
      expect(ScriptParser.deserialize('21abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abac'))
        .toBe('abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab OP_CHECKSIG');
    });

    test('ScriptPubKey p2pkh', () => {
      expect(ScriptParser.deserialize('76a914abcdef1234567890abcdef1234567890abcdef1288ac'))
        .toBe('OP_DUP OP_HASH160 abcdef1234567890abcdef1234567890abcdef12 OP_EQUALVERIFY OP_CHECKSIG');
    });

    test('ScriptPubKey p2sh', () => {
      expect(ScriptParser.deserialize('a914abcdef1234567890abcdef1234567890abcdef1287'))
        .toBe('OP_HASH160 abcdef1234567890abcdef1234567890abcdef12 OP_EQUAL');
    });

    test('ScriptPubKey multisig', () => {
      expect(ScriptParser.deserialize('52'
          + '21abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab'
          + '21abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab'
          + '52'
          + 'ae'))
        .toBe('OP_2 '
          + 'abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab '
          + 'abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab '
          + 'OP_2 '
          + 'OP_CHECKMULTISIG');
    });

    test('ScriptSig p2pkh', () => {
      expect(ScriptParser.deserialize('4730440220432bf02010f9457fecf52288cdb7208a0a08f144731e0f8a69683b29126eea8302205399ea1462100cd6784741ef40e47c3fa10e68735d5dbbaa84fdfc75d15afebb0121abcdef1234567890abcdef1234567890abcdef12abcdef1234567890abcdef1234'))
        .toBe('30440220432bf02010f9457fecf52288cdb7208a0a08f144731e0f8a69683b29126eea8302205399ea1462100cd6784741ef40e47c3fa10e68735d5dbbaa84fdfc75d15afebb01 abcdef1234567890abcdef1234567890abcdef12abcdef1234567890abcdef1234');
    });

    test('script size >= 76 bytes, <= 255 bytes', () => {
      const hex76 = '0'.repeat(76*2);
      expect(ScriptParser.deserialize(''
        + '4c' // 0x4c : OP_PUSHDATA1
        + '4c' // 0x4c : 76
        + hex76))
        .toBe(hex76);
    });

    test('script size >= 256 bytes, <= 520 bytes', () => {
      const hex256 = '0'.repeat(256*2);
      expect(ScriptParser.deserialize(''
        + '4d'   // 0x4d   : OP_PUSHDATA2
        + '0100' // 0x0100 : 256
        + hex256))
        .toBe(hex256);
    });

    test('script size >= 521 bytes', () => {
      const hex521 = '0'.repeat(521*2);
      expect(ScriptParser.deserialize(''
        + '4e'       // 0x4e       : OP_PUSHDATA4
        + '00000209' // 0x00000209 : 521
        + hex521))
        .toBe(hex521);
    });

  });

});
