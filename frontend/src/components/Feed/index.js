import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Posts from "./Posts";
import Communities from "./Communities";
import Trending from "./Trending";
import { usePop } from "../../context/UserPopcontext";

import "./Feed.css";

function Feed({ type }) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const posts = useSelector((state) => state.posts);
  const { setDropUser } = usePop();

  return (
    <div onClick={() => setDropUser(false)} className="feed">
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
