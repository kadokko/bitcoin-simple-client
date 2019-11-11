import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';
import { Box } from 'gui/app/components/layout';
import { ErrorMessage as errorMessage } from 'gui/app/components/message';


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

const Connected = connect(
  state => ({
    forms: state.form.appForm,
  }),
  () => ({
  }),
)(Message);

export default reduxForm({
  form: 'appForm',
  destroyOnUnmount: true,
  // validate,
  initialValues: { errors: '' },
})(withStyles(styles)(Connected));
