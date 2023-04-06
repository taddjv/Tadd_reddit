import React, { useState, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import * as usersActions from "./store/users";
import * as subscriptionsActions from "./store/subscriptions";
import * as votesActions from "./store/votes";
import { usePop } from "./context/UserPopcontext";
import { checkMode } from "./helper";

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
  const { setDropUser } = usePop();
  useEffect(() => {
    checkMode();

    dispatch(usersActions.restoreTheUser()).then(async (res) => {
      const data = await res;
      dispatch(subscriptionsActions.getTheCommunitiesS(data._id));
      dispatch(votesActions.getTheUserVotes(data._id));
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <div
        onClick={() => {
          setDropUser(false);
        }}
        className="App"
      >
        <NavBar isLoaded={isLoaded} />
        <Switch>
          <Route exact path="/post/:id">
            <SelectedPost />
          </Route>
          <Route exact path="/">
            <Sidebar />
            <Feed type="home" />
          </Route>
          <Route exact path="/all">
            <Sidebar />
            <Feed type="all" />
          </Route>
          <Route exact path="/r/:communityName">
            <Community />
          </Route>
          <Route exact path="/u/:username">
            <Sidebar />
            <User />
          </Route>
          <Route exact path="/search/:search">
            <Sidebar />
            <SearchResults />
          </Route>
          <Route exact path="/r/:communityName/submit">
            <SubmitPost />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
