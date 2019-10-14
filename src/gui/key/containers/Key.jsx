import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { BasicBtn } from 'gui/app/components/button';
import { Title } from 'gui/app/components/label';
import { styles } from 'gui/app/style/Styles';
import { Input, SelectField as Select } from 'gui/app/components/field/redux-form';
import { Box } from 'gui/app/components/layout';
import Seq from 'lib/util/Seq';
import * as actionDefs from '../actions/key';


const renderAddrAndKeys = ({ fields }) => (
  <div>
    { fields.map((field, index) => (
      <div key={`${field}.pubkey`}>
        <Box>
          <Title>
            key
            { index + 1 }
          </Title>
        </Box>
        <Box>
          <Field
            component={ Input }
            label="p2wpkh address"
            name={`${field}.address`}
            readOnly
          />
        </Box>
        <Box>
          <Field
            component={ Input }
            label="public key"
            name={`${field}.pubkey`}
            readOnly
          />
        </Box>
        <Box>
          <Field
            component={ Input }
            label="private key"
            name={`${field}.prvkey`}
            readOnly
          />
        </Box>
      </div>
    ))}
  </div>
);

const Key = ({
  forms: {
    values,
  },
  actions: {
    createAddrAndKeys,
  },
}) => (
  <form>
    <Box>
      <Title>
        key creator
      </Title>
    </Box>
    <Box>
      <Field
        component={ Select }
        label="num"
        name="num"
      >
        { Seq.generate(3).map((v) => (
          <MenuItem
            key={ 'keys' + v }
            value={ v + 1 }
          >
            { v + 1 }
          </MenuItem>
        ))}
      </Field>
      <BasicBtn
        label="create"
        type="button"
        onClick={ () => createAddrAndKeys(values.num) }
      />
    </Box>

    <FieldArray
      name="keys"
      component={ renderAddrAndKeys }
    />
  </form>
);

const Connected = connect(
  state => ({
    forms: state.form.keyForm,
  }),
  dispatch => ({
    actions: bindActionCreators(actionDefs, dispatch),
  }),
)(Key);

export default reduxForm({
  form: 'keyForm',
  destroyOnUnmount: false,
  // validate,
  initialValues: { num: 1 },
})(withStyles(styles)(Connected));
