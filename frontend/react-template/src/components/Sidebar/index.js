import React from "react";
import Feeds from "./Feeds";
import RecentCommunities from "./RecentCommunities";
import "./Sidebar.css";
import Topics from "./Topics";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <Feeds />
        <RecentCommunities />
        <Topics />
      </div>
      <div className="sidebar-signup">
        <p className="s-s-text">
          Create an account to follow your favorite communities and start taking
          part in conversations.
        </p>
        <button className="s-s-joinButton">Join Reddit</button>
      </div>
    </div>
  );
}

export default Sidebar;
