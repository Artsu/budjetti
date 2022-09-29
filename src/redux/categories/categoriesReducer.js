import { ADD_CATEGORY, RECEIVE_CATEGORIES } from "../constants";

const defaultState = {
  defaultTransceiverCategories: [],
};

export default (state = defaultState, action) => {
  const { payload } = action;

  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return { defaultTransceiverCategories: payload };
    case ADD_CATEGORY:
      const newState = { ...state };
      newState.defaultTransceiverCategories.push(payload);
      return newState;
  }

  return state;
};
