import * as actions from '../actions/authActions'

export const initialState = {
  users: [],
  loading: false,
  hasErrors: false,
  isLoggedIn: false,
  currentUser: {},
  existingUser: false
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actions.REGISTER_SUCCESS:
      const userExist = state.users && state.users.find(user => user.email === action.payload.email)
      if (userExist && userExist.email === action.payload.email) {
        return { ...state, existingUser: true }
      }
      return { ...state, users: [...state.users, action.payload], existingUser: false }
    case actions.GET_LOGIN:
      return { ...state, loading: true }
    case actions.GET_LOGIN_SUCCESS:
      const existingUser = state.users.find(user => user.email === action.payload.email)
      if (existingUser && existingUser && existingUser.password === action.payload.password) {
        return { ...state, isLoggedIn: true, loading: false, hasErrors: false, currentUser: existingUser }
      }
      return { ...state, isLoggedIn: false, loading: false, hasErrors: true, currentUser: {} }
    case actions.GET_LOGIN_FAILURE:
      return { ...state, isLoggedIn: false, loading: false, hasErrors: true, currentUser: {} }
    case actions.GET_LOGOUT:
      return { ...state, isLoggedIn: false, loading: false, hasErrors: false, currentUser: {} }
    default:
      return state
  }
}