import type { RootState } from "..";
import { FETCH_STATE } from "../constants";

export const lineItemsSelector = (state: RootState) =>
  state.lineItemsState.lineItems;
export const isLoadingLineItemsSelector = (state: RootState) =>
  state.lineItemsState.status === FETCH_STATE.LOADING;
export const hasLineItemsErrorSelector = (state: RootState) =>
  !!state.lineItemsState.error;
