import React, { useState, useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as usersActions from "./store/users";

import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import UserDropDown from "./components/NavBar/UserDropDown";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(usersActions.restoreTheUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    <Switch>
      <Route exact path="/">
        <div className="App">
          <NavBar isLoaded={isLoaded} />
          <Sidebar />
          <div className="page-body">
            <Feed />
          </div>
        </div>
      </Route>
      <Route exact path="/test">
        <UserDropDown />
      </Route>
    </Switch>
  );
}

export default App;
