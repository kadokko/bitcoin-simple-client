import { takeLatest, put } from 'redux-saga/effects';
import { AddrPrefix } from 'lib/constant';
import { Seed, HDKey } from 'lib/model/base';
import { Bech32 } from 'lib/util/Bech32';
import { Base58Check } from 'lib/util/Base58';
import { Mnemonic } from 'lib/util/Mnemonic';
import KeyConv from 'lib/util/KeyConv';
import Validator from 'lib/util/Validator';
import * as h from '../actions/hdkey';
import * as actionTypes from '../actions/hdkey-types';


function* generateHdSeed() {
  const seed = Seed.generate();
  yield put(h.receiveHdSeed(seed));
  const mnemonic = Mnemonic.toWords(seed);
  yield put(h.receiveHdMnemonic(mnemonic));
  const hdkey = HDKey.generate(seed);
  yield put(h.receiveHdMasterKeys(hdkey.extPrv(), hdkey.extPub()));
}

function* getHdMasterKeysFromSeed(action) {
  const { payload: p } = action;
  if (Validator.isEmpty(p.seed)) return;
  const mnemonic = Mnemonic.toWords(p.seed);
  yield put(h.receiveHdMnemonic(mnemonic));
  const hdkey = HDKey.generate(p.seed);
  yield put(h.receiveHdMasterKeys(hdkey.extPrv(), hdkey.extPub()));
}

function* getHdMasterKeysFromMnemonic(action) {
  const { payload: p } = action;
  if (Validator.isEmpty(p.mnemonic)) return;
  const seed = Mnemonic.toEntropy(p.mnemonic);
  yield put(h.receiveHdSeed(seed));
  const hdkey = HDKey.generate(seed);
  yield put(h.receiveHdMasterKeys(hdkey.extPrv(), hdkey.extPub()));
}

function* getHdMasterPubkey(action) {
  const { payload: p } = action;
  if (Validator.isEmpty(p.masterPrvkey)) return;
  const hdkey = HDKey.fromExtKey(p.masterPrvkey);
  const masterPubkey = hdkey.extPub();
  yield put(h.receiveHdMasterKeys(p.masterPrvkey, masterPubkey));
}

function* createHdKeys(action) {
  const { payload: p } = action;
  const hdkey = HDKey.fromExtKey(p.prvkey).derive(p.hdpath);
  yield put(h.receiveHdKeys(hdkey.extPrv(), hdkey.extPub()));
}

function* createHdPubkey(action) {
  const { payload: p } = action;
  const hdkey = HDKey.fromExtKey(p.pubkey).derive(p.hdpath);
  yield put(h.receiveHdKeys('', hdkey.extPub()));
}

function* createP2pkhAddr(action) {
  const { payload: p } = action;
  const pubkey = Base58Check.decode(p.hdpub).slice(-64);
  const addr = KeyConv.pubkeyToP2pkhAddr(pubkey);
  yield put(h.receiveP2pkhAddr(addr));
}

function* createP2wpkhAddr(action) {
  const { payload: p } = action;
  const pubkey = Base58Check.decode(p.hdpub);
  const prefix = AddrPrefix().prefix;
  const addr = Bech32.p2wpkhAddr(pubkey, prefix, 0);
  yield put(h.receiveP2wpkhAddr(addr));
}

export const hdkeySaga = [
  takeLatest(actionTypes.USER_GEN_HD_SEED, generateHdSeed),
  takeLatest(actionTypes.USER_GET_HD_MASTER_KEYS_FROM_SEED, getHdMasterKeysFromSeed),
  takeLatest(actionTypes.USER_GET_HD_MASTER_KEYS_FROM_MNEMONIC, getHdMasterKeysFromMnemonic),
  takeLatest(actionTypes.USER_GET_HD_MASTER_PUBKEY, getHdMasterPubkey),
  takeLatest(actionTypes.USER_GET_HD_KEYS, createHdKeys),
  takeLatest(actionTypes.USER_GET_HD_PUBKEY, createHdPubkey),
  takeLatest(actionTypes.USER_CREATE_P2PKH_ADDR, createP2pkhAddr),
  takeLatest(actionTypes.USER_CREATE_P2WPKH_ADDR, createP2wpkhAddr),
];
