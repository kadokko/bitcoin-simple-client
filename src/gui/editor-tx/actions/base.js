import { createAction, createErrorAction } from 'gui/app/actions/Creator';


class Actions {

  // utxo dialog
  static openUtxoModal = (types, idx) =>
    createAction(
      types.USER_OPEN_UTXO_FINDER_MODAL, {
        isUtxoModalOpen: true,
        idx,
      },
    );

  static searchUtxos = (types, amountMin, amountMax, scriptTypes) =>
    createAction(
      types.USER_SEARCH_UTXOS, {
        amountMin,
        amountMax,
        scriptTypes,
      },
    );

  static receiveUtxos = (types, utxos) =>
    createAction(
      types.REDUCER_RECEIVE_UTXOS, {
        utxos,
      },
    );

  static receiveUtxosError = (types, error) =>
    createErrorAction(
      types.REDUCER_RECEIVE_UTXOS,
      error,
    );

  static setSelectedUtxo = (types, idx, utxo) =>
    createAction(
      types.USER_SET_UTXO, {
        isUtxoModalOpen: false,
        idx,
        utxo,
      },
    );

  static receiveSelectedUtxo = (types, idx, utxo) =>
    createAction(
      types.REDUCER_RECEIVE_UTXO, {
        idx,
        utxo,
      },
    );

  static closeUtxoModal = types =>
    createAction(
      types.USER_CLOSE_UTXO_FINDER_MODAL, {
        isUtxoModalOpen: false,
      },
    );

  // signature dialog
  static openSignatureModal = (types, idx) =>
    createAction(
      types.USER_OPEN_SIGNATURE_CREATOR_MODAL, {
        isSignatureModalOpen: true,
        idx,
      },
    );

  static dumpPrvkey = (types, pubkeyHash) =>
    createAction(
      types.USER_DUMP_PRVKEY, {
        pubkeyHash,
      },
    );

  static receivePrvkey = (types, prvkey) =>
    createAction(
      types.REDUCER_RECEIVE_PRVKEY, {
        prvkey,
      },
    );

  static receiveSignature = (types, signature) =>
    createAction(
      types.REDUCER_RECEIVE_SIGNATURE, {
        signature,
      },
    );

  static closeSignatureModal = types =>
    createAction(
      types.USER_CLOSE_SIGNATURE_CREATOR_MODAL, {
        isSignatureModalOpen: false,
      },
    );

  // script template dialog
  static openTemplateModal = (types, idx) =>
    createAction(
      types.USER_OPEN_TEMPLATE_FINDER_MODAL, {
        isTemplateModalOpen: true,
        idx,
      },
    );

  static closeTemplateModal = types =>
    createAction(
      types.USER_CLOSE_TEMPLATE_FINDER_MODAL, {
        isTemplateModalOpen: false,
      },
    );

  static setSelectedTemplate = (types, idx, template) =>
    createAction(
      types.USER_SET_SCRIPT_TEMPLATE, {
        idx,
        template,
      },
    );

  static receiveSelectedTemplate = (types, idx, template) =>
    createAction(
      types.REDUCER_RECEIVE_SCRIPT_TEMPLATE, {
        idx,
        template,
      },
    );

  // field: vin amount, scriptPubKey
  static getUtxoDetail = (types, idx, txid, n) =>
    createAction(
      types.USER_GET_UTXO_DETAIL, {
        idx,
        txid,
        n,
      },
    );

  static receiveUtxoDetail = (types, idx, amount, scriptPubKey) =>
    createAction(
      types.REDUCER_RECEIVE_UTXO_DETAIL, {
        idx,
        amount,
        scriptPubKey,
      },
    );

  // field: vin amount
  static receiveVinAmount = (types, idx) =>
    createAction(
      types.REDUCER_RECEIVE_VIN_AMOUNT, {
        idx,
      },
    );

  // field: vin amount, vout value
  static updateAmounts = types =>
    createAction(
      types.REDUCER_RECEIVE_AMOUNTS,
    );

  // field: vout value
  static updateVoutValue = (types, idx) =>
    createAction(
      types.USER_UPDATE_VOUT_VALUE, {
        idx,
      },
    );

  static receiveVoutValue = (types, idx) =>
    createAction(
      types.REDUCER_RECEIVE_VOUT_VALUE, {
        idx,
      },
    );

  // field: vout scriptPubKey
  static updateScriptWithSuggest = (types) =>
    createAction(
      types.USER_UPDATE_SCRIPT_WITH_SUGGEST,
    );

  static receiveUpdatedScript = (types) =>
    createAction(
      types.REDUCER_RECEIVE_UPDATED_SCRIPT,
    );

  // field: tx
  static convertToTxHex = (types, values) =>
    createAction(
      types.USER_CONVERT_TO_TXHEX, {
        values,
      },
    );

  static sendTx = (types, rawTx) =>
    createAction(
      types.USER_SEND_TX, {
        rawTx,
      },
    );

  static receiveSendTxResult = (types, txid) =>
    createAction(
      types.REDUCER_RECEIVE_SEND_TX_RESULT, {
        txid,
      },
    );

  static receiveSendTxResultError = (types, error) =>
    createErrorAction(
      types.REDUCER_RECEIVE_SEND_TX_RESULT,
      error,
    );

  static throwRpcError = (types, code, message) =>
    createAction(
      types.SYS_THROW_RPC_ERROR, {
        code,
        message,
      },
      true,
    );

}

export default Actions;
