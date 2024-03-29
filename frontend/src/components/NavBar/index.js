import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import RedditLogo from "./logos/RedditLogo";
import RedditLogo2 from "./logos/RedditLogo2";
import SearchBar from "./SearchBar/index";
import { usePop } from "../../context/UserPopcontext";
import LoginPop from "./LoginPop";
import CreateCommunity from "../Feed/CreateCommunity";
import { checkMode } from "../../helper";

import SignupPop from "./SignupPop";
import UserDropDown from "./UserDropDown";
import * as usersActions from "../../store/users";
import * as subscriptionActions from "../../store/subscriptions";
import * as voteActions from "../../store/votes";

import Logo from "../../images/greenitLogo.png";
import Logo2 from "../../images/greenitLogo2.png";
import "./NavBar.css";

function NavBar({ isLoaded }) {
  const dispatch = useDispatch();
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
      onClick={(e) => {
        e.stopPropagation();
        setDropUser(!dropUser);
      }}
      className="nc-r-dropdown"
    >
      <FontAwesomeIcon className="nc-r-d-user" icon={faUser} />
      <FontAwesomeIcon className="nc-r-d-user" icon={faChevronDown} />
      {dropUser && <UserDropDown member={currentUser !== null} />}
    </button>
  );
  const memberProfile = (
    <>
      <div></div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setDropUser(!dropUser);
        }}
        className="nc-r-dropdown2 "
      >
        <div className="nc-r-left">
          {currentUser?.profilePicture ? (
            <img className="nc-r-d-user-pic" src={currentUser.profilePicture} />
          ) : (
            <FontAwesomeIcon className="nc-r-d-user" icon={faUser} />
          )}
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
        {dropUser && (
          <UserDropDown member={currentUser !== null} user={currentUser} />
        )}
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
          {checkMode() === "light" ? (
            <img className="reddit-logo" src={Logo} />
          ) : (
            <img className="reddit-logo" src={Logo2} />
          )}
        </NavLink>
        <SearchBar />

        <div className="nc-right">
          {!currentUser && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    usersActions.loginTheUser({
                      username: "demo",
                      password: "password",
                    })
                  ).then(async (res) => {
                    const data = await res;
                    dispatch(
                      subscriptionActions.getTheCommunitiesS(data.user._id)
                    );
                    dispatch(voteActions.getTheUserVotes(data.user._id));
                  });
                }}
                className="nc-r-signup"
              >
                Demo User
              </button>
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
