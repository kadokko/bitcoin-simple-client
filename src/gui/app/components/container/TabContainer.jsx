import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles, styles } from 'gui/app/style';


const TabContainer = ({ children, classes }) => (
  <Typography
    className={ classes.tabContainer }
    component="div"
  >
    { children }
  </Typography>
);

export default withStyles(styles)(TabContainer);
