import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Div } from 'gui/app/components/base';
import * as actionDefs from '../actions/block';
import BlockIds from '../components/BlockIds';
import Num from '../components/Num';


const Margin = withStyles(() => ({
  root: {
    height: 20,
  },
}))(Div);

const Block = ({ states, actions }) => (
  <div>
    <Num
      generateBlocks={ actions.generateBlocks }
    />

    <Margin />

    <BlockIds
      blockIds={ states.blockIds }
    />
  </div>
);

Block.propTypes = {
  states: PropTypes.PropTypes.shape({
    blockIds: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default connect(
  state => ({
    states: state.block,
  }),
  dispatch => ({
    actions: bindActionCreators(actionDefs, dispatch),
  }),
)(Block);
