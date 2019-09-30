import { Int, BitInt } from 'lib/type/Int';
import { MnemonicDictionary } from 'lib/constant';
import Hash from 'lib/util/Hash';
import Pad from 'lib/util/Pad';
import Seq from 'lib/util/Seq';


export class Dictionary {

  static dict = new Map(MnemonicDictionary.getWords().map((word, i) => [ word, i ]));

  static index(word) {
    return this.dict.get(word);
  }

  static keys() {
    return Array.from(this.dict.keys());
  }

  static values() {
    return Array.from(this.dict.values());
  }

}

export class Mnemonic {

  static toEntropy(words) {
    // ec -> e:entropy c:checksum
    const ecbits = words.split(' ').map(word => (
      Pad.lpad(Dictionary.index(word).toString(2), 11)
    )).join('');
    const cheksumLength = Math.floor(ecbits.length / (32 + 1));
    const entropyLength = ecbits.length - cheksumLength;
    const entropyHex = BitInt(ecbits.slice(0, entropyLength)).toHex();
    return Pad.lpad(entropyHex, Math.floor(entropyLength / 8) * 2);
  }

  static toWords(entropy) {
    const entropyLength = entropy.length * 4;
    const entropyNum = Int(entropy);
    const entropyBin = Pad.lpad(entropyNum.toBit(), entropyLength);

    const checksumHex = Hash.sha256(entropy);
    const checksumLength = Math.floor(entropyLength / 32);
    const checksumBin = Pad.lpad(Int(checksumHex).toBit(), 256).slice(0, checksumLength);

    const ecBin = entropyBin + checksumBin;
    const ecLength = Math.floor((entropyLength + checksumLength) / 11);

    const words = Dictionary.keys();
    return Seq.generate(ecLength).map((n) => {
      const i = BitInt(ecBin.slice(n * 11, (n + 1) * 11)).toJSNumber();
      return words[i];
    }).join(' ');
  }

}
