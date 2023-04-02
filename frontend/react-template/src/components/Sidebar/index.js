import React from "react";
import { useSelector } from "react-redux";
import Feeds from "./Feeds";
import RecentCommunities from "./RecentCommunities";
import { usePop } from "../../context/UserPopcontext";

import "./Sidebar.css";
import Topics from "./Topics";

function Sidebar() {
  const currentUser = useSelector((state) => state.users.user);
  const { showSignin, setShowSignin, setDropUser } = usePop();
  return (
    <div

      className="sidebar"
    >
      <div className="sidebar-options">
        <Feeds />
        <RecentCommunities />
        <Topics />
      </div>
      {!currentUser && (
        <div className="sidebar-signup">
          <p className="s-s-text">
            Create an account to follow your favorite communities and start
            taking part in conversations.
          </p>
          <button
            onClick={() => {
              setShowSignin(!showSignin);
            }}
            className="s-s-joinButton"
          >
            Join Reddit
          </button>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
