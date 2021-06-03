import { FC } from "react";
import { Divider, Button } from "antd";
import PageContent from "../../app/components/PageContent/PageContent";
import PageHeader from "../../app/components/PageHeader/PageHeader";
import NewTransactionForm from "./components/NewTransactionForm/NewTransactionForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { showNewTransactionForm } from "./store/transactionsSlice";
import TransactionsTable from "./components/TransactionsTable/TansactionsTable";
import UpdateTransactionModal from "./components/UpdateTransactionModal/UpdateTransactionModal";

const Transactions: FC = () => {
  const dispatch = useAppDispatch();
  const isNewTransactionFormVisible = useAppSelector(
    (state) => state.transactions.isAddNewTransactionFormVisible
  );

  const handleClickNewTransaction = () => {
    dispatch(showNewTransactionForm());
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
