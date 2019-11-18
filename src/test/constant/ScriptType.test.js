import { ScriptType } from 'lib/constant';


describe('ScriptType', () => {

  describe('types', () => {
    const scriptType = ScriptType.types;
    test('...', () => {
      expect(scriptType.get('P2PKH')).toBe('pubkeyhash');
      expect(scriptType.get('P2SH')).toBe('scripthash');
      expect(scriptType.get('P2PK')).toBe('pubkey');
      expect(scriptType.get('NULLDATA')).toBe('nulldata');
      expect(scriptType.get('MULTISIG')).toBe('multisig');
      expect(scriptType.get('P2WPKH')).toBe('witness_v0_keyhash');
      expect(scriptType.get('P2WSH')).toBe('witness_v0_scripthash');
      expect(scriptType.get('NONSTANDARD')).toBe('nonstandard');
    });
  });

  describe('entries()', () => {
    test('...', () => {
      const entry = ScriptType.entries()[0];
      expect(entry[0]).toBe('P2PKH');
      expect(entry[1]).toBe('pubkeyhash');
    });
  });

});
