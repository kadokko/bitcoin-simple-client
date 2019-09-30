import Unit from 'lib/util/Unit';


describe('Unit', () => {

  describe('toSat()', () => {
    test('convert currency unit from btc to satoshi.', () => {
      expect(Unit.toSat(12.3456)).toBe(1234560000);
      expect(Unit.toSat(99999999)).toBe(9999999900000000);
    });
  });

  describe('toBtc()', () => {
    test('convert currency unit from satoshi to btc.', () => {
      expect(Unit.toBtc(1234560000)).toBe(12.3456);
    });
  });

});
