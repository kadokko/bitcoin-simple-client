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

  describe('isOpCode()', () => {
    test('...', () => {
      expect(OpCode.isOpCode('87')).toBe(true);
      expect(OpCode.isOpCode('cd')).toBe(false);
    });
  });

  describe('isPushdata1()', () => {
    test('...', () => {
      expect(OpCode.isPushdata1('4c')).toBe(true);
      expect(OpCode.isPushdata1('4C')).toBe(true);
      expect(OpCode.isPushdata1('4d')).toBe(false);
    });
  });

  describe('isPushdata2()', () => {
    test('...', () => {
      expect(OpCode.isPushdata2('4d')).toBe(true);
      expect(OpCode.isPushdata2('4D')).toBe(true);
      expect(OpCode.isPushdata2('4e')).toBe(false);
    });
  });

  describe('isPushdata4()', () => {
    test('...', () => {
      expect(OpCode.isPushdata4('4e')).toBe(true);
      expect(OpCode.isPushdata4('4E')).toBe(true);
      expect(OpCode.isPushdata4('4c')).toBe(false);
    });
  });

});
