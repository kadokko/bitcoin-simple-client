import React from 'react';
import { withStyles, styles } from 'gui/app/style';
import { InfoIcon, ErrorIcon } from 'gui/app/components/icon';


const infoMessage = ({ classes, children }) => (
  children
    ? (
      <div className={ classes.messageInfo }>
        <InfoIcon />
        &nbsp;
        { children }
      </div>
    )
    : <span />
);
export const InfoMessage = withStyles(styles)(infoMessage);

const errorMessage = ({ classes, children }) => (
  children
    ? (
      <div className={ classes.messageError }>
        <ErrorIcon />
        &nbsp;
        { children }
      </div>
    )
    : <span />
);
export const ErrorMessage = withStyles(styles)(errorMessage);
