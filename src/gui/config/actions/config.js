import { createAction } from 'gui/app/actions/Creator';
import * as types from './config-types';


export const updateConfig = (values) =>
  createAction(
    types.USER_UPDATE_CONFIG, {
      values,
    },
  );

export const receiveConfig = (rpcurl, rpcuser, rpcpass) =>
  createAction(
    types.REDUCER_RECEIVE_CONFIG, {
      rpcurl,
      rpcuser,
      rpcpass,
    },
  );

export const changeBtcNode = (node) =>
  createAction(
    types.USER_CHANGE_BTC_NODE, {
      node,
    },
  );

export const receiveBtcNode = (node, rpcurl, rpcuser, rpcpass) =>
  createAction(
    types.REDUCER_RECEIVE_BTC_NODE, {
      node,
      rpcurl,
      rpcuser,
      rpcpass,
    },
  );
