import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import * as voteActions from "../../store/votes";
import * as commentActions from "../../store/comments";
import { reactionCheck, isOwner } from "../../helper";
import { upvoteComment, downvoteComment, remove } from "../../helper/comments";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { faComment, faUser } from "@fortawesome/free-regular-svg-icons";

const SingleComment = ({ comment }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.users.user);
  const userVotes = useSelector((state) => state.votes);

  const [showOp, setShowOp] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newComment, setNewComment] = useState(comment.content);

  const editComment = (e) => {
    e.preventDefault();
    if (newComment) {
      dispatch(
        commentActions.editTheComment({ content: newComment }, comment._id)
      ).then(() => setEdit(false));
    }
  };

  return (
    <div onClick={() => setShowOp(false)} className="comment">
      <div className="comment-left">
        {comment.author.profilePicture ? (
          <img className="co-l-picture" src={comment.author.profilePicture} />
        ) : (
          <FontAwesomeIcon className="co-l-picture" icon={faUser} />
        )}

        <div className="co-l-line"></div>
      </div>
      <div className="comment-right">
        <div className="co-r-top">
          <span className="co-r-t-name">{comment.author.username}</span>
          <span className="co-r-time">
            {moment(comment.createdAt).from(Date.now())}
          </span>
        </div>
        {edit ? (
          <textarea
            className="co-r-middle-input"
            value={newComment}
            onChange={(e) => {
              if (e.target.value) {
                setNewComment(e.target.value);
              }
            }}
          ></textarea>
        ) : (
          <div className="co-r-middle">{comment.content}</div>
        )}

        <div className="co-r-bottom">
          <FontAwesomeIcon
            className={`co-r-b-up ${
              reactionCheck(userVotes, comment).upvote
                ? "co-r-b-up-voted"
                : null
            }`}
            onClick={upvoteComment(comment, currentUser, dispatch)}
            icon={faArrowAltCircleUp}
          />

          <div className="co-r-b-count">
            {comment.upVotes - comment.downVotes}
          </div>
          <FontAwesomeIcon
            className={`co-r-b-down ${
              reactionCheck(userVotes, comment).downvote
                ? "co-r-b-down-voted"
                : null
            }`}
            onClick={downvoteComment(comment, currentUser, dispatch)}
            icon={faArrowAltCircleDown}
          />
          <button className="pp-m-b-button">
            <FontAwesomeIcon className="f-h-house" icon={faComment} />
            reply
          </button>

          {edit ? (
            <>
              <button onClick={editComment} className="co-d-button-confirm">
                Confirm
              </button>
              <button
                onClick={() => setEdit(false)}
                className="co-d-button-cancel"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {isOwner(comment, currentUser) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowOp(!showOp);
                  }}
                  className="pp-m-b-button commentOption"
                >
                  <FontAwesomeIcon className="f-h-house" icon={faEllipsis} />
                  {showOp && (
                    <div className="co-drop">
                      <button
                        onClick={() => setEdit(true)}
                        className="co-d-button-edit"
                      >
                        EDIT
                      </button>
                      <button
                        onClick={remove(comment, dispatch)}
                        className="co-d-button-delete"
                      >
                        DELETE
                      </button>
                    </div>
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
