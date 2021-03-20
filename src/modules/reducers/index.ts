import { combineReducers } from 'redux'

import { userReducer } from './user'

export * from './user'

export const rootReducer = combineReducers({
  user: userReducer,
})
