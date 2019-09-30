import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';
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
