// Create Redux action types
export const GET_LAUNCH_SUCCESS = 'GET_LAUNCH_SUCCESS'

export const getlaunchSuccess = launch => ({
  type: GET_LAUNCH_SUCCESS,
  payload: launch,
})

// Combine them all in an asynchronous thunk
export function fetchLaunch(data) {
  return async (dispatch) => {
    dispatch(getlaunchSuccess(data))
  }
}