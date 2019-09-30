import React from 'react';
import { TableCell } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';


const HeaderCell = ({ classes, children }) => (
  <TableCell
    className={ classes.headerCell }
    component="th"
    scope="row"
  >
    { children }
  </TableCell>
);

export default withStyles(styles)(HeaderCell);
