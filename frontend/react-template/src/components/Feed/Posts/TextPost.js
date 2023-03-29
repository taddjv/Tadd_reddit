import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { reactionCheck, userSubbed } from "../../../helper";
import {
  upvotePost,
  downvotePost,
  subscribeViaPost,
} from "../../../helper/posts";
import DeletePost from "./DeletePost";

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
  faUser,
  faFileArchive,
  faArrowAltCircleRight,
} from "@fortawesome/free-regular-svg-icons";
function TextPost({ post, user, userVotes, individual, community }) {
  const dispatch = useDispatch();
  const subscriptionStatus = useSelector((state) => state.subscriptions);

  const postClass = individual ? "sp-b-post" : "pp-text";
  const contentClass = individual ? "sp-b-content" : "pp-m-m-content";
  const leftClass = individual ? "sp-b-left" : "pp-left";
  return (
    <NavLink to={`/post/${post._id}`} className={`posts-post ${postClass}`}>
      <div className={leftClass}>
        <div onClick={upvotePost(post, user, dispatch)} className="pp-l-up">
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
        <div onClick={downvotePost(post, user, dispatch)} className="pp-l-down">
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
            {!community && (
              <>
                {post.community.profilePicture ? (
                  <img
                    className="pp-m-t-l-logo"
                    src={post.community.profilePicture}
                  />
                ) : (
                  <FontAwesomeIcon className="pp-m-t-l-logo" icon={faUser} />
                )}
                <NavLink
                  to={`/r/${post.community.name}`}
                  className="pp-m-t-l-community"
                >
                  r/{post.community.name}
                </NavLink>
              </>
            )}
            <div className="pp-m-t-l-user">
              Posted by u/
              {post.author.username +
                " " +
                moment(post.createdAt).from(Date.now())}
            </div>
          </div>
          <div className="pp-m-top-right">
            {userSubbed(subscriptionStatus, post.community._id) ? null : (
              <button
                onClick={subscribeViaPost(post, dispatch)}
                className="pp-m-t-r-button"
              >
                Join
              </button>
            )}
          </div>
        </div>
        <div className="pp-m-middle">
          <div className="pp-m-m-title">{post.title}</div>
          <div className={contentClass}>{post.content}</div>
        </div>
        <div className="pp-m-bottom">
          <button className="pp-m-b-button">
            <FontAwesomeIcon
              className="f-h-house pp-m-b-c-button"
              icon={faCommentAlt}
            />
            222 Comments
          </button>
          <button className="pp-m-b-button">
            <FontAwesomeIcon className="f-h-house" icon={faFolder} />
            Share
          </button>
          {post.author._id === user._id && <DeletePost post={post} />}
        </div>
      </div>
    </NavLink>
  );
}

export default TextPost;
