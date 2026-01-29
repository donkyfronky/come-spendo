import { FETCH_STATE } from "../constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { FetchStatus } from "../types";
import {
  getLineItemsList,
  saveLineItems,
  updateLineItems,
} from "@/api/lineItems";
import type { LineItemsList } from "@/api/lineItems";
import type { Categories } from "@/api/categories";

type LineItemsState = {
  lineItems: LineItemsList;
  status: FetchStatus;
  error?: string;
};

const initialState: LineItemsState = {
  lineItems: [],
  status: FETCH_STATE.IDLE,
};

export const actionGetLineItems = createAsyncThunk("lineItems/getList", () => {
  return getLineItemsList();
});

export const actionSaveLineItem = createAsyncThunk(
  "lineItems/save",
  ({
    id,
    description,
    quantity,
    unit_price,
    total_amount,
    out,
    tags,
  }: {
    id?: string;
    description: string;
    quantity: number;
    unit_price: number;
    total_amount: number;
    out: boolean;
    tags?: Categories["id"][];
  }) => {
    if (id) {
      return updateLineItems(
        id,
        description,
        quantity,
        unit_price,
        total_amount,
        out,
        tags,
      );
    }
    return saveLineItems(
      description,
      quantity,
      unit_price,
      total_amount,
      out,
      tags,
    );
  },
);

export const lineItemsSlice = createSlice({
  name: "lineItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actionGetLineItems.pending, (state) => {
      state.status = FETCH_STATE.LOADING;
      state.error = undefined;
    });
    builder.addCase(actionGetLineItems.rejected, (state, action) => {
      state.status = FETCH_STATE.ERROR;
      state.error = action.error.message;
    });
    builder.addCase(actionGetLineItems.fulfilled, (state, action) => {
      state.status = FETCH_STATE.SUCCESS;
      state.lineItems = action.payload;
    });

    builder.addCase(actionSaveLineItem.pending, (state) => {
      state.status = FETCH_STATE.LOADING;
      state.error = undefined;
    });
    builder.addCase(actionSaveLineItem.rejected, (state, action) => {
      state.status = FETCH_STATE.ERROR;
      state.error = action.error.message;
    });
    builder.addCase(actionSaveLineItem.fulfilled, (state, action) => {
      state.status = FETCH_STATE.SUCCESS;

      const { id } = action.meta.arg;
      const isUpdate = !!id;

      if (isUpdate) {
        // For updates: replace existing item
        const existingIndex = state.lineItems.findIndex(
          (item) => item.id === id,
        );
        if (existingIndex !== -1) {
          const updatedItem = {
            ...action.payload,
            categories: state.lineItems[existingIndex].categories || [], // Preserve existing categories
          } as LineItemsList[0];
          state.lineItems[existingIndex] = updatedItem;
        }
      } else {
        // For creates: prepend new item
        const newItem = {
          ...action.payload,
          categories: [],
        } as LineItemsList[0];
        state.lineItems = [newItem, ...state.lineItems];
      }
    });
  },
});

export default lineItemsSlice.reducer;
