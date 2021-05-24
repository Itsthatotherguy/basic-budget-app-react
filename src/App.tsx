import "./App.css";
import { Route, Switch } from "react-router";
import Layout from "./app/components/Layout/Layout";
import Home from "./features/home/Home";
import Categories from "./features/categories/Categories";
import Transactions from "./features/transactions/Transactions";
import NewCategory from "./features/categories/pages/NewCategory";
import EditCategory from "./features/categories/pages/EditCategory";

function App() {
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
