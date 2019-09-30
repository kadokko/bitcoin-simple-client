import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';
import { Row, Area } from 'gui/editor-tx/components/base/layout';
import { Input, VinInputs, VoutInputs, Fee, TxHex, Txid } from 'gui/editor-tx/components/base';
import { WitnessInputs, Wtxid } from 'gui/editor-tx/components/segwit';
import { validator as validate } from 'gui/editor-tx/validator/validator';
import * as actionDefs from '../../actions/segwit';
import { Message } from '../base/Message';
import { initialTxValues } from './InitialValues';
import SearchUtxoDialog from './dialog/SearchUtxoDialog';
import SearchTemplateDialog from './dialog/SearchTemplateDialog';
import CreateSignatureDialog from './dialog/CreateSignatureDialog';


const EditorTxSegwit = ({
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
    updateAmounts,
    updateVoutValue,
    updateScriptWithSuggest,
    convertToTxHex,
    sendTx,
  },
  handleSubmit,
  reset,
  pristine,
  submitting,
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
          openUtxoModal={ openUtxoModal }
          openSignatureModal={ openSignatureModal }
          updateAmounts={ updateAmounts }
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

      {/* witness */}
      <Row>
        <WitnessInputs />
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

      {/* wtxid */}
      <Row>
        <Area>
          <Wtxid />
        </Area>
      </Row>
    </form>

    {/* dialog */}
    <SearchUtxoDialog />
    <CreateSignatureDialog />
    <SearchTemplateDialog />
  </div>
);

const Connected = connect(
  state => ({
    forms: state.form.segwitForm,
  }),
  dispatch => ({
    actions: bindActionCreators(actionDefs, dispatch),
  }),
)(EditorTxSegwit);

export default reduxForm({
  form: 'segwitForm',
  destroyOnUnmount: false,
  validate,
  initialValues: initialTxValues,
})(withStyles(styles)(Connected));
