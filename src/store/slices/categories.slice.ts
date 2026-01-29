
import { FETCH_STATE } from "../constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { FetchStatus } from "../types";
import { getCategoryList } from "@/api";
import type {Categories} from '@/api'

type CategoriesState = {
  categories: Categories[],
  status: FetchStatus;
  error?: string;
};

const initialState: CategoriesState = {
  categories: [],
  status: FETCH_STATE.LOADING,
};

export const actionGetCategories = createAsyncThunk("categories/retriveUser", () => {
  return getCategoryList();
});


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(actionGetCategories.pending, (state) => {
      state.status = FETCH_STATE.LOADING;
      state.error = undefined;
    });
    builder.addCase(actionGetCategories.rejected, (state, action) => {
      state.status = FETCH_STATE.ERROR;
      state.error = action.error.message;
    });
    builder.addCase(actionGetCategories.fulfilled, (state, action) => {
      state.status = FETCH_STATE.SUCCESS;
      state.categories=action.payload
    });
  },
});

export default authSlice.reducer;
