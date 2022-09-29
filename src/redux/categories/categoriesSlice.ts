import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Category {
  transceiver: string;
  category: string;
}

export interface CategoriesState {
  defaultTransceiverCategories: Category[];
}

const initialState: CategoriesState = {
  defaultTransceiverCategories: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    receiveCategories: (state, action: PayloadAction<Category[]>) => {
      state.defaultTransceiverCategories = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.defaultTransceiverCategories.push(action.payload);
    },
  },
});

export const { receiveCategories, addCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
