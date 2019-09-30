import { updateState } from 'gui/app/reducers/helper';
import { DecInt } from 'lib/type/Int';
import Num from 'lib/util/Num';
import Unit from 'lib/util/Unit';
import Validator from 'lib/util/Validator';
import * as stdActionTypes from '../actions/standard-types';
import * as segActionTypes from '../actions/segwit-types';


const sum = (elements, propname) => {
  return elements.reduce((total, element) => {
    const v = element[propname];
    const n = Validator.isPositiveInt(v) ? DecInt(v) : 0;
    return total.add(n);
  }, DecInt(0)).toString();
};

const sub = (x1, x2) => (
  DecInt(x1).sub(DecInt(x2)).toString()
);

const receiveUtxo = (state, action) => {
  const { payload: p } = action;
  const vins = [ ...state.values.vins ];
  vins[p.idx] = { ...vins[p.idx], ...p.utxo };
  return {
    ...state,
    values: {
      ...state.values,
      vins: [ ...vins ],
    },
  };
};

const receiveVinAmount = (state, action) => {
  const { payload: p } = action;
  const vins = [ ...state.values.vins ];
  const vin = vins[p.idx];
  vin.amountBtc = Num.exponentToDecimal(Unit.toBtc(vin.amount)) + ' BTC';
  return {
    ...state,
    values: {
      ...state.values,
      vins: [ ...vins ],
    },
  };
};

const receiveAmounts = (state) => {
  const vinAmounts = sum(state.values.vins, 'amount');
  const voutAmounts = sum(state.values.vouts, 'value');
  const fee = sub(vinAmounts, voutAmounts);
  const amounts = {
    fee,
    vinAmounts,
    voutAmounts,
  };
  return {
    ...state,
    values: {
      ...state.values,
      amounts,
    },
  };
};

const receiveVoutValue = (state, action) => {
  const { payload: p } = action;
  const vouts = [ ...state.values.vouts ];
  const vout = vouts[p.idx];
  vout.valueBtc = Num.exponentToDecimal(Unit.toBtc(vout.value)) + ' BTC';
  return {
    ...state,
    values: {
      ...state.values,
      vouts: [ ...vouts ],
    },
  };
};

const receiveScriptTemplate = (state, action) => {
  const { payload: p } = action;
  const vouts = [ ...state.values.vouts ];
  vouts[p.idx] = { ...vouts[p.idx], scriptPubKey: p.template };
  return {
    ...state,
    values: {
      ...state.values,
      vouts: [ ...vouts ],
    },
  };
};

const receiveTxHex = (state, action) => {
  const { payload: { txhex, txid, wtxid='' } } = action;
  return {
    ...state,
    values: {
      ...state.values,
      txhex,
      txid,
      wtxid,
    },
  };
};

const receiveSendTxResult = (state, action) => {
  const { payload, error } = action;
  const { txid, message } = payload;
  return updateState(state, { txid }, { txid: '' }, message, error);
};

const receiveUpdatedScript = (state) => ({
  ...state,
});

const handleAction = (state, action, actionTypes) => {

  switch (action.type) {

    case actionTypes.REDUCER_RECEIVE_UTXO: {
      return receiveUtxo(state, action);
    }

    case actionTypes.REDUCER_RECEIVE_VIN_AMOUNT: {
      return receiveVinAmount(state, action);
    }

    case actionTypes.REDUCER_RECEIVE_AMOUNTS: {
      return receiveAmounts(state);
    }

    case actionTypes.REDUCER_RECEIVE_VOUT_VALUE: {
      return receiveVoutValue(state, action);
    }

    case actionTypes.REDUCER_RECEIVE_SCRIPT_TEMPLATE: {
      return receiveScriptTemplate(state, action);
    }

    case actionTypes.REDUCER_RECEIVE_UPDATED_SCRIPT: {
      return receiveUpdatedScript(state, action);
    }

    case actionTypes.REDUCER_RECEIVE_TXHEX: {
      return receiveTxHex(state, action);
    }

    case actionTypes.REDUCER_RECEIVE_SEND_TX_RESULT: {
      return receiveSendTxResult(state, action);
    }

    default:
      return state;
  }
};

export const standardForm = {
  standardForm: (state, action) => handleAction(state, action, stdActionTypes),
};

export const segwitForm = {
  segwitForm: (state, action) => handleAction(state, action, segActionTypes),
};
