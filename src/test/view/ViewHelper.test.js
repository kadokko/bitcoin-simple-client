import { ViewHelper } from 'lib/view/ViewHelper';


describe('ViewHelper', () => {

  describe('shorten()', () => {
    test("cut the string if it's length is longer than 12.", () => {
      expect(ViewHelper.shorten('1234567890123')).toBe('1234...0123');
    });
    test("doesn't cut the string if it's length is not longer than 12.", () => {
      expect(ViewHelper.shorten('123456789012')).toBe('123456789012');
    });
  });

});
