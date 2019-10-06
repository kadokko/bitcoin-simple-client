import React from 'react';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';


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
