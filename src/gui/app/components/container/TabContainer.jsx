import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';


const TabContainer = ({ children, classes }) => (
  <Typography
    className={ classes.tabContainer }
    component="div"
  >
    { children }
  </Typography>
);

export default withStyles(styles)(TabContainer);
