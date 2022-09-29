import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DateTime } from "luxon";

export interface CounterState {
  month: string;
}

const initialState: CounterState = {
  month: DateTime.utc().toFormat("yyyy/MM"),
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeMonth: (state, action: PayloadAction<string>) => {
      state.month = action.payload;
    },
  },
});

export const { changeMonth } = uiSlice.actions;

export default uiSlice.reducer;
