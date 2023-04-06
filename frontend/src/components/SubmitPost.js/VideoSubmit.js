import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as postsActions from "../../store/posts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const VideoSubmit = ({ community }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState(null);
  const [tempVideo, setTempVideo] = useState(null);
  const [video, setVideo] = useState(null);
  const [viewVideo, setViewVideo] = useState(false);

  const [titleError, setTitleError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [vidLoadError, setVidLoadError] = useState(false);

  const post = (e) => {
    e.preventDefault();
    const data = {
      title: title,
      content: video,

    };

    dispatch(postsActions.postThePost(data, "video", community._id))
      .then(() => {
        history.goBack();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data.errors.join(" ").includes("title")) {
          setTitleError(true);
        }
        if (data.errors.join(" ").includes("Video")) {
          setVideoError(true);
        }
      });
  };
  return (
    <>
      <input
        className={`suP-l-c-i-title ${titleError && "suP-l-c-i-error"}`}
        type="text"
        placeholder="Title"
        onChange={(e) => {
          if (e.target.value) {
            setTitle(e.target.value);
            setTitleError(false);
          } else {
            setTitle(null);
          }
        }}
      ></input>
      <div className={`suP-l-c-i-file ${vidLoadError && "suP-l-c-i-error"}`}>
        {video ? (
          <>
            <div className="suP-l-c-i-f-top">
              {vidLoadError ? (
                <div>Broken Video</div>
              ) : (
                <video
                  onLoad={() => setVideo(tempVideo)}
                  onError={() => setVidLoadError(true)}
                  hidden={vidLoadError}
                  className="suP-l-c-i-f-t-img"
                  controls
                >
                  <source src={video} type="video/mp4" />
                </video>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="suP-l-c-i-f-top">
              <input
                type="file"
                id="c-profile-input"
                accept="video/*"

                // onChange={imageToFile}
                // value={comImage}
              />
              Drag and drop video or{" "}
              <label
                for="c-profile-input"
                className={`c-profile-input ${videoError && "suP-l-c-i-error"}`}
              >
                Upload
              </label>
            </div>
            <div className="suP-l-c-i-f-bottom">
              <input
                className="suP-l-c-i-f-b-text"
                type="text"
                placeholder="Or Paste Video Url Here"
                value={tempVideo}
                onChange={(e) => {
                  setTempVideo(e.target.value);
                  setTitleError(false);
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setVideo(tempVideo);
                  if (tempVideo) {
                    setViewVideo(true);
                  }
                }}
                className={`c-profile-input ${videoError && "suP-l-c-i-error"}`}
              >
                upload
              </button>
            </div>
          </>
        )}
      </div>
      <div className="suP-l-submit">
        {viewVideo && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setVideo(null);
              setTempVideo(null);
              setVideoError(false);
              setViewVideo(false);
              setVidLoadError(false);
            }}
            className="suP-l-s-button2"
          >
            <FontAwesomeIcon className="suP-l-s-b-logo" icon={faTrash} />
          </button>
        )}
        <button
          onClick={post}
          disabled={video && title ? false : true}
          className="suP-l-s-button"
        >
          Post
        </button>
      </div>
    </>
  );
};

export default VideoSubmit;
