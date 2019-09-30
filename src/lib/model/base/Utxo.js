class Utxo {

  constructor(txid, vout, amount, confirmations, address, scriptPubKey, redeemScript='') {
    this.txid = txid;
    this.vout = vout;
    this.amount = amount;
    this.confirmations = confirmations;
    this.address = address;
    this.scriptPubKey = scriptPubKey;
    this.redeemScript = redeemScript;
  }
}

export default Utxo;
