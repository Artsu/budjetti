import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep, orderBy } from "lodash";
import { Entry } from "../../common/types";

export interface EntriesState {
  items: Entry[];
  hilightedItems: Entry[];
}

const initialState: EntriesState = {
  items: [],
  hilightedItems: [],
};

// export const deleteBudgetCategory = createAsyncThunk(
//   "entries/delete-budget-category",
//   async (val: { key: string; category: string }, thunkApi) => {
//     // const { key, category } = val;
//     // const storeKey: BudgetType = key === "repeating" ? "repeating" : "monthly";
//     // const state = cloneDeep(
//     //   (thunkApi.getState() as RootState).budget[storeKey],
//     // );
//     //
//     // const categoryIndex = state.findIndex(
//     //   (budgetEntry) => budgetEntry.category === category,
//     // );
//     // state.splice(categoryIndex, 1);
//     //
//     // await budgetDb().set({ key, budget: state });
//     // return { key: storeKey, updatedBudgets: state };
//   },
// );

export const entriesSlice = createSlice({
  name: "entries",
  initialState,
  reducers: {
    loadEntriesState: (state, action: PayloadAction<EntriesState>) => {
      state.items = action.payload.items;
      state.hilightedItems = action.payload.hilightedItems;
    },
    addEntries: (state, action: PayloadAction<Entry[]>) => {
      const updatedItems = [...action.payload, ...state.items];
      return { ...state, items: orderBy(updatedItems, ["date"], ["desc"]) };
    },
    hilightEntries: (state, action: PayloadAction<Entry[]>) => {
      return { ...state, hilightedItems: action.payload };
    },
    updateEntry: (state, action: PayloadAction<Entry>) => {
      const updatedItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      state.items[updatedItemIndex] = action.payload;
      return state;
    },
    deleteEntry: (state, action: PayloadAction<string>) => {
      // TODO:
      return state;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(deleteBudgetCategory.fulfilled, (state, action) => {
  //     // const { key, updatedBudgets } = action.payload;
  //     // state[key] = updatedBudgets;
  //   });
  //   builder.addCase(deleteBudgetCategory.rejected, (state, action) => {
  //     console.error(action.error);
  //   });
  // },
});

export const {
  loadEntriesState,
  addEntries,
  hilightEntries,
  updateEntry,
  deleteEntry,
} = entriesSlice.actions;

export default entriesSlice.reducer;
