import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./LoginPop.css";

function LoginPop() {
  return (
    <div className="lc-background">
      <form className="lc-container" onSubmit={null}>
        <button className="lc-c-exit">
          <FontAwesomeIcon className="lc-c-x" icon={faX} />
        </button>
        <div className="lc-c-top">
          <h1 className="lc-c-t-title">Log In</h1>
          <p className="lc-c-t-text">
            By continuing, you agree are setting up a Reddit account and agree
            to our User Agreement and Privacy Policy.
          </p>
        </div>
        <div className="lc-c-middle">
          <div className="lc-c-m-username">
            <input
              id="lc-c-m-username"
              type="text"
              placeholder=" "
              // value={}
              // onChange={(e) => set...(e.target.value)}
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
              // value={}
              // onChange={(e) => set...(e.target.value)}
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
              New to Reddit? <a>Sign Up</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPop;
