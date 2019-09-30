import * as actionTypes from '../actions/hdkey-types';


export const hdkeyForm = {

  hdkeyForm: (state, action) => {

    const { type, payload } = action;

    switch (type) {

      case actionTypes.REDUCER_RECEIVE_HD_SEED: {
        const { seed } = payload;
        return { ...state,
          values: {
            ...state.values,
            seed,
          },
        };
      }

      case actionTypes.REDUCER_RECEIVE_HD_MNEMONIC: {
        const { mnemonic } = payload;
        return { ...state,
          values: {
            ...state.values,
            mnemonic,
          },
        };
      }

      case actionTypes.REDUCER_RECEIVE_HD_MASTER_KEYS: {
        const { masterPrvkey, masterPubkey } = payload;
        return { ...state,
          values: {
            ...state.values,
            masterPrvkey,
            masterPubkey,
          },
        };
      }

      case actionTypes.REDUCER_RECEIVE_HD_KEYS: {
        const { hdprv, hdpub } = payload;
        return { ...state,
          values: {
            ...state.values,
            hdprv,
            hdpub,
          },
        };
      }

      case actionTypes.REDUCER_RECEIVE_P2PKH_ADDR: {
        const { p2pkhAddr } = payload;
        return { ...state,
          values: {
            ...state.values,
            p2pkhAddr,
          },
        };
      }

      case actionTypes.REDUCER_RECEIVE_P2WPKH_ADDR: {
        const { p2wpkhAddr } = payload;
        return { ...state,
          values: {
            ...state.values,
            p2wpkhAddr,
          },
        };
      }

      default:
        return state;
    }
  },

};
