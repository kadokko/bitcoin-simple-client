import Str from 'lib/util/Str';
import Validator from 'lib/util/Validator';

//---------------------------------
// validators for redux-form
//---------------------------------

const errs = {
  require: 'required.  ',
  type: {
    hex: 'must be a hexadecimal number.  ',
    positiveInt: 'must be a positive integer.  ',
    currency: 'must be a positive integer.  ',
    alphaNum: 'must be alphanumeric string.  ',
    alphaNumSpace: 'must be alphanumeric string or space.  ',
    alphaNumUsSpace: 'must be alphanumeric string or underscore or space.  ',
  },
  bytelen: 'must be {} bytes.  ',
  range: 'must be between {} and {}.  ',
};

export class Message {
  static get = (message, ...params) => (
    params.reduce((accumulator, current) => (accumulator.replace('{}', current)), message)
  )
}

export const filterErrors = errors => {
  const messages = errors.filter(error => error != null);
  return messages.length > 0 ? messages : undefined;
};

// required
export const required = value => (
  value && value.length !== 0 ? undefined : Message.get(errs.require)
);

// type
export const isHex = value => (
  !value || Validator.isHex(value) ? undefined : Message.get(errs.type.hex)
);

export const isHexOrSpace = value => (
  !value || Validator.isHex(Str.removeSpace(value)) ? undefined : Message.get(errs.type.hex)
);

export const isPositiveInt = value => (
  !value || Validator.isPositiveInt(value) ? undefined : Message.get(errs.type.positiveInt)
);

export const isCurrency = value => (
  !value || Validator.isCurrency(value) ? undefined : Message.get(errs.type.currency)
);

export const isAlphaNumeric = value => (
  !value || Validator.isAlphaNumeric(value) ? undefined : Message.get(errs.type.alphaNum)
);

export const isAlphaNumericOrSpace = value => (
  !value || Validator.isAlphaNumericOrSpace(value) ? undefined : Message.get(errs.type.alphaNumSpace)
);

export const isAlphaNumericUnderscoreOrWhiteSpace = value => (
  !value || Validator.isAlphaNumericUnderscoreWhiteSpace(value) ? undefined : Message.get(errs.type.alphaNumUsSpace)
);

// length
export const bytelen = (value, size) => (
  !value || Validator.isByteLen(value, size) ? undefined : Message.get(errs.bytelen, 32)
);

// range
export const amountRange = (value) => {
  const min = '0';
  const max = '18446744073709551615';
  if (!value) return undefined;
  const v = typeof value === 'number' ? value : Str.removeChar(value, ',');
  return !Validator.isInt(v) || Validator.range(v, min, max) ? undefined : Message.get(errs.range, min, max);
};
