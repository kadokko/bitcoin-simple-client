import React from 'react';
import classNames from 'classnames';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';


const Input = ({ label, value, defaultValue, inputRef, readOnly=false, maxLength, classes, onChange }) => (
  <TextField
    label={ label }
    value={ value }
    defaultValue={ defaultValue }
    inputRef={ inputRef }
    className={ classes.input }
    inputProps={{
      className: classNames({
        [classes.inputBase]: true,
        [classes.inputReadOnly]: readOnly,
      }),
      readOnly,
      maxLength,
      spellCheck: false,
    }}
    InputLabelProps={{
      shrink: true,
    }}
    multiline={ false }
    rows={ 1 }
    rowsMax={ 1 }
    variant="outlined"
    margin="none"
    fullWidth={ false }
    onChange={ onChange }
  />
);

export default withStyles(styles)(Input);
