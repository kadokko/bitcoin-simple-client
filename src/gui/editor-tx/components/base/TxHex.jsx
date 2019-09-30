import React from 'react';
import { Field } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { Div } from 'gui/app/components/base';
import { BasicBtn } from 'gui/app/components/button';
import { TextAreaField } from 'gui/app/components/field/redux-form';
import { DivTable, DivCell } from 'gui/app/components/table-div';


const Row = withStyles(() => ({
  root: {
    verticalAlign: 'top',
    margin: 5,
  },
}))(Div);

const Margin = withStyles(() => ({
  root: {
    margin: -18,
  },
}))(Div);

const TextArea = withStyles(() => ({
  inputField: {
    marginTop: 8,
    width: 841,
  },
  textAreaFieldBase: {
    paddingTop: 8,
    height: '92px !important',
  },
}))(TextAreaField);


export const TxHex = ({
  txhex, sendTx, resetTx, errors, pristine, submitting,
}) => (
  <div>
    <DivTable>
      <DivCell>
        <Field
          label="transaction hex"
          name="txhex"
          component={ TextArea }
          readOnly
        />
      </DivCell>
      <DivCell>
        <Row>
          <Margin>
            &nbsp;
          </Margin>
        </Row>
        <Row>
          <BasicBtn
            label="create"
            type="submit"
            disabled={ errors != null }
          />
        </Row>
        <Row>
          <BasicBtn
            label="send"
            onClick={ () => sendTx(txhex) }
            disabled={ errors != null || txhex === '' }
          />
        </Row>
        <Row>
          <BasicBtn
            label="reset"
            type="reset"
            onClick={ () => resetTx() }
            disabled={ pristine || submitting }
          />
        </Row>
      </DivCell>
    </DivTable>
  </div>
);
