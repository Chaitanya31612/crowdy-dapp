import React, { Suspense } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Spinner } from "reactstrap";
import { Dashboard } from "./pages";

import "./assets/scss/theme.scss";
import "./App.css";
import NotFoundPage from "./pages/NotFoundPage";

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
            <Route exact path="/" component={Dashboard} />

            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </Suspense>
    </>
  );
};

export default App;
