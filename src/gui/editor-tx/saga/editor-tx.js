import { call, takeLatest, put } from 'redux-saga/effects';
import { AddrPrefix } from 'lib/constant';
import { Vin, Vout, Script } from 'lib/model/base';
import { Tx as StdTx } from 'lib/model/standard';
import { Tx as SegTx, Witness, SigHashPreImage } from 'lib/model/segwit';
import { SigHash as StdSigHash } from 'lib/model/standard/SigHash';
import { Bech32 } from 'lib/util/Bech32';
import { TxMapper } from 'lib/util/Mapper';
import { Signer } from 'lib/util/Sign';
import KeyConv from 'lib/util/KeyConv';
import Hash from 'lib/util/Hash';
import Hex from 'lib/util/Hex';
import Unit from 'lib/util/Unit';
import ScriptAnalizer from 'lib/util/ScriptAnalizer';
import * as rpc from 'gui/rpc/saga/rpc';
import * as std from '../actions/standard';
import * as seg from '../actions/segwit';
import * as stdActionTypes from '../actions/standard-types';
import * as segActionTypes from '../actions/segwit-types';


const createError = (code, message) => ({
  code,
  message,
});

function* searchUtxos(type, action) {
  const { payload: p } = action;
  const utxos = yield call(rpc.searchUtxos, p.amountMin, p.amountMax, p.scriptTypes);
  if (utxos.length === 0) {
    const e = createError('', 'Utxos are not found');
    yield put(type.receiveUtxosError(e));
  } else {
    yield put(type.receiveUtxos(utxos));
  }
}

function* setUtxo(type, action) {
  const { payload: p } = action;
  const scriptPubKeyAsm = yield call(rpc.decodeScript, p.utxo.scriptPubKey);
  const editedUtxo = {
    txid: p.utxo.txid,
    vout: p.utxo.vout,
    amount: String(Unit.toSat(p.utxo.amount)),
    scriptType: ScriptAnalizer.type(p.utxo.scriptPubKey),
    scriptPubKeyAsm,
  };
  yield put(type.receiveSelectedUtxo(p.idx, editedUtxo));
  yield put(type.receiveVinAmount(p.idx));
  yield put(type.updateAmounts());
  yield put(type.closeUtxoModal());
}

function* getUtxoDetail(type, action) {
  const { payload: p } = action;
  const txout = yield call(rpc.getTxOut, p.txid, p.n);
  yield put(type.receiveUtxoDetail(p.idx, txout.amount, txout.scriptPubKey));
  yield put(type.receiveVinAmount(p.idx));
}

function* dumpPrvkeyForStandardTx(type, action) {
  const { payload: p } = action;
  const address = KeyConv.pubkeyHash160ToP2pkhAddr(p.pubkeyHash);
  const prvkeyWif = yield call(rpc.getPrvkey, address);
  const prvkey = KeyConv.wifToPrvkey(prvkeyWif);
  yield put(type.receivePrvkey(prvkey));
}

function* dumpPrvkeyForSegwitTx(type, action) {
  const { payload: p } = action;
  const prefix = AddrPrefix().prefix;
  const address = Bech32.p2wpkhAddr(p.pubkeyHash, prefix, 0);
  const prvkeyWif = yield call(rpc.getPrvkey, address);
  const prvkey = KeyConv.wifToPrvkey(prvkeyWif);
  yield put(type.receivePrvkey(prvkey));
}

function* createSignatureForStandardTx(type, action) {
  const { payload: p } = action;
  const tx = TxMapper.toModel(p.tx);
  const sigHash = StdSigHash.create(tx, p.idx);
  const signature = Signer.createSignature(sigHash, p.prvkey);
  yield put(type.receiveSignature(signature));
}

// p.scriptCode: hex, p.amount: satoshi
function* createSignatureForSegwitTx(type, action) {
  const { payload: p } = action;
  const tx = TxMapper.toModel(p.tx);
  const sigHashPreImage = new SigHashPreImage(tx);
  const scriptCode = new Script(p.scriptCode).toHex();
  const preImage = sigHashPreImage.serialize(p.idx, scriptCode, p.amount);
  const sigHash = Hash.hash256(preImage);
  const signature = Signer.createSignature(sigHash, p.prvkey);
  yield put(type.receiveSignature(signature));
}

function* setScriptTemplate(type, action) {
  const { payload: p } = action;
  yield put(type.receiveSelectedTemplate(p.idx, p.template));
  yield put(type.closeTemplateModal());
}

function* updateVoutValue(type, action) {
  const { payload: p } = action;
  yield put(type.receiveVoutValue(p.idx));
}

function* updateScriptWithSuggest(type) {
  yield put(type.receiveUpdatedScript());
}

function* convertToHexForStandardTx(type, action) {
  const { payload: { values } } = action;
  // transaction model
  const version = values.version;
  const vins = values.vins.map(vin => (
    new Vin(vin.txid, vin.vout, new Script(vin.scriptSig), vin.sequence)
  ));
  const vouts = values.vouts.map(vout => (
    new Vout(vout.value, new Script(vout.scriptPubKey))
  ));
  const locktime = values.locktime;
  const tx = new StdTx(version, vins, vouts, locktime);
  // transaction hex, id
  const txhex = tx.serialize();
  const txid = Hex.rev(Hash.hash256(txhex));
  yield put(type.receiveTxHex(txhex, txid));
}

function* convertToHexForSegwitTx(type, action) {
  const { payload: { values } } = action;
  // transaction model
  const version = values.version;
  const vins = values.vins.map(vin => (
    new Vin(vin.txid, vin.vout, new Script(vin.scriptSig), vin.sequence)
  ));
  const vouts = values.vouts.map(vout => (
    new Vout(vout.value, new Script(vout.scriptPubKey))
  ));
  const locktime = values.locktime;
  const tx = new SegTx(version, vins, vouts, locktime);
  // witnesses
  for (const witness of values.witnesses) {
    const w = new Witness();
    for (const script of witness.scripts) {
      const s = script.script; // TODO fix variable name
      w.add(new Script(s));
    }
    tx.addWitness(w);
  }
  // transaction hex, id (segwit)
  const wtxhex = tx.serialize();
  const wtxid = Hex.rev(Hash.hash256(wtxhex));
  // transaction hex, id (standard)
  const txStd = new StdTx(version, vins, vouts, locktime);
  const txStdHex = txStd.serialize();
  const txid = Hex.rev(Hash.hash256(txStdHex));
  yield put(type.receiveTxHex(wtxhex, wtxid, txid));
}

function* sendTx(type, action) {
  const { payload: p } = action;
  const { payload, error } = yield call(rpc.sendRawTx, p.rawTx);
  if (error) {
    const { error: e } = payload;
    yield put(type.receiveSendTxResultError(e));
  } else {
    const { data: txid } = payload;
    yield put(type.receiveSendTxResult(txid));
  }
}

export const standardSaga = [
  takeLatest(stdActionTypes.USER_SEARCH_UTXOS, searchUtxos, std),
  takeLatest(stdActionTypes.USER_SET_UTXO, setUtxo, std),
  takeLatest(stdActionTypes.USER_GET_UTXO_DETAIL, getUtxoDetail, std),
  takeLatest(stdActionTypes.USER_DUMP_PRVKEY, dumpPrvkeyForStandardTx, std),
  takeLatest(stdActionTypes.USER_CERATE_SIGNATURE, createSignatureForStandardTx, std),
  takeLatest(stdActionTypes.USER_SET_SCRIPT_TEMPLATE, setScriptTemplate, std),
  takeLatest(stdActionTypes.USER_UPDATE_VOUT_VALUE, updateVoutValue, std),
  takeLatest(stdActionTypes.USER_UPDATE_SCRIPT_WITH_SUGGEST, updateScriptWithSuggest, std),
  takeLatest(stdActionTypes.USER_CONVERT_TO_TXHEX, convertToHexForStandardTx, std),
  takeLatest(stdActionTypes.USER_SEND_TX, sendTx, std),
];

export const segwitSaga = [
  takeLatest(segActionTypes.USER_SEARCH_UTXOS, searchUtxos, seg),
  takeLatest(segActionTypes.USER_SET_UTXO, setUtxo, seg),
  takeLatest(segActionTypes.USER_GET_UTXO_DETAIL, getUtxoDetail, seg),
  takeLatest(segActionTypes.USER_DUMP_PRVKEY, dumpPrvkeyForSegwitTx, seg),
  takeLatest(segActionTypes.USER_CERATE_SIGNATURE, createSignatureForSegwitTx, seg),
  takeLatest(segActionTypes.USER_SET_SCRIPT_TEMPLATE, setScriptTemplate, seg),
  takeLatest(segActionTypes.USER_UPDATE_VOUT_VALUE, updateVoutValue, seg),
  takeLatest(segActionTypes.USER_UPDATE_SCRIPT_WITH_SUGGEST, updateScriptWithSuggest, seg),
  takeLatest(segActionTypes.USER_CONVERT_TO_TXHEX, convertToHexForSegwitTx, seg),
  takeLatest(segActionTypes.USER_SEND_TX, sendTx, seg),
];
