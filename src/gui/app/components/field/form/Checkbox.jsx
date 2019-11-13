import React from 'react';
import { FormControl, FormControlLabel, FormGroup, Checkbox as Cbox } from '@material-ui/core';
import { withStyles, styles } from 'gui/app/style';


const CheckboxComponent = ({ label, checked, onChange }) => (
  <FormControlLabel
    control={(
      <Cbox
        value={ label }
        checked={ checked }
        onChange={ onChange }
        color="primary"
      />
    )}
    label={ label }
  />
);

const CheckboxGroupComponent = ({ row=true, children }) => (
  <FormControl
    component="fieldset"
  >
    <div style={{ width: 400 }}>
      <FormGroup row={ row }>
        { children }
      </FormGroup>
    </div>
  </FormControl>
);

export const Checkbox = withStyles(styles)(CheckboxComponent);
export const CheckboxGroup = withStyles(styles)(CheckboxGroupComponent);
