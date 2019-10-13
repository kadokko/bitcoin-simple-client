import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';
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

const Connected = connect(
  state => ({
    forms: state.form.configForm,
  }),
  dispatch => ({
    actions: bindActionCreators(actionDefs, dispatch),
  }),
)(Config);

export default reduxForm({
  form: 'configForm',
  destroyOnUnmount: false,
  // validate,
  initialValues: initialConfigValues,
})(withStyles(styles)(Connected));
