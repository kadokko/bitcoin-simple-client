import BigNumber from 'bignumber.js';


class Unit {

  static BTC_RATE = 100000000;

  static toSat(btc) {
    return new BigNumber(btc)
      .multipliedBy(this.BTC_RATE)
      .toNumber();
  }

  static toBtc(satoshi) {
    return new BigNumber(satoshi)
      .dividedBy(this.BTC_RATE)
      .toNumber();
  }

}

export default Unit;
