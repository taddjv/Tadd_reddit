import React, { useState, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
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
        <Routes>
          <Route path="/r/:communityName/submit" element={<SubmitPost />} />
          <Route path="/r/:communityName" element={<Community />} />
          <Route
            path="/u/:username"
            element={
              <>
                <Sidebar />
                <User />
              </>
            }
          />
          <Route path="/post/:id" element={<SelectedPost />} />
          <Route
            path="/all"
            element={
              <>
                <Sidebar />
                <Feed type="all" />
              </>
            }
          />
          <Route
            path="/search/:search"
            element={
              <>
                <Sidebar />
                <SearchResults />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Sidebar />
                <Feed type="home" />
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
