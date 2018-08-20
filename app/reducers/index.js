// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import tracker from './tracker';

const rootReducer = combineReducers({
  tracker,
  router
});

export default rootReducer;
