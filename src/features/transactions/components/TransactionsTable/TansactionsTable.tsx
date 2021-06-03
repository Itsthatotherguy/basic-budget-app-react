import React, { FC } from "react";
import { Table } from "antd";
import { Transaction } from "../../store/models";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  removeTransaction,
  selectAllTransactions,
  showUpdateTransactionModal,
} from "../../store/transactionsSlice";
import { ColumnsType } from "antd/lib/table";
import ActionsDropdown from "../../../../app/components/ActionsDropdown/ActionsDropdown";

const TransactionsTable: FC = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => selectAllTransactions(state));

  const handleClickEdit = (id: string) => {
    dispatch(showUpdateTransactionModal(id));
  };

  const handleClickDelete = (id: string) => {
    dispatch(removeTransaction(id));
  };

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
          width: "40%",
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
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      align: "right",
      onCell: () => ({
        style: {
          width: "15%",
        },
      }),
    },
    {
      dataIndex: "actions",
      align: "right",
      onCell: () => ({
        style: {
          width: "5%",
        },
      }),
      render: (_: any, transaction: Transaction) => {
        return (
          <ActionsDropdown
            objectName="transaction"
            onClickEdit={() => handleClickEdit(transaction.id)}
            onClickDelete={() => handleClickDelete(transaction.id)}
          />
        );
      },
    },
  ];

  return (
    <Table
      columns={columns as ColumnsType<Transaction>}
      dataSource={transactions}
    />
  );
};

export default TransactionsTable;
