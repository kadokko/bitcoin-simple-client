import React from 'react';
import { TableCell } from '@material-ui/core';


const StrCell = ({ classes, children }) => (
  <TableCell
    classes={ classes }
  >
    { children }
  </TableCell>
);

export default StrCell;
