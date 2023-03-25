import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Posts from "./Posts";
import Communities from "./Communities";
import Trending from "./Trending";
import * as postsActions from "../../store/posts";

import "./Feed.css";

function Feed({ type }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const posts = useSelector((state) => state.posts);

  return (
    <div className="feed">
      <div className="feed-child">
        {/* {type === "home" && <Trending />} */}
        <div className="feed-bottom">
          <Posts type={type} />

          <Communities />
        </div>
      </div>
    </div>
  );
}

export default Feed;
