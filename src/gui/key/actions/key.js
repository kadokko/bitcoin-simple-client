import { createAction } from 'gui/app/actions/Creator';
import * as types from './key-types';


export const createAddrAndKeys = (num) =>
  createAction(
    types.USER_CREATE_ADDR_AND_KEYS, {
      num,
    },
  );

export const receiveAddrAndKeys = (keys) =>
  createAction(
    types.REDUCER_RECEIVE_ADDR_AND_KEYS, {
      keys,
    },
  );
