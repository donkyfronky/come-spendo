
import { FETCH_STATE } from "../constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginWithPassword, logout, retrieveUser } from "@/api";
import type { FetchStatus } from "../types";
import type { Session, User } from '@/api'

type AuthState = {
  user?: User;
  session?: Session;
  status: FetchStatus;
  error?: string;
};

const initialState: AuthState = {
  user: undefined,
  status: FETCH_STATE.LOADING,
};

export const actionLogin = createAsyncThunk(
  "auth/login",
  ({ username, password }: { username: string; password: string }) => {
    return loginWithPassword(username, password);
  }
);

export const actionRetrieveUser = createAsyncThunk("auth/retriveUser", () => {
  return retrieveUser();
});

export const actionLogout = createAsyncThunk("auth/logout", () => {
  return logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    actionClearErros: (state) => {
      state.error = undefined;
    },
    actionSetUser: (state, action) => {
      state.user = action.payload;
      state.status = FETCH_STATE.SUCCESS;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actionLogin.pending, (state) => {
      state.status = FETCH_STATE.LOADING;
      state.error = undefined;
    });
    builder.addCase(actionLogin.rejected, (state, action) => {
      state.status = FETCH_STATE.ERROR;
      state.error = action.error.message;
    });
    builder.addCase(actionLogin.fulfilled, (state, action) => {
      state.status = FETCH_STATE.SUCCESS;
      state.user = action.payload.user || undefined;
      state.session = action.payload.session || undefined;
    });
    builder.addCase(actionRetrieveUser.pending, (state) => {
      state.status = FETCH_STATE.LOADING;
      state.error = undefined;
    });
    builder.addCase(actionRetrieveUser.rejected, (state, action) => {
      state.status = FETCH_STATE.ERROR;
      state.error = action.error.message;
    });
    builder.addCase(actionRetrieveUser.fulfilled, (state, action) => {
      state.status = FETCH_STATE.SUCCESS;
      state.user = action.payload.user || undefined;
    });

    builder.addCase(actionLogout.pending, (state) => {
      state.status = FETCH_STATE.LOADING;
      state.error = undefined;
    });
    builder.addCase(actionLogout.rejected, (state, action) => {
      state.status = FETCH_STATE.ERROR;
      state.error = action.error.message;
    });
    builder.addCase(actionLogout.fulfilled, (state) => {
      state.status = FETCH_STATE.SUCCESS;
      state.user = undefined;
      state.session = undefined;
    });
  },
});
export const { actionClearErros, actionSetUser } = authSlice.actions;
export default authSlice.reducer;
