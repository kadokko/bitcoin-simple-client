import React from 'react';
import { withStyles, styles } from 'gui/app/style';


const MsgTip = ({ children, classes }) => (
  <div>
    { children && (
      <div className={ classes.msgTip }>
        { children }
      </div>
    )}
  </div>
);

export default withStyles(styles)(MsgTip);
