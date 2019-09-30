
import bech32 from 'bech32';
import Hash from 'lib/util/Hash';


export class Bech32 {

  static p2wpkhAddr(pubkey, prefix='bcrt', witnessVer=0) {
    const buffer = Buffer.from(Hash.hash160(pubkey), 'hex');
    const words = bech32.toWords(buffer);
    const addr = bech32.encode(prefix, [ witnessVer, ...words ]);
    return addr;
  }

  static p2wshAddr(script, prefix='bcrt', witnessVer=0) {
    const buffer = Buffer.from(Hash.sha256(script), 'hex');
    const words = bech32.toWords(buffer);
    const addr = bech32.encode(prefix, [ witnessVer, ...words ]);
    return addr;
  }

}
