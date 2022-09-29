import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import cloneDeep from "lodash/cloneDeep";
import budgetDb from "../../db/budgetDb";
import { RootState } from "../store";

export interface Budget {
  category: string;
  amount: number;
}

export interface BudgetState {
  monthly: Budget[];
  repeating: Budget[];
}

export type BudgetType = keyof BudgetState;

const initialState: BudgetState = {
  monthly: [],
  repeating: [],
};

export const addBudget = createAsyncThunk(
  "budget/add-budget",
  async (val: { key: string; budget: Budget }, thunkApi) => {
    const { key, budget } = val;
    const storeKey: BudgetType = key === "repeating" ? "repeating" : "monthly";
    const state = cloneDeep(
      (thunkApi.getState() as RootState).budget[storeKey],
    );

    const categoryIndex = state.findIndex(
      (budgetEntry) => budgetEntry.category === budget.category,
    );
    if (categoryIndex >= 0) {
      state[categoryIndex] = budget;
    } else {
      state.push(budget);
    }
    await budgetDb().set({ key, budget: state });
    return { key: storeKey, updatedBudgets: state };
  },
);

export const renameBudgetCategory = createAsyncThunk(
  "budget/rename-budget-category",
  async (
    val: { key: string; category: string; newCategoryName: string },
    thunkApi,
  ) => {
    const { key, category, newCategoryName } = val;
    const storeKey: BudgetType = key === "repeating" ? "repeating" : "monthly";
    const state = cloneDeep(
      (thunkApi.getState() as RootState).budget[storeKey],
    );

    const categoryIndex = state.findIndex(
      (budgetEntry) => budgetEntry.category === category,
    );
    if (categoryIndex >= 0) {
      state[categoryIndex].category = newCategoryName;
    }

    await budgetDb().set({ key, budget: state });
    return { key: storeKey, updatedBudgets: state };
  },
);

export const updateBudgetAmount = createAsyncThunk(
  "budget/update-budget-amount",
  async (val: { key: string; category: string; amount: number }, thunkApi) => {
    const { key, category, amount } = val;
    const storeKey: BudgetType = key === "repeating" ? "repeating" : "monthly";
    const state = cloneDeep(
      (thunkApi.getState() as RootState).budget[storeKey],
    );

    const categoryIndex = state.findIndex(
      (budgetEntry) => budgetEntry.category === category,
    );
    if (categoryIndex >= 0) {
      state[categoryIndex].amount = amount;
    }

    await budgetDb().set({ key, budget: state });
    return { key: storeKey, updatedBudgets: state };
  },
);

export const deleteBudgetCategory = createAsyncThunk(
  "budget/delete-budget-category",
  async (val: { key: string; category: string }, thunkApi) => {
    const { key, category } = val;
    const storeKey: BudgetType = key === "repeating" ? "repeating" : "monthly";
    const state = cloneDeep(
      (thunkApi.getState() as RootState).budget[storeKey],
    );

    const categoryIndex = state.findIndex(
      (budgetEntry) => budgetEntry.category === category,
    );
    state.splice(categoryIndex, 1);

    await budgetDb().set({ key, budget: state });
    return { key: storeKey, updatedBudgets: state };
  },
);

export const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    loadBudgetState: (state, action: PayloadAction<BudgetState>) => {
      state.monthly = action.payload.monthly;
      state.repeating = action.payload.repeating;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBudget.fulfilled, (state, action) => {
      const { key, updatedBudgets } = action.payload;
      state[key] = updatedBudgets;
    });
    builder.addCase(addBudget.rejected, (state, action) => {
      console.error(action.error);
    });

    builder.addCase(renameBudgetCategory.fulfilled, (state, action) => {
      const { key, updatedBudgets } = action.payload;
      state[key] = updatedBudgets;
    });
    builder.addCase(renameBudgetCategory.rejected, (state, action) => {
      console.error(action.error);
    });

    builder.addCase(updateBudgetAmount.fulfilled, (state, action) => {
      const { key, updatedBudgets } = action.payload;
      state[key] = updatedBudgets;
    });
    builder.addCase(updateBudgetAmount.rejected, (state, action) => {
      console.error(action.error);
    });

    builder.addCase(deleteBudgetCategory.fulfilled, (state, action) => {
      const { key, updatedBudgets } = action.payload;
      state[key] = updatedBudgets;
    });
    builder.addCase(deleteBudgetCategory.rejected, (state, action) => {
      console.error(action.error);
    });
  },
});

export const { loadBudgetState } = budgetSlice.actions;

export default budgetSlice.reducer;
