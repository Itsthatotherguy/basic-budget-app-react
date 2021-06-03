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
  fetchingStatus: RequestStatus;
  fetchingErrors: string[];
  addingStatus: RequestStatus;
  addingErrors: string[];
  updatingStatus: RequestStatus;
  updatingErrors: string[];
  removingStatus: RequestStatus;
  removingErrors: string[];
  editingId: EntityId;
  isAddNewTransactionFormVisible: boolean;
  isUpdateTransactionModalVisible: boolean;
}

const adapter = createEntityAdapter<Transaction>();

const initialState = adapter.getInitialState<SliceState>({
  fetchingStatus: "idle",
  fetchingErrors: [],
  addingStatus: "idle",
  addingErrors: [],
  updatingStatus: "idle",
  updatingErrors: [],
  removingStatus: "idle",
  removingErrors: [],
  editingId: "",
  isAddNewTransactionFormVisible: false,
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
    showNewTransactionForm: (state) => {
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
      state.fetchingStatus = "loading";
      state.fetchingErrors = [];
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.fetchingStatus = "succeeded";
      adapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.fetchingStatus = "fail";
      state.fetchingErrors = action.payload!;
    });

    builder.addCase(addNewTransaction.pending, (state) => {
      state.addingStatus = "loading";
      state.addingErrors = [];
    });
    builder.addCase(addNewTransaction.fulfilled, (state, action) => {
      adapter.addOne(state, action.payload);
      state.addingStatus = "succeeded";
    });
    builder.addCase(addNewTransaction.rejected, (state, action) => {
      state.addingStatus = "fail";
      state.addingErrors = action.payload!;
    });

    builder.addCase(removeTransaction.pending, (state) => {
      state.removingStatus = "loading";
      state.removingErrors = [];
    });
    builder.addCase(removeTransaction.fulfilled, (state, action) => {
      adapter.removeOne(state, action.payload);
      state.removingStatus = "succeeded";
    });
    builder.addCase(removeTransaction.rejected, (state, action) => {
      state.removingStatus = "fail";
      state.removingErrors = action.payload!;
    });

    builder.addCase(updateTransaction.pending, (state, action) => {
      state.updatingStatus = "loading";
      state.updatingErrors = [];
    });
    builder.addCase(updateTransaction.fulfilled, (state, action) => {
      adapter.updateOne(state, action.payload);
      state.isUpdateTransactionModalVisible = false;
      state.editingId = "";
      state.updatingStatus = "succeeded";
    });
    builder.addCase(updateTransaction.rejected, (state, action) => {
      state.updatingStatus = "fail";
      state.updatingErrors = action.payload!;
    });
  },
});

export default transactionsSlice.reducer;

export const {
  hideNewTransactionForm,
  showNewTransactionForm,
  hideUpdateTransactionModal,
  showUpdateTransactionModal,
} = transactionsSlice.actions;

export const { selectAll, selectById: selectTransactionById } =
  adapter.getSelectors((state: RootState) => state.transactions);

export const selectTransactionsState = (state: RootState) => state.transactions;

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
