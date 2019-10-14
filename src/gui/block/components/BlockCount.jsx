import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Input as input } from 'gui/app/components/field/form';
import { styles } from 'gui/app/style/Styles';


const Input = withStyles(() => ({
  input: {
    width: 150,
  },
}))(input);

const BlockCount = ({ value }) => (
  <Input
    label="block height"
    value={ value }
    readOnly
  />
);

export default withStyles(styles)(BlockCount);
