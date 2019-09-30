import { OpCode } from 'lib/constant';


describe('OpCode', () => {

  describe('get()', () => {
    test('...', () => {
      expect(OpCode.get('OP_EQUAL')).toBe('87');
    });
  });

  describe('keys()', () => {
    test('...', () => {
      expect(OpCode.keys()[0]).toBe('OP_0');
    });
  });

  describe('values()', () => {
    test('...', () => {
      expect(OpCode.values()[0]).toBe('00');
    });
  });

});
