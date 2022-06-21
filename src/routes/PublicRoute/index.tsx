import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

const PublicRoute = () => (
  <Switch>
    <Route exact path="/" component={() => <Login />} />
    <Route path="/registrar" component={() => <Register />} />

    <Route path="*" component={() => <Redirect to="/" />} />
  </Switch>
);

export default PublicRoute;
