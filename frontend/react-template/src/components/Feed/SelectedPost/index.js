import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as voteActions from "../../../store/votes";
import * as postActions from "../../../store/posts";
import moment from "moment";
import { reactionCheck } from "../../../helper";
import VideoPost from "../Posts/VideoPost";
import PhotoPost from "../Posts/PhotoPost";
import LinkPost from "../Posts/LinkPost";
import TextPost from "../Posts/TextPost";
import AboutCommunity from "../../Community/AboutCommunity";

import "./SelectedPost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faEllipsis,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import {
  faCommentAlt,
  faFolder,
  faFileArchive,
} from "@fortawesome/free-regular-svg-icons";
import RulesCommunity from "../../Community/RulesCommunity";

const SelectedPost = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = params;

  const post = useSelector((state) => state.posts);
  const currentUser = useSelector((state) => state.users.user);
  const userVotes = useSelector((state) => state.votes);

  const upvote = (e) => {
    e.preventDefault();
    dispatch(voteActions.upvoteThePost(post[id], currentUser)).then(
      async (res) => {
        const data = await res;
        dispatch(postActions.upvoteThePost(post[id]._id, data));
      }
    );
  };
  const downvote = (e) => {
    e.preventDefault();
    dispatch(voteActions.downvoteThePost(post[id], currentUser)).then(
      async (res) => {
        const data = await res;
        dispatch(postActions.downvoteThePost(post[id]._id, data));
      }
    );
  };
  return (
    <>
      {post[id] && (
        <div
          onClick={() => history.goBack()}
          className="selectedPost-background"
        >
          <div onClick={(e) => e.stopPropagation()} className="selectedPost">
            <div className="selectedPost-top">
              <div className="sp-t-left">
                <FontAwesomeIcon
                  onClick={upvote}
                  className={`sp-t-l-upLogo        ${
                    reactionCheck(userVotes, post[id]).upvote
                      ? "sp-t-l-upLogo-voted"
                      : null
                  }
                  `}
                  icon={faArrowAltCircleUp}
                />
                <div className="sp-t-l-count">
                  {post[id].upVotes - post[id].downVotes}
                </div>
                <FontAwesomeIcon
                  onClick={downvote}
                  className={`sp-t-l-downLogo ${
                    reactionCheck(userVotes, post[id]).downvote
                      ? "sp-t-l-downLogo-voted"
                      : null
                  }`}
                  icon={faArrowAltCircleUp}
                />
                <div className="sp-t-l-title">{post[id].title}</div>
                <div className="sp-t-l-type">{post[id].type}</div>
              </div>
              <button className="sp-t-right">
                <FontAwesomeIcon className="sp-t-r-x" icon={faX} />
                Close
              </button>
            </div>
            <div className="selectedPost-bottom">
              <div className="selectedPost-bottom-left">
                {post[id].type === "video" && (
                  <VideoPost
                    post={post[id]}
                    user={currentUser}
                    userVotes={userVotes}
                    individual={true}
                  />
                )}
                {post[id].type === "image" && (
                  <PhotoPost
                    post={post[id]}
                    user={currentUser}
                    userVotes={userVotes}
                    individual={true}
                  />
                )}
                {post[id].type === "link" && (
                  <LinkPost
                    post={post[id]}
                    user={currentUser}
                    userVotes={userVotes}
                    individual={true}
                  />
                )}
                {post[id].type === "text" && (
                  <>
                    <TextPost
                      post={post[id]}
                      user={currentUser}
                      userVotes={userVotes}
                      individual={true}
                    />
                  </>
                )}
                <div className="sp-comments">
                  <div className="sp-comments-comment">
                    <textarea
                      className="sp-c-c-input"
                      placeholder="What are your thoughts?"
                    ></textarea>
                    <div className="sp-c-c-bottom">
                      <button className="sp-c-c-b-button">Comment</button>
                    </div>
                  </div>
                  <div className="sp-comments-sort">
                    <button className="sp-c-s-button">Sort By: Best</button>
                  </div>
                </div>
              </div>
              <div className="selectedPost-bottom-right">
                <AboutCommunity
                  community={post[id].community}
                  user={currentUser}
                />
                <RulesCommunity
                  community={post[id].community}
                  user={currentUser}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedPost;
