import React from "react";
import { NavLink } from "react-router-dom";
import { searchRender, dataRender } from "../../../helper";

const SearchedData = ({ type, data }) => {
  return (
    <>
      {dataRender(data).length ? (
        <div className="nc-r-s-results">
          <div className="nc-r-s-r-title">
            {type === "Community" && "Communities"}
            {type === "User" && "Users"}
          </div>
          {dataRender(data)
            .slice(0, 3)
            .map((ele) => {
              return (
                <>
                  <NavLink
                    to={
                      (type === "Community" && `/r/${ele.name}`) ||
                      (type === "User" && `/u/${ele.username}`)
                    }
                    className="nc-r-s-r-content"
                  >
                    <img
                      className="nc-r-s-r-c-image"
                      src={ele.profilePicture}
                    />
                    <div className="nc-r-s-r-c-name">
                      <div className="nc-r-s-r-c-n-1">
                        {type === "Community" && `r/${ele.name}`}
                        {type === "User" && `u/${ele.username}`}
                      </div>
                      <div className="nc-r-s-r-c-n-2">{type}</div>
                    </div>
                  </NavLink>
                </>
              );
            })}
        </div>
      ) : null}
    </>
  );
};

export default SearchedData;
