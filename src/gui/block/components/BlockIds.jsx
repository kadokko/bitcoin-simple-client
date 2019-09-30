import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Table, TableHead, TableBody, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { DivContainer } from 'gui/app/components/container';
import { StrCell } from 'gui/app/components/table';
import { styles } from 'gui/app/style/Styles';


const BlockIds = ({ blockIds, classes }) => (
  <DivContainer>
    <Paper className={ classes.blockIdsPaper }>
      <Table className={ classes.blockIdsTable }>
        <TableHead>
          { blockIds && blockIds.length !== 0 && (
            <TableRow>
              <StrCell>Block ID</StrCell>
            </TableRow>
          )}
        </TableHead>
        <TableBody>
          { blockIds && blockIds.map(blockId => (
            <TableRow key={ blockId }>
              <StrCell>
                { blockId }
              </StrCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </DivContainer>
);

BlockIds.propTypes = {
  blockIds: PropTypes.arrayOf(PropTypes.string),
};

export default withStyles(styles)(BlockIds);
