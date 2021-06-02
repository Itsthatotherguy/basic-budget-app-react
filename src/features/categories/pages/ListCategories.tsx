import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import ListCategoriesTable from "../components/ListCategoriesTable/ListCategoriesTable";
import { selectAllCategories } from "../store/categoriesSlice";
import { useAppSelector } from "../../../app/hooks";
import PageHeader from "../../../app/components/PageHeader/PageHeader";
import PageContent from "../../../app/components/PageContent/PageContent";

const ListCategories: FC = () => {
  const categories = useAppSelector(selectAllCategories);

  return (
    <>
      <PageHeader
        title="Categories"
        extra={
          <Button type="primary" htmlType="button">
            <Link to="/categories/new">Add</Link>
          </Button>
        }
      />
      <PageContent>
        <ListCategoriesTable categories={categories} />
      </PageContent>
    </>
  );
};

export default ListCategories;
