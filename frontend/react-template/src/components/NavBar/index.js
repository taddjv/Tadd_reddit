import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import RedditLogo from "./logos/RedditLogo";
import RedditLogo2 from "./logos/RedditLogo2";
import SearchBar from "./SearchBar";

import "./NavBar.css";

function NavBar() {
  return (
    <div className="navbar-container">
      <div className="nc-left">
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
      </div>
      <div className="nc-middle">
        <div className="nc-r-search">
          <SearchBar />
        </div>
      </div>
      <div className="nc-right">
        <button className="nc-r-signup">Sign Up</button>
        <button className="nc-r-login">Log In</button>
        <button className="nc-r-dropdown">
          <FontAwesomeIcon className="nc-r-d-user" icon={faUser} />
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </div>
    </div>
  );
}

export default NavBar;
