import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Space } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { Category } from "../../store/models";
import DeletePopconfirm from "./DeletePopconfirm/DeletePopconfirm";

interface Props {
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
    dataIndex: "categoryType",
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

const ListCategoriesTable: FC<Props> = ({ categories }) => {
  return <Table columns={columns} dataSource={categories} pagination={false} />;
};

export default ListCategoriesTable;
