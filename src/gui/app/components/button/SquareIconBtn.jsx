import React from 'react';
import { Button, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';


const SquareIconBtn = ({ label, onClick, disabled=false, children, classes }) => (
  <span>
    {label ? (
      <Tooltip
        placement="right"
        title={ label }
        className={ classes.tooltip }
      >
        <div style={{ display: 'inline' }}>
          <Button
            variant="contained"
            color="primary"
            className={ classes.squareButton }
            onClick={ onClick }
            disabled={ disabled }
          >
            { children }
          </Button>
        </div>
      </Tooltip>
    ) : (
      <Button
        variant="contained"
        color="primary"
        className={ classes.squareButton }
        onClick={ onClick }
      >
        { children }
      </Button>
    )}
  </span>
);

export default withStyles(styles)(SquareIconBtn);
