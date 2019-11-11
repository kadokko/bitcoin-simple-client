import { call, takeLatest, put } from 'redux-saga/effects';
import { safen } from 'gui/app/saga/effects';
import * as rpc from 'gui/rpc/saga/rpc';
import * as b from '../actions/block';
import * as actionTypes from '../actions/block-types';


function* getBlockCount() {
  const blockCount = yield call(rpc.getBlockCount);
  yield put(b.receiveBlockCount(blockCount));
}

function* generateBlocks(action) {
  const { payload: p } = action;
  const blockIds = yield call(rpc.generateBlocks, p.num);
  yield put(b.receiveBlockIds(blockIds));
  yield getBlockCount();
}

export const blockSaga = [
  takeLatest(actionTypes.USER_GET_BLOCK_COUNT, safen(getBlockCount)),
  takeLatest(actionTypes.USER_GENERATE_BLOCKS, safen(generateBlocks)),
];
