class Byte {

  static arrayToHex(binArray) {
    return Array.from(binArray).map(b => ('0' + b.toString(16)).slice(-2)).join('');
  }
}

export default Byte;
