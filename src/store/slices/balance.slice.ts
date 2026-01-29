import { FETCH_STATE } from "../constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { FetchStatus } from "../types";
import { getBalance } from "@/api/balance";

type BalanceState = {
  balance: number | null;
  status: FetchStatus;
  error?: string;
};

const initialState: BalanceState = {
  balance: null,
  status: FETCH_STATE.IDLE,
};

export const actionGetBalance = createAsyncThunk(
  "balance/get",
  (userId: string) => {
    return getBalance(userId);
  },
);

export const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actionGetBalance.pending, (state) => {
      state.status = FETCH_STATE.LOADING;
      state.error = undefined;
    });
    builder.addCase(actionGetBalance.rejected, (state, action) => {
      state.status = FETCH_STATE.ERROR;
      state.error = action.error.message;
    });
    builder.addCase(actionGetBalance.fulfilled, (state, action) => {
      state.status = FETCH_STATE.SUCCESS;
      state.balance = action.payload;
    });
  },
});

export default balanceSlice.reducer;
