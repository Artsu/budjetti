
import {
  RECEIVE_BUDGET,
  SET_BUDGET_FOR_CATEGORY,
} from '../constants'

const defaultState = []

export default (state = defaultState, action) => {
  const { payload } = action

  switch (action.type) {
    case (RECEIVE_BUDGET):
      return payload
    case (SET_BUDGET_FOR_CATEGORY):
      const newState = [...state]
      const categoryIndex = newState.findIndex(budgetEntry => budgetEntry.category === payload.category)
      if (categoryIndex >= 0) {
        newState[categoryIndex] = payload
      } else {
        newState.push(payload)
      }
      return newState
  }

  return state
}