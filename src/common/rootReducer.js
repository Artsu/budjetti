import { combineReducers } from 'redux'
import entriesReducer from './entries/entriesReducer'
import categoriesReducer from './categories/categoriesReducer'

export default combineReducers({
  entries: entriesReducer,
  categories: categoriesReducer,
})