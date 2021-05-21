import { FC, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Typography } from "antd";
import ListCategoriesTable from "../../components/Categories/ListCategoriesTable/ListCategoriesTable";
import ErrorAlert from "../../components/UI/ErrorAlert/ErrorAlert";
import PageContent from "../../components/UI/PageContent/PageContent";
import PageHeader from "../../components/UI/PageHeader/PageHeader";
import useHttp from "../../hooks/useHttp";
import { CategoriesResponse, Category } from "../../models/category";
import { useSelector } from "react-redux";
// import { selectAllCategories } from "./categoriesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCategories, selectAllCategories } from "./categoriesSlice";

const { Paragraph } = Typography;

const Categories: FC = () => {
  const categories = useAppSelector(selectAllCategories);
  const dispatch = useAppDispatch();

  const categoryStatus = useAppSelector((state) => state.categories.status);
  const error = useAppSelector((state) => state.categories.error);

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [categoryStatus, dispatch]);

  // const fetchCategories = useCallback(() => {
  //   const transformCategories = (categoriesResponse: CategoriesResponse) => {
  //     setCategories(categoriesResponse.categories);
  //   };

  //   fetchCategoriesRequest(
  //     {
  //       url: "/api/categories",
  //     },
  //     transformCategories
  //   );
  // }, [fetchCategoriesRequest]);

  // useEffect(() => {
  //   fetchCategories();
  // }, [fetchCategories]);

  const handleReloadCategories = () => {
    // fetchCategories();
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

export default Categories;
