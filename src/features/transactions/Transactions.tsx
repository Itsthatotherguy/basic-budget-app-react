import { FC, useEffect, useState } from "react";
import { Divider, Button } from "antd";
import PageContent from "../../app/components/PageContent/PageContent";
import PageHeader from "../../app/components/PageHeader/PageHeader";
import NewTransactionForm from "./components/NewTransactionForm/NewTransactionForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchTransactions,
  selectAllTransactions,
  selectIsNewTransactionFormVisible,
  unhideNewTransactionForm,
} from "./store/transactionsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import TransactionsTable from "./components/TransactionsTable/TansactionsTable";

const Transactions: FC = () => {
  const dispatch = useAppDispatch();
  const isNewTransactionFormVisible = useAppSelector(
    selectIsNewTransactionFormVisible
  );
  const [isLoading, setIsLoading] = useState(false);
  const transactions = useAppSelector((state) => selectAllTransactions(state));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const actionResult = await dispatch(fetchTransactions());
        unwrapResult(actionResult);
      } catch (error) {
        console.log("ERROR: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleClickNewTransaction = () => {
    dispatch(unhideNewTransactionForm());
  };

  return (
    <>
      <PageHeader
        title="Transactions"
        extra={
          <Button type="primary" onClick={handleClickNewTransaction}>
            New Transaction
          </Button>
        }
      />
      <PageContent>
        {isNewTransactionFormVisible && (
          <>
            <NewTransactionForm />
            <Divider />
          </>
        )}
        <TransactionsTable isLoading={isLoading} transactions={transactions} />
      </PageContent>
    </>
  );
};

export default Transactions;
