import React, { useState, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import * as usersActions from "./store/users";
import * as subscriptionsActions from "./store/subscriptions";
import * as votesActions from "./store/votes";

import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Community from "./components/Community";
import SelectedPost from "./components/Feed/SelectedPost";
import SubmitPost from "./components/SubmitPost.js";
import SearchResults from "./components/SearchResults/index";
import User from "./components/User";

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
    <>
      <NavBar isLoaded={isLoaded} />
      <Switch>
        <Route exact path="/post/:id">
          <SelectedPost />
        </Route>
        <Route exact path="/">
          <div className="App">
            <Sidebar />
            <Feed type="home" />
          </div>
        </Route>
        <Route exact path="/all">
          <div className="App">
            <Sidebar />
            <Feed type="all" />
          </div>
        </Route>
        <Route exact path="/r/:communityName">
          <div className="App">
            <Community />
          </div>
        </Route>
        <Route exact path="/u/:username">
          <div className="App">
            <Sidebar />
            <User />
          </div>
        </Route>
        <Route exact path="/search/:search">
          <div className="App">
            <Sidebar />
            <SearchResults />
          </div>
        </Route>
        <Route exact path="/r/:communityName/submit">
          <div className="App">
            <SubmitPost />
          </div>
        </Route>
        <Route exact path="/test">
          <div className="App">
            <SubmitPost />
          </div>
        </Route>
      </Switch>
    </>
  );
}

export default App;
