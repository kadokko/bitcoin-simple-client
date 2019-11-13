import React from 'react';
import { TextField } from '@material-ui/core';
import { withStyles, styles } from 'gui/app/style';


const SelectField = ({ label, variant='outlined', input, custom, classes, children }) => (
  <TextField
    label={ label }
    select
    variant={ variant }
    className={ classes.selectFieldBase }
    inputProps={{
      spellCheck: false,
    }}
    InputLabelProps={{
      shrink: true,
    }}
    {...input}
    {...custom}
  >
    { children }
  </TextField>
);

export default withStyles(styles)(SelectField);
