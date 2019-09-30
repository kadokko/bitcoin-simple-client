import { Int } from 'lib/type/Int';
import { Point, Generator } from 'lib/util/Secp256k1';
import Hash from 'lib/util/Hash';


class Signature {
  constructor(R, s) {
    this.R = R;
    this.s = s;
  }
}

class Schnorr {

  static createSignature(nonce, prvkey, message, order) {
    const G = Generator.getPoint();
    // h = H(R,X,m)
    const R = G.mul(nonce);
    const X = G.mul(prvkey);
    const Rser = R.compressedPubkey();
    const Xser = X.compressedPubkey();
    const hash = Hash.sha256(Rser + Xser + message);
    // s = r + H(R,X,m)x
    const r = Int(nonce);
    const x = Int(prvkey);
    const h = Int(hash);
    const n = Int(order);
    const s = r.add(x.mul(h)).mod(n).toHex();
    return new Signature(R, s);
  }
}

// test vector
// https://gist.github.com/kallewoof/5d623445802a84f17cc7ff5572109074
describe('Schnorr', () => {

  const order = 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141';
  const G = Generator.getPoint();

  describe.skip('single signature', () => {
    const message = '21fbd20b359eee7bfea88e837108be44a1a421e33a05a45bc832d3e1a7aa713a';

    test('create signature.', () => {
      // private
      const r = '6dfb9c259dc3b79f03470418af01cb1e064692dacc353f0f656cad0bfec583a7';
      const x = 'bed123a21c0e50b003d302e83e755a444cbd436dfc4ea6635696c49499e47da6';
      // public
      const R = G.mul(r);
      const X = G.mul(x);
      expect(R.x).toBe('83b62cb5324d37f5ad971ce99fda0d8e2a922407df6fa9b73dea4835b7fdb1dc');
      expect(R.y).toBe('ef1f1211e51938e79f9c0b6929f1da6feba68f2dd48db68adc4539f39d9fa52e');
      expect(X.x).toBe('7f032a1e20deb84dc51d44cd11657c4a4d3c6bccb19c05cfd5b4b007e8a478d3');
      expect(X.y).toBe('56e3dcb493aa83b590954d6c33cdfd20ef4b083d33b051efda091486035a4a69');
      // signature
      const Sig = Schnorr.createSignature(r, x, message, order);
      expect(Sig.s).toBe('154f020e7841eab3507bf3bb1b0b2cdc4e0ee413c380098096128171c26c2ee0');
    });

    test('verify signature.', () => {
      // public
      const s = '154f020e7841eab3507bf3bb1b0b2cdc4e0ee413c380098096128171c26c2ee0';
      const R = new Point(
        '83b62cb5324d37f5ad971ce99fda0d8e2a922407df6fa9b73dea4835b7fdb1dc',
        'ef1f1211e51938e79f9c0b6929f1da6feba68f2dd48db68adc4539f39d9fa52e',
      );
      const X = new Point(
        '7f032a1e20deb84dc51d44cd11657c4a4d3c6bccb19c05cfd5b4b007e8a478d3',
        '56e3dcb493aa83b590954d6c33cdfd20ef4b083d33b051efda091486035a4a69',
      );
      // verify: sG = rG + H(R,X,m)*xG = R + H(R,X,m)*X
      const sG = G.mul(s);
      const h = Hash.sha256(R.compressedPubkey() + X.compressedPubkey() + message);
      const RhX = R.add(X.mul(h));
      expect(sG.x).toBe(RhX.x);
      expect(sG.y).toBe(RhX.y);
    });
  });


  describe('multiple signature', () => {

    test('create & verify signature.', () => {
      // message
      const m = '21fbd20b359eee7bfea88e837108be44a1a421e33a05a45bc832d3e1a7aa713a';

      // prvkeys
      const x1 = 'bed123a21c0e50b003d302e83e755a444cbd436dfc4ea6635696c49499e47da6';
      const x2 = '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';

      // pubkeys : point
      const X1 = G.mul(x1);
      const X2 = G.mul(x2);

      // aggregated pubkey
      const X = X1.add(X2);
      const Xser = X.compressedPubkey();
      expect(Xser).toBe('039dd536d7c508fc995829a528867564882e9cbcde99ddadf730031aa423866d66');

      // nonces
      const r1 = '6dfb9c259dc3b79f03470418af01cb1e064692dacc353f0f656cad0bfec583a7';
      const r2 = 'fedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210';

      // aggregated nonce
      const R1 = G.mul(r1);
      const R2 = G.mul(r2);
      const R = R1.add(R2);
      const Rser = R.compressedPubkey();
      expect(Rser).toBe('02aebf9275312e186fddc6f962e9e43252a52026da15ca1c36c09d741b677f8ef0');

      // signatures
      const n = Int(order);
      const h = Int(Hash.sha256(Rser + Xser + m));
      const s1 = Int(r1).add(h.mul(x1)).mod(n);
      const s2 = Int(r2).add(h.mul(x2)).mod(n);

      // aggregated signature
      const s = s1.add(s2).toHex();

      // verify signature
      const sG = G.mul(s);
      const RhX = R.add(X.mul(h));
      expect(sG.x).toBe(RhX.x);
      expect(sG.y).toBe(RhX.y);
    });

    test('rogue key attack.', () => {
      const n = Int(order);

      // message
      const m = '21fbd20b359eee7bfea88e837108be44a1a421e33a05a45bc832d3e1a7aa713a';

      // prvkeys : (rogue key x3 = x2 - x1)
      const x1 = '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
      const x2 = 'bed123a21c0e50b003d302e83e755a444cbd436dfc4ea6635696c49499e47da6';

      // pubkeys : point
      const X1 = G.mul(x1);
      const X2 = G.mul(x2);
      const X2dash = X2.sub(X1);

      // aggregated pubkey
      const X = X1.add(X2dash);

      // check
      const Xser = X.compressedPubkey();
      const X2ser = X2.compressedPubkey();
      expect(Xser).toBe(X2ser);

      // nonces
      const r1 = '6dfb9c259dc3b79f03470418af01cb1e064692dacc353f0f656cad0bfec583a7';
      const r2 = 'fedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210';

      // nonce : point
      const R1 = G.mul(r1);
      const R2 = G.mul(r2);
      const R2dash = R2.sub(R1);

      // aggregated nonce
      const R = R1.add(R2dash);

      // check
      const Rser = R.compressedPubkey();
      const R2ser = R2.compressedPubkey();
      expect(Rser).toBe(R2ser);

      // signatures
      const h = Int(Hash.sha256(Rser + Xser + m));
      const h2 = Int(Hash.sha256(R2ser + X2ser + m));
      expect(h.toHex()).toBe(h2.toHex());

      // verify signature
      const s2 = Int(r2).add(h.mul(x2)).mod(n);
      const s2G = G.mul(s2.toHex());
      const RhX = R.add(X.mul(h.toHex()));
      expect(s2G.x).toBe(RhX.x);
      expect(s2G.y).toBe(RhX.y);
    });

  });

});
