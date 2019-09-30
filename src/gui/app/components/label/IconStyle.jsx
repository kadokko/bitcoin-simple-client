import React from 'react';
import { Icon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';


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
