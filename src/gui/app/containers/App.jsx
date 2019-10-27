import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@material-ui/core';
import { TabContainer } from 'gui/app/components/container';
import { VpnKeyIcon, LockIcon, EditIcon, AddBoxIcon, SettingsIcon } from 'gui/app/components/icon';
import { styles } from 'gui/app/style/Styles';
import Key from 'gui/key/containers/Key';
import HdKey from 'gui/hdkey/containers/HdKey';
import Script from 'gui/script/containers/Script';
import EditorTxStandard from 'gui/editor-tx/containers/standard/EditorTxStandard';
import EditorTxSegwit from 'gui/editor-tx/containers/segwit/EditorTxSegwit';
import Block from 'gui/block/containers/Block';
import Config from 'gui/config/containers/Config';


const IconTab = withStyles(() => ({
  root: {
    width: 100,
  },
}))(Tab);


const App = ({ classes }) => {

  const defaultTabId = 0;
  const [ tabNo, setTabNo ] = useState(defaultTabId);

  return (
    <div className={ classes.appBar }>
      <AppBar position="static" color="default">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            <Tabs
              value={ tabNo }
              onChange={ (e, tabId) => setTabNo(tabId) }
              indicatorColor="primary"
              textColor="primary"
            >
              <IconTab
                label="Key"
                icon={<VpnKeyIcon />}
              />
              <IconTab
                label="Hd Key"
                icon={<VpnKeyIcon />}
              />
              <IconTab
                label="Utxo"
                icon={<LockIcon />}
              />
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
          <Key />
        </TabContainer>
      )}
      { tabNo === 1 && (
        <TabContainer>
          <HdKey />
        </TabContainer>
      )}
      { tabNo === 2 && (
        <TabContainer>
          <Script />
        </TabContainer>
      )}
      { tabNo === 3 && (
        <TabContainer>
          <EditorTxStandard />
        </TabContainer>
      )}
      { tabNo === 4 && (
        <TabContainer>
          <EditorTxSegwit />
        </TabContainer>
      )}
      { tabNo === 5 && (
        <TabContainer>
          <Block />
        </TabContainer>
      )}
      { tabNo === 6 && (
        <TabContainer>
          <Config />
        </TabContainer>
      )}
    </div>
  );
};

export default withStyles(styles)(App);
