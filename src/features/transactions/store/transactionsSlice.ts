import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityId,
  PayloadAction,
  Update,
} from "@reduxjs/toolkit";
import {
  CreateTransactionDto,
  Transaction,
  UpdateTransactionDto,
} from "./models";
import * as client from "../transactions-client";
import { RootState } from "../../../app/store";
import { RequestStatus } from "../../../app/models";

interface SliceState {
  status: RequestStatus;
  isAddNewTransactionFormVisible: boolean;
  editingId: EntityId;
  isUpdateTransactionModalVisible: boolean;
}

const adapter = createEntityAdapter<Transaction>();

const initialState = adapter.getInitialState<SliceState>({
  status: "idle",
  isAddNewTransactionFormVisible: false,
  editingId: "",
  isUpdateTransactionModalVisible: false,
});

export const fetchTransactions = createAsyncThunk<
  Transaction[],
  null,
  {
    rejectValue: string[];
  }
>("transactions/fetchTransactions", async (_, { rejectWithValue }) => {
  try {
    const response = await client.read();

    return response.transactions;
  } catch (err) {
    const errors: string[] = err;

    return rejectWithValue(errors);
  }
});

export const addNewTransaction = createAsyncThunk<
  Transaction,
  CreateTransactionDto,
  {
    rejectValue: string[];
  }
>("transactions/addNewTransaction", async (dto, { rejectWithValue }) => {
  try {
    const response = await client.create(dto);

    return response.transaction;
  } catch (err) {
    const errors: string[] = err;

    return rejectWithValue(errors);
  }
});

export const removeTransaction = createAsyncThunk<
  string,
  string,
  {
    rejectValue: string[];
  }
>("transactions/removeTransaction", async (id, { rejectWithValue }) => {
  try {
    await client.remove(id);

    return id;
  } catch (err) {
    const errors: string[] = err;

    return rejectWithValue(errors);
  }
});

export const updateTransaction = createAsyncThunk<
  Update<Transaction>,
  UpdateTransactionDto,
  {
    rejectValue: string[];
  }
>("transactions/updateTransaction", async (dto, { rejectWithValue }) => {
  try {
    await client.update(dto);

    const { id, ...changes } = dto;

    return {
      id,
      changes,
    };
  } catch (err) {
    const errors: string[] = err;

    return rejectWithValue(errors);
  }
});

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    unhideNewTransactionForm: (state) => {
      state.isAddNewTransactionFormVisible = true;
    },
    hideNewTransactionForm: (state) => {
      state.isAddNewTransactionFormVisible = false;
    },
    showUpdateTransactionModal: (state, action: PayloadAction<string>) => {
      state.isUpdateTransactionModalVisible = true;
      state.editingId = action.payload;
    },
    hideUpdateTransactionModal: (state) => {
      state.isUpdateTransactionModalVisible = false;
      state.editingId = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.status = "succeeded";
      adapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchTransactions.rejected, (state) => {
      state.status = "fail";
    });

    builder.addCase(addNewTransaction.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addNewTransaction.fulfilled, (state, action) => {
      adapter.addOne(state, action.payload);
    });
    builder.addCase(addNewTransaction.rejected, (state) => {
      state.status = "fail";
    });

    builder.addCase(removeTransaction.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(removeTransaction.fulfilled, (state, action) => {
      adapter.removeOne(state, action.payload);
    });
    builder.addCase(removeTransaction.rejected, (state) => {
      state.status = "fail";
    });

    builder.addCase(updateTransaction.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(updateTransaction.fulfilled, (state, action) => {
      adapter.updateOne(state, action.payload);
      state.isUpdateTransactionModalVisible = false;
      state.editingId = "";
      state.status = "succeeded";
    });
    builder.addCase(updateTransaction.rejected, (state, action) => {
      state.status = "fail";
    });
  },
});

export default transactionsSlice.reducer;

export const {
  hideNewTransactionForm,
  unhideNewTransactionForm,
  hideUpdateTransactionModal,
  showUpdateTransactionModal,
} = transactionsSlice.actions;

export const { selectAll, selectById: selectTransactionById } =
  adapter.getSelectors((state: RootState) => state.transactions);

export const selectTransactionsState = (state: RootState) => state.transactions;

export const selectIsNewTransactionFormVisible = createSelector(
  [selectTransactionsState],
  (state) => state.isAddNewTransactionFormVisible
);

export const selectIsUpdateTransactionModalVisible = createSelector(
  [selectTransactionsState],
  (state) => state.isUpdateTransactionModalVisible
);

export const selectEditingTransaction = (state: RootState) =>
  selectTransactionById(state, state.transactions.editingId);

export const selectAllTransactions = createSelector(
  [selectAll],
  (transactions) =>
    transactions.map((transaction) => ({
      ...transaction,
      key: `transaction-${transaction.id}`,
    }))
);

export const selectTransactionsStatus = createSelector(
  [selectTransactionsState],
  (state) => state.status
);
