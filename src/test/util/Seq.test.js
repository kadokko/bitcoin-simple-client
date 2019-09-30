import Seq from 'lib/util/Seq';


describe('Seq', () => {

  describe('generate()', () => {
    test('generate sequential number.', () => {
      expect(Seq.generate(3)).toEqual([ 0, 1, 2 ]);
    });
  });

});
