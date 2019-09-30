import { SigHashType } from 'lib/constant';
import Ecdsa from './Ecdsa';
import Num from './Num';


export class Signer {

  static createSignature(sigHash, prvkey, sigHashType = SigHashType.ALL) {
    const privkey = this.removeCompressedSuffix(prvkey);
    return Ecdsa.sign(sigHash, privkey) + Num.toHexRev(sigHashType, 2);
  }

  static removeCompressedSuffix(prvkey) {
    return prvkey.slice(0, 64);
  }
}
