import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';


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
