import * as actionTypes from '../actions/key-types';


export const keyForm = {

  keyForm: (state, action) => {

    switch (action.type) {

      case actionTypes.REDUCER_RECEIVE_ADDR_AND_KEYS: {
        const { payload: p } = action;
        return {
          ...state,
          values: {
            ...state.values,
            keys: p.keys,
          },
        };
      }

      default:
        return state;

    }
  },
};
