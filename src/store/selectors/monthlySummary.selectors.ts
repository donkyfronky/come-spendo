import type { RootState } from "..";
import { FETCH_STATE } from "../constants";

export const monthlySummarySelector = (state: RootState) =>
  state.monthlySummaryState.data;
export const isLoadingMonthlySummarySelector = (state: RootState) =>
  state.monthlySummaryState.status === FETCH_STATE.LOADING;
export const hasMonthlySummaryErrorSelector = (state: RootState) =>
  !!state.monthlySummaryState.error;
