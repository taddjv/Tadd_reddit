import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Posts from "./Posts";
import Communities from "./Communities";
import Trending from "./Trending";
import * as postsActions from "../../store/posts";

import "./Feed.css";

function Feed() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(postsActions.getThePosts());
  }, []);
  return (
    <div className="feed">
      <div className="feed-child">
        <Trending />
        <div className="feed-bottom">
          {posts && <Posts posts={posts} />}

          <Communities />
        </div>
      </div>
    </div>
  );
}

export default Feed;
