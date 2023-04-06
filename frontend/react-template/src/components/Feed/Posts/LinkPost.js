import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import {
  upvotePost,
  downvotePost,
  subscribeViaPost,
} from "../../../helper/posts";
import moment from "moment";
import { reactionCheck, userSubbed } from "../../../helper";
import DeletePost from "./DeletePost";
import { usePop } from "../../../context/UserPopcontext";

import "./Posts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCommentAlt,
  faFolder,
  faUser,
  faArrowAltCircleRight,
} from "@fortawesome/free-regular-svg-icons";

function LinkPost({ post, user, userVotes, individual, community }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const subscriptionStatus = useSelector((state) => state.subscriptions);

  const { setShowLogin } = usePop();

  const postClass = individual ? "sp-b-post" : "pp-link";
  const linkClass = individual ? "sb-b-m-link" : "pp-m-middle-link";
  const otherLinkClass = individual ? "sb-b-m-left-link" : "pp-m-m-left-link";
  const leftClass = individual ? "sp-b-left" : "pp-left";
  return (
    <div
      onClick={() => history.push(`/post/${post._id}`)}
      className={`posts-post ${postClass}`}
    >
      <div className={leftClass}>
        <div
          onClick={
            user
              ? upvotePost(post, user, dispatch)
              : (e) => {
                  e.stopPropagation();
                  setShowLogin(true);
                }
          }
          className="pp-l-up"
        >
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
        <div
          onClick={
            user
              ? downvotePost(post, user, dispatch)
              : (e) => {
                  e.stopPropagation();
                  setShowLogin(true);
                }
          }
          className="pp-l-down"
        >
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
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    history.push(`/r/${post.community.name}`);
                  }}
                  className="pp-m-t-l-community"
                >
                  r/{post.community.name}
                </div>
              </>
            )}
            <div
              onClick={(e) => {
                e.stopPropagation();
                history.push(`/u/${post.author.username}`);
              }}
              className="pp-m-t-l-user"
            >
              Posted by u/
              {post.author.username +
                " " +
                moment(post.createdAt).from(Date.now())}
            </div>
          </div>
          <div className="pp-m-top-right">
            {userSubbed(subscriptionStatus, post.community._id) ? null : (
              <button
                onClick={
                  user
                    ? subscribeViaPost(post, dispatch)
                    : (e) => {
                        e.stopPropagation();
                        setShowLogin(true);
                      }
                }
                className="pp-m-t-r-button"
              >
                Join
              </button>
            )}
          </div>
        </div>
        <div className={`pp-m-middle ${linkClass}`}>
          <div className={`pp-m-m-left ${otherLinkClass}`}>
            <div className="pp-m-m-title">{post.title}</div>
            <div className="pp-m-m-link">{post.content}</div>
          </div>
          <div className="pp-m-m-right">
            <div className="p-m-m-r-link">
              <FontAwesomeIcon
                className="f-h-house p-m-m-r-link-logo"
                icon={faLink}
              />
              <div className="p-m-m-r-l-logo-container">
                <FontAwesomeIcon
                  className="f-h-house p-m-m-r-l-logo"
                  icon={faArrowAltCircleRight}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pp-m-bottom">
          <button className="pp-m-b-button">
            <FontAwesomeIcon
              className="f-h-house pp-m-b-c-button"
              icon={faCommentAlt}
            />
            {post.commentCount} Comments
          </button>
          <button className="pp-m-b-button">
            <FontAwesomeIcon className="f-h-house" icon={faFolder} />
            Share
          </button>
          {post.author._id === user?._id && <DeletePost post={post} />}
        </div>
      </div>
    </div>
  );
}

export default LinkPost;
