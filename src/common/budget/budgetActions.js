import {
  REPEATING_BUDGET_KEY,
  MONTHLY_BUDGET_KEY,
  RECEIVE_BUDGET,
} from '../constants'
import budgetDb from './budgetDb'

const loadBudgetWithKey = (key) => {
  return async (dispatch) => {
    const budget = await budgetDb.get(key) || {key, budget: []}
    dispatch({
      type: RECEIVE_BUDGET,
      payload: {
        key: key === REPEATING_BUDGET_KEY ? REPEATING_BUDGET_KEY : MONTHLY_BUDGET_KEY,
        budget: budget.budget,
      },
    })
  }
}

const addOrUpdateBudgetForCategory = (key, categoryBudget) => {
  return async (dispatch, getState) => {
    const budget = [...getState().budget[key === 'repeating' ? 'repeating' : 'monthly']]
    const categoryIndex = budget.findIndex(budgetEntry => budgetEntry.category === categoryBudget.category)
    if (categoryIndex >= 0) {
      budget[categoryIndex] = categoryBudget
    } else {
      budget.push(categoryBudget)
    }
    await budgetDb.set({key, budget})

    dispatch({
      type: RECEIVE_BUDGET,
      payload: {
        key: key === REPEATING_BUDGET_KEY ? REPEATING_BUDGET_KEY : MONTHLY_BUDGET_KEY,
        budget,
      },
    })
  }
}

const renameCategory = (key, category, newCategoryName) => {
  return async (dispatch, getState) => {
    const budget = [...getState().budget[key]]
    const categoryIndex = budget.findIndex(budgetEntry => budgetEntry.category === category)
    if (categoryIndex >= 0) {
      budget[categoryIndex].category = newCategoryName
    }
    await budgetDb.set({key, budget})

    dispatch({
      type: RECEIVE_BUDGET,
      payload: {
        key: key === REPEATING_BUDGET_KEY ? REPEATING_BUDGET_KEY : MONTHLY_BUDGET_KEY,
        budget,
      },
    })
  }
}

const deleteBudgetForCategory = (key, category) => {
  return async (dispatch, getState) => {
    const budget = [...getState().budget[key]]
    const categoryIndex = budget.findIndex(budgetEntry => budgetEntry.category === category)
    budget.splice(categoryIndex, 1)
    await budgetDb.set({key, budget})

    dispatch({
      type: RECEIVE_BUDGET,
      payload: {
        key: key === REPEATING_BUDGET_KEY ? REPEATING_BUDGET_KEY : MONTHLY_BUDGET_KEY,
        budget,
      },
    })
  }
}

export {
  loadBudgetWithKey,
  addOrUpdateBudgetForCategory,
  renameCategory,
  deleteBudgetForCategory,
}
