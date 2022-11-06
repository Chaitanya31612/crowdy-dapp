import React, { Suspense, lazy } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import { Spinner } from "reactstrap";
import {
  Homepage,
  CampaignPage,
  CreateCampaign,
  Dashboard,
  RequestPage,
  NotFoundPage,
} from "./pages";

import "./assets/scss/theme.scss";
import "./App.css";
import { EthProvider } from "./contexts/EthContext";
import Header from "./components/Header";

// const Dashboard = lazy(() => import("./pages/Dashboard"));
// const CreateCampaign = lazy(() => import("./pages/CreateCampaign"));
// const CampaignPage = lazy(() => import("./pages/CampaignPage"));
// const RequestPage = lazy(() => import("./pages/RequestPage"));
// const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
// const Homepage = lazy(() => import("./pages/Homepage"));

const App = () => {
  return (
    <>
      <Suspense
        fallback={
          <div
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner>loading...</Spinner>
          </div>
        }
      >
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <EthProvider>
              <Header />
              <Switch>
                {/* <Route exact path="/" component={Dashboard} /> */}
                {/* <Route exact path="/home" component={Homepage} /> */}
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/campaigns/new" component={CreateCampaign} />
                <Route exact path="/campaigns/:id" component={CampaignPage} />
                <Route
                  exact
                  path="/campaigns/:id/requests"
                  component={RequestPage}
                />
                <Route
                  path="/connect"
                  component={() => {
                    return <Redirect to="/dashboard" />;
                  }}
                />
                <Route
                  path="/getstarted"
                  component={() => {
                    return <Redirect to="/dashboard" />;
                  }}
                />
                <Route path="*" component={NotFoundPage} />
              </Switch>
            </EthProvider>
            {/* <Redirect from="*" to="/404" /> */}
          </Switch>
        </Router>
      </Suspense>
    </>
  );
};

export default App;
