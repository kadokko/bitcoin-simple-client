import React from 'react';
import { reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';
import { connectf } from 'gui/app/containers/redux';
import { Row, Area } from 'gui/editor-tx/components/base/layout';
import { Input, VinInputs, VoutInputs, Fee, TxHex, Txid } from 'gui/editor-tx/components/base';
import { validator as validate } from 'gui/editor-tx/validator/validator';
import * as actionDefs from '../../actions/standard';
import { Message } from '../base/Message';
import { initialTxValues } from './InitialValues';
import SearchUtxoDialog from './dialog/SearchUtxoDialog';
import SearchTemplateDialog from './dialog/SearchTemplateDialog';
import CreateSignatureDialog from './dialog/CreateSignatureDialog';


const EditorTxStandard = ({
  forms: {
    values,
    txid,
    error,
    syncErrors,
  },
  actions: {
    openUtxoModal,
    openSignatureModal,
    openTemplateModal,
    getUtxoDetail,
    updateAmounts,
    updateVoutValue,
    updateScriptWithSuggest,
    convertToTxHex,
    sendTx,
  },
  // redux-form built-in
  handleSubmit,
  reset,
  pristine, // true if the form data is the same as its initialized values.
  submitting, // It will be true until the promise is resolved or rejected.
}) => (
  <div>
    <form
      onSubmit={ handleSubmit(convertToTxHex) }
    >
      {/* version */}
      <Row>
        <Input
          label="version"
          name="version"
          type="number"
        />
      </Row>

      {/* vins */}
      <Row>
        <VinInputs
          values={ values }
          openUtxoModal={ openUtxoModal }
          openSignatureModal={ openSignatureModal }
          getUtxoDetail={ getUtxoDetail }
        />
      </Row>

      {/* vouts */}
      <Row>
        <VoutInputs
          openTemplateModal={ openTemplateModal }
          updateVoutValue={ updateVoutValue }
          updateAmounts={ updateAmounts }
          updateScriptWithSuggest={ updateScriptWithSuggest }
        />
      </Row>

      {/* locktime */}
      <Row>
        <Input
          label="locktime"
          name="locktime"
          type="number"
          placeholder="0"
        />
      </Row>

      {/* fee */}
      <Row>
        <Area>
          <Fee />
        </Area>
      </Row>

      {/* message */}
      <Row>
        <Area>
          <Message
            pristine={ pristine }
            ret={ txid }
            error={ error }
          />
        </Area>
      </Row>

      {/* transaction hex */}
      <Row>
        <Area>
          <TxHex
            txhex={ values.txhex }
            sendTx={ sendTx }
            resetTx={ reset }
            errors={ syncErrors }
            pristine={ pristine }
            submitting={ submitting }
          />
        </Area>
      </Row>

      {/* txid */}
      <Row>
        <Area>
          <Txid />
        </Area>
      </Row>
    </form>

    {/* dialog */}
    <SearchUtxoDialog />
    <CreateSignatureDialog />
    <SearchTemplateDialog />
  </div>
);

const Connected = connectf(
  'standardForm', actionDefs,
)(EditorTxStandard);

export default reduxForm({
  form: 'standardForm',
  destroyOnUnmount: false,
  initialValues: initialTxValues,
  validate,
})(withStyles(styles)(Connected));
