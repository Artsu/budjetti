import {RECEIVE_BUDGET, SET_BUDGET_FOR_CATEGORY} from '../constants'
import budgetDb from './budgetDb'

const loadBudgetFromDb = () => {
  return async (dispatch) => {
    const budget = await budgetDb.getAll()
    dispatch({
      type: RECEIVE_BUDGET,
      payload: budget,
    })
  }
}

const addOrUpdateBudgetForCategory = (budgetForCategory) => {
  return async (dispatch) => {
    await budgetDb.set(budgetForCategory)

    dispatch({
      type: SET_BUDGET_FOR_CATEGORY,
      payload: budgetForCategory,
    })
  }
}

export {
  loadBudgetFromDb,
  addOrUpdateBudgetForCategory,
}
