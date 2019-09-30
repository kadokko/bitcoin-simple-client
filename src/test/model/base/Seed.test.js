import Seed from 'lib/model/base/Seed';


describe('Seed', () => {

  describe('generate()', () => {
    test('generate a random value of 32 bytes.', () => {
      expect(Seed.generate().length)
        .toBe(64);
    });
  });

});
