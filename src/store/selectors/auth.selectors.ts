
import type { RootState } from "..";
import { FETCH_STATE } from "../constants";

export const getUserSelector = (state: RootState) => state.authState.user;
export const getUserIdSelector = (state: RootState) => state.authState.user?.id;
export const isLoggedUserSelector = (state: RootState) =>
  !!state.authState.user;
export const isLoadingUserSelector = (state: RootState) =>
  state.authState.status === FETCH_STATE.LOADING;
export const hasAuthErrorSelector = (state: RootState) =>
  !!state.authState.error;
