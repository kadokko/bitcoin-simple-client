import { OpCode } from 'lib/constant';


class ScriptParser {

  static deserialize(scriptHex) {
    let asm = '';
    for (let i = 0; i < scriptHex.length;) {
      const byteHex = scriptHex.substr(i, 2);
      const byteDec = parseInt(byteHex, 16);
      let dataLength = 0;
      switch (true) {
        case byteDec <= 75: // 0x4b
          dataLength = byteDec * 2;
          asm += scriptHex.substr(i + 2, dataLength);
          i += (2 + dataLength);
          break;
        case byteDec === 76: // 0x4c
          dataLength = parseInt(scriptHex.substr(i + 2, 2), 16) * 2;
          asm += scriptHex.substr(i + 2 + 2, dataLength);
          i += (2 + 2 + dataLength);
          break;
        case byteDec === 77: // 0x4d
          dataLength = parseInt(scriptHex.substr(i + 2, 4), 16) * 2;
          asm += scriptHex.substr(i + 2 + 4, dataLength);
          i += (2 + 4 + dataLength);
          break;
        case byteDec === 78: // 0x4e
          dataLength = parseInt(scriptHex.substr(i + 2, 8), 16) * 2;
          asm += scriptHex.substr(i + 2 + 8, dataLength);
          i += (2 + 8 + dataLength);
          break;
        default:
          asm += OpCode.getCode(byteHex);
          i += 2;
      }
      asm += ' ';
    }
    return asm.trim();
  }
}

export default ScriptParser;
