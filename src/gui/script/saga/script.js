import { call, takeLatest, put } from 'redux-saga/effects';
import { safen } from 'gui/app/saga/effects';
import { Vin, Vout, Script, Utxo } from 'lib/model/base';
import { Tx, SigHash } from 'lib/model/standard';
import { Bech32 } from 'lib/util/Bech32';
import { Signer } from 'lib/util/Sign';
import KeyConv from 'lib/util/KeyConv';
import Hash from 'lib/util/Hash';
import Unit from 'lib/util/Unit';
import * as rpc from 'gui/rpc/saga/rpc';
import * as s from '../actions/script';
import * as actionTypes from '../actions/script-types';


function* searchP2pkUtxo() {
  const utxos = yield call(rpc.searchUtxos, null, null, 'P2PK');
  const tx = yield call(rpc.getRawTransaction, utxos[0].txid);
  return tx.vout
    .filter((vout => !vout.scriptPubKey.asm.startsWith('OP_RETURN')))
    .map((vout => new Utxo(tx.txid, vout.n, vout.scriptPubKey.asm, Unit.toSat(vout.value))))[0];
}

function* createP2wsh(action) {
  const { payload: p } = action;

  // vin
  const utxo = yield searchP2pkUtxo();
  const pubkey = utxo.scriptPubKey.split(' ')[0].trim();
  const p2pkhAddr = KeyConv.pubkeyToP2pkhAddr(pubkey);
  const wif = yield call(rpc.getPrvkey, p2pkhAddr);
  const prvkey = KeyConv.wifToPrvkey(wif);
  const vin = new Vin(
    utxo.txid,
    utxo.vout,
    new Script(utxo.scriptPubKey),
    4294967295,
  );

  // vout
  const redeemScript = new Script(p.redeemScriptAsm);
  const redeemScriptHex = redeemScript.toHex();
  const scriptPubKey = new Script('OP_0 ' + Hash.sha256(redeemScriptHex));
  const scriptPubKeyHex = scriptPubKey.toHex();
  const fee = 10000;
  const amount = utxo.amount - fee;
  const vout = new Vout(amount, scriptPubKey);

  // tx
  const t = new Tx();
  t.addVin(vin);
  t.addVout(vout);

  const sigHash = SigHash.create(t, 0);
  const signature = Signer.createSignature(sigHash, prvkey);
  t.vins[0].scriptSig = new Script(signature);
  const { payload: { data: txid } } = yield call(rpc.sendRawTx, t.serialize());

  // address
  const p2wshAddr = Bech32.p2wshAddr(redeemScriptHex, 'bcrt');
  yield call(rpc.importAddress, p2wshAddr);
  yield put(s.receiveP2wshUtxo(redeemScriptHex, scriptPubKey.toString(), scriptPubKeyHex, p2wshAddr, txid, 0));
}

export const scriptSaga = [
  takeLatest(actionTypes.USER_CREATE_P2WSH_UTXO, safen(createP2wsh)),
];
