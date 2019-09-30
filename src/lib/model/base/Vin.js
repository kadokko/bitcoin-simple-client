import Num from 'lib/util/Num';
import Hex from 'lib/util/Hex';


class Vin {

  constructor(txid, vout, scriptSig, sequence = 4294967295) {
    this.txid = txid;
    this.vout = vout;
    this.scriptSig = scriptSig;
    this.sequence = sequence;
  }

  serialize() {
    return ''
      + Hex.rev(this.txid)
      + Num.toHexRev(this.vout, 8)
      + this.scriptSig.serialize()
      + Num.toHexRev(this.sequence, 8);
  }

}

export default Vin;
