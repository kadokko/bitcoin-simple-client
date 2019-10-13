import * as actionTypes from '../actions/script-types';


export const scriptForm = {

  scriptForm: (state, action) => {

    switch (action.type) {

      case actionTypes.REDUCER_RECEIVE_P2WSH_UTXO: {
        const { payload: p } = action;
        return {
          ...state,
          values: {
            ...state.values,
            redeemScriptHex: p.redeemScriptHex,
            scriptPubKeyAsm: p.scriptPubKeyAsm,
            scriptPubKeyHex: p.scriptPubKeyHex,
            p2wshAddr: p.p2wshAddr,
            txid: p.txid,
            n: p.n,
          },
        };
      }

      default:
        return state;
    }
  },
};
