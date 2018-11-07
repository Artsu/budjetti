import { combineReducers } from 'redux'
import entriesReducer from './entries/entriesReducer'
import categoriesReducer from './categories/categoriesReducer'
import budgetReducer from './budget/budgetReducer'

export default combineReducers({
  entries: entriesReducer,
  categories: categoriesReducer,
  budget: budgetReducer,
})