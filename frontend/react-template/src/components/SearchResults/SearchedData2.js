import React from "react";
import { NavLink } from "react-router-dom";
import { searchRender } from "../../helper";

const SearchedData2 = ({ type, data }) => {
  return (
    <>
      {searchRender(data, type).length ? (
        <div className="nc-r-s-results">
          <>
            <div className="nc-r-s-r-title">
              {type === "Community" && "Communities"}
            </div>
            {searchRender(data, type).map((ele) => {
              return (
                <NavLink
                  to={type === "Community" && `/r/${ele.name}`}
                  className="nc-r-s-r-content"
                >
                  <img
                    className="nc-r-s-r-c-image"
                    src="https://www.cnet.com/a/img/resize/367c0cade6ebb3f8aa012bbc5b2eb702f20c52a9/hub/2020/04/14/1705352e-1f1e-4bc9-8c23-8520ddc4cb31/kiss-emoji.png?auto=webp&fit=crop&height=900&width=1200"
                  />
                  <div className="nc-r-s-r-c-name">
                    <div className="nc-r-s-r-c-n-1">
                      {type === "Community" && `r/${ele.name}`}
                      {type === "User" && `u/${ele.username}`}
                    </div>
                    <div className="nc-r-s-r-c-n-2">
                      {type === "Community" && `33 Members`}
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </>
        </div>
      ) : null}
    </>
  );
};

export default SearchedData2;
