import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles, styles } from 'gui/app/style';


const Title = ({ variant='h6', color='primary', gutterBottom=true, children }) => (
  <Typography
    variant={ variant }
    color={ color }
    gutterBottom={ gutterBottom }
  >
    { children }
  </Typography>
);

export default withStyles(styles)(Title);
