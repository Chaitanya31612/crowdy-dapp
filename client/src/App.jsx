import React, { Suspense } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import { Spinner } from "reactstrap";
import { CampaignPage, CreateCampaign, Dashboard } from "./pages";

import "./assets/scss/theme.scss";
import "./App.css";
import NotFoundPage from "./pages/NotFoundPage";
import { EthProvider } from "./contexts/EthContext";
import Header from "./components/Header";

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
            {/* <Route exact path="/" component={() => <h1>home</h1>} /> */}
            <EthProvider>
              {/* <Header /> */}
              <Switch>
                <Route exact path="/" component={Dashboard} />
                {/* <Route exact path="/dashboard" component={Dashboard} /> */}
                <Route exact path="/campaigns/new" component={CreateCampaign} />
                <Route exact path="/campaigns/:id" component={CampaignPage} />
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
