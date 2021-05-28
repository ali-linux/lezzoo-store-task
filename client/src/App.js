import "antd/dist/antd.css";
import "./App.css";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import homePage from "./components/pages/HomePage";
import StoreDetailPage from "./components/pages/StoreDetailPage";
//REDUX
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import CategoryDetailPage from "./components/pages/CategoryDetailPage";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Alert />
            <Route exact path="/" component={homePage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/store/:id" component={StoreDetailPage} />
            <Route
              exact
              path="/store/:id/category/:category_id/"
              component={CategoryDetailPage}
            />
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
