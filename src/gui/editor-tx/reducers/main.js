import * as stdActionTypes from '../actions/standard-types';
import * as segActionTypes from '../actions/segwit-types';


const initialState = {
  isUtxoModalOpen: false,
  isSignatureModalOpen: false,
  isTemplateModalOpen: false,
};

const handleAction = (state, action, actionTypes) => {

  const { type, payload } = action;

  switch (type) {

    case actionTypes.USER_OPEN_UTXO_FINDER_MODAL: {
      const { isUtxoModalOpen, idx } = payload;
      return { ...state,
        isUtxoModalOpen,
        idx,
        error: '',
      };
    }

    case actionTypes.USER_CLOSE_UTXO_FINDER_MODAL: {
      const { isUtxoModalOpen } = payload;
      return { ...state,
        isUtxoModalOpen,
      };
    }

    case actionTypes.USER_OPEN_SIGNATURE_CREATOR_MODAL: {
      const { isSignatureModalOpen, idx } = payload;
      return { ...state,
        isSignatureModalOpen,
        idx,
      };
    }

    case actionTypes.USER_CLOSE_SIGNATURE_CREATOR_MODAL: {
      const { isSignatureModalOpen } = payload;
      return { ...state,
        isSignatureModalOpen,
      };
    }

    case actionTypes.USER_OPEN_TEMPLATE_FINDER_MODAL: {
      const { isTemplateModalOpen, idx } = payload;
      return { ...state,
        isTemplateModalOpen,
        idx,
      };
    }

    case actionTypes.USER_CLOSE_TEMPLATE_FINDER_MODAL: {
      const { isTemplateModalOpen } = payload;
      return { ...state,
        isTemplateModalOpen,
      };
    }

    default:
      return state;
  }
};

export const standard = (state = initialState, action) => (
  handleAction(state, action, stdActionTypes)
);

export const segwit = (state = initialState, action) => (
  handleAction(state, action, segActionTypes)
);
