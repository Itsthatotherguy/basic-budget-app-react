import Table, { ColumnsType } from "antd/lib/table";
import { FC } from "react";
import { Category } from "../../../models/category";

interface Props {
  isLoading: boolean;
  categories: Category[];
}

const columns: ColumnsType<Category> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
];

const ListCategoriesTable: FC<Props> = ({ isLoading = true, categories }) => {
  return (
    <Table loading={isLoading} columns={columns} dataSource={categories} />
  );
};

export default ListCategoriesTable;
