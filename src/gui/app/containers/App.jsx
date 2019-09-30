import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@material-ui/core';
import { TabContainer } from 'gui/app/components/container';
import { EditIcon, AddBoxIcon, SettingsIcon, VpnKeyIcon } from 'gui/app/components/icon';
import { Div } from 'gui/app/components/base';
import { styles } from 'gui/app/style/Styles';
import BitcoinHdKey from 'gui/hdkey/containers/BitcoinHdKey';
import EditorTxStandard from 'gui/editor-tx/containers/standard/EditorTxStandard';
import EditorTxSegwit from 'gui/editor-tx/containers/segwit/EditorTxSegwit';
import Block from 'gui/block/containers/Block';
import Config from 'gui/config/containers/Config';


const IconTab = withStyles(() => ({
  root: {
    width: 100,
  },
}))(Tab);

const AppName = withStyles(() => ({
  root: {
    marginBottom: 10,
  },
}))(Div);

const App = ({ classes }) => {

  const defaultTabId = 0;
  const [ tabNo, setTabNo ] = useState(defaultTabId);

  return (
    <div className={ classes.appBar }>
      <AppBar position="static" color="default">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            <AppName>
              Bitcoin Simple Client
            </AppName>
            <Tabs
              value={ tabNo }
              onChange={ (e, tabId) => setTabNo(tabId) }
              indicatorColor="primary"
              textColor="primary"
            >
              <IconTab
                label="Std Tx"
                icon={<EditIcon />}
              />
              <IconTab
                label="Segwit Tx"
                icon={<EditIcon />}
              />
              <IconTab
                label="Block"
                icon={<AddBoxIcon />}
              />
              {/*
              <IconTab
                label="Block"
                icon={<SearchIcon />}
              />
              */}
              <IconTab
                label="Hd Key"
                icon={<VpnKeyIcon />}
              />
              <IconTab
                label="Settings"
                icon={<SettingsIcon />}
              />
              {/*
              <IconTab
                label="Network"
                icon={<FlashOnIcon />}
              />
              */}
            </Tabs>
          </Typography>
        </Toolbar>
      </AppBar>

      { tabNo === 0 && (
        <TabContainer>
          <EditorTxStandard />
        </TabContainer>
      )}
      { tabNo === 1 && (
        <TabContainer>
          <EditorTxSegwit />
        </TabContainer>
      )}
      { tabNo === 2 && (
        <TabContainer>
          <Block />
        </TabContainer>
      )}
      { tabNo === 3 && (
        <TabContainer>
          <BitcoinHdKey />
        </TabContainer>
      )}
      { tabNo === 4 && (
        <TabContainer>
          <Config />
        </TabContainer>
      )}
    </div>
  );
};

export default withStyles(styles)(App);
