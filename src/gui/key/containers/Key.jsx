import React from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { connectf } from 'gui/app/containers/redux';
import { BasicBtn as basicBtn } from 'gui/app/components/button';
import { Input } from 'gui/app/components/field/redux-form';
import { Title } from 'gui/app/components/label';
import { Box, Margin } from 'gui/app/components/layout';
import { styles } from 'gui/app/style/Styles';
import { initialValues } from './InitialValues';
import * as actionDefs from '../actions/key';


const BasicBtn = withStyles(() => ({
  basicButton: {
    lineHeight: 1.5,
    marginTop: 8,
    marginLeft: 5,
    paddingRight: 5,
    paddingLeft: 5,
    height: 38,
  },
}))(basicBtn);

const renderAddrAndKeys = ({ fields }) => (
  <div>
    { fields.map((field, index) => (
      <div key={`${field}.pubkey`}>
        <Box>
          <Title>
            key
            { index + 1 }
          </Title>
        </Box>
        <Box>
          <Field
            component={ Input }
            label="p2wpkh address"
            name={`${field}.address`}
            readOnly
          />
        </Box>
        <Box>
          <Field
            component={ Input }
            label="public key"
            name={`${field}.pubkey`}
            readOnly
          />
        </Box>
        <Box>
          <Field
            component={ Input }
            label="private key"
            name={`${field}.prvkey`}
            readOnly
          />
        </Box>
      </div>
    ))}
  </div>
);

const Key = ({
  actions: {
    createAddrAndKeys,
  },
}) => (
  <form>
    <Box>
      <Title>
        key creator
      </Title>
    </Box>
    <Box>
      <BasicBtn
        label="+1"
        onClick={ () => createAddrAndKeys(1) }
      />
      <BasicBtn
        label="+2"
        onClick={ () => createAddrAndKeys(2) }
      />
      <BasicBtn
        label="+3"
        onClick={ () => createAddrAndKeys(3) }
      />
    </Box>
    <Margin />
    <Box>
      <FieldArray
        name="keys"
        component={ renderAddrAndKeys }
      />
    </Box>
  </form>
);

const Connected = connectf(
  'keyForm', actionDefs,
)(Key);

export default reduxForm({
  form: 'keyForm',
  destroyOnUnmount: false,
  initialValues,
  // validate,
})(withStyles(styles)(Connected));
