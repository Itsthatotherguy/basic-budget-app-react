import { FC } from "react";
import { Tabs, Divider, Button } from "antd";
import PageContent from "../../app/components/PageContent/PageContent";
import PageHeader from "../../app/components/PageHeader/PageHeader";
import UnreviewedTransactionsTab from "./components/UnreviewedTransactionsTab/UnreviewedTransactionsTab";
import ReviewedTransactionsTab from "./components/ReviewedTransactionsTab/ReviewedTransactionsTab";
import NewTransactionForm from "./components/NewTransactionForm/NewTransactionForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    selectIsNewTransactionFormVisible,
    unhideNewTransactionForm,
} from "./store/transactionsSlice";

const { TabPane } = Tabs;

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
                <Tabs defaultActiveKey="1" tabBarStyle={{ marginBottom: 24 }}>
                    <TabPane tab="Unreviewed" key="unreviewed">
                        <UnreviewedTransactionsTab />
                    </TabPane>
                    <TabPane tab="Reviewed" key="reviewed">
                        <ReviewedTransactionsTab />
                    </TabPane>
                </Tabs>
            </PageContent>
        </>
    );
};

export default Transactions;
