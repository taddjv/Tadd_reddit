import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function RecentCommunities() {
  //! use the history to determine the 3 recent communities
  //! then fetch the communities from the database
  //! use useEffect to load the new communities
  return (
    <div className="recentCommunities">
      <div className="rc-title">RECENT COMMUNITIES</div>
      {/* <NavLink to="/"> */}
      <div className="rc-community1">
        <img src="https://imageio.forbes.com/specials-images/imageserve/5ed68e8310716f0007411996/A-black-screen--like-the-one-that-overtook-the-internet-on-the-morning-of-June-2-/960x0.jpg?format=jpg&width=960" />
        <span className="rc-c1-text">r/hello</span>
      </div>
      {/* </NavLink> */}
      {/* <NavLink to="/"> */}
      <div className="rc-community2">
        <img src="https://imageio.forbes.com/specials-images/imageserve/5ed68e8310716f0007411996/A-black-screen--like-the-one-that-overtook-the-internet-on-the-morning-of-June-2-/960x0.jpg?format=jpg&width=960" />
        <span className="rc-c2-text">r/hello</span>
      </div>
      {/* </NavLink> */}
      {/* <NavLink to="/"> */}
      <div className="rc-community3">
        <img src="https://imageio.forbes.com/specials-images/imageserve/5ed68e8310716f0007411996/A-black-screen--like-the-one-that-overtook-the-internet-on-the-morning-of-June-2-/960x0.jpg?format=jpg&width=960" />
        <span className="rc-c3-text">r/hello</span>
      </div>
      {/* </NavLink> */}
    </div>
  );
}

export default RecentCommunities;
