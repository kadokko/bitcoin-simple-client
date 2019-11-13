import React from 'react';
import classNames from 'classnames';
import { TextField } from '@material-ui/core';
import { withStyles, styles } from 'gui/app/style';


const TextArea = ({ label, value, inputRef, readOnly=false, rows=4, rowsMax=4, classes }) => (
  <TextField
    label={ label }
    value={ value }
    inputRef={ inputRef }
    multiline
    rows={ rows }
    rowsMax={ rowsMax }
    className={ classes.textArea }
    inputProps={{
      className: classNames({
        [classes.textAreaBase]: true,
        [classes.textAreaReadOnly]: readOnly,
      }),
      readOnly: { readOnly },
      spellCheck: false,
    }}
    variant="outlined"
    margin="none"
    fullWidth={ false }
    InputLabelProps={{
      shrink: true,
    }}
  />
);

export default withStyles(styles)(TextArea);
