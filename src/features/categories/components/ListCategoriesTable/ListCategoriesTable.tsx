import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Space } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { Category } from "../../store/models";
import DeletePopconfirm from "./DeletePopconfirm/DeletePopconfirm";

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
  {
    dataIndex: "action",
    align: "right",
    render: (_, category) => (
      <Space>
        <Button htmlType="button">
          <Link to={`/categories/${category.id}/edit`}>Edit</Link>
        </Button>
        <DeletePopconfirm categoryId={category.id} />
      </Space>
    ),
  },
];

const ListCategoriesTable: FC<Props> = ({ isLoading = true, categories }) => {
  return (
    <Table
      loading={isLoading}
      columns={columns}
      dataSource={categories}
      pagination={false}
    />
  );
};

export default ListCategoriesTable;
