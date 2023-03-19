import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as postsActions from "../../store/posts";

const LinkSubmit = ({ community }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);

  const [titleError, setTitleError] = useState(false);
  const [linkError, setLinkError] = useState(false);

  const post = (e) => {
    e.preventDefault();
    const data = {
      title: title,
      content: link,
    };

    dispatch(postsActions.postThePost(data, "link", community._id))
      .then(() => {
        history.goBack();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data.errors.join(" ").includes("title")) {
          setTitleError(true);
        }
        if (data.errors.join(" ").includes("Link")) {
          setLinkError(true);
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
      <textarea
        onChange={(e) => {
          setLink(e.target.value);
          setLinkError(false);
        }}
        className={`suP-l-c-i-link ${linkError && "suP-l-c-i-error"}`}
        placeholder="Url"
      ></textarea>
      <div className="suP-l-submit">
        <button onClick={post} className="suP-l-s-button">
          Post
        </button>
      </div>
    </>
  );
};

export default LinkSubmit;
