import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

const PublicRoute = () => (
  <Switch>
    <Route exact path="/" component={() => <Login />} />
    <Route path="/registrar" component={() => <Register />} />
  </Switch>
);

export default PublicRoute;
