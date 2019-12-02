import { Generator, Point } from 'lib/util/Secp256k1';


describe('Generator', () => {

  describe('getPoint()', () => {
    test('x, y coordinatex', () => {
      const G = Generator.getPoint();
      expect(G.x).toBe('79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798');
      expect(G.y).toBe('483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8');
    });
  });

});

describe('Point', () => {

  describe('from()', () => {
    test('pubkey version byte is 02', () => {
      const pubkey = '02' + '2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4';
      const point = Point.from(pubkey);
      expect(point.x).toBe(pubkey.substr(2, 64));
      expect(point.y).toBe('d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6');
    });
    test('pubkey version byte is 03', () => {
      const pubkey = '03' + 'fff97bd5755eeea420453a14355235d382f6472f8568a18b2f057a1460297556';
      const point = Point.from(pubkey);
      expect(point.x).toBe(pubkey.substr(2, 64));
      expect(point.y).toBe('ae12777aacfbb620f3be96017f45c560de80f0f6518fe4a03c870c36b075f297');
    });
    test('pubkey version byte is 04', () => {
      const pubkey = '04'
                   + 'fff97bd5755eeea420453a14355235d382f6472f8568a18b2f057a1460297556'
                   + 'ae12777aacfbb620f3be96017f45c560de80f0f6518fe4a03c870c36b075f297';
      const point = Point.from(pubkey);
      expect(point.x).toBe(pubkey.substr(2, 64));
      expect(point.y).toBe(pubkey.substr(66));
    });
  });

  describe('add()', () => {
    test('point addtion.', () => {
      // k = 1
      const x1 = '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798';
      const y1 = '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8';
      const p1 = new Point(x1, y1);
      // k = 2
      const x2 = 'c6047f9441ed7d6d3045406e95c07cd85c778e4b8cef3ca7abac09b95c709ee5';
      const y2 = '1ae168fea63dc339a3c58419466ceaeef7f632653266d0e1236431a950cfe52a';
      const p2 = new Point(x2, y2);
      // k = 3
      const x3 = 'f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9';
      const y3 = '388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672';
      const p3 = new Point(x3, y3);
      // 1G + 2G = 3G
      const p = p1.add(p2);
      expect(p.x).toBe(p3.x);
      expect(p.y).toBe(p3.y);
    });
  });

  describe('double()', () => {
    test('point doubling.', () => {
      // k = 10
      const x10 = 'a0434d9e47f3c86235477c7b1ae6ae5d3442d49b1943c2b752a68e2a47e247c7';
      const y10 = '893ABA425419BC27A3B6C7E693A24C696F794C2ED877A1593CBEE53B037368D7';
      const p10 = new Point(x10, y10);
      // k = 20
      const x20 = '4ce119c96e2fa357200b559b2f7dd5a5f02d5290aff74b03f3e471b273211c97';
      const y20 = '12ba26dcb10ec1625da61fa10a844c676162948271d96967450288ee9233dc3a';
      const p20 = new Point(x20, y20);
      // 2 * 10G = 20G
      const p = p10.double();
      expect(p.x).toBe(p20.x);
      expect(p.y).toBe(p20.y);
    });
  });

  describe('mul()', () => {
    test('scalar multiplication.', () => {
      // result
      let p;
      // k = 1
      const x1 = '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798';
      const y1 = '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8';
      const p1 = new Point(x1, y1);

      // k = 8
      const x8 = '2f01e5e15cca351daff3843fb70f3c2f0a1bdd05e5af888a67784ef3e10a2a01';
      const y8 = '5c4da8a741539949293d082a132d13b4c2e213d6ba5b7617b5da2cb76cbde904';
      const p8 = new Point(x8, y8);
      p = p1.mul('08');
      expect(p.x).toBe(p8.x);
      expect(p.y).toBe(p8.y);

      // k = 16
      const x16 = 'e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a';
      const y16 = 'f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821';
      const p16 = new Point(x16, y16);
      p = p1.mul('10');
      expect(p.x).toBe(p16.x);
      expect(p.y).toBe(p16.y);

      // k = 17
      const x17 = 'defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34';
      const y17 = '4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77';
      const p17 = new Point(x17, y17);
      p = p1.mul('11');
      expect(p.x).toBe(p17.x);
      expect(p.y).toBe(p17.y);

      // k = 20
      const x20 = '4ce119c96e2fa357200b559b2f7dd5a5f02d5290aff74b03f3e471b273211c97';
      const y20 = '12ba26dcb10ec1625da61fa10a844c676162948271d96967450288ee9233dc3a';
      const p20 = new Point(x20, y20);
      p = p1.mul('14');
      expect(p.x).toBe(p20.x);
      expect(p.y).toBe(p20.y);
    });
    test('scalar multiplication.', () => {
      // k = 2
      const x2 = 'c6047f9441ed7d6d3045406e95c07cd85c778e4b8cef3ca7abac09b95c709ee5';
      const y2 = '1ae168fea63dc339a3c58419466ceaeef7f632653266d0e1236431a950cfe52a';
      const p2 = new Point(x2, y2);
      // k = 6
      const x6 = 'fff97bd5755eeea420453a14355235d382f6472f8568a18b2f057a1460297556';
      const y6 = 'ae12777aacfbb620f3be96017f45c560de80f0f6518fe4a03c870c36b075f297';
      const p6 = new Point(x6, y6);
      // 3 * 2G = 6G
      const p = p2.mul('03');
      expect(p.x).toBe(p6.x);
      expect(p.y).toBe(p6.y);
    });
  });

  // compressed format pubkey starts with 02 or 03.
  describe('compressedPubkey()', () => {
    const G = Generator.getPoint();
    test('Version byte becomes 02 in compressed pubkey format when y is even.', () => {
      expect(G.mul('01').compressedPubkey())
        .toBe('02' + '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798');
    });
    test('Version byte becomes 03 in compressed pubkey format when y is odd.', () => {
      expect(G.mul('11').compressedPubkey())
        .toBe('03' + 'defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34');
    });
  });

  // uncompressed format pubkey starts with 04.
  describe('uncompressedPubkey()', () => {
    const G = Generator.getPoint();
    test('Version byte becomes 04 in uncompressed pubkey format.', () => {
      expect(G.uncompressedPubkey())
        .toBe('04'
            + '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798'
            + '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8');
    });
  });

});
