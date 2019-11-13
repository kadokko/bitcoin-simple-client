import React from 'react';
import { Field } from 'redux-form';
import { withStyles, styles } from 'gui/app/style';


const MarkField = ({ name, classes }) => (
  <Field
    name={ name }
    type="text"
    disabled
    component={ field => (
      <div>
        {
          field.input.value === ''
            ? '' : (
              <div className={ classes.markField }>
                { field.input.value }
              </div>
            )
        }
      </div>
    )}
  />
);

export default withStyles(styles)(MarkField);
