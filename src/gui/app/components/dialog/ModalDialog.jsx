import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { BasicBtn } from 'gui/app/components/button';
import { withStyles, styles } from 'gui/app/style';


const ModalDialog = ({ title, isDialogOpen, closeDialog, children }) => (
  <Dialog
    open={ isDialogOpen }
    maxWidth="md"
  >
    <DialogTitle>
      { title }
    </DialogTitle>
    <DialogContent>
      { children }
    </DialogContent>
    <DialogActions>
      <BasicBtn
        label="Close"
        variant="outlined"
        onClick={ () => closeDialog() }
      />
    </DialogActions>
  </Dialog>
);

ModalDialog.propTypes = {
  title: PropTypes.string.isRequired,
  isDialogOpen: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
};

export default withStyles(styles)(ModalDialog);
