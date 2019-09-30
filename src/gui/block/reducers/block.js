import * as actionTypes from '../actions/block-types';


const initialState = {
  blockIds: [],
};

export const block = (state = initialState, action) => {

  const { type, payload } = action;

  switch (type) {

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
