import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import authReducer from "./slices/auth.slice";
import balanceReducer from "./slices/balance.slice";
import categoriesReducer from "./slices/categories.slice";
import lineItemsReducer from "./slices/lineItems.slice";
import monthlySummaryReducer from "./slices/monthlySummary.slice";

export const store = configureStore({
  reducer: {
    authState: authReducer,
    balanceState: balanceReducer,
    categoriesState: categoriesReducer,
    lineItemsState: lineItemsReducer,
    monthlySummaryState: monthlySummaryReducer,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export * from "./slices/auth.slice";
export * from "./selectors";
export type * from "./types";

export default store;
