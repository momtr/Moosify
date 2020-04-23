import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";
import LandingPage from "./LandingPage";
import Mood from "./Mood";


ReactDOM.render(
<Router>
    <div>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route path="/mood">
        <Mood />
      </Route>
    </div>
</Router>, document.getElementById("root"));
