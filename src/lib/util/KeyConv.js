import { Int } from 'lib/type/Int';
import { AddrPrefix } from 'lib/constant';
import { Base58Check, Base58 } from 'lib/util/Base58';
import { Secp256k1 } from 'lib/util/Secp256k1';
import Hash from 'lib/util/Hash';


class KeyConv {

  static pubkeyToP2pkhAddr(pubkey) {
    return Base58Check.encode(AddrPrefix().addrP2pkh + Hash.hash160(pubkey));
  }

  static pubkeyHash160ToP2pkhAddr(pubkeyHash160) {
    return Base58Check.encode(AddrPrefix().addrP2pkh + pubkeyHash160);
  }

  static scriptToP2shAddr(redeemScriptHex) {
    return Base58Check.encode(AddrPrefix().addrP2sh + Hash.hash160(redeemScriptHex));
  }

  static wifToPrvkey(wifStr) {
    return Base58Check.decode(wifStr).substr(2);
  }

  static prvkeyToWif(prvkey, compressed=false) {
    const suffix = compressed ? '01' : '';
    const payload = AddrPrefix().addrPrvkey + prvkey + suffix;
    const checksum = Hash.hash256(payload).slice(0, 8);
    return Base58.encode(payload + checksum);
  }

  static toUnCompressedPub(compressedPub) {
    const p = Int(Secp256k1.p);
    const x = Int(compressedPub.slice(2));
    const f = parseInt(compressedPub.slice(0, 2), 16) - 2;
    let y = x.modPow(3).add(7).mod(p).modPow(p.add(1).div(4));
    y = y.mod(2).eq(f) ? y : p.sub(y);
    return '04' + x.toHex() + y.toHex();
  }
}

export default KeyConv;
