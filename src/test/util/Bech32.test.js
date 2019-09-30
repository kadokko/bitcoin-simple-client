import { Bech32 } from 'lib/util/Bech32';


// test data
// https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki
describe('Bech32', () => {

  const pubkey = '0279BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798';

  describe('p2wshAddr()', () => {

    test('convert pubkey to p2wpkh address.', () => {
      // testnet
      expect(Bech32.p2wpkhAddr(pubkey, 'tb'))
        .toBe('tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx');
      // mainnet
      expect(Bech32.p2wpkhAddr(pubkey, 'bc', 0))
        .toBe('bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4');
    });

    test('convert pubkey to p2wsh address.', () => {
      // {script length} pubkey OP_CHECKSIG
      const redeemScript = '21' + pubkey + 'ac';
      // testnet
      expect(Bech32.p2wshAddr(redeemScript, 'tb'))
        .toBe('tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7');
      // mainnet
      expect(Bech32.p2wshAddr(redeemScript, 'bc', 0))
        .toBe('bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3');
    });

  });

});
