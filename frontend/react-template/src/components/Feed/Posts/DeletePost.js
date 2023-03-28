import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as postsActions from "../../../store/posts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const DeletePost = (post) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(false);

  const deletePost = (e) => {
    e.preventDefault();
  };
  return (
    <button
      onClick={selected && deletePost}
      className={selected && "pp-m-b-error"}
    >
      {selected ? (
        <p
          className={selected && "pp-m-b-error"}
          // onClick={() => setSelected(true)}
        >
          DELETE
        </p>
      ) : (
        <FontAwesomeIcon
          onClick={() => setSelected(true)}
          className="f-h-logo"
          icon={faEllipsis}
        />
      )}
    </button>
  );
};

export default DeletePost;
