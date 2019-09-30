import Seq from './Seq';


class Hex {

  static len(hexStr) {
    return (hexStr.length / 2).toString(16);
  }

  static zeropad(hex) {
    return (hex.toString().length % 2 === 1 ? '0' : '') + hex;
  }

  static rev(hexStr) {
    return Seq.generate(hexStr.length)
      .filter(i => i % 2 === 0)
      .map(i => hexStr.substring(i, i + 2))
      .reverse()
      .join('');
  }

}

export default Hex;
