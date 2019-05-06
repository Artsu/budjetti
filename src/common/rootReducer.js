import { combineReducers } from 'redux'
import entriesReducer from './entries/entriesReducer'
import categoriesReducer from './categories/categoriesReducer'
import budgetReducer from './budget/budgetReducer'
import uiReducer from './ui/uiReducer'

export default combineReducers({
  entries: entriesReducer,
  categories: categoriesReducer,
  budget: budgetReducer,
  ui: uiReducer,
})