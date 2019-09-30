import KeyConv from 'lib/util/KeyConv';


describe('KeyConv', () => {

  describe('pubkeyToP2pkhAddr()', () => {

    test('pubkey to p2pkh address.', () => {
      const pubkey = '0324e0f058b1d62f945c0be883d4719ca40c4c14c21d64fa85c7f3f3e5e0618bad';
      const address = 'n3D2Rn9H58EKYJBYcbZ1AWHRA52GRxi2KA';
      expect(KeyConv.pubkeyToP2pkhAddr(pubkey)).toBe(address);
    });

  });

  describe('scriptToP2shAddr()', () => {

    // test vector
    // https://github.com/bitcoin/bips/blob/master/bip-0067.mediawiki
    test('redeem script to p2sh address.', () => {
      process.env = { ...process.env, NETWORK_MODE: 'MAINNET' };
      const redeemScript = '522102fe6f0a5a297eb38c391581c4413e084773ea23954d93f7753db7dc0adc188b2f2102ff12471208c14bd580709cb2358d98975247d8765f92bc25eab3b2763ed605f852ae';
      const address = '39bgKC7RFbpoCRbtD5KEdkYKtNyhpsNa3Z';
      expect(KeyConv.scriptToP2shAddr(redeemScript)).toBe(address);
      process.env = { ...process.env, NETWORK_MODE: 'TESTNET' };
    });

  });

  describe('wifToPrvkey()', () => {

    test('wif string to privkey.', () => {
      const wif = '5HpneLQNHQB1AWFYw2ydV97TAf4e8B1HUixrHZnJR6mqJAr8NuS';
      const privkey = '01234567890abcdef01234567890abcdef01234567890abcdef01234567890ab';
      expect(KeyConv.wifToPrvkey(wif)).toBe(privkey);
    });

  });

  describe('wifToPrvkey()', () => {

    test('privkey to wif string.', () => {
      process.env = { ...process.env, NETWORK_MODE: 'MAINNET' };
      const wif = '5HpneLQNHQB1AWFYw2ydV97TAf4e8B1HUixrHZnJR6mqJAr8NuS';
      const privkey = '01234567890abcdef01234567890abcdef01234567890abcdef01234567890ab';
      expect(KeyConv.prvkeyToWif(privkey)).toBe(wif);
      process.env = { ...process.env, NETWORK_MODE: 'TESTNET' };
    });

  });


  describe('toUnCompressedPub()', () => {

    test('convert compress pubkey to uncompress pubkey.', () => {
      // generator point coordinate
      const compressedPubKey = '0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798';
      const unCompressedPubKey = '0479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8';
      expect(KeyConv.toUnCompressedPub(compressedPubKey)).toBe(unCompressedPubKey);
    });

  });

});
