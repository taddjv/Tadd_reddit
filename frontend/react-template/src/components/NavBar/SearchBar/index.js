import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as searchActions from "../../../store/search";
import SearchedData from "./SearchedData";

import {
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
  const dispatch = useDispatch();

  const communities = useSelector((state) => state.search);

  const [search, setSearch] = useState(null);

  const [showX, stShowX] = useState(false);

  return (
    <>
      <div className="nc-middle">
        <div className={`nc-r-search ${search && "nc-r-search-drop"}`}>
          <FontAwesomeIcon className="nc-r-s-glass" icon={faMagnifyingGlass} />
          <div className="nc-r-s-input">
            <input
              placeholder="Search Reddit"
              value={search}
              onChange={(e) => {
                dispatch(searchActions.searchTheCommunity(e.target.value));
                dispatch(searchActions.searchTheUser(e.target.value));
                if (e.target.value) {
                  setSearch(e.target.value);
                } else {
                  setSearch(null);
                }
              }}
            />
          </div>
          {search && (
            <>
              <div
                onClick={() => setSearch("")}
                className="nc-r-s-results-container"
              >
                {communities.data ? (
                  <>
                    <SearchedData type="Community" data={communities} />
                    <SearchedData type="User" data={communities} />
                  </>
                ) : null}
                <NavLink
                  exact
                  to={`/search/${search}`}
                  className="nc-r-s-results-2"
                >
                  <div className="nc-r-s-r-content">search for "{search}"</div>
                </NavLink>
              </div>
            </>
          )}

          {showX && <FontAwesomeIcon className="ff" icon={faCircleXmark} />}
        </div>
      </div>
    </>
  );
}

export default SearchBar;
