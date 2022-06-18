import { useContext } from "react";
import { Switch } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";

import AdminRoute from "../AdminRoute";

const AuthenticatedRoute = () => (
    <Switch>
        <AdminRoute exact path="/" component={() => <Dashboard />} />

        {/* caso a rota não exista */}
        {/* <AdminRoute path="*" component={() => <Redirect to="/" />} /> */}
    </Switch>
);

export default AuthenticatedRoute;
