import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as redditorsActions from "../../store/redditors";
import * as commentActions from "../../store/comments";
import { dataRender } from "../../helper";
import Posts from "../Feed/Posts/index";
import SingleComment from "../Comments/SingleComment";
import EditUserPopup from "./EditUserPopup";
import AddPhotoFrom from "./AddPhotoFrom";
import { useEdit } from "../../context/EditContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faStar,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./User.css";

const User = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  const { showUserPicEdit, setShowUserPicEdit } = useEdit();

  const { username } = params;
  const currentUser = useSelector((state) => state.users.user);
  const redditor = useSelector((state) => state.redditor);
  const comments = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(redditorsActions.getTheRedditor(username)).then(async (res) => {
      const data = await res;
      dispatch(commentActions.getTheUserComments(data._id, "Hot"));
    });
  }, [history.location.pathname]);
  const [chosen, setChosen] = useState("posts");
  return (
    <div className="user">
      <div className="user-nav">
        <button
          onClick={() => setChosen("posts")}
          className={`u-n-button ${chosen === "posts" && "u-n-button-chosen"}`}
        >
          POSTS
        </button>
        <button
          onClick={() => setChosen("comments")}
          className={`u-n-button ${
            chosen === "comments" && "u-n-button-chosen"
          }`}
        >
          COMMENTS
        </button>
      </div>
      <div className="user-child">
        {dataRender(redditor).length ? (
          <>
            {chosen === "posts" && (
              <div>
                <Posts type="user" user={redditor} />
              </div>
            )}
            {chosen === "comments" && (
              <div className="sr-r-left">
                {dataRender(comments).length ? (
                  <>
                    {dataRender(comments).map((ele) => (
                      <SingleComment comment={ele} name="comment-search" />
                    ))}
                  </>
                ) : (
                  <div className="sr-r-left-nothing">
                    <FontAwesomeIcon
                      className="sr-r-l-n-top"
                      icon={faMagnifyingGlass}
                    />
                    <div className="sr-r-l-n-middle">
                      Hm... we couldn’t find any commentsd made by {username}
                    </div>
                  </div>
                )}
              </div>
            )}
            {
              // chosen === "comments"
            }

            <div className="u-c-card">
              <div className="u-c-c-top">
                {!redditor.profilePicture ? (
                  <FontAwesomeIcon className="u-c-c-t-image" icon={faUser} />
                ) : (
                  <img
                    className="u-c-c-t-image"
                    src={redditor.profilePicture}
                  />
                )}

                {redditor?._id === currentUser?._id && (
                  <AddPhotoFrom
                    container="user-add-photo"
                    drop="user-drop"
                    img="user-img"
                    type="user"
                  />
                )}
              </div>
              <div className="u-c-c-middle1">
                u/{redditor.username}
                {redditor?._id === currentUser?._id && (
                  <EditUserPopup user={redditor} />
                )}
              </div>
              <div className="u-c-c-bottom">
                <div className="u-c-c-bottom1">
                  <div className="u-c-c-b-title">Karma</div>
                  <div className="u-c-c-b-text">
                    <FontAwesomeIcon className="u-c-c-b-logo" icon={faStar} />
                    {"   "}
                    {redditor.karma}
                  </div>
                </div>
                <div className="u-c-c-bottom1">
                  <div className="u-c-c-b-title">Cake day</div>
                  <div className="u-c-c-b-text">
                    <FontAwesomeIcon
                      className="u-c-c-b-logo"
                      icon={faCalendar}
                    />
                    {"   "}
                    {dataRender(redditor).length &&
                      redditor.createdAt.slice(0, 10)}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default User;
