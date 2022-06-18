import { useContext } from "react";
import { BrowserRouter, Router } from "react-router-dom";

import PublicRoute from "./PublicRoute";

import { Context } from "../context/AuthContext";
import history from "../services/history";

import AuthenticatedRoute from "./AuthenticatedRoute";
import Layout from "../components/Layout";
// import Layout from "../components/Layout";

const Routes = () => {
  const { authenticated } = useContext(Context);

  if (authenticated) {
    return (
      <>
        <Router history={history}>
          <BrowserRouter>
            <Layout component={<AuthenticatedRoute />} />
            {/* <AuthenticatedRoute /> */}
          </BrowserRouter>
        </Router>
      </>
    );
  }
  return (
    <Router history={history}>
      <BrowserRouter>
        <PublicRoute />
      </BrowserRouter>
    </Router>
  );
};

export default Routes;
