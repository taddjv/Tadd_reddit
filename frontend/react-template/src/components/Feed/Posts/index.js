import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postsActions from "../../../store/posts";
import { dataRender } from "../../../helper";
import PhotoPost from "./PhotoPost";
import VideoPost from "./VideoPost";
import LinkPost from "./LinkPost";
import TextPost from "./TextPost";
import "./Posts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faEllipsis,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCommentAlt,
  faFolder,
  faHandPointUp,
  faStar,
  faChartBar,
} from "@fortawesome/free-regular-svg-icons";

function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const currentUser = useSelector((state) => state.users.user);
  const userVotes = useSelector((state) => state.votes);

  useEffect(() => {
    dispatch(postsActions.getThePosts());
  }, []);

  return (
    <div className="posts">
      <div className="posts-title">Popular posts</div>
      <div className="posts-sorter">
        <button className="p-s-hot p-s-option">
          <FontAwesomeIcon className="f-h-house" icon={faHandPointUp} />
          Hot
        </button>

        <button className="p-s-new p-s-option">
          <FontAwesomeIcon className="f-h-house ps-o-new-logo" icon={faStar} />
          New
        </button>
        <button className="p-s-top p-s-option">
          <FontAwesomeIcon
            className="f-h-house ps-o-top-logo"
            icon={faChartBar}
          />
          Top
        </button>
      </div>
      {posts &&
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
