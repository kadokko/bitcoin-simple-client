import Num from 'lib/util/Num';


class Tx {

  constructor(version = 2, vins = [], vouts = [], locktime = 0) {
    this.version = version;
    this.vins = vins;
    this.vouts = vouts;
    this.locktime = locktime;
  }

  addVin(vin) {
    this.vins.push(vin);
  }

  addVout(vout) {
    this.vouts.push(vout);
  }

  serialize() {
    return ''
      // version
      + Num.toHexRev(this.version, 8)
      // vins
      + Num.toVarIntRev(this.vins.length)
      + this.vins.map(vin => vin.serialize()).join('')
      // vouts
      + Num.toVarIntRev(this.vouts.length)
      + this.vouts.map(vout => vout.serialize()).join('')
      // locktime
      + Num.toHexRev(this.locktime, 8);
  }
}

export default Tx;
