import * as actionTypes from '../actions/app-types';


export const appForm = {

  appForm: (state, action) => {

    switch (action.type) {

      case actionTypes.REDUCER_RECEIVE_SYSTEM_ERROR: {
        const { payload: { message } } = action;
        return { ...state,
          values: {
            ...state.values,
            errors: message,
          },
        };
      }

      case actionTypes.REDUCER_RESET_ERROR_MESSAGE: {
        const { payload: { message } } = action;
        return { ...state,
          values: {
            ...state.values,
            errors: message,
          },
        };
      }

      default:
        return state;

    }
  },
};
