import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connectf } from 'gui/app/containers/redux';
import { withStyles, styles } from 'gui/app/style';
import { Box } from 'gui/app/components/layout';
import { InputField } from 'gui/app/components/field/redux-form';
import { BasicBtn } from 'gui/app/components/button';
import * as actionDefs from '../actions/config';
import { initialConfigValues } from './InitialValues';


const Input = withStyles(() => ({
  inputFieldBase: {
    marginTop: 10,
    marginBottom: 4,
  },
}))(InputField);


const Config = ({
  forms: {
    syncErrors,
  },
  actions: {
    updateConfig,
  },
  // redux-form built-in
  handleSubmit,
  pristine,
  submitting,
}) => (
  <div>
    <form
      onSubmit={ handleSubmit(updateConfig) }
    >
      <Box>
        <Field
          component={ Input }
          label="rpc url"
          name="rpcurl"
        />
      </Box>
      <Box>
        <Field
          component={ Input }
          label="rpc username"
          name="rpcuser"
        />
      </Box>
      <Box>
        <Field
          component={ Input }
          label="rpc password"
          name="rpcpass"
          props={{
            type: 'password',
          }}
        />
      </Box>
      <Box>
        <BasicBtn
          label="update"
          type="submit"
          disabled={ syncErrors == null && (pristine || submitting) }
        />
      </Box>
    </form>
  </div>
);

const Connected = connectf(
  'configForm', actionDefs,
)(Config);

export default reduxForm({
  form: 'configForm',
  destroyOnUnmount: false,
  initialValues: initialConfigValues,
  // validate,
})(withStyles(styles)(Connected));
