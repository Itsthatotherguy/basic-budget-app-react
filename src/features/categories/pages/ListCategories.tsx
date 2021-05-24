import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import ListCategoriesTable from "../components/ListCategoriesTable/ListCategoriesTable";
import ErrorAlert from "../../../app/components/ErrorAlert/ErrorAlert";
import { fetchCategories, selectAllCategories } from "../store/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import PageHeader from "../../../app/components/PageHeader/PageHeader";
import PageContent from "../../../app/components/PageContent/PageContent";

const ListCategories: FC = () => {
  const categories = useAppSelector(selectAllCategories);
  const categoryStatus = useAppSelector((state) => state.categories.status);
  const error = useAppSelector((state) => state.categories.error);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    switch (categoryStatus) {
      case "idle":
        setIsLoading(true);
        break;
      case "succeeded":
      case "fail":
        setIsLoading(false);
        break;
      default:
        break;
    }

    if (categoryStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [categoryStatus, dispatch]);

  const handleReloadCategories = () => {
    dispatch(fetchCategories());
  };

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
        {error && (
          <ErrorAlert
            message="We are unable to successfully fetch your categories. Click the
            button below to try again."
            reloadFn={handleReloadCategories}
          />
        )}
        <ListCategoriesTable isLoading={isLoading} categories={categories} />
      </PageContent>
    </>
  );
};

export default ListCategories;
