import Num from 'lib/util/Num';


class Tx {

  constructor(version = 2, vins = [], vouts = [], locktime = 0) {
    this.version = version;
    this.vins = vins;
    this.vouts = vouts;
    this.locktime = locktime;
    this.witnesses = [];
    // for segwit
    this.marker = 0;
    this.flag = 1;
  }

  addVin(vin) {
    this.vins.push(vin);
  }

  updateVin(i, vin) {
    this.vins[i] = vin;
  }

  addVout(vout) {
    this.vouts.push(vout);
  }

  addWitness(witness) {
    this.witnesses.push(witness);
  }

  serialize() {
    return ''
      // version, marker, flag
      + Num.toHexRev(this.version, 8)
      + Num.toHexRev(this.marker, 2)
      + Num.toHexRev(this.flag, 2)
      // vins
      + Num.toVarIntRev(this.vins.length)
      + this.vins.map(vin => vin.serialize()).join('')
      // vouts
      + Num.toVarIntRev(this.vouts.length)
      + this.vouts.map(vout => vout.serialize()).join('')
      // witnesses
      + this.witnesses.map(witness => witness.serialize()).join('')
      // locktime
      + Num.toHexRev(this.locktime, 8);
  }
}

export default Tx;
