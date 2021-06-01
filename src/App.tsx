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
  selectIsFetchingCategories,
} from "./features/categories/store/categoriesSlice";
import {
  fetchTransactions,
  selectIsFetchingTransactions,
} from "./features/transactions/store/transactionsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Card, Spin } from "antd";
import LoadingModal from "./app/components/LoadingModal/LoadingModal";

function App() {
  const dispatch = useAppDispatch();
  const isFetchingTransactions = useAppSelector((state) =>
    selectIsFetchingTransactions(state)
  );
  const isFetchingCategories = useAppSelector((state) =>
    selectIsFetchingCategories(state)
  );

  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    try {
      setIsLoadingData(true);

      dispatch(fetchCategories()).then((actionResult) => {
        unwrapResult(actionResult);
      });

      dispatch(fetchTransactions()).then((actionResult) => {
        unwrapResult(actionResult);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingData(false);
    }
  }, [dispatch]);

  useEffect(() => {
    setIsLoadingData(isFetchingCategories || isFetchingTransactions);
  }, [isFetchingTransactions, isFetchingCategories]);

  return (
    <Layout>
      {isLoadingData ? (
        <LoadingModal />
      ) : (
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
      )}
    </Layout>
  );
}

export default App;
