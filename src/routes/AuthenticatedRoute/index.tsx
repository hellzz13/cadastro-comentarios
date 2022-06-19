import { Switch } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import PostDetails from "../../pages/PostDetails";
import Posts from "../../pages/Posts";

import AdminRoute from "../AdminRoute";

const AuthenticatedRoute = () => (
  <Switch>
    <AdminRoute exact path="/" component={() => <Dashboard />} />
    <AdminRoute path="/posts" component={() => <Posts />} />
    <AdminRoute path="/post/:id" component={() => <PostDetails />} />

    {/* caso a rota não exista */}
    {/* <AdminRoute path="*" component={() => <Redirect to="/" />} /> */}
  </Switch>
);

export default AuthenticatedRoute;
