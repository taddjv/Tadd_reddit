import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { dataRender, setPostColor, checkMode } from "../../../helper";
import PhotoPost from "./PhotoPost";
import VideoPost from "./VideoPost";
import LinkPost from "./LinkPost";
import TextPost from "./TextPost";
import * as postsActions from "../../../store/posts";
import "./Posts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  faHandPointUp,
  faStar,
  faChartBar,
} from "@fortawesome/free-regular-svg-icons";
import SpinLogo from "../../../images/SpinLogo";

function Posts({ search, type, user, community }) {
  const history = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const posts = useSelector((state) => state.posts);
  const currentUser = useSelector((state) => state.users.user);
  const userVotes = useSelector((state) => state.votes);
  const [empty, setEmpty] = useState(false);
  const [sort, setSort] = useState("Hot");

  useEffect(() => {
    if (type === "home") {
      dispatch(postsActions.getTheHomePosts(sort)).then(async (res) => {
        const data = await res;
        console.log(data);
        if (!data.length) setEmpty(true);
      });
    }
    if (type === "all") {
      dispatch(postsActions.getThePosts(sort)).then(async (res) => {
        const data = await res;
        if (!data.length) setEmpty(true);
      });
    }
    if (type === "user") {
      dispatch(postsActions.getTheUserPosts(user._id, sort)).then(
        async (res) => {
          const data = await res;
          if (!data.length) setEmpty(true);
        }
      );
    }
    if (type === "community") {
      dispatch(postsActions.getTheCommunityPosts(community._id, sort)).then(
        async (res) => {
          const data = await res;
          if (!data.length) setEmpty(true);
          if (data.length) {
            setPostColor(data[0].community.colors[1]);
          }
        }
      );
    }

    if (location.pathname.startsWith("/search/")) {
      return;
    } else {
      return () => {
        checkMode();
        setEmpty(false);
        dispatch(postsActions.clearThePosts());
      };
    }
  }, [location.pathname, sort, user, community]);
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
              onClick={() => setSort("Comment")}
              className={`p-s-option ${sort === "Comment" && "p-s-chosen"}`}
            >
              <FontAwesomeIcon
                className="f-h-house ps-o-top-logo"
                icon={faChartBar}
              />
              Most Comments
            </button>
          </div>
        </>
      )}

      {dataRender(posts).length ? (
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
        })
      ) : (
        <>{!empty && <SpinLogo />}</>
      )}
      {empty && (
        <div className="sr-r-left-nothing">
          <FontAwesomeIcon className="sr-r-l-n-top" icon={faMagnifyingGlass} />
          <div className="sr-r-l-n-middle">No posts yet !</div>
        </div>
      )}
      <div className="empty-post"></div>
    </div>
  );
}

export default Posts;
