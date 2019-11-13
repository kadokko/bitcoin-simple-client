import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Table, TableHead, TableBody, TableRow, TablePagination } from '@material-ui/core';
import { DivContainer } from 'gui/app/components/container';
import { StrCell } from 'gui/app/components/table';
import { withStyles, styles } from 'gui/app/style';


const BlockIds = ({ blockIds, classes }) => {

  // pagination
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage ] = useState(10);
  const handleChangePage = (e, p) => setPage(p);

  return (
    <DivContainer>
      <Paper className={ classes.blockIdsPaper }>
        <Table className={ classes.blockIdsTable }>
          <TableHead>
            { blockIds && blockIds.length > 0 && (
              <TableRow>
                <StrCell>Block Hash</StrCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            { blockIds && blockIds.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map(blockId => (
              <TableRow key={ blockId }>
                <StrCell>
                  { blockId }
                </StrCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        { blockIds && blockIds.length > 10 && (
          <TablePagination
            count={ blockIds.length }
            page={ page }
            rowsPerPage={ rowsPerPage }
            rowsPerPageOptions={ [ rowsPerPage ] }
            onChangePage={ handleChangePage }
            component="div"
          />
        )}
      </Paper>
    </DivContainer>
  );
};

BlockIds.propTypes = {
  blockIds: PropTypes.arrayOf(PropTypes.string),
};

export default withStyles(styles)(BlockIds);
