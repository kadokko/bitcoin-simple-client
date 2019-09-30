import { Vin, Vout, Script } from 'lib/model/base';
import { Tx } from 'lib/model/standard';


export class TxMapper {

  static toModel(obj) {
    const version = obj.version;
    const vins = obj.vins.map(vin => (
      // TODO automate
      // new Vin(vin.txid, vin.vout, new Script(vin.scriptPubKeyAsm), vin.sequence)
      new Vin(vin.txid, vin.vout, new Script(vin.scriptSig), vin.sequence)
    ));
    const vouts = obj.vouts.map(vout => (
      new Vout(vout.value, new Script(vout.scriptPubKey))
    ));
    const locktime = obj.locktime;
    return new Tx(version, vins, vouts, locktime);
  }

}
