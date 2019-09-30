import { createAction } from 'gui/app/actions/Creator';
import * as types from './block-types';


export const generateBlocks = num =>
  createAction(
    types.USER_GENERATE_BLOCKS, {
      num,
    },
  );

export const receiveBlockIds = blockIds =>
  createAction(
    types.REDUCER_RECEIVE_BLOCK_IDS, {
      blockIds,
    },
  );
