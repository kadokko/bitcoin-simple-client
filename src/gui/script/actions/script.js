import { createAction } from 'gui/app/actions/Creator';
import * as types from './script-types';


export const createP2wshUtxo = (redeemScriptAsm) =>
  createAction(
    types.USER_CREATE_P2WSH_UTXO, {
      redeemScriptAsm,
    },
  );

export const receiveP2wshUtxo = (redeemScriptHex,
  scriptPubKeyAsm, scriptPubKeyHex, p2wshAddr, txid, n) =>
  createAction(
    types.REDUCER_RECEIVE_P2WSH_UTXO, {
      redeemScriptHex,
      scriptPubKeyAsm,
      scriptPubKeyHex,
      p2wshAddr,
      txid,
      n,
    },
  );
