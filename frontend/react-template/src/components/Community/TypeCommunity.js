import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import { validateColor } from "../../helper";
import * as communityActions from "../../store/communities";

const TypeCommunity = ({ community }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [type, setType] = useState([
    community.contentType.split(",")[0] === "text",
    community.contentType.split(",")[1] === "link",
    community.contentType.split(",")[2] === "image",
    community.contentType.split(",")[3] === "video",
  ]);
  const changeContent = (e) => {
    e.preventDefault();
    const contentType = {
      contentType: [
        type[0] ? "text" : null,
        type[1] ? "link" : null,
        type[2] ? "image" : null,
        type[3] ? "video" : null,
      ].join(","),
    };

    return dispatch(
      communityActions.patchTheCommunity(community.name, contentType)
    );
  };
  const deleteCommunity = (e) => {
    e.preventDefault();

    return dispatch(communityActions.deleteTheCommunity(community._id)).then(
      () => {
        history.push("/");
      }
    );
  };
  return (
    <>
      <div className="cc-c-type">
        <div className="cc-c-t-public">
          <input
            type="checkbox"
            checked={type[0] === true}
            onChange={() => {
              setType([!type[0], type[1], type[2], type[3]]);
            }}
          />
          <label for="public">Text Posts</label>
        </div>
        <div className="cc-c-t-public">
          <input
            type="checkbox"
            checked={type[1] === true}
            onChange={() => setType([type[0], !type[1], type[2], type[3]])}
          />
          <label for="public">Link Posts</label>
        </div>
        <div className="cc-c-t-public">
          <input
            type="checkbox"
            checked={type[2] === true}
            onChange={() => setType([type[0], type[1], !type[2], type[3]])}
          />
          <label for="public">Picture Posts</label>
        </div>
        <div className="cc-c-t-public">
          <input
            type="checkbox"
            checked={type[3] === true}
            onChange={() => setType([type[0], type[1], type[2], !type[3]])}
          />
          <label for="public">Video Posts</label>
        </div>
        <button onClick={changeContent} className="ac-c-d-ta-s">
          Change content
        </button>
      </div>
      <button onClick={deleteCommunity} className="ac-c-d-ta-s">
        Delete Community
      </button>
    </>
  );
};

export default TypeCommunity;
