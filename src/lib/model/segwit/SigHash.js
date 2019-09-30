import Hash from 'lib/util/Hash';
import Hex from 'lib/util/Hex';
import Num from 'lib/util/Num';
import VarInt from 'lib/util/VarInt';


export class SigHashPreImage {

  constructor(tx, hashtype=1) {
    this.vins = tx.vins;
    this.vouts = tx.vouts;
    this.version = tx.version;
    this.locktime = tx.locktime;
    this.hashtype = hashtype;
  }

  serialize(i, scriptCode, vinAmount) {
    const vin = this.vins[i];
    return ''
      // 1. nversion
      + Num.toHexRev(this.version, 8) // 8: version size
      // 2. prev outpoints hash
      + this.hashPrevOuts()
      // 3. prev sequences hash
      + this.hashPrevSeqs()
      // 4. vin[i]: txid + vout
      + Hex.rev(vin.txid)
      + Num.toHexRev(vin.vout, 8)
      // 5. scriptCode
      + VarInt.lenRev(scriptCode)
      + scriptCode
      // 6. vin[i]: amount
      + Num.toHexRev(vinAmount, 16)
      // 7. vin[i]: sequence
      + Num.toHexRev(vin.sequence, 8)
      // 8 hash outputs
      + this.hashOutputs()
      // 9. locktime
      + Num.toHexRev(this.locktime, 8)
      // 10. sighash type
      + Num.toHexRev(this.hashtype, 8);
  }

  hashPrevOuts() {
    const prevOuts = this.vins.map(vin => (
      Hex.rev(vin.txid) + Num.toHexRev(vin.vout, 8)
    )).join('');
    return Hash.hash256(prevOuts);
  }

  hashPrevSeqs() {
    const prevSeqs = this.vins.map(vin => (
      Num.toHexRev(vin.sequence, 8)
    )).join('');
    return Hash.hash256(prevSeqs);
  }

  hashOutputs() {
    const outputs = this.vouts.map(vout => (
      Num.toHexRev(vout.value, 16) // satoshi
      + VarInt.lenRev(vout.scriptPubKey.toHex())
      + vout.scriptPubKey.toHex()
    )).join('');
    return Hash.hash256(outputs);
  }

}
