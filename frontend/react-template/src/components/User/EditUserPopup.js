import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as userActions from "../../store/users";
import * as redditorActions from "../../store/redditors";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./User.css";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";

const EditUserPopup = (user) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const [selected, setSelected] = useState("username");

  const [currentUsername, setCurrentUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [match, setMatch] = useState(false);

  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null);
  const [error3, setError3] = useState(null);

  const editUsername = (e) => {
    e.preventDefault();
    if (currentUsername && newUsername) {
      dispatch(
        redditorActions.editTheRedditor(
          { username: newUsername },
          user.user._id
        )
      ).then(async (res) => {
        const data = await res;
        dispatch(userActions.editTheUser(data));

        setShow(false);
      });
    }
  };
  const editPassword = (e) => {
    e.preventDefault();
    if ((currentPassword, newPassword)) {
      dispatch(
        redditorActions.editTheRedditor(
          { oldPassword: currentPassword, newPassword: newPassword },
          user.user._id
        )
      )
        .then(async (res) => {
          const data = await res;
          dispatch(userActions.editTheUser(data));

          setShow(false);
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data.errors) setError1(data.errors[0]);
        });
    }
  };

  const username = (
    <>
      <div className="eup-title">Update your Username</div>
      <div className="eup-error">{error1}</div>
      <input
        className="eup-input"
        type="text"
        placeholder="CURRENT USERNAME"
        onChange={(e) => {
          if (e.target.value) {
            setError1(null);
            setTimeout(() => {
              if (e.target.value !== user.user.username) {
                setError1("not the same username");
              } else {
                setCurrentUsername(e.target.value);
              }
            }, 1000);
          }
        }}
      ></input>
      <div className="eup-error">{error2}</div>
      <input
        className="eup-input"
        type="text"
        placeholder="NEW USERNAME"
        onChange={(e) => {
          setNewUsername(e.target.value);
        }}
      ></input>
      <button
        onClick={editUsername}
        className={` ${
          currentUsername && newUsername ? "eup-button" : "eup-button-cancel"
        }`}
      >
        Save username
      </button>
    </>
  );

  const password = (
    <>
      <div className="eup-title">Change your Password</div>
      <div className="eup-error">{error1}</div>
      <input
        className="eup-input"
        type="text"
        placeholder="CURRENT PASSWORD"
        onChange={(e) => {
          setError1(null);
          if (e.target.value) {
            setCurrentPassword(e.target.value);
          }
        }}
      ></input>
      <div className="eup-error">{error2}</div>
      <input
        className="eup-input"
        type="text"
        placeholder="NEW PASSWORD"
        onChange={(e) => {
          setError2(null);
          if (e.target.value) {
            setNewPassword(e.target.value);
          }
        }}
      ></input>
      <div className="eup-error">{error3}</div>
      <input
        className="eup-input"
        type="text"
        placeholder="CONFIRM NEW PASSWORD"
        onChange={(e) => {
          if (e.target.value) {
            setError3(null);
            setMatch(false);
            setTimeout(() => {
              if (e.target.value !== newPassword) {
                setError3("passwords aren't matching");
              }
              if (e.target.value === newPassword) {
                setMatch(true);
              }
            }, 1000);
          }
        }}
      ></input>
      <button
        onClick={editPassword}
        className={` ${
          currentPassword && newPassword && match
            ? "eup-button"
            : "eup-button-cancel"
        }`}
      >
        Save password
      </button>
    </>
  );

  return (
    <div>
      <FontAwesomeIcon
        onClick={() => setShow(true)}
        className="u-c-c-m1-logo"
        icon={faUserEdit}
      />
      {show && (
        <div onClick={() => setShow(false)} className="eup-background">
          <div className="eup-container" onClick={(e) => e.stopPropagation()}>
            <div className="user-nav">
              <button
                onClick={() => setSelected("username")}
                className={`u-n-button ${
                  selected === "username" && "u-n-button-chosen"
                }`}
              >
                USERNAME
              </button>
              <button
                onClick={() => setSelected("password")}
                className={`u-n-button ${
                  selected === "password" && "u-n-button-chosen"
                }`}
              >
                PASSWORD
              </button>
            </div>
            {selected === "username" && <>{username}</>}
            {selected === "password" && password}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUserPopup;
