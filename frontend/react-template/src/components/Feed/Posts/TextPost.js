import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as voteActions from "../../../store/votes";
import * as postActions from "../../../store/posts";
import moment from "moment";
import { reactionCheck } from "../../../helper";
import "./Posts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faEllipsis,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCommentAlt,
  faFolder,
  faFileArchive,
  faArrowAltCircleRight,
} from "@fortawesome/free-regular-svg-icons";
function TextPost({ post, user, userVotes }) {
  const dispatch = useDispatch();
  const upvote = (e) => {
    e.preventDefault();
    dispatch(voteActions.upvoteThePost(post, user)).then(async (res) => {
      const data = await res;
      dispatch(postActions.upvoteThePost(post._id, data));
    });
  };
  const downvote = (e) => {
    e.preventDefault();
    dispatch(voteActions.downvoteThePost(post, user)).then(async (res) => {
      const data = await res;
      dispatch(postActions.downvoteThePost(post._id, data));
    });
  };
  return (
    <div className="posts-post pp-text">
      <div className="pp-left">
        <div onClick={upvote} className="pp-l-up">
          <FontAwesomeIcon
            className={`pp-l-up-logo ${
              reactionCheck(userVotes, post).upvote
                ? "pp-l-up-logo-voted"
                : null
            }`}
            icon={faArrowAltCircleUp}
          />
        </div>
        <div className="pp-l-count">{post.upVotes - post.downVotes}</div>
        <div onClick={downvote} className="pp-l-down">
          <FontAwesomeIcon
            className={`pp-l-down-logo ${
              reactionCheck(userVotes, post).downvote
                ? "pp-l-down-logo-voted"
                : null
            }`}
            icon={faArrowAltCircleDown}
          />
        </div>
      </div>
      <div className="pp-middle">
        <div className="pp-m-top">
          <div className="pp-m-top-left">
            {/*//! subreddit url pic ! */}
            <img
              className="pp-m-t-l-logo"
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpgs"
            />
            <div className="pp-m-t-l-community">r/{post.community.name}</div>
            <div className="pp-m-t-l-user">
              Posted by u/
              {post.author.username +
                " " +
                moment(post.createdAt).from(Date.now())}
            </div>
          </div>
          <div className="pp-m-top-right">
            <button className="pp-m-t-r-button">Join</button>
          </div>
        </div>
        <div className="pp-m-middle">
          <div className="pp-m-m-title">{post.title}</div>
          <div className="pp-m-m-content">{post.content}</div>
        </div>
        <div className="pp-m-bottom">
          <button className="pp-m-b-comments">
            <FontAwesomeIcon
              className="f-h-house pp-m-b-c-button"
              icon={faCommentAlt}
            />
            222 Comments
          </button>
          <button className="pp-m-b-share">
            <FontAwesomeIcon className="f-h-house" icon={faFolder} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default TextPost;
