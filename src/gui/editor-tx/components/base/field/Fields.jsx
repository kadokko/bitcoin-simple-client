import React from 'react';
import { Field } from 'redux-form';
import { InputField } from 'gui/app/components/field/redux-form';
import { readOnlyTextColor } from 'gui/app/style/Styles';
import Currency from 'lib/util/Currency';


export const LabelField = ({ readonly=false, text='' }) => (
  <span style={ readonly ? { color: readOnlyTextColor } : {} }>
    { text }
  </span>
);

export const CurrencyField = ({ name, type='text', readonly=false, placeholder='', validator, onBlur, component=InputField }) => (
  <Field
    name={ name }
    type={ type }
    disabled={ readonly }
    placeholder={ placeholder }
    component={ component }
    props={{
      readOnly: readonly,
    }}
    format={ Currency.format }
    normalize={ Currency.normalize }
    validate={ validator }
    onBlur={ onBlur }
    onChange={(e, newValue, prevValue) => {
      const isInput = (newValue.length - prevValue.length) > 0;
      const isDelete = (prevValue.length - newValue.length) > 0;
      const target = e.target;
      const position = target.selectionStart;
      const prePart = Currency.format(newValue).slice(0, position);
      const pre1stCommaNumLen = prePart.slice(0, prePart.indexOf(',')).length;
      let newPosition = position;
      if (isInput && pre1stCommaNumLen === 1) {
        newPosition += 1;
      }
      if (isDelete && pre1stCommaNumLen === 3) {
        newPosition -= 1;
      }
      window.requestAnimationFrame(() => {
        target.selectionStart = newPosition;
        target.selectionEnd = newPosition;
      });
    }}
  />
);
