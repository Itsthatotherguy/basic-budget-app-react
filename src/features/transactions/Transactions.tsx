import { FC } from "react";
import { Tabs } from "antd";
import PageContent from "../../app/components/PageContent/PageContent";
import PageHeader from "../../app/components/PageHeader/PageHeader";
import UnreviewedTransactionsTab from "./components/UnreviewedTransactionsTab/UnreviewedTransactionsTab";
import ReviewedTransactionsTab from "./components/ReviewedTransactionsTab/ReviewedTransactionsTab";

const { TabPane } = Tabs;

const Transactions: FC = () => {
  return (
    <>
      <PageHeader title="Transactions" />
      <PageContent>
        <Tabs defaultActiveKey="1">
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
