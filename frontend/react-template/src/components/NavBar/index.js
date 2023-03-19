import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import RedditLogo from "./logos/RedditLogo";
import RedditLogo2 from "./logos/RedditLogo2";
import SearchBar from "./SearchBar";
import { usePop } from "../../context/UserPopcontext";
import LoginPop from "./LoginPop";
import CreateCommunity from "../Feed/CreateCommunity";

import SignupPop from "./SignupPop";
import UserDropDown from "./UserDropDown";
import * as userActions from "../../store/users";

import "./NavBar.css";

function NavBar({ isLoaded }) {
  const {
    showLogin,
    setShowLogin,
    showSignin,
    setShowSignin,
    showCommunity,
    setShowCommunit,
    dropUser,
    setDropUser,
  } = usePop();
  const currentUser = useSelector((state) => state.users.user);
  const nonMemberProfile = (
    <button
      onClick={() => {
        setDropUser(!dropUser);
      }}
      className="nc-r-dropdown"
    >
      <FontAwesomeIcon className="nc-r-d-user" icon={faUser} />
      <FontAwesomeIcon icon={faChevronDown} />
      {dropUser && <UserDropDown member={currentUser !== null} />}
    </button>
  );
  const memberProfile = (
    <>
      <div></div>
      <button
        onClick={() => {
          setDropUser(!dropUser);
        }}
        className="nc-r-dropdown2 "
      >
        <div className="nc-r-left">
          <FontAwesomeIcon className="nc-r-d-user" icon={faUser} />
        </div>
        <div className="nc-r-middle">
          <div className="n-c-r-m-top">
            {currentUser && currentUser.username}
          </div>
          <div className="n-c-r-m-bottom">
            {currentUser && currentUser.karma}
            <span> karma</span>
          </div>
        </div>
        <div className="nc-r-right">
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
        {dropUser && <UserDropDown member={currentUser !== null} />}
      </button>
    </>
  );

  return (
    <>
      {showLogin && <LoginPop />}
      {showSignin && <SignupPop />}
      {showCommunity && <CreateCommunity />}

      <div className="navbar-container">
        <NavLink exact to="/" className="nc-left">
          <div className="reddit-logo">
            <RedditLogo />
            <RedditLogo2 />
          </div>
          <div className="home-button">
            <button className="nc-l-button">
              <FontAwesomeIcon className="nc-l-b-house" icon={faHouse} />
              <span className="nc-l-b-text">Home</span>
            </button>
          </div>
        </NavLink>
        <div className="nc-middle">
          <div className="nc-r-search">
            <SearchBar />
          </div>
        </div>
        <div className="nc-right">
          {!currentUser && (
            <>
              <button className="nc-r-signup">Demo User</button>
              <button
                className="nc-r-login"
                onClick={() => {
                  setShowLogin(!showLogin);
                }}
              >
                Log In
              </button>
            </>
          )}
          {!currentUser ? nonMemberProfile : memberProfile}
        </div>
      </div>
    </>
  );
}

export default NavBar;
