import React from 'react';
import { TableCell } from '@material-ui/core';


const NumCell = ({ classes, children }) => (
  <TableCell
    classes={ classes }
    align="right"
  >
    { children }
  </TableCell>
);

export default NumCell;
