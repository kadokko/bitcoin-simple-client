import { takeLatest, put } from 'redux-saga/effects';
import { rpcConfig } from 'gui/rpc/saga/rpcConfig';
import * as actionTypes from '../actions/config-types';
import * as c from '../actions/config';


function* updateConfig(action) {
  const { payload: { values } } = action;
  const { rpcurl, rpcuser, rpcpass } = values;
  yield put(c.receiveConfig(rpcurl, rpcuser, rpcpass));
}

function* changeBtcNode(action) {
  const { payload: { node } } = action;
  if (node === 'node1') {
    const { node1: { rpcurl, rpcuser, rpcpass } } = rpcConfig;
    yield put(c.receiveBtcNode(node, rpcurl, rpcuser, rpcpass));
  } else {
    const { node2: { rpcurl, rpcuser, rpcpass } } = rpcConfig;
    yield put(c.receiveBtcNode(node, rpcurl, rpcuser, rpcpass));
  }
}

export const configSaga = [
  takeLatest(actionTypes.USER_UPDATE_CONFIG, updateConfig),
  takeLatest(actionTypes.USER_CHANGE_BTC_NODE, changeBtcNode),
];
