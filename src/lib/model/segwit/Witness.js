import Num from 'lib/util/Num';


class Witness {

  constructor() {
    this.scripts = [];
  }

  add(script) {
    this.scripts.push(script);
  }

  serialize() {
    return ''
      + Num.toVarInt(this.scripts.length)
      + this.scripts.map(s => {
        return s.toHex() === '' ? '00' : s.toHex();
      }).join('');
  }

}

export default Witness;
