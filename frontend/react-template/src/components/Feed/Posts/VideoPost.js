import React from "react";
import "./Posts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCommentAlt,
  faFolder,
  faFileArchive,
} from "@fortawesome/free-regular-svg-icons";

function VideoPost() {
  return (
    <div className="posts-post pp-video">
      <div className="pp-left">
        <div className="pp-l-up">
          <FontAwesomeIcon
            className="f-h-house pp-l-up-logo"
            icon={faArrowAltCircleUp}
          />
        </div>
        <div className="pp-l-count">333</div>
        <div className="pp-l-down">
          <FontAwesomeIcon
            className="f-h-house pp-l-down-logo"
            icon={faArrowAltCircleDown}
          />
        </div>
      </div>
      <div className="pp-middle">
        <div className="pp-m-top">
          <div className="pp-m-top-left">
            <img
              className="pp-m-t-l-logo"
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpgs"
            />
            <div className="pp-m-t-l-community">r/$murderedByWords$</div>
            <div className="pp-m-t-l-user">
              Posted by u/$userInQuestion$ $3 hours$ ago
            </div>
          </div>
          <div className="pp-m-top-right">
            <button className="pp-m-t-r-button">Join</button>
          </div>
        </div>
        <div className="pp-m-middle">
          <div className="pp-m-m-title">Murdering with kindness</div>
          <div className="pp-m-m-link">
            https://photogeeksteven.files.wordpress.com/2014/06/default-user-icon-profile.png
          </div>
          <video className="pp-m-m-video" controls>
            <source
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              type="video/mp4"
            />
          </video>
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
          <button className="pp-m-b-save">
            <FontAwesomeIcon className="f-h-house" icon={faFileArchive} />
            Save
          </button>
          <button className="pp-m-b-other">
            <FontAwesomeIcon className="pp-m-b-o-button" icon={faEllipsis} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoPost;
