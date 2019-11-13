import React from 'react';
import { Box as BaseBox } from '@material-ui/core';
import { withStyles, styles } from 'gui/app/style';


const Box = ({ mb=1, classes, children }) => (
  <BaseBox
    mb={ mb }
    className={ classes.box }
  >
    { children }
  </BaseBox>
);

export default withStyles(styles)(Box);
