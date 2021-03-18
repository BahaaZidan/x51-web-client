import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import XO from "./pages/XO/XO";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/g/xo/:roomID">
        <XO />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
