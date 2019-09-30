import * as actionTypes from '../actions/config-types';


export const configForm = {

  configForm: (state, action) => {

    const { type, payload } = action;

    switch (type) {

      case actionTypes.REDUCER_RECEIVE_CONFIG: {
        const { rpcurl, rpcuser, rpcpass } = payload;
        return { ...state,
          values: {
            rpcurl,
            rpcuser,
            rpcpass,
          },
        };
      }

      default:
        return state;
    }
  },

};
