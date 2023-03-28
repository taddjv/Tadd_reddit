import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import Posts from "../Feed/Posts";
import SearchedData2 from "./SearchedData2";
import * as postsActions from "../../store/posts";
import * as searchActions from "../../store/search";
import { searchRender, dataRender } from "../../helper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "./SearchResults.css";

const SearchResults = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { search } = params;
  const posts = useSelector((state) => state.posts);
  const searchRes = useSelector((state) => state.search);

  const [chosen, setChosen] = useState("posts");

  const [postFilter, setPostFilter] = useState("Relevance");
  const [postSort, setPostSort] = useState("All Time");


  useEffect(() => {
    dispatch(postsActions.searchThePosts({ search }));
    dispatch(searchActions.searchTheCommunity(search));
    dispatch(searchActions.searchTheUser(search));
  }, [history.location.pathname]);

  return (
    <div className="SearchResults">
      <div className="search-results">
        <div className="sr-nav">
          <button
            onClick={() => setChosen("posts")}
            className={`sr-n-button ${
              chosen === "posts" ? "sr-n-button-chosen" : null
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setChosen("comments")}
            className={`sr-n-button ${
              chosen === "comments" ? "sr-n-button-chosen" : null
            }`}
          >
            Comments
          </button>
        </div>
        {/* <div className="sr-query">
          <button className="sr-q-button">{postFilter}</button>
          <button className="sr-q-button">{postSort}</button>
        </div> */}
        <div className="sr-results">
          <div className="sr-r-left">
            {dataRender(posts).length ? (
              <Posts posts={posts} search={true} />
            ) : (
              <div className="sr-r-left-nothing">
                <FontAwesomeIcon
                  className="sr-r-l-n-top"
                  icon={faMagnifyingGlass}
                />
                <div className="sr-r-l-n-middle">
                  Hm... we couldn’t find any results for “{search}”
                </div>
              </div>
            )}
          </div>

          <div className="sr-r-right">
            {searchRes.community ? (
              <>
                <SearchedData2 type="Community" data={searchRes.community} />
              </>
            ) : null}
            {searchRes.user ? (
              <>
                <SearchedData2 type="User" data={searchRes.user} />
              </>
            ) : null}
            <div className="sr-r-r-people"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
