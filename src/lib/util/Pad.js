class Pad {

  static lpad(num, size, padchar = '0') {
    return (padchar.repeat(size) + String(num)).slice(-size);
  }

}

export default Pad;
