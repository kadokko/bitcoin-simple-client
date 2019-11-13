import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles, styles } from 'gui/app/style';


export const connected = (component, stateName, actionDefs) => {
  const Connected = connect(
    state => ({
      states: state[stateName],
      formStates: state.form[stateName + 'Form'],
      utxoStates: state[stateName + 'UtxoDialog'],
      sigStates: state.form[stateName + 'SigForm'],
    }),
    dispatch => ({
      actions: bindActionCreators(actionDefs, dispatch),
    }),
  )(component);
  return withStyles(styles)(Connected);
};
