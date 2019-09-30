class ScriptAnalizer {

  static type(scriptHex) {
    // P2WPKH: OP_0 <pubKeyHash>
    if (/^0014[0-9|a-f|A-F]{40}$/.test(scriptHex)) {
      return 'P2WPKH'; // witness_v0_keyhash
    }
    // P2WSH: OP_0 <redeemScriptHash>
    if (/^0020[0-9|a-f|A-F]{64}$/.test(scriptHex)) {
      return 'P2WSH'; // witness_v0_scripthash
    }
    // P2PKH: OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG
    if (/^76a914[0-9|a-f|A-F]{40}88ac$/.test(scriptHex)) {
      return 'P2PKH';
    }
    // P2SH: OP_HASH160 <scriptHash> OP_EQUAL
    if (/^a914[0-9|a-f|A-F]{40}87$/.test(scriptHex)) {
      return 'P2SH';
    }
    // P2PK: <pubkey> OP_CHECKSIG
    if (/^21[0-9|a-f|A-F]{66}ac$/.test(scriptHex)) {
      return 'P2PK';
    }
    return 'non standard';
  }
}

export default ScriptAnalizer;
