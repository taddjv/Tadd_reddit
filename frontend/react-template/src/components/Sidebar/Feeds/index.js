import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faCircleUp } from "@fortawesome/free-regular-svg-icons";

function Feeds() {
  //! active feeds have changes logos (reverse color)
  return (
    <div className="feeds">
      <div className="feeds-title">FEEDS</div>
      {/* <NavLink to="/"> */}
      <div className="feeds-home">
        <FontAwesomeIcon className="f-h-house" icon={faHouse} />
        <span className="f-h-text">Home</span>
      </div>
      {/* </NavLink> */}

      {/* <NavLink to="/"> */}
      <div className="feeds-popular">
        <FontAwesomeIcon className="f-p-circle" icon={faCircleUp} />
        <span className="f-p-text">r/All</span>
      </div>
      {/* </NavLink> */}
    </div>
  );
}

export default Feeds;
