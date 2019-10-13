import React from 'react';
import { Box as BaseBox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';


const Box = ({ mb=1, classes, children }) => (
  <BaseBox
    mb={ mb }
    className={ classes.box }
  >
    { children }
  </BaseBox>
);

export default withStyles(styles)(Box);
