import React from 'react';
import { Icon } from '@material-ui/core';
import { withStyles, styles } from 'gui/app/style';


const IconStyle = ({ size='small', onClick, children }) => (
  <Icon
    size={ size }
    style={{ fontSize: 30 }}
    onClick={ onClick }
    color="primary"
    variant="contained"
  >
    { children }
  </Icon>
);

export default withStyles(styles)(IconStyle);
