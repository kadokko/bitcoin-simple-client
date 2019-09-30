import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';


const BasicBtn = ({ label, onClick, type='button', size='medium', variant='contained', color='primary', disabled=false, classes }) => (
  <Button
    className={ classes.basicButton }
    type={ type }
    size={ size }
    variant={ variant }
    color={ color }
    disabled={ disabled }
    onClick={ onClick }
  >
    { label }
  </Button>
);

export default withStyles(styles)(BasicBtn);
