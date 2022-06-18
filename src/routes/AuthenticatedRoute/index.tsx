import { useContext } from "react";
import { Switch } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import Posts from "../../pages/Posts";

import AdminRoute from "../AdminRoute";

const AuthenticatedRoute = () => (
  <Switch>
    <AdminRoute exact path="/" component={() => <Dashboard />} />
    <AdminRoute path="/posts" component={() => <Posts />} />

    {/* caso a rota não exista */}
    {/* <AdminRoute path="*" component={() => <Redirect to="/" />} /> */}
  </Switch>
);

export default AuthenticatedRoute;
