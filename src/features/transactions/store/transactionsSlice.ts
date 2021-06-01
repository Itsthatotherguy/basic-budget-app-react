import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityId,
  PayloadAction,
} from "@reduxjs/toolkit";
import { CreateTransactionDto, Transaction } from "./models";
import * as client from "../transactions-client";
import { RootState } from "../../../app/store";

interface SliceState {
  isAddNewTransactionFormVisible: boolean;
  currentEditingTransactionId: string | null;
}

const adapter = createEntityAdapter({
  sortComparer: (a: Transaction, b: Transaction) =>
    a.date.toString().localeCompare(b.date.toString()) * -1,
});

const initialState = adapter.getInitialState<SliceState>({
  isAddNewTransactionFormVisible: false,
  currentEditingTransactionId: null,
});

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const response = await client.read();

    return response.transactions;
  }
);

export const addNewTransaction = createAsyncThunk(
  "transactions/addNewTransaction",
  async (createTransactionDto: CreateTransactionDto) => {
    const response = await client.create(createTransactionDto);

    return response.transaction;
  }
);

export const removeTransaction = createAsyncThunk(
  "transactions/removeTransaction",
  async (id: string) => {
    await client.remove(id);

    return id;
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    unhideNewTransactionForm: (state) => {
      state.isAddNewTransactionFormVisible = true;
    },
    hideNewTransactionForm: (state) => {
      state.isAddNewTransactionFormVisible = false;
      state.currentEditingTransactionId = null;
    },
    setCurrentEditingTransactionId: (state, action: PayloadAction<string>) => {
      state.currentEditingTransactionId = action.payload;
      state.isAddNewTransactionFormVisible = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      adapter.upsertMany(state, action.payload);
    });
    builder.addCase(addNewTransaction.fulfilled, (state, action) => {
      adapter.addOne(state, action.payload);
    });
    builder.addCase(removeTransaction.fulfilled, (state, action) => {
      adapter.removeOne(state, action.payload);
    });
  },
});

export default transactionsSlice.reducer;

export const {
  hideNewTransactionForm,
  unhideNewTransactionForm,
  setCurrentEditingTransactionId,
} = transactionsSlice.actions;

export const {
  selectAll: selectAllTransactions,
  selectById: selectTransactionById,
} = adapter.getSelectors((state: RootState) => state.transactions);

export const selectTransactionsState = (state: RootState) => state.transactions;

export const selectIsNewTransactionFormVisible = createSelector(
  [selectTransactionsState],
  (state) => state.isAddNewTransactionFormVisible
);

export const selectCurrentEditingTransactionId = createSelector(
  [selectTransactionsState],
  (state) => state.currentEditingTransactionId
);

export const selectCurrentEditingTransaction = createSelector(
  [selectCurrentEditingTransactionId, (state: RootState) => state],
  (currentEditingTransactionId, state) =>
    selectTransactionById(state, currentEditingTransactionId as EntityId)
);
