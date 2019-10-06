import { call, takeLatest, put } from 'redux-saga/effects';
import KeyConv from 'lib/util/KeyConv';
import * as rpc from 'gui/rpc/saga/rpc';
import * as k from '../actions/key';
import * as actionTypes from '../actions/key-types';


function* createAddrAndKeys(action) {
  const { payload: p } = action;
  const keys = [];
  for (let i = 0; i < p.num; i++) {
    const address = yield call(rpc.getNewAddress);
    const pubkey = yield call(rpc.getPubkey, address);
    const wif = yield call(rpc.getPrvkey, address);
    const prvkey = KeyConv.wifToPrvkey(wif);
    keys.push({ address, pubkey, prvkey });
  }
  yield put(k.receiveAddrAndKeys(keys));
}

export const keySaga = [
  takeLatest(actionTypes.USER_CREATE_ADDR_AND_KEYS, createAddrAndKeys),
];
