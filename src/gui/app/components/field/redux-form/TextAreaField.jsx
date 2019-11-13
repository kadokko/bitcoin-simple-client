import React from 'react';
import { withStyles, styles } from 'gui/app/style';
import { InputField } from 'gui/app/components/field/redux-form';


const TextAreaField = ({ rows=3, rowsMax=3, ...props }) => (
  <InputField
    {...props}
    multiline
    rows={ rows }
    rowsMax={ rowsMax }
  />
);

export default withStyles(styles)(TextAreaField);
