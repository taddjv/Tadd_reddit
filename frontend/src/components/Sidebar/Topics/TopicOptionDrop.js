import React from "react";
import { NavLink } from "react-router-dom";
import { usePop } from "../../../context/UserPopcontext";

function TopicOptionDrop({ option }) {
  const { setDropUser } = usePop();
  return (
    <NavLink
      exact
      to={`/search/${option}`}
      className={` topic-dd`}
      onClick={(e) => {
        e.stopPropagation();
        setDropUser(false);
      }}
    >
      <div className={`topic-dd-inside`}>{option}</div>
    </NavLink>
  );
}

export default TopicOptionDrop;
