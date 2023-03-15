import React, { useState, useEffect } from "react";
import * as communitiesActions from "../../../store/communities";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { usePop } from "../../../context/UserPopcontext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./CreateCommunity.css";

function CreateCommunity() {
  const { showCommunity, setShowCommunity } = usePop();
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [nameFinal, setNameFinal] = useState("");
  const [type, setType] = useState("");
  const [redir, setRedir] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setNameFinal("");
    setErrors([]);

    return dispatch(communitiesActions.postTheCommunity({ name, type }))
      .then(() => {
        setName("");
        setType("");
        setNameFinal(name);
        setErrors([]);
        setRedir(true);
        setShowCommunity(false);
        history.push(`/r/${name}`);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message === "Validation Error")
          setErrors([data.errors]);
        else if (data && data.message) setErrors([data.message]);
      });
  };

  return (
    <>
      <div className="cc-background">
        <form onSubmit={handleSubmit} className="cc-form">
          <div className="cc-container">
            <button
              onClick={() => {
                setShowCommunity(false);
              }}
              className="cc-exit"
            >
              <FontAwesomeIcon className="lc-c-x" icon={faX} />
            </button>
            <div className="cc-c-top">
              <h1 className="cc-c-t-title">Create a community</h1>
            </div>
            <div className="cc-c-name">
              <h1 className="cc-c-n-title">Name</h1>
              <p className="cc-c-n-desc">
                Community names including capitalization cannot be changed.
              </p>
              <div className="cc-c-n-input">
                <input
                  type="text"
                  id="cc-c-n-i-input"
                  placeholder=" "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label className="cc-c-n-i-label" for="cc-c-n-i-input">
                  r/
                </label>
              </div>
              <div className="cc-c-n-count">21 characters remaining</div>
              {/* <ul className="lc-c-m-errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> */}
            </div>
            <div className="cc-c-type">
              <div className="cc-c-t-title">Community type</div>
              <div className="cc-c-t-public">
                <input
                  type="radio"
                  id="public"
                  name="cc-c-t"
                  value={type}
                  onChange={(e) => setType("public")}
                />
                <label for="public">
                  <span className="cc-c-t-text1">Public</span>
                  <span className="cc-c-t-text2">
                    Anyone can view, post, and comment to this community
                  </span>
                </label>
              </div>

              <div className="cc-c-t-restricted">
                <input
                  type="radio"
                  id="restricted"
                  name="cc-c-t"
                  value={type}
                  onChange={(e) => setType("restricted")}
                />
                <label for="restricted">
                  <span className="cc-c-t-text1">Restricted</span>
                  <span className="cc-c-t-text2">
                    Anyone can view this community, but only approved users can
                    post
                  </span>
                </label>
              </div>
              <div className="cc-c-t-private">
                <input
                  type="radio"
                  name="cc-c-t"
                  id="private"
                  value={type}
                  onChange={(e) => setType("private")}
                />
                <label for="private">
                  <span className="cc-c-t-text1">Private</span>
                  <span className="cc-c-t-text2">
                    Only approved users can view and submit to this community
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="cc-c-bottom">
            <button
              className="cc-c-b-cancel"
              onClick={(e) => {
                e.preventDefault();
                setShowCommunity(false);
              }}
            >
              Cancel
            </button>
            <button className="cc-c-b-create">Create a Community</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateCommunity;
