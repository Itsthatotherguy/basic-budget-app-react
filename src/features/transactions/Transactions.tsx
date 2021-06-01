import { FC } from "react";
import { Divider, Button } from "antd";
import PageContent from "../../app/components/PageContent/PageContent";
import PageHeader from "../../app/components/PageHeader/PageHeader";
import NewTransactionForm from "./components/NewTransactionForm/NewTransactionForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectIsNewTransactionFormVisible,
  unhideNewTransactionForm,
} from "./store/transactionsSlice";
import TransactionsTable from "./components/TransactionsTable/TansactionsTable";
import UpdateTransactionModal from "./components/UpdateTransactionModal/UpdateTransactionModal";

const Transactions: FC = () => {
  const dispatch = useAppDispatch();
  const isNewTransactionFormVisible = useAppSelector(
    selectIsNewTransactionFormVisible
  );

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
        <TransactionsTable />
      </PageContent>
      <UpdateTransactionModal />
    </>
  );
};

export default Transactions;
