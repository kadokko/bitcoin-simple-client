import React from 'react';
import classNames from 'classnames';
import { TextField } from '@material-ui/core';
import { withStyles, styles } from 'gui/app/style';


const InputField = ({
  label, type='text', placeholder, inputRef, readOnly=false, multiline=false, rows=1, rowsMax=1,
  input, custom, classes, meta: { touched, invalid, error },
}) => (
  <TextField
    label={ label }
    type={ type }
    placeholder={ placeholder }
    inputRef={ inputRef }
    error={ touched && invalid }
    helperText={ touched && error }
    className={ error == null ? classes.inputField : classes.inputFieldError }
    inputProps={{
      className: classNames({
        [classes.inputFieldBase]: true,
        [classes.inputFieldReadOnly]: readOnly,
        [classes.textAreaFieldBase]: multiline,
      }),
      readOnly,
      spellCheck: false,
    }}
    multiline={ multiline }
    rows={ rows }
    rowsMax={ rowsMax }
    variant="outlined"
    margin="none"
    fullWidth={ false }
    InputLabelProps={{
      shrink: true,
    }}
    {...input}
    {...custom}
  />
);

export default withStyles(styles)(InputField);
