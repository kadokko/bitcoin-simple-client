import { updateState } from 'gui/app/reducers/helper';
import { rpcConfig } from 'gui/rpc/saga/rpcConfig';
import * as actionTypes from '../actions/config-types';


const initialState = {
  ...rpcConfig.node1,
};

export const config = (state = initialState, action) => {

  const { type, payload, error } = action;

  switch (type) {

    case actionTypes.REDUCER_RECEIVE_BTC_NODE: {
      const { node, rpcurl, rpcuser, rpcpass, message } = payload;
      return updateState(state, { node, rpcurl, rpcuser, rpcpass }, {}, message, error);
    }

    default:
      return state;
  }
};
