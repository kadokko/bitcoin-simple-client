import { OpCode } from 'lib/constant';
import Str from 'lib/util/Str';
import VarInt from 'lib/util/VarInt';


class Script {

  constructor(asm) {
    this.asm = Str.removeDelimiter(asm);
  }

  serialize() {
    const payload = this.toHex();
    return VarInt.lenRev(payload) + payload;
  }

  toHex() {
    return this.parse().join('');
  }

  toString() {
    return this.asm;
  }

  parse() {
    if (this.asm === '') return [ '' ];
    return this.asm
      .split(' ')
      .map((element) => {
        if (element.startsWith('OP_')) {
          return OpCode.get(element);
        }
        return VarInt.lenRev(element) + element;
      });
  }

}

export default Script;
