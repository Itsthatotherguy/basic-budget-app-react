import { FC } from "react";
import Table, { ColumnsType } from "antd/lib/table";
import { Transaction } from "../../store/models";
import dayjs from "dayjs";
import numeral from "numeral";
import ActionsDropdown from "../ActionsDropdown/ActionsDropdown";
import { useAppDispatch } from "../../../../app/hooks";

const columns: ColumnsType<Transaction> = [
  {
    title: "Date",
    dataIndex: "date",
    onCell: () => ({
      style: {
        width: "10%",
      },
    }),
    render: (date) => dayjs(date).format("YYYY/MM/DD"),
  },
  {
    title: "Description",
    dataIndex: "description",
    onCell: () => ({
      style: {
        width: "60%",
      },
    }),
  },
  {
    title: "Category",
    dataIndex: ["category", "name"],
    onCell: () => ({
      style: {
        width: "20%",
      },
    }),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    align: "right",
    onCell: () => ({
      style: {
        width: "10%",
      },
    }),
    render: (amount) => numeral(amount).format("0,0.00"),
  },
  {
    align: "right",
    render: (_, transaction) => <ActionsDropdown transaction={transaction} />,
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
