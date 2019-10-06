import { withStyles } from '@material-ui/core/styles';
import InputField from './InputField';


export const Input = withStyles(() => ({
  inputFieldBase: {
    height: '40px',
  },
}))(InputField);
