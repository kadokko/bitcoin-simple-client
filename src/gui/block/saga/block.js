import { call, takeLatest, put } from 'redux-saga/effects';
import * as rpc from 'gui/rpc/saga/rpc';
import * as b from '../actions/block';
import * as actionTypes from '../actions/block-types';


function* fetchBlocks(action) {
  const { payload: p } = action;
  const blockIds = yield call(rpc.generateBlocks, p.num);
  yield put(b.receiveBlockIds(blockIds));
}

export const blockSaga = [
  takeLatest(actionTypes.USER_GENERATE_BLOCKS, fetchBlocks),
];
