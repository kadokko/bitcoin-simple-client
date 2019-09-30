import VarInt from 'lib/util/VarInt';


describe('VarInt', () => {

  describe('len()', () => {
    test('big endian varint length of hex string.', () => {
      expect(VarInt.len('01'.repeat(20))).toBe('14');
      expect(VarInt.len('01'.repeat(258))).toBe('fd0102');
    });
  });

  describe('lenRev()', () => {
    test('little endian varint length of hex string.', () => {
      expect(VarInt.lenRev('01'.repeat(20))).toBe('14');
      expect(VarInt.lenRev('01'.repeat(258))).toBe('0201fd');
    });
  });

});
