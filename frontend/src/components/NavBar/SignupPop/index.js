import React, { useState, useEffect } from "react";
import { usePop } from "../../../context/UserPopcontext";
import { formSetter } from "../../../helper";
import * as usersActions from "../../../store/users";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./SignupPop.css";

function SignupPop() {
  const { showSignin, setShowSignin, showLogin, setShowLogin, setDropUser } =
    usePop();
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
          setErrors([data.errors[0]]);
        else if (data && data.message) setErrors([data.message]);
      });
  };

  return (
    <>
      <div onClick={() => setShowSignin(false)} className="lc-background">
        <form
          onClick={(e) => {
            e.stopPropagation();
            setDropUser(false);
          }}
          onSubmit={handleSubmit}
          className="lc-container2"
        >
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
              {/* Choose wisely—because once you get a name, you can’t change it. */}
            </p>
          </div>
          <ul className="lc-c-m-errors">
            {errors.map((error, idx) => {
              return (
                <>
                  <li key={idx}>{error}</li>
                  <br />
                </>
              );
            })}
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
