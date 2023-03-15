import React, { Profiler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faUser } from "@fortawesome/free-regular-svg-icons";
import "./UserDropDown.css";
import { usePop } from "../../../context/UserPopcontext";
import * as usersActions from "../../../store/users";
import { useDispatch } from "react-redux";

function UserDropDown({ member }) {
  const dispatch = useDispatch();
  const { setShowLogin, showCommunity, setShowCommunity } = usePop();
  const nonMemberDrop = (
    <div className="udd-container">
      <div className="udd-mode">
        <FontAwesomeIcon className="udd-moon" icon={faMoon} />
        <p className="udd-m-text">Change Mode</p>
      </div>
      <div
        onClick={() => {
          setShowLogin(true);
        }}
        className="udd-log"
      >
        <FontAwesomeIcon className="udd-box" icon={faMoon} />
        <p className="udd-l-text">Log In / Sign Up</p>
      </div>
    </div>
  );
  const memberDrop = (
    <div className="udd-container2">
      <div className="udd-mode">
        <FontAwesomeIcon className="udd-moon" icon={faMoon} />
        <p className="udd-m-text">Change Mode</p>
      </div>
      <div className="udd-profile">
        <FontAwesomeIcon className="udd-user" icon={faUser} />
        <p className="udd-m-text">profile</p>
      </div>
      <div
        className="udd-community"
        onClick={(e) => {
          e.preventDefault();
          setShowCommunity(true);
        }}
      >
        <FontAwesomeIcon className="udd-comm" icon={faUser} />
        <p className="udd-m-text">Create a community</p>
      </div>
      <div
        onClick={() => {
          dispatch(usersActions.logoutTheUser());
        }}
        className="udd-log"
      >
        <FontAwesomeIcon className="udd-box" icon={faMoon} />
        <p className="udd-l-text">Log out</p>
      </div>
    </div>
  );
  return <>{member ? memberDrop : nonMemberDrop}</>;
}

export default UserDropDown;
