import React from "react";
import { NavLink } from "react-router-dom";
import { dataRender } from "../../helper";

const SearchedData2 = ({ type, data }) => {
  return (
    <>
      <div
        className={
          type === "Top" ? "sr-r-r-communities-type" : "sr-r-r-communities"
        }
      >
        <div className="nc-r-s-r-title">
          {type === "Community" && "Communities"}
          {type === "User" && "Users"}
          {type === "Top" && "Our Top Communities"}
        </div>
        {dataRender(data).length ? (
          <>
            {dataRender(data).map((ele) => {
              return (
                <NavLink
                  to={
                    (["Community", "Top"].includes(type) && `/r/${ele.name}`) ||
                    (type === "User" && `/u/${ele.username}`)
                  }
                  className="nc-r-s-r-content"
                >
                  <img className="nc-r-s-r-c-image" src={ele.profilePicture} />
                  <div className="nc-r-s-r-c-name sr-r-r-name">
                    <div className="nc-r-s-r-c-n-1">
                      {["Community", "Top"].includes(type) && `/r/${ele.name}`}
                      {type === "User" && `u/${ele.username}`}
                    </div>
                    <div className="nc-r-s-r-c-n-2">
                      {["Community", "Top"].includes(type) && `33 members`}
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
