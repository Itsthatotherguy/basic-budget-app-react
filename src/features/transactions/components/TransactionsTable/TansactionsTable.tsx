import Table, { ColumnsType } from "antd/lib/table";
import { FC } from "react";
import { Transaction } from "../../store/models";
import dayjs from "dayjs";
import numeral from "numeral";

const columns: ColumnsType<Transaction> = [
  {
    title: "Date",
    dataIndex: "date",
    onCell: () => ({
      style: {
        width: "80%",
      },
    }),
    render: (date) => dayjs(date).format("YYYY/MM/DD"),
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Category",
    dataIndex: ["category", "name"],
  },
  {
    title: "Amount",
    dataIndex: "amount",
    align: "right",
    render: (amount) => numeral(amount).format("0,0.00"),
  },
];

interface Props {
  transactions: Transaction[];
  isLoading: boolean;
}

const TransactionsTable: FC<Props> = ({ transactions, isLoading }) => {
  return (
    <Table columns={columns} dataSource={transactions} loading={isLoading} />
  );
};

export default TransactionsTable;
