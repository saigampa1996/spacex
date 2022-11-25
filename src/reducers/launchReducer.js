import * as actions from '../actions/launchActions'

export const initialState = {
  launch: {}
}

export default function launchReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_LAUNCH_SUCCESS:
      console.log(action.payload)
      return { ...state, launch: action.payload }
    default:
      return state
  }
}