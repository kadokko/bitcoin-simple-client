import { updateState } from 'gui/app/reducers/helper';
import * as stdActionTypes from '../actions/standard-types';
import * as segActionTypes from '../actions/segwit-types';


const initialState = {
  utxos: [],
};

const handleUtxoDialogAction = (state, action, actionTypes) => {

  const { type, payload, error } = action;

  switch (type) {

    // reset
    case actionTypes.USER_OPEN_UTXO_FINDER_MODAL:
    case actionTypes.USER_CLOSE_UTXO_FINDER_MODAL: {
      return { ...state,
        utxos: [],
        error: '',
      };
    }

    case actionTypes.REDUCER_RECEIVE_UTXOS: {
      const { utxos, message } = payload;
      return updateState(state, { utxos }, { utxos: [] }, message, error);
    }

    default:
      return state;
  }
};

export const standardUtxoDialog = (state = initialState, action) => (
  handleUtxoDialogAction(state, action, stdActionTypes)
);

export const segwitUtxoDialog = (state = initialState, action) => (
  handleUtxoDialogAction(state, action, segActionTypes)
);
