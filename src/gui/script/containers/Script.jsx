import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';
import { BasicBtn as basicBtn } from 'gui/app/components/button';
import { InputField, TextAreaField } from 'gui/app/components/field/redux-form';
import { Title } from 'gui/app/components/label';
import { Box } from 'gui/app/components/layout';
import { ScriptEditor } from 'gui/editor-tx/components/base';
import * as validator from 'gui/editor-tx/validator/validator';
import * as actionDefs from '../actions/script';


const Input = withStyles(() => ({
  inputFieldBase: {
    height: '40px',
  },
}))(InputField);

const TextArea = withStyles(() => ({
  textAreaFieldBase: {
    height: '75px !important',
    paddingTop: 11,
  },
}))(TextAreaField);

const BasicBtn = withStyles(() => ({
  basicButton: {
    lineHeight: 1.5,
    marginTop: 1,
    marginLeft: 5,
  },
}))(basicBtn);

const Script = ({
  forms: {
    values,
  // syncErrors,
  },
  actions: {
    createP2wshUtxo,
  },
}) => (
  <form>
    <Box mb={1}>
      <Title>
        P2wsh Utxo Creator
      </Title>
    </Box>
    <Box mb={1}>
      <Field
        label="redeem script"
        name="redeemScriptAsm"
        type="text"
        component={ ScriptEditor }
        validator={[ validator.isScript ]}
      />
      <BasicBtn
        label="create"
        onClick={ () => {
          createP2wshUtxo(values.redeemScriptAsm);
        }}
      />
    </Box>
    <Box mb={1}>
      <Field
        component={ TextArea }
        label="redeem script (hex)"
        name="redeemScriptHex"
        readOnly
      />
    </Box>
    <Box mb={1}>
      <Field
        component={ TextArea }
        label="scriptPubKey"
        name="scriptPubKeyAsm"
        readOnly
      />
    </Box>
    <Box mb={1}>
      <Field
        component={ TextArea }
        label="scriptPubKey (hex)"
        name="scriptPubKeyHex"
        readOnly
      />
    </Box>
    <Box mb={1}>
      <Field
        component={ Input }
        label="p2wsh address"
        name="p2wshAddr"
        readOnly
      />
    </Box>
    <Box mb={1}>
      <Field
        component={ Input }
        label="utxo: txid"
        name="txid"
        readOnly
      />
    </Box>
    <Box mb={1}>
      <Field
        component={ Input }
        label="utxo: n"
        name="n"
        readOnly
      />
    </Box>
  </form>
);

const Connected = connect(
  state => ({
    forms: state.form.scriptForm,
  }),
  dispatch => ({
    actions: bindActionCreators(actionDefs, dispatch),
  }),
)(Script);

export default reduxForm({
  form: 'scriptForm',
  destroyOnUnmount: false,
  // validate,
  initialValues: {},
})(withStyles(styles)(Connected));
