import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import * as postsActions from "../../store/posts";

const TextSubmit = ({ community }) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [title, setTitle] = useState(null);
  const [text, setText] = useState(null);

  const [titleError, setTitleError] = useState(false);

  const post = (e) => {
    e.preventDefault();
    const data = {
      title: title,
      content: text,
      createdAt: new Date(),
    };

    dispatch(postsActions.postThePost(data, "text", community._id))
      .then(() => {
        history(-1);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data.errors.join(" ").includes("title")) {
          setTitleError(true);
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
          } else {
            setTitle(null);
          }
        }}
      ></input>
      <div className="suP-l-c-input-text">
        <textarea
          className="sp-c-c-input"
          placeholder="Text (optional)"
          onChange={(e) => {
            if (e.target.value) {
              setText(e.target.value);
            } else {
              setText(null);
            }
          }}
        ></textarea>
        <div className="sp-c-c-bottom"></div>
      </div>
      <div className="suP-l-submit">
        <button onClick={post} className="suP-l-s-button">
          Post
        </button>
      </div>
    </>
  );
};

export default TextSubmit;
