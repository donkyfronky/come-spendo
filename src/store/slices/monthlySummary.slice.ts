import { FETCH_STATE } from "../constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { FetchStatus } from "../types";
import { getMonthlyLineItemsSummary } from "@/api/monthlySummary";
import type { MonthlySummaryRow } from "@/api/monthlySummary";

type MonthlySummaryState = {
  data: MonthlySummaryRow[];
  status: FetchStatus;
  error?: string;
};

const initialState: MonthlySummaryState = {
  data: [],
  status: FETCH_STATE.IDLE,
};

export const actionGetMonthlyLineItemsSummary = createAsyncThunk(
  "monthlySummary/get",
  (year: number) => {
    return getMonthlyLineItemsSummary(year);
  },
);

export const monthlySummarySlice = createSlice({
  name: "monthlySummary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actionGetMonthlyLineItemsSummary.pending, (state) => {
      state.status = FETCH_STATE.LOADING;
      state.error = undefined;
    });
    builder.addCase(
      actionGetMonthlyLineItemsSummary.rejected,
      (state, action) => {
        state.status = FETCH_STATE.ERROR;
        state.error = action.error.message;
      },
    );
    builder.addCase(
      actionGetMonthlyLineItemsSummary.fulfilled,
      (state, action) => {
        state.status = FETCH_STATE.SUCCESS;
        state.data = action.payload;
      },
    );
  },
});

export default monthlySummarySlice.reducer;
