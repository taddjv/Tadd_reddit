import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

function RecentCommunities() {
  const currentUser = useSelector((state) => state.users.user);
  return (
    <>
      {currentUser && (
        <>
          {currentUser.recentCommunities.length ? (
            <div className="recentCommunities">
              <div className="rc-title">RECENT COMMUNITIES</div>
              {currentUser.recentCommunities.map((ele) => {
                const data = ele.split(",");
                return (
                  <NavLink to={`/r/${data[1]}`}>
                    <div className="rc-community1">
                      {data[0] !== "undefined" ? (
                        <img src={data[0]} />
                      ) : (
                        <FontAwesomeIcon
                          className="c-rc-community-logo"
                          icon={faClipboardList}
                        />
                      )}

                      <span className="rc-c1-text">r/{data[1]}</span>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          ) : null}
        </>
      )}
    </>
  );
}

export default RecentCommunities;
