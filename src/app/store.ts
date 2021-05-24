import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import categoriesReducer from "../features/categories/store/categoriesSlice";
import transactionsReducer from "../features/transactions/store/transactionsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    categories: categoriesReducer,
    transactions: transactionsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
