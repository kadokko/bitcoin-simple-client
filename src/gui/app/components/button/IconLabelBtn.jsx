import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';


const IconLabelBtn = ({ label, onClick, type='button', size='medium', children, classes }) => (
  <Button
    className={ classes.button }
    onClick={ onClick }
    type={ type }
    size={ size }
    variant="contained"
    color="primary"
  >
    { label }
    { children }
  </Button>
);

export default withStyles(styles)(IconLabelBtn);
