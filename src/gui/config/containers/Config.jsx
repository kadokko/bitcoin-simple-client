import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';
import { Input as InputField } from 'gui/app/components/field/form';
import * as actionDefs from '../actions/config';
import { RpcSwitch } from '../components/Switch';


const Input = withStyles(() => ({
  inputBase: {
    padding: '18.5px 14px',
  },
  inputFieldBase: {
    marginTop: 10,
    marginBottom: 4,
  },
}))(InputField);

const Area = withStyles(() => ({
  root: {
    marginTop: 5,
    marginBottom: 5,
  },
}))(Box);


const Config = ({
  states: {
    rpcurl,
    rpcuser,
    rpcpass,
  },
  actions: {
    changeBtcNode,
  },
}) => (
  <div>
    <Area mb={1}>
      <RpcSwitch
        changeBtcNode={ changeBtcNode }
      />
    </Area>
    <Area mb={1}>
      <Input
        label="rpc url"
        name="rpcurl"
        value={ rpcurl }
        readOnly
      />
    </Area>
    <Area mb={1}>
      <Input
        label="rpc username"
        name="rpcuser"
        value={ rpcuser }
        readOnly
      />
    </Area>
    <Area mb={1}>
      <Input
        label="rpc password"
        name="rpcpass"
        value={ rpcpass }
        type="password"
        readOnly
      />
    </Area>
  </div>
);

const Connected = connect(
  state => ({
    states: state.config,
  }),
  dispatch => ({
    actions: bindActionCreators(actionDefs, dispatch),
  }),
)(Config);

export default withStyles(styles)(Connected);
