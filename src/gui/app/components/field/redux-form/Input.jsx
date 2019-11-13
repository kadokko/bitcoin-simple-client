import { withStyles } from 'gui/app/style';
import InputField from './InputField';


export const Input = withStyles(() => ({
  inputFieldBase: {
    height: '40px',
  },
}))(InputField);
