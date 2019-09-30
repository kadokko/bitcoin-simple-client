class ScriptType {

  static types = new Map([
    [ 'P2PKH', 'pubkeyhash' ],
    [ 'P2SH', 'scripthash' ],
    [ 'P2PK', 'pubkey' ],
    [ 'NULLDATA', 'nulldata' ],
    [ 'MULTISIG', 'multisig' ],
    [ 'P2WPKH', 'witness_v0_keyhash' ],
    [ 'P2WSH', 'witness_v0_scripthash' ],
    [ 'NONSTANDARD', 'nonstandard' ],
  ]);

  static entries() {
    return Array.from(this.types.entries());
  }

}

export default ScriptType;
