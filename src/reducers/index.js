import { combineReducers } from 'redux'
import authReducer from './authReducer'
import launchReducer from './launchReducer'

import postsReducer from './postsReducer'

const rootReducer = combineReducers({
  posts: postsReducer,
  launch: launchReducer,
  auth: authReducer,
})

export default rootReducer