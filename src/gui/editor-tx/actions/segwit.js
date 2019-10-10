import { createAction } from 'gui/app/actions/Creator';
import * as types from './segwit-types';
import Actions from './base';


// vin: utxo finder dialog
export const openUtxoModal = idx => (
  Actions.openUtxoModal(types, idx)
);

export const searchUtxos = (amountMin, amountMax, scriptTypes) => (
  Actions.searchUtxos(types, amountMin, amountMax, scriptTypes)
);

export const receiveUtxos = utxos => (
  Actions.receiveUtxos(types, utxos)
);

export const receiveUtxosError = (code, message) => (
  Actions.receiveUtxosError(types, code, message)
);

export const setSelectedUtxo = (idx, utxo) => (
  Actions.setSelectedUtxo(types, idx, utxo)
);

export const receiveSelectedUtxo = (idx, utxo) => (
  Actions.receiveSelectedUtxo(types, idx, utxo)
);

export const closeUtxoModal = () => (
  Actions.closeUtxoModal(types)
);

// vin: signature creator dialog
export const openSignatureModal = idx => (
  Actions.openSignatureModal(types, idx)
);

export const dumpPrvkey = pubkeyHash => (
  Actions.dumpPrvkey(types, pubkeyHash)
);

export const receivePrvkey = (prvkey) => (
  Actions.receivePrvkey(types, prvkey)
);

export const createSignature = (tx, idx, scriptCode, amount, prvkey) => (
  createAction(
    types.USER_CERATE_SIGNATURE, {
      tx,
      idx,
      scriptCode,
      amount,
      prvkey,
    },
  )
);

export const receiveSignature = (signature) => (
  Actions.receiveSignature(types, signature)
);

export const closeSignatureModal = () => (
  Actions.closeSignatureModal(types)
);

// vout: script template finder dialog
export const openTemplateModal = idx => (
  Actions.openTemplateModal(types, idx)
);

export const closeTemplateModal = () => (
  Actions.closeTemplateModal(types)
);

export const setSelectedTemplate = (idx, template) => (
  Actions.setSelectedTemplate(types, idx, template)
);

export const receiveSelectedTemplate = (idx, template) => (
  Actions.receiveSelectedTemplate(types, idx, template)
);

// vin: amount, scriptPubKey
export const getUtxoDetail = (idx, txid, n) => (
  Actions.getUtxoDetail(types, idx, txid, n)
);

export const receiveUtxoDetail = (idx, amount, scriptPubKey) => (
  Actions.receiveUtxoDetail(types, idx, amount, scriptPubKey)
);

// vin: amount
export const receiveVinAmount = (idx) => (
  Actions.receiveVinAmount(types, idx)
);

// vout: value
export const updateVoutValue = (idx) => (
  Actions.updateVoutValue(types, idx)
);

export const receiveVoutValue = (idx) => (
  Actions.receiveVoutValue(types, idx)
);

// vout: suggest op code
export const updateScriptWithSuggest = () => (
  Actions.updateScriptWithSuggest(types)
);

export const receiveUpdatedScript = () => (
  Actions.receiveUpdatedScript(types)
);

// tx: calculate transaction fee
export const updateAmounts = () => (
  Actions.updateAmounts(types)
);

// tx: convert to transaction hex
export const convertToTxHex = values => (
  Actions.convertToTxHex(types, values)
);

export const receiveTxHex = (txhex, wtxid, txid) =>
  createAction(
    types.REDUCER_RECEIVE_TXHEX, {
      txhex,
      wtxid,
      txid,
    },
  );

// tx: send transaction
export const sendTx = rawTx => (
  Actions.sendTx(types, rawTx)
);

export const receiveSendTxResult = result => (
  Actions.receiveSendTxResult(types, result)
);

export const receiveSendTxResultError = result => (
  Actions.receiveSendTxResultError(types, result)
);

// rpc: error
export const throwRpcError = (code, message) => (
  Actions.throwRpcError(types, code, message)
);
