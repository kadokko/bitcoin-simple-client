import React, { useState } from 'react';
import { FormGroup, Grid, Switch as MuiSwitch } from '@material-ui/core';
import { withStyles } from 'gui/app/style';


const Switch = withStyles(() => ({
  root: {
    height: 33,
    paddingTop: 8,
    paddingBottom: 10,
  },
  thumb: {
    boxShadow: 'none',
  },
  switchBase: {
    color: '#5c6bc0',
    '&$checked': {
      color: '#4dd0e1',
    },
    '&$checked + $track': {
      backgroundColor: '#4dd0e1',
      opacity: 0.5,
    },
  },
  track: {
    backgroundColor: '#5c6bc0',
    opacity: 0.5,
  },
}))(MuiSwitch);


export const RpcSwitch = ({ changeBtcNode }) => {

  const [ checked, setChecked ] = useState(false);
  const handleChange = (e) => {
    setChecked(e.target.checked);
    changeBtcNode(e.target.checked ? 'node2' : 'node1');
  };

  return (
    <FormGroup>
      <Grid
        container
        alignItems="center"
      >
        <Grid item>
          node:1
        </Grid>
        <Grid item>
          <Switch
            checked={ checked }
            onChange={ e => handleChange(e) }
          />
        </Grid>
        <Grid item>
          node:2
        </Grid>
      </Grid>
    </FormGroup>
  );
};
