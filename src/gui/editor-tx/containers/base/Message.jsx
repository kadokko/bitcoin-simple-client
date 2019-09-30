import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { InfoMessage as infoMessage, ErrorMessage as errorMessage } from 'gui/app/components/message';


export const InfoMessage = withStyles(() => ({
  messageInfo: {
    width: 844,
  },
}))(infoMessage);

export const ErrorMessage = withStyles(() => ({
  messageError: {
    width: 844,
  },
}))(errorMessage);


export const Message = ({ pristine, ret, error }) => (
  <span>
    <InfoMessage>
      { !pristine && ret ? 'your transaction has been sent successfully' : undefined }
    </InfoMessage>
    <ErrorMessage>
      { !pristine && error && error.message }
    </ErrorMessage>
  </span>
);
