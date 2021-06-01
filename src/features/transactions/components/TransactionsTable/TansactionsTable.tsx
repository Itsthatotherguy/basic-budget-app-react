import React, { FC } from "react";
import { Form, Table } from "antd";
import { ListTransactionsDto } from "../../store/models";
import dayjs from "dayjs";
import numeral from "numeral";
import ActionsDropdown from "../ActionsDropdown/ActionsDropdown";
import { useAppSelector } from "../../../../app/hooks";
import { selectAllTransactions } from "../../store/transactionsSlice";
import { ColumnsType } from "antd/lib/table";

const TransactionsTable: FC = () => {
  const transactions = useAppSelector((state) => selectAllTransactions(state));

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "name",
      onCell: () => ({
        style: {
          width: "10%",
        },
      }),
      render: (date: Date) => dayjs(date).format("YYYY/MM/DD"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      onCell: () => ({
        style: {
          width: "60%",
        },
      }),
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
      onCell: () => ({
        style: {
          width: "20%",
        },
      }),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      onCell: () => ({
        style: {
          width: "10%",
        },
      }),
      render: (amount: number) => numeral(amount).format("0,0.00"),
    },
    {
      dataIndex: "actions",
      align: "right",
      render: (_: any, transaction: ListTransactionsDto) => {
        return <ActionsDropdown transaction={transaction} />;
      },
    },
  ];

  return (
    <Table
      columns={columns as ColumnsType<ListTransactionsDto>}
      dataSource={transactions}
    />
  );
};

export default TransactionsTable;
