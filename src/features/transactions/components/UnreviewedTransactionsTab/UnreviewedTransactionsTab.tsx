import { unwrapResult } from "@reduxjs/toolkit";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  fetchTransactions,
  selectUnreviewedTransactions,
} from "../../store/transactionsSlice";
import TransactionsTable from "../TransactionsTable/TansactionsTable";

const UnreviewedTransactionsTab: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) =>
    selectUnreviewedTransactions(state)
  );

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

  return (
    <TransactionsTable isLoading={isLoading} transactions={transactions} />
  );
};

export default UnreviewedTransactionsTab;
