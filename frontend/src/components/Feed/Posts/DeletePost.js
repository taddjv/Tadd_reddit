import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as postsActions from "../../../store/posts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const DeletePost = ({ post }) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [selected, setSelected] = useState(false);

  const deletePost = (e) => {
    e.preventDefault();
    dispatch(postsActions.deleteThePost(post._id)).then(() => {
      return history(`/r/${post.community.name}`);
    });
  };
  return (
    <>
      {!selected ? (
        <button
          onClick={() => setSelected(true)}
          className={!selected && "pp-m-b-button"}
        >
          <FontAwesomeIcon
            onClick={() => setSelected(true)}
            className="f-h-logo"
            icon={faEllipsis}
          />
        </button>
      ) : (
        <>
          <button onClick={deletePost} className={!selected && "pp-m-b-button"}>
            <p className={"pp-m-b-delete"}>DELETE</p>
          </button>
          {/* <button onClick={deletePost} className={!selected && "pp-m-b-button"}>
            <p className={"pp-m-b-edit"}>EDIT</p>
          </button> */}
        </>
      )}
    </>
  );
};

export default DeletePost;
