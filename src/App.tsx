import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Layout from "./components/UI/Layout/Layout";
import { Route, Switch } from "react-router";
import Home from "./features/home/Home";
import Categories from "./features/categories/Categories";
import Transactions from "./features/transactions/Transactions";
import NewCategory from "./features/categories/NewCategory";

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/categories">
          <Categories />
        </Route>
        <Route path="/categories/new">
          <NewCategory />
        </Route>
        <Route path="/transactions">
          <Transactions />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
