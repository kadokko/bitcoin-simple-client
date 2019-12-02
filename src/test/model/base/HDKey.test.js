import { HDKey } from 'lib/model/base';


// Test Vectors
// https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
describe('HDKey', () => {

  process.env = { ...process.env, NETWORK_MODE: 'MAINNET' };

  describe('generate()', () => {

    const seed = '000102030405060708090a0b0c0d0e0f';
    const masterKey = HDKey.generate(seed);

    test('[m] private key.', () => {
      expect(masterKey.extPrv())
        .toBe('xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi');
    });

    test('[m] public key.', () => {
      expect(masterKey.extPub())
        .toBe('xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet8');
    });

    test('an error is thrown when the seed length is less than 16 bytes or greater than 64 bytes', () => {
      expect(() => HDKey.generate('0'.repeat(15*2)))
        .toThrow('seed length must be between 16 and 64 bytes (128 bits - 512 bits).');
      expect(() => HDKey.generate('0'.repeat(65*2)))
        .toThrow('seed length must be between 16 and 64 bytes (128 bits - 512 bits).');
    });

  });

  describe('derivePrvChildKey() test vector 1', () => {

    const seed = '000102030405060708090a0b0c0d0e0f';

    test("[m/0']", () => {
      const hdkey = HDKey.generate(seed);
      hdkey.derivePrvChildKey(0 + (2 ** 31));
      expect(hdkey.extPrv())
        .toBe('xprv9uHRZZhk6KAJC1avXpDAp4MDc3sQKNxDiPvvkX8Br5ngLNv1TxvUxt4cV1rGL5hj6KCesnDYUhd7oWgT11eZG7XnxHrnYeSvkzY7d2bhkJ7');
      expect(hdkey.extPub())
        .toBe('xpub68Gmy5EdvgibQVfPdqkBBCHxA5htiqg55crXYuXoQRKfDBFA1WEjWgP6LHhwBZeNK1VTsfTFUHCdrfp1bgwQ9xv5ski8PX9rL2dZXvgGDnw');
    });

    test("[m/0'/1]", () => {
      const hdkey = HDKey.generate(seed);
      hdkey.derivePrvChildKey(0 + (2 ** 31));
      hdkey.derivePrvChildKey(1);
      expect(hdkey.extPrv())
        .toBe('xprv9wTYmMFdV23N2TdNG573QoEsfRrWKQgWeibmLntzniatZvR9BmLnvSxqu53Kw1UmYPxLgboyZQaXwTCg8MSY3H2EU4pWcQDnRnrVA1xe8fs');
      expect(hdkey.extPub())
        .toBe('xpub6ASuArnXKPbfEwhqN6e3mwBcDTgzisQN1wXN9BJcM47sSikHjJf3UFHKkNAWbWMiGj7Wf5uMash7SyYq527Hqck2AxYysAA7xmALppuCkwQ');
    });

    test("[m/0'/1/2']", () => {
      const hdkey = HDKey.generate(seed);
      hdkey.derivePrvChildKey(0 + (2 ** 31));
      hdkey.derivePrvChildKey(1);
      hdkey.derivePrvChildKey(2 + (2 ** 31));
      expect(hdkey.extPrv())
        .toBe('xprv9z4pot5VBttmtdRTWfWQmoH1taj2axGVzFqSb8C9xaxKymcFzXBDptWmT7FwuEzG3ryjH4ktypQSAewRiNMjANTtpgP4mLTj34bhnZX7UiM');
      expect(hdkey.extPub())
        .toBe('xpub6D4BDPcP2GT577Vvch3R8wDkScZWzQzMMUm3PWbmWvVJrZwQY4VUNgqFJPMM3No2dFDFGTsxxpG5uJh7n7epu4trkrX7x7DogT5Uv6fcLW5');
    });

    test("[m/0'/1/2'/2]", () => {
      const hdkey = HDKey.generate(seed);
      hdkey.derivePrvChildKey(0 + (2 ** 31));
      hdkey.derivePrvChildKey(1);
      hdkey.derivePrvChildKey(2 + (2 ** 31));
      hdkey.derivePrvChildKey(2);
      expect(hdkey.extPrv())
        .toBe('xprvA2JDeKCSNNZky6uBCviVfJSKyQ1mDYahRjijr5idH2WwLsEd4Hsb2Tyh8RfQMuPh7f7RtyzTtdrbdqqsunu5Mm3wDvUAKRHSC34sJ7in334');
      expect(hdkey.extPub())
        .toBe('xpub6FHa3pjLCk84BayeJxFW2SP4XRrFd1JYnxeLeU8EqN3vDfZmbqBqaGJAyiLjTAwm6ZLRQUMv1ZACTj37sR62cfN7fe5JnJ7dh8zL4fiyLHV');
    });

    test("[m/0'/1/2'/2/1000000000]", () => {
      const hdkey = HDKey.generate(seed);
      hdkey.derivePrvChildKey(0 + (2 ** 31));
      hdkey.derivePrvChildKey(1);
      hdkey.derivePrvChildKey(2 + (2 ** 31));
      hdkey.derivePrvChildKey(2);
      hdkey.derivePrvChildKey(1000000000);
      expect(hdkey.extPrv())
        .toBe('xprvA41z7zogVVwxVSgdKUHDy1SKmdb533PjDz7J6N6mV6uS3ze1ai8FHa8kmHScGpWmj4WggLyQjgPie1rFSruoUihUZREPSL39UNdE3BBDu76');
      expect(hdkey.extPub())
        .toBe('xpub6H1LXWLaKsWFhvm6RVpEL9P4KfRZSW7abD2ttkWP3SSQvnyA8FSVqNTEcYFgJS2UaFcxupHiYkro49S8yGasTvXEYBVPamhGW6cFJodrTHy');
    });

  });

  describe('derivePrvChildKey() test vector 2', () => {

    const seed = 'fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542';

    test('[m]', () => {
      const hdkey = HDKey.generate(seed);
      expect(hdkey.extPrv())
        .toBe('xprv9s21ZrQH143K31xYSDQpPDxsXRTUcvj2iNHm5NUtrGiGG5e2DtALGdso3pGz6ssrdK4PFmM8NSpSBHNqPqm55Qn3LqFtT2emdEXVYsCzC2U');
      expect(hdkey.extPub())
        .toBe('xpub661MyMwAqRbcFW31YEwpkMuc5THy2PSt5bDMsktWQcFF8syAmRUapSCGu8ED9W6oDMSgv6Zz8idoc4a6mr8BDzTJY47LJhkJ8UB7WEGuduB');
    });

    test("[m/0/2147483647'/1/2147483646'/2]", () => {
      const hdkey = HDKey.generate(seed);
      hdkey.derivePrvChildKey(0);
      hdkey.derivePrvChildKey(2147483647 + (2 ** 31));
      hdkey.derivePrvChildKey(1);
      hdkey.derivePrvChildKey(2147483646 + (2 ** 31));
      hdkey.derivePrvChildKey(2);
      expect(hdkey.extPrv())
        .toBe('xprvA2nrNbFZABcdryreWet9Ea4LvTJcGsqrMzxHx98MMrotbir7yrKCEXw7nadnHM8Dq38EGfSh6dqA9QWTyefMLEcBYJUuekgW4BYPJcr9E7j');
      expect(hdkey.extPub())
        .toBe('xpub6FnCn6nSzZAw5Tw7cgR9bi15UV96gLZhjDstkXXxvCLsUXBGXPdSnLFbdpq8p9HmGsApME5hQTZ3emM2rnY5agb9rXpVGyy3bdW6EEgAtqt');
    });

  });

  describe('derivePrvChildKey() test vector 3', () => {

    const seed = '4b381541583be4423346c643850da4b320e46a87ae3d2a4e6da11eba819cd4acba45d239319ac14f863b8d5ab5a0d0c64d2e8a1e7d1457df2e5a3c51c73235be';

    test("[m/0']", () => {
      const hdkey = HDKey.generate(seed);
      hdkey.derivePrvChildKey(0 + (2 ** 31));
      expect(hdkey.extPrv())
        .toBe('xprv9uPDJpEQgRQfDcW7BkF7eTya6RPxXeJCqCJGHuCJ4GiRVLzkTXBAJMu2qaMWPrS7AANYqdq6vcBcBUdJCVVFceUvJFjaPdGZ2y9WACViL4L');
      expect(hdkey.extPub())
        .toBe('xpub68NZiKmJWnxxS6aaHmn81bvJeTESw724CRDs6HbuccFQN9Ku14VQrADWgqbhhTHBaohPX4CjNLf9fq9MYo6oDaPPLPxSb7gwQN3ih19Zm4Y');
    });

  });

  describe('derive() test vector 1', () => {

    const seed = '000102030405060708090a0b0c0d0e0f';

    test("[m/0']", () => {
      const hdkey = HDKey.generate(seed);
      hdkey.derive("m/0'");
      expect(hdkey.extPrv())
        .toBe('xprv9uHRZZhk6KAJC1avXpDAp4MDc3sQKNxDiPvvkX8Br5ngLNv1TxvUxt4cV1rGL5hj6KCesnDYUhd7oWgT11eZG7XnxHrnYeSvkzY7d2bhkJ7');
      expect(hdkey.extPub())
        .toBe('xpub68Gmy5EdvgibQVfPdqkBBCHxA5htiqg55crXYuXoQRKfDBFA1WEjWgP6LHhwBZeNK1VTsfTFUHCdrfp1bgwQ9xv5ski8PX9rL2dZXvgGDnw');
    });

    test("[m/0'/1]", () => {
      const hdkey = HDKey.generate(seed);
      hdkey.derive("m/0'/1");
      expect(hdkey.extPrv())
        .toBe('xprv9wTYmMFdV23N2TdNG573QoEsfRrWKQgWeibmLntzniatZvR9BmLnvSxqu53Kw1UmYPxLgboyZQaXwTCg8MSY3H2EU4pWcQDnRnrVA1xe8fs');
      expect(hdkey.extPub())
        .toBe('xpub6ASuArnXKPbfEwhqN6e3mwBcDTgzisQN1wXN9BJcM47sSikHjJf3UFHKkNAWbWMiGj7Wf5uMash7SyYq527Hqck2AxYysAA7xmALppuCkwQ');
    });

    test("[m/0'/1/2']", () => {
      const hdkey = HDKey.generate(seed);
      hdkey.derive("m/0'/1/2'");
      expect(hdkey.extPrv())
        .toBe('xprv9z4pot5VBttmtdRTWfWQmoH1taj2axGVzFqSb8C9xaxKymcFzXBDptWmT7FwuEzG3ryjH4ktypQSAewRiNMjANTtpgP4mLTj34bhnZX7UiM');
      expect(hdkey.extPub())
        .toBe('xpub6D4BDPcP2GT577Vvch3R8wDkScZWzQzMMUm3PWbmWvVJrZwQY4VUNgqFJPMM3No2dFDFGTsxxpG5uJh7n7epu4trkrX7x7DogT5Uv6fcLW5');
    });

    test("[m/0'/1/2'/2/1000000000]", () => {
      const hdkey = HDKey.generate(seed);
      hdkey.derive("m/0'/1/2'/2/1000000000");
      expect(hdkey.extPrv())
        .toBe('xprvA41z7zogVVwxVSgdKUHDy1SKmdb533PjDz7J6N6mV6uS3ze1ai8FHa8kmHScGpWmj4WggLyQjgPie1rFSruoUihUZREPSL39UNdE3BBDu76');
      expect(hdkey.extPub())
        .toBe('xpub6H1LXWLaKsWFhvm6RVpEL9P4KfRZSW7abD2ttkWP3SSQvnyA8FSVqNTEcYFgJS2UaFcxupHiYkro49S8yGasTvXEYBVPamhGW6cFJodrTHy');
    });

  });

  describe('derive() test vector 2', () => {

    const seed = 'fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542';

    test('[M/0]', () => {
      const hdkey = HDKey.generate(seed);
      hdkey.derive('M/0');
      expect(hdkey.extPub())
        .toBe('xpub69H7F5d8KSRgmmdJg2KhpAK8SR3DjMwAdkxj3ZuxV27CprR9LgpeyGmXUbC6wb7ERfvrnKZjXoUmmDznezpbZb7ap6r1D3tgFxHmwMkQTPH');
    });

  });

  describe('derive() throws an error', () => {

    const seed = '000102030405060708090a0b0c0d0e0f';

    test("[x/0']", () => {
      const hdkey = HDKey.generate(seed);
      expect(() => hdkey.derive("x/0'"))
        .toThrow('invalid hd key path');
    });

    test("[M/0']", () => {
      const hdkey = HDKey.generate(seed);
      expect(() => hdkey.derive("M/0'"))
        .toThrow('public key can not have harden type.');
    });

  });

  describe('derivePrvChildKey() throws an error', () => {

    const seed = '000102030405060708090a0b0c0d0e0f';

    test('an error is thrown when trying to derive the private key from the public key.', () => {
      const hdkey = HDKey.generate(seed);
      hdkey.derive('M/0');
      expect(() => hdkey.derivePrvChildKey(2))
        .toThrow('Unable to derive the secret key from the public key.');
    });

  });

  describe('derivePubChildKey() throws an error', () => {

    const seed = '000102030405060708090a0b0c0d0e0f';

    test('an error is thrown when the index is greater than  2**31.', () => {
      const hdkey = HDKey.generate(seed);
      hdkey.derive('m/0');
      hdkey.neuter();
      expect(() => hdkey.derivePubChildKey(2**31 + 1))
        .toThrow('child number must be less then 2**31. (pubkey must not be harden.)');
    });

  });

  describe('neuter() test vector 1', () => {

    const seed = '000102030405060708090a0b0c0d0e0f';

    test('N([m/0]) = [M/0]', () => {
      const hdkey1 = HDKey.generate(seed);
      hdkey1.derive('m/0');
      hdkey1.neuter();
      const hdkey2 = HDKey.generate(seed);
      hdkey2.derive('M/0');
      expect(hdkey1.extPub())
        .toBe(hdkey2.extPub());
    });

    test('N([m/0])/1 = [M/0/1]', () => {
      const hdkey1 = HDKey.generate(seed);
      hdkey1.derive('m/0');
      hdkey1.neuter();
      hdkey1.derivePubChildKey(1);
      const hdkey2 = HDKey.generate(seed);
      hdkey2.derive('M/0/1');
      expect(hdkey1.extPub())
        .toBe(hdkey2.extPub());
    });

  });

  describe('fromExtKey()', () => {

    test('import from prvkey.', () => {
      const hdkey = HDKey.fromExtKey('xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi');
      hdkey.derivePrvChildKey(0 + (2 ** 31));
      expect(hdkey.extPrv())
        .toBe('xprv9uHRZZhk6KAJC1avXpDAp4MDc3sQKNxDiPvvkX8Br5ngLNv1TxvUxt4cV1rGL5hj6KCesnDYUhd7oWgT11eZG7XnxHrnYeSvkzY7d2bhkJ7');
      expect(hdkey.extPub())
        .toBe('xpub68Gmy5EdvgibQVfPdqkBBCHxA5htiqg55crXYuXoQRKfDBFA1WEjWgP6LHhwBZeNK1VTsfTFUHCdrfp1bgwQ9xv5ski8PX9rL2dZXvgGDnw');
    });

    test('import from pubkey.', () => {
      const hdkey = HDKey.fromExtKey('xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet8');
      hdkey.derivePubChildKey(0);
      expect(hdkey.extPub())
        .toBe('xpub68Gmy5EVb2BdFbj2LpWrk1M7obNuaPTpT5oh9QCCo5sRfqSHVYWex97WpDZzszdzHzxXDAzPLVSwybe4uPYkSk4G3gnrPqqkV9RyNzAcNJ1');
    });

  });

});
