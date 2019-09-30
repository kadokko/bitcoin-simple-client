import {
  required, isHex, isHexOrSpace, isCurrency,
  isAlphaNumericUnderscoreOrWhiteSpace, bytelen,
  amountRange, filterErrors,
} from 'gui/app/validator/field';


export const isTxid = value => (
  filterErrors([ required(value), isHex(value), bytelen(value, 32) ])
);

export const isScriptSig = value => (
  // standard tx
  // filterErrors([ required(value), isHexOrSpace(value) ])
  // segwit tx
  filterErrors([ isHexOrSpace(value) ])
);

export const isAmount = value => (
  filterErrors([ required(value), isCurrency(value), amountRange(value) ])
);

export const isScript = value => (
  // standard tx
  // filterErrors([ required(value), isAlphaNumericUnderscoreOrWhiteSpace(value) ])
  // segwit tx
  filterErrors([ isAlphaNumericUnderscoreOrWhiteSpace(value) ])
);

//---------------------------------
// validator for form fields
//---------------------------------
// export const validator = (values) => {
export const validator = () => {
  const errors = {};
  return errors;
};
