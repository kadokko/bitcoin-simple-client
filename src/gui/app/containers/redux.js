import { bindActionCreators } from 'redux';
import { connect as conn } from 'react-redux';


const mapStateToProps = name => state => ({
  states: state[name],
});

const mapFormStateToProps = name => state => ({
  forms: state.form[name],
});

const mapDispatchToProps = actionDefs => dispatch => ({
  actions: bindActionCreators(actionDefs, dispatch),
});

export const connect = (name, actions) => (
  conn(
    name != null ? mapStateToProps(name) : null,
    actions != null ? mapDispatchToProps(actions) : null,
  )
);

export const connectf = (name, actions) => (
  conn(
    name != null ? mapFormStateToProps(name) : null,
    actions != null ? mapDispatchToProps(actions) : null,
  )
);
