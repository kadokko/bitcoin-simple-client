import React from 'react';
import { Icon, Tooltip } from '@material-ui/core';
import { withStyles, styles } from 'gui/app/style';


const SquareIconBtnMini = ({ label, size='small', onClick, children, classes }) => (
  <span>
    {label ? (
      <Tooltip
        placement="right"
        title={ label }
        className={ classes.tooltip }
      >
        <Icon
          className={ classes.iconHover }
          size={ size }
          style={{ fontSize: 30 }}
          onClick={ onClick }
          color="primary"
          variant="contained"
        >
          { children }
        </Icon>
      </Tooltip>
    ) : (
      <Icon
        className={ classes.iconHover }
        size={ size }
        style={{ fontSize: 30 }}
        onClick={ onClick }
        color="primary"
        variant="contained"
      >
        { children }
      </Icon>
    )}
  </span>
);

export default withStyles(styles)(SquareIconBtnMini);
