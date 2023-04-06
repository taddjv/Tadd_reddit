import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as postsActions from "../../store/posts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ImageSubmit = ({ community }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState(null);
  const [tempImage, setTempImage] = useState(null);
  const [image, setImage] = useState(null);
  const [viewImage, setViewImage] = useState(false);

  const [titleError, setTitleError] = useState(false);
  const [pictureError, setPictureError] = useState(false);
  const [picLoadError, setPicLoadError] = useState(false);

  const post = (e) => {
    e.preventDefault();
    const data = {
      title: title,
      content: image,
    };

    dispatch(postsActions.postThePost(data, "image", community._id))
      .then(() => {
        history.push(`/r/${community.name}`);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data.errors.join(" ").includes("title")) {
          setTitleError(true);
        }
        if (data.errors.join(" ").includes("Image")) {
          setPictureError(true);
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
      <div className={`suP-l-c-i-file ${picLoadError && "suP-l-c-i-error"}`}>
        {viewImage ? (
          <>
            <div className={`suP-l-c-i-f-top`}>
              {picLoadError ? (
                <div>Broken Image</div>
              ) : (
                <img
                  className="suP-l-c-i-f-t-img"
                  onLoad={() => setImage(tempImage)}
                  onError={() => setPicLoadError(true)}
                  src={tempImage}
                />
              )}
            </div>
          </>
        ) : (
          <>
            <div className="suP-l-c-i-f-top">
              <input
                type="file"
                id="c-profile-input"
                accept="image/*"

                // onChange={imageToFile}
                // value={comImage}
              />
              Drag and drop image or{" "}
              <label
                for="c-profile-input"
                className={`c-profile-input ${
                  pictureError && "suP-l-c-i-error"
                }`}
              >
                Upload
              </label>
            </div>
            <div className="suP-l-c-i-f-bottom">
              <input
                className="suP-l-c-i-f-b-text"
                type="text"
                placeholder="Or Paste Image Url Here"
                value={tempImage}
                onChange={(e) => {
                  setTempImage(e.target.value);
                  setTitleError(false);
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (tempImage) {
                    setViewImage(true);
                  }
                }}
                className={`c-profile-input ${
                  pictureError && "suP-l-c-i-error"
                }`}
              >
                upload
              </button>
            </div>
          </>
        )}
      </div>
      <div className="suP-l-submit">
        {viewImage && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setImage(null);
              setTempImage(null);
              setPictureError(false);
              setViewImage(false);
              setPicLoadError(false);
            }}
            className="suP-l-s-button2"
          >
            <FontAwesomeIcon className="suP-l-s-b-logo" icon={faTrash} />
          </button>
        )}
        <button
          onClick={post}
          disabled={image && title ? false : true}
          className={`suP-l-s-button`}
        >
          Post
        </button>
      </div>
    </>
  );
};

export default ImageSubmit;
