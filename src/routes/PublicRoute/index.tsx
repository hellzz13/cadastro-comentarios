import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Login from "../../pages/Login";

const PublicRoute = () => (
    <Switch>
        <Route exact path="/" component={() => <Login />} />
    </Switch>
);

export default PublicRoute;
