import Validator from 'lib/util/Validator';


class OpCode {

  // TODO make it a private property
  static codes = new Map([
    // constants
    [ 'OP_0', '00' ],
    [ 'OP_FALSE', '00' ],
    [ 'OP_PUSHDATA1', '4c' ],
    [ 'OP_PUSHDATA2', '4d' ],
    [ 'OP_PUSHDATA4', '4e' ],
    [ 'OP_1NEGATE', '4f' ],
    [ 'OP_1', '51' ],
    [ 'OP_TRUE', '51' ],
    [ 'OP_2', '52' ],
    [ 'OP_3', '53' ],
    [ 'OP_4', '54' ],
    [ 'OP_5', '55' ],
    [ 'OP_6', '56' ],
    [ 'OP_7', '57' ],
    [ 'OP_8', '58' ],
    [ 'OP_9', '59' ],
    [ 'OP_10', '5a' ],
    [ 'OP_11', '5b' ],
    [ 'OP_12', '5c' ],
    [ 'OP_13', '5d' ],
    [ 'OP_14', '5e' ],
    [ 'OP_15', '5f' ],
    [ 'OP_16', '60' ],
    // flow control
    [ 'OP_NOP', '61' ],
    [ 'OP_IF', '63' ],
    [ 'OP_NOTIF', '64' ],
    [ 'OP_ELSE', '67' ],
    [ 'OP_ENDIF', '68' ],
    [ 'OP_VERIFY', '69' ],
    [ 'OP_RETURN', '6a' ],
    // stack
    [ 'OP_TOALTSTACK', '6b' ],
    [ 'OP_FROMALTSTACK', '6c' ],
    [ 'OP_IFDUP', '73' ],
    [ 'OP_DEPTH', '74' ],
    [ 'OP_DROP', '75' ],
    [ 'OP_DUP', '76' ],
    [ 'OP_NIP', '77' ],
    [ 'OP_OVER', '78' ],
    [ 'OP_PICK', '79' ],
    [ 'OP_ROLL', '7a' ],
    [ 'OP_ROT', '7b' ],
    [ 'OP_SWAP', '7c' ],
    [ 'OP_TUCK', '7d' ],
    [ 'OP_2DROP', '6d' ],
    [ 'OP_2DUP', '6e' ],
    [ 'OP_3DUP', '6f' ],
    [ 'OP_2OVER', '70' ],
    [ 'OP_2ROT', '71' ],
    [ 'OP_2SWAP', '72' ],
    // splice
    [ 'OP_CAT', '7e' ],
    [ 'OP_SUBSTR', '7f' ],
    [ 'OP_LEFT', '80' ],
    [ 'OP_RIGHT', '81' ],
    [ 'OP_SIZE', '82' ],
    // bitwise logic
    [ 'OP_INVERT', '83' ],
    [ 'OP_AND', '84' ],
    [ 'OP_OR', '85' ],
    [ 'OP_XOR', '86' ],
    [ 'OP_EQUAL', '87' ],
    [ 'OP_EQUALVERIFY', '88' ],
    // arithmetic
    [ 'OP_1ADD', '8b' ],
    [ 'OP_1SUB', '8c' ],
    [ 'OP_2MUL', '8d' ],
    [ 'OP_2DIV', '8e' ],
    [ 'OP_NEGATE', '8f' ],
    [ 'OP_ABS', '90' ],
    [ 'OP_NOT', '91' ],
    [ 'OP_0NOTEQUAL', '92' ],
    [ 'OP_ADD', '93' ],
    [ 'OP_SUB', '94' ],
    [ 'OP_MUL', '95' ],
    [ 'OP_DIV', '96' ],
    [ 'OP_MOD', '97' ],
    [ 'OP_LSHIFT', '98' ],
    [ 'OP_RSHIFT', '99' ],
    [ 'OP_BOOLAND', '9a' ],
    [ 'OP_BOOLOR', '9b' ],
    [ 'OP_NUMEQUAL', '9c' ],
    [ 'OP_NUMEQUALVERIFY', '9d' ],
    [ 'OP_NUMNOTEQUAL', '9e' ],
    [ 'OP_LESSTHAN', '9f' ],
    [ 'OP_GREATERTHAN', 'a0' ],
    [ 'OP_LESSTHANOREQUAL', 'a1' ],
    [ 'OP_GREATERTHANOREQUAL', 'a2' ],
    [ 'OP_MIN', 'a3' ],
    [ 'OP_MAX', 'a4' ],
    [ 'OP_WITHIN', 'a5' ],
    // crypto
    [ 'OP_RIPEMD160', 'a6' ],
    [ 'OP_SHA1', 'a7' ],
    [ 'OP_SHA256', 'a8' ],
    [ 'OP_HASH160', 'a9' ],
    [ 'OP_HASH256', 'aa' ],
    [ 'OP_CODESEPARATOR', 'ab' ],
    [ 'OP_CHECKSIG', 'ac' ],
    [ 'OP_CHECKSIGVERIFY', 'ad' ],
    [ 'OP_CHECKMULTISIG', 'ae' ],
    [ 'OP_CHECKMULTISIGVERIFY', 'af' ],
    // locktime
    [ 'OP_CHECKLOCKTIMEVERIFY', 'b1' ],
    [ 'OP_CHECKSEQUENCEVERIFY', 'b2' ],
    // pseudo-words
    [ 'OP_PUBKEYHASH', 'fd' ],
    [ 'OP_PUBKEY', 'fe' ],
    [ 'OP_INVALIDOPCODE', 'ff' ],
    // reserved words
    [ 'OP_RESERVED', '50' ],
    [ 'OP_VER', '62' ],
    [ 'OP_VERIF', '65' ],
    [ 'OP_VERNOTIF', '66' ],
    [ 'OP_RESERVED1', '89' ],
    [ 'OP_RESERVED2', '8a' ],
    [ 'OP_NOP1', 'b0' ],
    [ 'OP_NOP4', 'b3' ],
    [ 'OP_NOP5', 'b4' ],
    [ 'OP_NOP6', 'b5' ],
    [ 'OP_NOP7', 'b6' ],
    [ 'OP_NOP8', 'b7' ],
    [ 'OP_NOP9', 'b8' ],
    [ 'OP_NOP10', 'b9' ],
  ]);

  static codesHexAsm = this.swap(this.codes);

  static swap(map) {
    const rev = Array
      .from(map.entries())
      .map(entry => ([ entry[1], entry[0] ]));
    return new Map(rev);
  }

  static get(key) {
    return this.codes.get(key);
  }

  static keys() {
    return Array.from(this.codes.keys());
  }

  static values() {
    return Array.from(this.codes.values());
  }

  static getCode(hex) {
    return this.codesHexAsm.get(hex);
  }

  static isOpCode(byteStr) {
    return this.values().includes(byteStr.toLowerCase());
  }

  static isDataLen(byteStr) {
    if (!Validator.isNum(byteStr)) {
      return false;
    }
    if ([ '4c', '4d', '4e' ].contains(byteStr.toLowerCase())) {
      return true;
    }
    if (parseInt(byteStr, 16) >= 1 && parseInt(byteStr, 16) <= 75) {
      return true;
    }
    throw new Error('invalid value');
  }

  static isPushdata1(byteStr) {
    return byteStr.toLowerCase() === '4c';
  }

  static isPushdata2(byteStr) {
    return byteStr.toLowerCase() === '4d';
  }

  static isPushdata4(byteStr) {
    return byteStr.toLowerCase() === '4e';
  }

}

export default OpCode;
