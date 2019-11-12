import React from 'react';
import { reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';
import { connectf } from 'gui/app/containers/redux';
import { Box } from 'gui/app/components/layout';
import { ErrorMessage as errorMessage } from 'gui/app/components/message';
import { initialValues } from './InitialValues';


const ErrorMessage = withStyles(() => ({
  messageError: {
    marginLeft: 10,
    marginRight: 10,
    width: 600,
  },
}))(errorMessage);


const Message = ({
  forms: {
    values,
  },
}) => (
  <div>
    <form>
      <Box>
        <ErrorMessage>
          { values.errors }
        </ErrorMessage>
      </Box>
    </form>
  </div>
);

const Connected = connectf(
  'appForm', null,
)(Message);

export default reduxForm({
  form: 'appForm',
  destroyOnUnmount: true,
  initialValues,
  // validate,
})(withStyles(styles)(Connected));
