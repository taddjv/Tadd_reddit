import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as userActions from "../../store/users";
import * as postsActions from "../../store/posts";
import * as redditorsActions from "../../store/redditors";
import moment from "moment";
import { dataRender } from "../../helper";
import Posts from "../Feed/Posts/index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faStar } from "@fortawesome/free-regular-svg-icons";
import "./User.css";

const User = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  const { username } = params;
  const currentUser = useSelector((state) => state.users.user);
  const redditor = useSelector((state) => state.redditor);
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(redditorsActions.getTheRedditor(username));
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
            <div>
              <Posts type="user" user={redditor} />
            </div>
            <div className="u-c-card">
              <div className="u-c-c-top">
                <img className="u-c-c-t-image" src={redditor.profilePicture} />
              </div>
              <div className="u-c-c-middle1">u/{redditor.username}</div>
              <div className="u-c-c-bottom">
                <div className="u-c-c-bottom1">
                  <div className="u-c-c-b-title">Karma</div>
                  <div className="u-c-c-b-text">
                    <FontAwesomeIcon className="u-c-c-b-logo" icon={faStar} />{" "}
                    {redditor.karma}
                  </div>
                </div>
                <div className="u-c-c-bottom1">
                  <div className="u-c-c-b-title">Cake day</div>
                  <div className="u-c-c-b-text">
                    <FontAwesomeIcon
                      className="u-c-c-b-logo"
                      icon={faCalendar}
                    />{" "}
                    {redditor.createdAt.slice(0, 10)}
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
