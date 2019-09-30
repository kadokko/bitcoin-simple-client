import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';
import { Typography } from '@material-ui/core';


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
