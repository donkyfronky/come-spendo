
import type { RootState } from "..";
import { FETCH_STATE } from "../constants";

export const isLoadingCategoriesSelector = (state: RootState) =>
    state.categoriesState.status === FETCH_STATE.LOADING;
export const categoriesSelector = (state: RootState) =>
    state.categoriesState.categories