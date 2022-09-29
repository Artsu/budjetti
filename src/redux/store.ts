import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui/uiSlice";
import categoriesReducer from "./categories/categoriesSlice";
import budgetReducer from "./budget/budgetSlice";
import entriesReducer from "./entries/entriesSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  devTools: true,
  reducer: {
    ui: uiReducer,
    categories: categoriesReducer,
    budget: budgetReducer,
    entries: entriesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
