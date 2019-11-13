import React, { useEffect } from 'react';
import { connect } from 'gui/app/containers/redux';
import { withStyles } from 'gui/app/style';
import { BasicBtn as basicBtn } from 'gui/app/components/button';
import { Margin } from 'gui/app/components/layout';
import * as actionDefs from '../actions/block';
import BlockCount from '../components/BlockCount';
import BlockIds from '../components/BlockIds';


const BasicBtn = withStyles(() => ({
  basicButton: {
    lineHeight: 1.5,
    marginTop: 8,
    marginLeft: 5,
    paddingRight: 5,
    paddingLeft: 5,
    height: 38,
  },
}))(basicBtn);


const Block = ({ states, actions }) => {

  useEffect(() => {
    actions.getBlockCount();
    // eslint-disable-next-line
  }, [ states.blockCount ]);

  return (
    <div>
      <span>
        <BlockCount
          value={ states.blockCount }
        />
      </span>
      <span>
        <BasicBtn
          label="+1"
          onClick={ () => actions.generateBlocks(1) }
        />
        <BasicBtn
          label="+100"
          onClick={ () => actions.generateBlocks(100) }
        />
        <BasicBtn
          label="refresh"
          onClick={ () => actions.getBlockCount() }
        />
      </span>
      <Margin />
      <BlockIds
        blockIds={ states.blockIds }
      />
    </div>
  );
};

export default connect(
  'block', actionDefs,
)(Block);
