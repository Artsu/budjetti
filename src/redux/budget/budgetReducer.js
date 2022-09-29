import { RECEIVE_BUDGET, SET_BUDGET_FOR_CATEGORY } from "../constants";

const defaultState = {
  monthly: [],
  repeating: [],
};

export default (state = defaultState, action) => {
  const { payload } = action;

  let newState;
  switch (action.type) {
    case RECEIVE_BUDGET:
      const { key, budget } = payload;
      newState = { ...state };
      newState[key] = budget;
      return newState;

    // case (SET_BUDGET_FOR_CATEGORY): {
    //   newState = [...state]
    //   const {key, categoryBudget} = payload
    //   const categoryIndex = newState[key].findIndex(budgetEntry => budgetEntry.category === categoryBudget.category)
    //   if (categoryIndex >= 0) {
    //     newState[key][categoryIndex] = payload
    //   } else {
    //     newState[key].push(payload)
    //   }
    //   return newState
    // }
  }

  return state;
};
