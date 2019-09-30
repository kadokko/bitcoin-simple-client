import React from 'react';
import { Field } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { Div } from 'gui/app/components/base';
import { InputField } from 'gui/app/components/field/redux-form';
import { DivTable, DivCell } from 'gui/app/components/table-div';
import Currency from 'lib/util/Currency';


const FeeArea = withStyles(() => ({
  root: {
    marginTop: 25,
  },
}))(DivTable);

const FeeItem = withStyles(() => ({
  root: {
    verticalAlign: 'middle',
  },
}))(DivCell);

const Symbol = withStyles(() => ({
  root: {
    textAlign: 'center',
    width: 30,
  },
}))(Div);

const ReadOnlyInput = ({ label, name, type='text', format, classes }) => (
  <Field
    component={ InputField }
    label={ label }
    name={ name }
    type={ type }
    readOnly
    format={ format }
    classes={ classes }
  />
);

const ReadOnlyInputField = withStyles(() => ({
  inputField: {
    width: 140,
  },
  inputFieldBase: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 12,
    textAlign: 'right',
    height: 30,
  },
}))(ReadOnlyInput);

export const Fee = () => (
  <FeeArea>
    <FeeItem>
      <ReadOnlyInputField
        label="fee(satoshi)"
        name="amounts.fee"
        format={ Currency.format }
      />
    </FeeItem>
    <FeeItem>
      <Symbol>=</Symbol>
    </FeeItem>
    <FeeItem>
      <ReadOnlyInputField
        label="vin amounts"
        name="amounts.vinAmounts"
        format={ Currency.format }
      />
    </FeeItem>
    <FeeItem>
      <Symbol>-</Symbol>
    </FeeItem>
    <FeeItem>
      <ReadOnlyInputField
        label="vout amounts"
        name="amounts.voutAmounts"
        format={ Currency.format }
      />
    </FeeItem>
  </FeeArea>
);
