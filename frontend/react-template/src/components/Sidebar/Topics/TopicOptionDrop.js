import React from "react";
import { NavLink } from "react-router-dom";

function TopicOptionDrop({ option }) {
  return (
    <NavLink
      exact
      to={`/search/${option}`}
      className={` topic-dd`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={`topic-dd-inside`}>{option}</div>
    </NavLink>
  );
}

export default TopicOptionDrop;
