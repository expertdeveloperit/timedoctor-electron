import {
  UPDATE_TIMER,
  SAVE_TIME_LOG,
  UPDATE_STATUS
} from '../actions/tracker';
import moment from 'moment';

let initialState = {
  logs: [],
  totalhours: 0,
  timer: "00:00:00",
  playing: false,
  clock: 0
}
if (localStorage.getItem('reduxState')) {
  console.log('reduxState', JSON.parse(localStorage.getItem('reduxState')));
  initialState = JSON.parse(localStorage.getItem('reduxState'));
}
export default function tracker(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TIMER:
      initialState.clock = action.payload.clock;
      let newState = Object.assign({}, initialState, {
        timer: action.payload.time,
        clock: initialState.clock
      });
      localStorage.setItem('reduxState', JSON.stringify(newState));
      return newState;
    case SAVE_TIME_LOG:
      state.logs.push({
        timestamp: action.payload.timestamp,
        operation: action.payload.operation,
        uuid: action.payload.uuid
      });
      if (action.payload.operation == "start") {
        initialState.playing = true;
      } else {
        initialState.playing = false;
      }
      let updatedLog = Object.assign({}, initialState, {
        playing: initialState.playing
      });
      localStorage.setItem('reduxState', JSON.stringify(updatedLog));
      return updatedLog;
    case UPDATE_STATUS:
      const updatedStatus = Object.assign({}, initialState, {
        status: action.payload.status
      });
      localStorage.setItem('reduxState', JSON.stringify(newState));
      return updatedStatus;
    default:
      return state;
  }
}
