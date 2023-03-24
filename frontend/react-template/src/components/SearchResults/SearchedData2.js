import React from "react";
import { NavLink } from "react-router-dom";
import { dataRender } from "../../helper";

const SearchedData2 = ({ type, data }) => {
  return (
    <>
      <div className="sr-r-r-communities">
        <div className="nc-r-s-r-title">
          {type === "Community" && "Communities"}
          {type === "User" && "Users"}
        </div>
        {dataRender(data).length ? (
          <>
            {dataRender(data).map((ele) => {
              return (
                <NavLink
                  to={
                    (type === "Community" && `/r/${ele.name}`) ||
                    (type === "User" && `/u/${ele.username}`)
                  }
                  className="nc-r-s-r-content"
                >
                  <img className="nc-r-s-r-c-image" src={ele.profilePicture} />
                  <div className="nc-r-s-r-c-name sr-r-r-name">
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
        ) : (
          <div className="nc-r-s-r-title">No results Found</div>
        )}
      </div>
    </>
  );
};

export default SearchedData2;
