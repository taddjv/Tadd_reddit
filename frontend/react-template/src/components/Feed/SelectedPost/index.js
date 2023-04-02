import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as postActions from "../../../store/posts";
import * as communityActions from "../../../store/communities";
import * as commentActions from "../../../store/comments";
import {
  reactionCheck,
  setPostColor,
  setComColor,
  dataRender,
} from "../../../helper";
import { upvotePost, downvotePost } from "../../../helper/posts";
import { comment } from "../../../helper/comments";
import VideoPost from "../Posts/VideoPost";
import PhotoPost from "../Posts/PhotoPost";
import LinkPost from "../Posts/LinkPost";
import TextPost from "../Posts/TextPost";
import AboutCommunity from "../../Community/AboutCommunity";
import { usePop } from "../../../context/UserPopcontext";

import "./SelectedPost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import RulesCommunity from "../../Community/RulesCommunity";
import SingleComment from "../../Comments/SingleComment";

const SelectedPost = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = params;
  const { setDropUser, setShowLogin } = usePop();
  const post = useSelector((state) => state.posts);
  const community = useSelector((state) => state.communities.community);
  const currentUser = useSelector((state) => state.users.user);
  const userVotes = useSelector((state) => state.votes);
  const comments = useSelector((state) => state.comments);

  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    dispatch(postActions.getTheSinglePost(id)).then(async (res) => {
      const data = await res;
      dispatch(communityActions.getTheCommunity(data.community.name)).then(
        async (res) => {
          const data = await res;
          setComColor(data.colors[0], data.colors[1]);
          setPostColor(data.colors[1]);
        }
      );
      dispatch(commentActions.getThePostComments(data._id));
    });
    return () => {
      dispatch(postActions.clearThePosts());
      dispatch(commentActions.clearTheComments());
    };
  }, []);
  return (
    <>
      <div
        onClick={() => {
          history.goBack();
        }}
        className="selectedPost-background"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            setDropUser(false);
          }}
          className="selectedPost"
        >
          <div className="selectedPost-top">
            <div className="sp-t-left">
              {post[id] && (
                <>
                  <FontAwesomeIcon
                    onClick={
                      currentUser
                        ? upvotePost(post[id], currentUser, dispatch)
                        : (e) => {
                            e.stopPropagation();
                            setShowLogin(true);
                          }
                    }
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
                    onClick={
                      currentUser
                        ? downvotePost(post[id], currentUser, dispatch)
                        : (e) => {
                            e.stopPropagation();
                            setShowLogin(true);
                          }
                    }
                    className={`sp-t-l-downLogo ${
                      reactionCheck(userVotes, post[id]).downvote
                        ? "sp-t-l-downLogo-voted"
                        : null
                    }`}
                    icon={faArrowAltCircleDown}
                  />
                  <div className="sp-t-l-title">{post[id].title}</div>
                  <div className="sp-t-l-type">{post[id].type}</div>
                </>
              )}
            </div>
            <button
              onClick={() => {
                history.goBack();
              }}
              className="sp-t-right"
            >
              <FontAwesomeIcon className="sp-t-r-x" icon={faX} />
              Close
            </button>
          </div>
          <div className="selectedPost-bottom">
            <div className="selectedPost-bottom-left">
              {post[id] && (
                <>
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
                </>
              )}
              <div className="sp-comments">
                <div className="sp-comments-comment">
                  <textarea
                    className="sp-c-c-input"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="What are your thoughts?"
                  ></textarea>
                  <div className="sp-c-c-bottom">
                    <button
                      onClick={comment(
                        newComment,
                        post[id],
                        dispatch,
                        setNewComment
                      )}
                      className="sp-c-c-b-button"
                    >
                      Comment
                    </button>
                  </div>
                </div>
                <div className="sp-comments-sort">
                  <button className="sp-c-s-button">Sort By: Best</button>
                </div>
                {dataRender(comments).map((ele) => (
                  <SingleComment comment={ele} />
                ))}
              </div>
            </div>
            <div className="selectedPost-bottom-right">
              {community && (
                <>
                  <AboutCommunity community={community} user={currentUser} />
                  <RulesCommunity community={community} user={currentUser} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedPost;
