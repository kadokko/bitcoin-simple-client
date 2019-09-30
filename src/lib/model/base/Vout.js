import Num from 'lib/util/Num';


class Vout {

  constructor(amount, scriptPubKey) {
    this.value = amount; // satoshi
    this.scriptPubKey = scriptPubKey;

    this.n = '';
    this.scriptPubKeyAsm = '';
    this.reqSigs = '';
    this.type = '';
    this.addresses = [];
  }

  serialize() {
    return ''
      + Num.toHexRev(this.value, 16)
      + this.scriptPubKey.serialize();
  }
}

export default Vout;
