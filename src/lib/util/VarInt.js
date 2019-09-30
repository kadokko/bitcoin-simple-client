import Num from './Num';


class VarInt {

  static len(hexStr) {
    return Num.toVarInt(hexStr.length / 2);
  }

  static lenRev(hexStr) {
    return Num.toVarIntRev(hexStr.length / 2);
  }

}

export default VarInt;
