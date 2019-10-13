class Utxo {

  constructor(txid, vout, scriptPubKey, amount, confirmations, address, redeemScript='') {
    this.txid = txid;
    this.vout = vout;
    this.scriptPubKey = scriptPubKey;
    this.amount = amount;
    this.confirmations = confirmations;
    this.address = address;
    this.redeemScript = redeemScript;
  }
}

export default Utxo;
