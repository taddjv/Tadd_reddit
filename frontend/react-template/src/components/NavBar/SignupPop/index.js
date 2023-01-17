import React, { useState, useEffect } from "react";
import { usePop } from "../../../context/UserPopcontext";
import { formSetter } from "../../../helper";
import * as usersActions from "../../../store/users";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./SignupPop.css";

function SignupPop() {
  const { showSignin, setShowSignin, showLogin, setShowLogin } = usePop();
  const [formSelect, setFormSelect] = useState(true);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(usersActions.signupTheUser({ username, password }))
      .then(() => {
        setUsername("");
        setPassword("");
        setErrors([]);
        setShowSignin(false);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message === "Validation Error")
          setErrors([data.errors]);
        else if (data && data.message) setErrors([data.message]);
      });
  };

  useEffect(() => {
    formSetter(formSelect);
  }, [formSelect]);

  return (
    <>
      <div className="lc-background">
        <form className="lc-container1">
          <button
            onClick={() => {
              setShowSignin(false);
            }}
            className="lc-c-exit"
          >
            <FontAwesomeIcon className="lc-c-x" icon={faX} />
          </button>
          <div className="lc-c-top">
            <h1 className="lc-c-t-title">Sign Up</h1>
            <p className="lc-c-t-text">
              By continuing, you agree are setting up a Reddit account and agree
              to our User Agreement and Privacy Policy.
            </p>
          </div>
          <div className="lc-c-middle">
            <div className="lc-c-m-email">
              <input
                type="text"
                id="lc-c-m-email"
                placeholder=" "
                // value={}
                // onChange={(e) => set...(e.target.value)}
                required
              />
              <label className="lc-c-m-email-label" for="lc-c-m-email">
                Email
              </label>
            </div>

            <div className="lc-c-bottom">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setFormSelect(false);
                }}
                className="lc-c-b-button"
              >
                Continue
              </button>
              <p className="lc-c-b-text">
                Already a redditor?{" "}
                <u
                  onClick={() => {
                    setShowLogin(!showLogin);
                    setShowSignin(!showSignin);
                  }}
                >
                  Log In
                </u>
              </p>
            </div>
          </div>
        </form>
        <form onSubmit={handleSubmit} className="lc-container2">
          <button
            onClick={() => {
              setFormSelect(true);
            }}
            className="lc-c-back"
          >
            <FontAwesomeIcon className="lc-c-x" icon={faArrowLeft} />
          </button>
          <button
            onClick={() => {
              setShowSignin(!showSignin);
            }}
            className="lc-c-exit"
          >
            <FontAwesomeIcon className="lc-c-x" icon={faX} />
          </button>
          <div className="lc-c-top">
            <h1 className="lc-c-t-title">Create your username and password</h1>
            <p className="lc-c-t-text">
              Reddit is anonymous, so your username is what you’ll go by here.
              Choose wisely—because once you get a name, you can’t change it.
            </p>
          </div>
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
            <ul className="lc-c-m-errors">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
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
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupPop;
