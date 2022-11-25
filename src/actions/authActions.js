// Create Redux action types
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'

export const GET_LOGIN = 'GET_LOGIN'
export const GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS'
export const GET_LOGIN_FAILURE = 'GET_LOGIN_FAILURE'
export const GET_LOGOUT = 'GET_LOGOUT'


// Create Redux action creators that return an action
export const registerSuccess = user => ({
  type: REGISTER_SUCCESS,
  payload: user,
})

export const getLogin = () => ({
  type: GET_LOGIN,
})

export const getLoginSuccess = (data) => ({
  type: GET_LOGIN_SUCCESS,
  payload: data,
})

export const getLoginFailure = () => ({
  type: GET_LOGIN_FAILURE,
})

export const getLogout = () => ({
  type: GET_LOGOUT,
})

// regiser action
export function registerUser(data) {
  return async (dispatch) => {
    dispatch(registerSuccess(data))
  }
}

// Combine them all Login actions
export function loginUser(data) {
  return async (dispatch) => {
    dispatch(getLogin())

    try {
      dispatch(getLoginSuccess(data))
    } catch (error) {
      dispatch(getLoginFailure())
    }
  }
}

export function logoutUser() {
  return async (dispatch) => {
    dispatch(getLogout())
  }
}