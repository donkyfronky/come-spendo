import type { RootState } from "..";
import { FETCH_STATE } from "../constants";

export const balanceSelector = (state: RootState) => state.balanceState.balance;
export const isLoadingBalanceSelector = (state: RootState) =>
  state.balanceState.status === FETCH_STATE.LOADING;
export const hasBalanceErrorSelector = (state: RootState) =>
  !!state.balanceState.error;
