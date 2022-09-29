import categoriesDb from "./categoriesDb";
import { RECEIVE_CATEGORIES, ADD_CATEGORY } from "../constants";

const loadCategoriesFromDb = () => {
  return async (dispatch) => {
    const categories = await categoriesDb.getAll();
    dispatch({
      type: RECEIVE_CATEGORIES,
      payload: categories,
    });
  };
};

const addOrUpdateCategory = (category) => {
  return async (dispatch) => {
    await categoriesDb.set(category);

    dispatch({
      type: ADD_CATEGORY,
      payload: category,
    });
  };
};

export { loadCategoriesFromDb, addOrUpdateCategory };
