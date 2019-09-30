import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';
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

const Area = withStyles(() => ({
  root: {
    marginTop: 15,
    marginBottom: 15,
  },
}))(Box);


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
      <Area mb={1}>
        <Field
          component={ Input }
          label="rpc url"
          name="rpcurl"
        />
      </Area>
      <Area mb={1}>
        <Field
          component={ Input }
          label="rpc username"
          name="rpcuser"
        />
      </Area>
      <Area mb={1}>
        <Field
          component={ Input }
          label="rpc password"
          name="rpcpass"
          props={{
            type: 'password',
          }}
        />
      </Area>
      <Area mb={1}>
        <BasicBtn
          label="update"
          type="submit"
          disabled={ syncErrors == null && (pristine || submitting) }
        />
      </Area>
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
