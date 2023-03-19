import React, { useState, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as usersActions from "./store/users";
import * as subscriptionsActions from "./store/subscriptions";
import * as votesActions from "./store/votes";

import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Community from "./components/Community";
import SelectedPost from "./components/Feed/SelectedPost";
import SubmitPost from "./components/SubmitPost.js";
// import SubmitPost from "./components/Community/SubmitPost";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(usersActions.restoreTheUser()).then(async (res) => {
      const data = await res;
      dispatch(subscriptionsActions.getTheCommunitiesS(data._id));
      dispatch(votesActions.getTheUserVotes(data._id));
      setIsLoaded(true);
    });
  }, [dispatch]);
  return (
    <Switch>
      <Route exact path="/post/:id">
        <NavBar isLoaded={isLoaded} />
        <SelectedPost />
      </Route>
      <Route exact path="/">
        <div className="App">
          <NavBar isLoaded={isLoaded} />
          <Sidebar />
          <div className="page-body">
            <Feed />
          </div>
        </div>
      </Route>
      <Route exact path="/r/:communityName">
        <div className="App">
          <NavBar isLoaded={isLoaded} />
          <Community />
        </div>
      </Route>
      <Route exact path="/r/:communityName/submit">
        <div className="App">
          <NavBar isLoaded={isLoaded} />
          <SubmitPost />
        </div>
      </Route>
      <Route exact path="/test">
        <div className="App">
          <NavBar isLoaded={isLoaded} />
          <SubmitPost />
        </div>
      </Route>
    </Switch>
  );
}

export default App;
