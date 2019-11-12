import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';
import { connect } from 'gui/app/containers/redux';
import { Input as InputField } from 'gui/app/components/field/form';
import { Box } from 'gui/app/components/layout';
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
    <Box>
      <RpcSwitch
        changeBtcNode={ changeBtcNode }
      />
    </Box>
    <Box>
      <Input
        label="rpc url"
        name="rpcurl"
        value={ rpcurl }
        readOnly
      />
    </Box>
    <Box>
      <Input
        label="rpc username"
        name="rpcuser"
        value={ rpcuser }
        readOnly
      />
    </Box>
    <Box>
      <Input
        label="rpc password"
        name="rpcpass"
        value={ rpcpass }
        type="password"
        readOnly
      />
    </Box>
  </div>
);


const Connected = connect(
  'config', actionDefs,
)(Config);

export default withStyles(styles)(Connected);
