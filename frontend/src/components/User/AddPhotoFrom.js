import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/users";
import * as redditorActions from "../../store/redditors";
import * as communityActions from "../../store/communities";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

const AddPhotoFrom = ({ container, drop, img, type, community }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.user);
  const [showEdit, setShowEdit] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [tempImage, setTempImage] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);

  const uploadUserImage = (e) => {
    e.preventDefault();
    if (image) {
      dispatch(
        redditorActions.editTheRedditor(
          { profilePicture: image },
          currentUser._id
        )
      ).then(async (res) => {
        const data = await res;
        setShowEdit(false);
        setError(false);
        setTempImage("");
        setImage("");
        dispatch(userActions.editTheUser(data));
      });
    }
  };
  const uploadCommunityImage = (e) => {
    e.preventDefault();
    if (image) {
      dispatch(
        communityActions.patchTheCommunity(community.name, {
          profilePicture: image,
        })
      ).then(async (res) => {
        const data = await res;
        setShowEdit(false);
        setError(false);
        setTempImage("");
        setImage("");
      });
    }
  };
  return (
    <div className={container}>
      <form
        onSubmit={
          (type === "user" && uploadUserImage) ||
          (type === "community" && uploadCommunityImage)
        }
        className="c-h-2-plus-container"
      >
        <FontAwesomeIcon
          onClick={() => {
            setShowEdit(!showEdit);
            setError(false);
            setTempImage("");
            setImage("");
          }}
          className="c-h-2-plus-user"
          icon={faPlusSquare}
        />
        {showEdit && (
          // c-h-2-plus-dd
          <div className={drop}>
            <input
              type="file"
              id="c-profile-input"
              accept="image/*"
              // onChange={imageToFile}
              // value={comImage}
            />
            <label for="c-profile-input" className="c-profile-input">
              Add an Image
            </label>
            {showImage ? (
              <img
                // className="suP-l-c-i-f-t-img"
                className={img}
                onLoad={() => setImage(tempImage)}
                onError={() => {
                  setTempImage("");
                  setError(true);
                  setShowImage(false);
                }}
                src={tempImage}
              />
            ) : null}
            {!image && (
              <input
                className={error && "user-input-error"}
                type="text"
                placeholder="Or Paste Image Url Here"
                value={tempImage}
                onChange={(e) => {
                  if (e.target.value) {
                    setTempImage(e.target.value);
                    setError(false);
                  } else {
                    setTempImage("");
                  }
                }}
              />
            )}

            <div className="c-h-2-plus-dd-buttons">
              {image ? (
                <>
                  <button
                    onClick={() => {
                      setShowEdit(false);
                      setShowImage(true);
                      setTempImage("");
                      setImage("");
                      setError(false);
                    }}
                  >
                    cancel
                  </button>
                  <button
                  // onClick={uploadImage}
                  >
                    save
                  </button>
                </>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowImage(true);
                  }}
                >
                  view
                </button>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddPhotoFrom;
