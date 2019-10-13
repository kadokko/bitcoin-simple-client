import { SigHashType } from 'lib/constant';
import { Vin, Script } from 'lib/model/base';
import { Tx } from 'lib/model/standard';
import Hash from 'lib/util/Hash';
import Num from 'lib/util/Num';


class SigHash {

  static create(tx, i, sigHashType=SigHashType.ALL) {
    const target = this.createPreImage(tx, i);
    return Hash.hash256(target + Num.toHexRev(sigHashType, 8));
  }

  static createPreImage(tx, index) {
    const vins = tx.vins.map((vin, i) => {
      const scriptSig = (i === index ? vin.scriptSig : new Script(''));
      return new Vin(vin.txid, vin.vout, scriptSig, vin.sequence);
    });
    const t = new Tx(tx.version, vins, tx.vouts, tx.locktime);
    return t.serialize();
  }

}

export default SigHash;
