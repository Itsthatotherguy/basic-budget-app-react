import "./App.css";
import { Route, Switch } from "react-router";
import Layout from "./app/components/Layout/Layout";
import Home from "./features/home/Home";
import Categories from "./features/categories/Categories";
import Transactions from "./features/transactions/Transactions";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect, useState } from "react";
import { fetchCategories } from "./features/categories/store/categoriesSlice";
import { fetchTransactions } from "./features/transactions/store/transactionsSlice";
import LoadingModal from "./app/components/LoadingModal/LoadingModal";
import ErrorAlert from "./app/components/ErrorAlert/ErrorAlert";

function App() {
  const dispatch = useAppDispatch();
  const transactionsFetchingStatus = useAppSelector(
    (state) => state.transactions.fetchingStatus
  );
  const transactionsFetchingErrors = useAppSelector(
    (state) => state.transactions.fetchingErrors
  );
  const categoriesFetchingStatus = useAppSelector(
    (state) => state.categories.fetchingStatus
  );
  const categoriesFetchingErrors = useAppSelector(
    (state) => state.categories.fetchingErrors
  );

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchCategories(null));
    dispatch(fetchTransactions(null));
  }, [dispatch]);

  useEffect(() => {
    setIsLoadingData(
      transactionsFetchingStatus === "loading" ||
        categoriesFetchingStatus === "loading"
    );
  }, [transactionsFetchingStatus, categoriesFetchingStatus]);

  useEffect(() => {
    setErrors([...categoriesFetchingErrors, ...transactionsFetchingErrors]);
  }, [categoriesFetchingErrors, transactionsFetchingErrors]);

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
