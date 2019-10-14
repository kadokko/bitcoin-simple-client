import * as actionTypes from '../actions/block-types';


const initialState = {
  blockCount: '',
  blockIds: [],
};

export const block = (state = initialState, action) => {

  const { type, payload } = action;

  switch (type) {

    case actionTypes.REDUCER_RECEIVE_BLOCK_COUNT: {
      const { blockCount } = payload;
      return { ...state,
        blockCount,
      };
    }

    case actionTypes.REDUCER_RECEIVE_BLOCK_IDS: {
      const { blockIds } = payload;
      return { ...state,
        blockIds,
      };
    }

    default:
      return state;

  }
};
