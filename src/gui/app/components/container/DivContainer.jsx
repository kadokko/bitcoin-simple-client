import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';


const DivContainer = ({ children, classes }) => (
  <div className={ classes.container }>
    { children }
  </div>
);

export default withStyles(styles)(DivContainer);
