import React, { Suspense } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import { Spinner } from "reactstrap";
import { CreateCampaign, Dashboard } from "./pages";

import "./assets/scss/theme.scss";
import "./App.css";
import NotFoundPage from "./pages/NotFoundPage";
import { EthProvider } from "./contexts/EthContext";

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
          <EthProvider>
            <Switch>
              {/* <Route exact path="/" component={() => <h1>home</h1>} /> */}
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/new" component={CreateCampaign} />
              <Route exact path="/404" component={NotFoundPage} />
              <Redirect from="*" to="/404" />
            </Switch>
          </EthProvider>
        </Router>
      </Suspense>
    </>
  );
};

export default App;
