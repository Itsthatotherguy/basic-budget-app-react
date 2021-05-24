import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { Transaction } from "./models";
import * as client from "../transactions-client";
import { RootState } from "../../../app/store";

interface SliceState {}

const adapter = createEntityAdapter({
  sortComparer: (a: Transaction, b: Transaction) =>
    a.date.toString().localeCompare(a.date.toString()),
});

const initialState = adapter.getInitialState<SliceState>({});

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const response = await client.read();
    console.log(response);
    return response.transactions;
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      adapter.upsertMany(state, action.payload);
    });
  },
});

export default transactionsSlice.reducer;

export const { selectAll: selectAllTransactions } = adapter.getSelectors(
  (state: RootState) => state.transactions
);

export const selectUnreviewedTransactions = createSelector(
  [selectAllTransactions],
  (transactions) =>
    transactions.filter((transaction) => !transaction.isReviewed)
);

export const selectReviewedTransactions = createSelector(
  [selectAllTransactions],
  (transactions) => transactions.filter((transaction) => transaction.isReviewed)
);

export const selectTransactionsState = (state: RootState) => state.transactions;
