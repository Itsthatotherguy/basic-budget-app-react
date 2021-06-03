import React, { FC } from "react";
import { Button } from "antd";
import PageContent from "../../app/components/PageContent/PageContent";
import AddCategoryModal from "./components/AddCategoryModal/AddCategoryModal";
import ListCategoriesTable from "./components/ListCategoriesTable/ListCategoriesTable";
import UpdateCategoryModal from "./components/UpdateCategoryModal/UpdateCategoryModal";
import { showNewCategoryModal } from "./store/categoriesSlice";
import { useAppDispatch } from "../../app/hooks";
import PageHeader from "../../app/components/PageHeader/PageHeader";

const ListCategories: FC = () => {
  const dispatch = useAppDispatch();

  const handleClickNewCategory = () => {
    dispatch(showNewCategoryModal());
  };

  return (
    <>
      <PageHeader
        title="Categories"
        extra={
          <Button
            type="primary"
            htmlType="button"
            onClick={handleClickNewCategory}
          >
            Add
          </Button>
        }
      />
      <PageContent>
        <ListCategoriesTable />
      </PageContent>
      <AddCategoryModal />
      <UpdateCategoryModal />
    </>
  );
};

export default ListCategories;
