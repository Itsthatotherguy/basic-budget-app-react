import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
    EntityId,
    PayloadAction,
} from "@reduxjs/toolkit";
import {
    CreateTransactionDto,
    Transaction,
    UpdateTransactionDto,
    ListTransactionsDto,
} from "./models";
import * as client from "../transactions-client";
import { RootState } from "../../../app/store";
import { selectAllCategoryEntities } from "../../categories/store/categoriesSlice";

interface SliceState {
    isAddNewTransactionFormVisible: boolean;
    isFetchingTransactions: boolean;
    editingId: EntityId;
    isUpdateTransactionModalVisible: boolean;
}

const adapter = createEntityAdapter({
    sortComparer: (a: Transaction, b: Transaction) =>
        a.date.toString().localeCompare(b.date.toString()) * -1,
});

const initialState = adapter.getInitialState<SliceState>({
    isAddNewTransactionFormVisible: false,
    isFetchingTransactions: true,
    editingId: "",
    isUpdateTransactionModalVisible: false,
});

export const fetchTransactions = createAsyncThunk(
    "transactions/fetchTransactions",
    async () => {
        return client.read();
    }
);

export const addNewTransaction = createAsyncThunk(
    "transactions/addNewTransaction",
    async (createTransactionDto: CreateTransactionDto) => {
        return client.create(createTransactionDto);
    }
);

export const removeTransaction = createAsyncThunk(
    "transactions/removeTransaction",
    async (id: string) => {
        await client.remove(id);

        return id;
    }
);

export const updateTransaction = createAsyncThunk(
    "transactions/updateTransaction",
    async (updateTransactionDto: UpdateTransactionDto) => {
        await client.update(updateTransactionDto);

        const { id, ...changes } = updateTransactionDto;

        return {
            id,
            changes,
        };
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
        builder.addCase(fetchTransactions.fulfilled, (state, action) => {
            adapter.upsertMany(state, action.payload);
            state.isFetchingTransactions = false;
        });
        builder.addCase(addNewTransaction.fulfilled, (state, action) => {
            adapter.addOne(state, action.payload);
        });
        builder.addCase(removeTransaction.fulfilled, (state, action) => {
            adapter.removeOne(state, action.payload);
        });
        builder.addCase(updateTransaction.fulfilled, (state, action) => {
            adapter.updateOne(state, action.payload);
            state.isUpdateTransactionModalVisible = false;
            state.editingId = "";
        });
        builder.addCase(updateTransaction.rejected, (state, action) => {
            console.log(action.error);
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

export const selectIsFetchingTransactions = createSelector(
    [selectTransactionsState],
    (state) => state.isFetchingTransactions
);

export const selectAllTransactions = createSelector(
    [selectAll, selectAllCategoryEntities],
    (transactions, categoryEntities): ListTransactionsDto[] =>
        transactions.map((transaction) => ({
            id: transaction.id,
            key: `transaction-${transaction.id}`,
            date: transaction.date,
            description: transaction.description,
            amount: transaction.amount,
            category: {
                id: transaction.categoryId,
                name: categoryEntities[transaction.categoryId]?.name!,
            },
        }))
);

export const selectIsUpdateTransactionModalVisible = createSelector(
    [selectTransactionsState],
    (state) => state.isUpdateTransactionModalVisible
);

export const selectEditingTransaction = (state: RootState) =>
    selectTransactionById(state, state.transactions.editingId);
