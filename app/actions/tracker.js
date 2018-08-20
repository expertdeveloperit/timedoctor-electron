export const UPDATE_TIMER = 'UPDATE_TIMER';
export const SAVE_TIME_LOG = 'SAVE_TIME_LOG';


export function saveTimeLog(payload) {
  return {
    type: SAVE_TIME_LOG,
    payload: payload
  };
}

export function updateTimer(payload) {
  return {
    type: UPDATE_TIMER,
    payload: payload
  };
}

export function updateStatus(payload) {
  return {
    type: UPDATE_STATUS,
    payload: payload
  };
}
