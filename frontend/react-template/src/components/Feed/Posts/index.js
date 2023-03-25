import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { dataRender } from "../../../helper";
import PhotoPost from "./PhotoPost";
import VideoPost from "./VideoPost";
import LinkPost from "./LinkPost";
import TextPost from "./TextPost";
import * as postsActions from "../../../store/posts";
import "./Posts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHandPointUp,
  faStar,
  faChartBar,
} from "@fortawesome/free-regular-svg-icons";

function Posts({ search, type, user, communityId }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.users.user);
  const userVotes = useSelector((state) => state.votes);
  const posts = useSelector((state) => state.posts);
  const [newPosts, setNewPosts] = useState(null);
  const [sort, setSort] = useState("Hot");
  useEffect(() => {
    if (type === "home") {
      dispatch(postsActions.getTheHomePosts(sort)).then(async (res) => {
        const data = await res;
        setNewPosts(data);
      });
    }
    if (type === "all") {
      dispatch(postsActions.getThePosts(sort)).then(async (res) => {
        const data = await res;
        setNewPosts(data);
      });
    }
    if (type === "user") {
      dispatch(postsActions.getTheUserPosts(user._id, sort)).then(
        async (res) => {
          const data = await res;
          setNewPosts(data);
        }
      );
    }
    if (type === "community") {
      dispatch(postsActions.getTheCommunityPosts(communityId, sort)).then(
        async (res) => {
          const data = await res;
          setNewPosts(data);
        }
      );
    }
    return () => {
      setNewPosts(null);
    };
  }, [history.location.pathname, sort, user]);
  return (
    <div className="posts">
      {!search && (
        <>
          {type === "home" && <div className="posts-title">Your Feed</div>}

          <div className="posts-sorter">
            <button
              onClick={() => setSort("Hot")}
              className={`p-s-option ${sort === "Hot" && "p-s-chosen"}`}
            >
              <FontAwesomeIcon className="f-h-house" icon={faHandPointUp} />
              Hot
            </button>

            <button
              onClick={() => setSort("New")}
              className={`p-s-option ${sort === "New" && "p-s-chosen"}`}
            >
              <FontAwesomeIcon
                className="f-h-house ps-o-new-logo"
                icon={faStar}
              />
              New
            </button>
            <button
              onClick={() => setSort("Top")}
              className={`p-s-option ${sort === "Top" && "p-s-chosen"}`}
            >
              <FontAwesomeIcon
                className="f-h-house ps-o-top-logo"
                icon={faChartBar}
              />
              Top
            </button>
          </div>
        </>
      )}

      {newPosts &&
        dataRender(posts).map((ele) => {
          switch (ele.type) {
            case "text":
              return (
                <TextPost post={ele} user={currentUser} userVotes={userVotes} />
              );
            case "link":
              return (
                <LinkPost post={ele} user={currentUser} userVotes={userVotes} />
              );
            case "image":
              return (
                <PhotoPost
                  post={ele}
                  user={currentUser}
                  userVotes={userVotes}
                />
              );
            case "video":
              return (
                <VideoPost
                  post={ele}
                  user={currentUser}
                  userVotes={userVotes}
                />
              );
          }
        })}
    </div>
  );
}

export default Posts;
