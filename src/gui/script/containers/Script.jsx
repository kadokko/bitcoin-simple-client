import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';
import { connectf } from 'gui/app/containers/redux';
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
    <Box>
      <Title>
        P2wsh Utxo Creator
      </Title>
    </Box>
    <Box>
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
    <Box>
      <Field
        component={ TextArea }
        label="redeem script (hex)"
        name="redeemScriptHex"
        readOnly
      />
    </Box>
    <Box>
      <Field
        component={ TextArea }
        label="scriptPubKey"
        name="scriptPubKeyAsm"
        readOnly
      />
    </Box>
    <Box>
      <Field
        component={ TextArea }
        label="scriptPubKey (hex)"
        name="scriptPubKeyHex"
        readOnly
      />
    </Box>
    <Box>
      <Field
        component={ Input }
        label="p2wsh address"
        name="p2wshAddr"
        readOnly
      />
    </Box>
    <Box>
      <Field
        component={ Input }
        label="utxo: txid"
        name="txid"
        readOnly
      />
    </Box>
    <Box>
      <Field
        component={ Input }
        label="utxo: n"
        name="n"
        readOnly
      />
    </Box>
  </form>
);

const Connected = connectf(
  'scriptForm', actionDefs,
)(Script);

export default reduxForm({
  form: 'scriptForm',
  destroyOnUnmount: false,
  initialValues: {},
  // validate,
})(withStyles(styles)(Connected));
