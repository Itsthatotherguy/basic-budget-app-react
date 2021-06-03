import { FC } from "react";
import Table, { ColumnsType } from "antd/lib/table";
import { Category } from "../../store/models";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  hideUpdateCategoryModal,
  selectAllCategories,
  showUpdateCategoryModal,
} from "../../store/categoriesSlice";
import ActionsDropdown from "../../../../app/components/ActionsDropdown/ActionsDropdown";

const ListCategoriesTable: FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => selectAllCategories(state));

  const handleClickEdit = (id: string) => {
    dispatch(showUpdateCategoryModal(id));
  };

  const handleClickDelete = () => {
    dispatch(hideUpdateCategoryModal());
  };

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
        <ActionsDropdown
          objectName="category"
          onClickEdit={() => handleClickEdit(category.id)}
          onClickDelete={handleClickDelete}
        />
      ),
    },
  ];

  return <Table columns={columns} dataSource={categories} pagination={false} />;
};

export default ListCategoriesTable;
