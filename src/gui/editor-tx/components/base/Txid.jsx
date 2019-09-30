import React from 'react';
import { Field } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { InputField } from 'gui/app/components/field/redux-form';


const Input = withStyles(() => ({
  inputFieldBase: {
    height: 35,
  },
  inputField: {
    marginTop: 8,
    width: 841,
  },
}))(InputField);

export const TxidInput = ({ label, name }) => (
  <Field
    label={ label }
    name={ name }
    component={ Input }
    readOnly
  />
);

export const Txid = () => (
  <TxidInput
    label="txid"
    name="txid"
  />
);
