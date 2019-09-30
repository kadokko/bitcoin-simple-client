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

    test('ScriptSig p2pkh', () => {
      expect(ScriptParser.deserialize('4730440220432bf02010f9457fecf52288cdb7208a0a08f144731e0f8a69683b29126eea8302205399ea1462100cd6784741ef40e47c3fa10e68735d5dbbaa84fdfc75d15afebb0121abcdef1234567890abcdef1234567890abcdef12abcdef1234567890abcdef1234'))
        .toBe('30440220432bf02010f9457fecf52288cdb7208a0a08f144731e0f8a69683b29126eea8302205399ea1462100cd6784741ef40e47c3fa10e68735d5dbbaa84fdfc75d15afebb01 abcdef1234567890abcdef1234567890abcdef12abcdef1234567890abcdef1234');
    });

  });

});
