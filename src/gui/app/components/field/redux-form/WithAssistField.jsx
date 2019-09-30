import React from 'react';
import classNames from 'classnames';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';


const WithAssistField = ({
  label, placeholder, readOnly=false, multiline=false, rows=1, rowsMax=1,
  onFocus, onChange, input, custom, classes,
  meta: { touched, invalid, error },
}) => (
  <TextField
    label={ label }
    placeholder={ placeholder }
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
    { ...input }
    { ...custom }
    onFocus={ onFocus }
    onChange={ onChange }
  />
);

export default withStyles(styles)(WithAssistField);
