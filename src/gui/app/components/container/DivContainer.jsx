import React from 'react';
import { withStyles, styles } from 'gui/app/style';


const DivContainer = ({ children, classes }) => (
  <div className={ classes.container }>
    { children }
  </div>
);

export default withStyles(styles)(DivContainer);
