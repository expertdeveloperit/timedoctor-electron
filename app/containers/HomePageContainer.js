import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HomePage from './HomePage';
import * as TrackerActions from '../actions/tracker';

function mapStateToProps(state) {
  return {
    tracker: state.tracker
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TrackerActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
