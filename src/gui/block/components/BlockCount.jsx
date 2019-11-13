import React from 'react';
import { Input as input } from 'gui/app/components/field/form';
import { withStyles, styles } from 'gui/app/style';


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
