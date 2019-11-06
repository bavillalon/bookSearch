import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Saved";

import NoMatch from "./pages/NoMatch";
import Search from "./pages/Search"
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/saved" component={Books} />
          <Route exact path="/search" component={Search} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
