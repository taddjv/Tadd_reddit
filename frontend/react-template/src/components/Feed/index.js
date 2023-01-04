import React from "react";
import Posts from "./Posts";
import Communities from "./Communities";
import Trending from "./Trending";
import "./Feed.css";

function Feed() {
  return (
    <div className="feed">
      <Trending />
      <Posts />
      <Communities />
    </div>
  );
}

export default Feed;
