import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as searchActions from "../../../store/search";
import SearchedData from "./SearchedData";
import { validSearch } from "../../../helper";

import {
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const searchResults = useSelector((state) => state.search);

  const [search, setSearch] = useState(null);
  const [error, setError] = useState(false);

  const [showX, stShowX] = useState(false);

  useEffect(() => {
    const bar = document.querySelector(".nc-r-search");
    if (error) {
      bar.style.backgroundColor = "rgb(255, 210, 210)";
    } else if (search) {
      bar.style.backgroundColor = "var(--mainColor)";
      bar.style.border = "solid 0.5px var(--accentColor)";
    } else {
      bar.style.backgroundColor = "var(--greyColor1)";
      bar.style.border = "var(--greyColor3) solid 0.25px";
    }
  }, [search, error]);
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
                setError(false);
                if (e.target.value) {
                  if (validSearch(e.target.value)) {
                    dispatch(searchActions.searchTheCommunity(e.target.value));
                    dispatch(searchActions.searchTheUser(e.target.value));
                  } else {
                    setError(true);
                  }
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
                onClick={() => {
                  if (!error) {
                    setSearch("");
                  }
                }}
                className="nc-r-s-results-container"
              >
                {searchResults.community && (
                  <SearchedData
                    type="Community"
                    data={searchResults.community}
                  />
                )}
                {searchResults.user && (
                  <SearchedData type="User" data={searchResults.user} />
                )}
                <div
                  onClick={() => {
                    if (!error) {
                      history(`/search/${search}`);
                    }
                  }}
                  className="nc-r-s-results-2"
                >
                  <div className="nc-r-s-r-content">search for "{search}"</div>
                </div>
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
