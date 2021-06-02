import "./App.css";
import { Route, Switch } from "react-router";
import Layout from "./app/components/Layout/Layout";
import Home from "./features/home/Home";
import Categories from "./features/categories/Categories";
import Transactions from "./features/transactions/Transactions";
import NewCategory from "./features/categories/pages/NewCategory";
import EditCategory from "./features/categories/pages/EditCategory";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect, useState } from "react";
import {
  fetchCategories,
  selectCategoriesStatus,
} from "./features/categories/store/categoriesSlice";
import {
  fetchTransactions,
  selectTransactionsStatus,
} from "./features/transactions/store/transactionsSlice";
import LoadingModal from "./app/components/LoadingModal/LoadingModal";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorAlert from "./app/components/ErrorAlert/ErrorAlert";

function App() {
  const dispatch = useAppDispatch();
  const transactionsStatus = useAppSelector((state) =>
    selectTransactionsStatus(state)
  );
  const categoriesStatus = useAppSelector((state) =>
    selectCategoriesStatus(state)
  );

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        unwrapResult(await dispatch(fetchCategories(null)));
        unwrapResult(await dispatch(fetchTransactions(null)));
      } catch (err) {
        const errors: string[] = err;

        setErrors(errors);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setIsLoadingData(
      transactionsStatus === "loading" || categoriesStatus === "loading"
    );
  }, [transactionsStatus, categoriesStatus]);

  if (isLoadingData) {
    return (
      <Layout>
        <LoadingModal />
      </Layout>
    );
  }

  if (errors.length > 0) {
    return (
      <Layout>
        <ErrorAlert errors={errors} />
      </Layout>
    );
  }

  return (
    <Layout>
      <Switch>
        <Route path="/categories/:categoryId/edit">
          <EditCategory />
        </Route>
        <Route path="/categories/new">
          <NewCategory />
        </Route>
        <Route path="/categories">
          <Categories />
        </Route>
        <Route path="/transactions">
          <Transactions />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
