import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import { usePop } from "../../../context/UserPopcontext";
import * as usersActions from "../../../store/users";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "./LoginPop.css";

function LoginPop() {
  const { showLogin, setShowLogin, showSignin, setShowSignin, setDropUser } =
    usePop();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(usersActions.loginTheUser({ username, password }))
      .then(() => {
        setUsername("");
        setPassword("");
        setErrors([]);
        setShowLogin(false);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message === "Validation Error")
          setErrors([data.errors]);
        else if (data && data.message) setErrors([data.message]);
        // if (data && data.message) setErrors([data.message]);
      });
  };
  return (
    <>
      <div className="lc-background" onClick={() => setShowLogin(false)}>
        <form
          className="lc-container"
          onClick={(e) => {
            e.stopPropagation();
            setDropUser(false);
          }}
          onSubmit={handleSubmit}
        >
          <button
            onClick={() => {
              setShowLogin(false);
            }}
            className="lc-c-exit"
          >
            <FontAwesomeIcon className="lc-c-x" icon={faX} />
          </button>
          <div className="lc-c-top">
            <h1 className="lc-c-t-title">Log In</h1>
            <p className="lc-c-t-text">
              By continuing, you agree are setting up a Reddit account and agree
              to our User Agreement and Privacy Policy.
            </p>
          </div>
          <ul className="lc-c-m-errors">
            {errors.map((error, idx) => (
              <>
                <li key={idx}>{error}</li>
                <br />
              </>
            ))}
          </ul>
          <div className="lc-c-middle">
            <div className="lc-c-m-username">
              <input
                id="lc-c-m-username"
                type="text"
                placeholder=" "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label className="lc-c-m-username-label" for="lc-c-m-username">
                Username
              </label>
            </div>

            <div className="lc-c-m-password">
              <input
                type="password"
                id="lc-c-m-password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="lc-c-m-password-label" for="lc-c-m-password">
                Password
              </label>
            </div>

            <div className="lc-c-bottom">
              <button className="lc-c-b-button" type="submit">
                Log In
              </button>
              <p className="lc-c-b-text">
                New to Reddit?{" "}
                <u
                  onClick={() => {
                    setShowLogin(!showLogin);
                    setShowSignin(!showSignin);
                  }}
                >
                  Sign Up
                </u>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPop;
