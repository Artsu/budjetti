import { combineReducers } from 'redux'
import entriesReducer from './entries/entriesReducer'

export default combineReducers({
  entries: entriesReducer,
})