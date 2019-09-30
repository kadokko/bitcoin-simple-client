import * as stdActionTypes from '../actions/standard-types';
import * as segActionTypes from '../actions/segwit-types';


const handleSigFormAction = (state, action, actionTypes) => {

  switch (action.type) {

    // reset
    case actionTypes.USER_OPEN_SIGNATURE_CREATOR_MODAL:
    case actionTypes.USER_CLOSE_SIGNATURE_CREATOR_MODAL: {
      return { ...state,
        values: {},
      };
    }

    case actionTypes.REDUCER_RECEIVE_PRVKEY: {
      const { payload: { prvkey } } = action;
      return { ...state,
        values: {
          ...state.values,
          prvkey,
        },
      };
    }

    case actionTypes.REDUCER_RECEIVE_SIGNATURE: {
      const { payload: { signature } } = action;
      return {
        ...state,
        values: {
          ...state.values,
          signature,
        },
      };
    }

    default:
      return state;
  }
};

export const standardSigForm = {
  standardSigForm: (state, action) =>
    handleSigFormAction(state, action, stdActionTypes),
};

export const segwitSigForm = {
  segwitSigForm: (state, action) =>
    handleSigFormAction(state, action, segActionTypes),
};
