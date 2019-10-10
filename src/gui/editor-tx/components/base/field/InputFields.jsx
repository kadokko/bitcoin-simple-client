import React from 'react';
import { Field } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { InputField as Input, MarkField as Mark, TextAreaField as TextArea } from 'gui/app/components/field/redux-form';
import { ActionIcon } from 'gui/app/components/label';
import { Form, FormLabel, FormInput } from '../layout/Forms';
import { LabelField as Label, CurrencyField } from './Fields';


const FormField = ({ label, mark='', func, icon, readonly=false, children }) => (
  <Form>
    <FormLabel>
      <Label
        text={ label }
        readonly={ readonly }
      />
      <ActionIcon
        func={ func }
        icon={ icon }
      />
      <Mark
        name={ mark }
      />
    </FormLabel>
    <FormInput>
      { children }
    </FormInput>
  </Form>
);

export const TextInputField = ({ label, readonly=false, name, type='text', placeholder='', validator, onBlur }) => (
  <FormField
    label={ label }
    readonly={ readonly }
  >
    <Field
      component={ Input }
      name={ name }
      type={ type }
      disabled={ readonly }
      placeholder={ placeholder }
      validate={ validator }
      onBlur={ onBlur }
    />
  </FormField>
);

const SatoshiField = withStyles(() => ({
  inputField: {
    width: '400px',
  },
  inputFieldError: {
    width: '400px',
  },
}))(Input);

const BtcField = withStyles(() => ({
  inputField: {
    width: '200px',
  },
  inputFieldError: {
    width: '200px',
  },
}))(Input);

export const CurrencyInputField = ({ label, name, type='text', readonly=false, placeholder='', validator, onBlur }) => (
  <FormField
    label={ label }
    readonly={ readonly }
  >
    <span>
      <CurrencyField
        name={ name }
        type={ type }
        component={ SatoshiField }
        readonly={ readonly }
        placeholder={ placeholder }
        validator={ validator }
        onBlur={ onBlur }
      />
      <CurrencyField
        name={ name + 'Btc' }
        type={ type }
        component={ BtcField }
        readonly
      />
    </span>
  </FormField>
);

export const TextAreaField = ({ label, mark='', func, icon, readonly=false, name, type='text', placeholder='', validator, component=TextArea }) => (
  <FormField
    label={ label }
    mark={ mark }
    func={ func }
    icon={ icon }
    readonly={ readonly }
  >
    <Field
      component={ component }
      name={ name }
      type={ type }
      disabled={ readonly }
      placeholder={ placeholder }
      props={{
        readOnly: readonly,
      }}
      validate={ validator }
    />
  </FormField>
);

export const TextAreaWithAssistField = ({ label, readonly=false, name, type='text', placeholder='', validator, component, onChange }) => (
  <FormField
    label={ label }
    readonly={ readonly }
  >
    <Field
      component={ component }
      name={ name }
      type={ type }
      disabled={ readonly }
      placeholder={ placeholder }
      props={{
        readOnly: readonly,
      }}
      validate={ validator }
      onChange={ onChange }
    />
  </FormField>
);
