import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, NavLink, useLocation } from "react-router-dom";
import Posts from "../Feed/Posts";
import SingleComment from "../Comments/SingleComment";
import SearchedData2 from "./SearchedData2";
import * as postsActions from "../../store/posts";
import * as searchActions from "../../store/search";
import * as commentCations from "../../store/comments";
import { searchRender, dataRender } from "../../helper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./SearchResults.css";

const SearchResults = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { search } = params;
  const posts = useSelector((state) => state.posts);
  const searchRes = useSelector((state) => state.search);
  const comments = useSelector((state) => state.comments);

  const [chosen, setChosen] = useState("posts");

  const [postFilter, setPostFilter] = useState("Relevance");
  const [postSort, setPostSort] = useState("All Time");

  useEffect(() => {
    dispatch(postsActions.searchThePosts({ search }));
    dispatch(searchActions.searchTheCommunity(search));
    dispatch(searchActions.searchTheUser(search));
    dispatch(commentCations.getTheComments(search, "New"));
  }, [location.pathname]);

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
          {chosen === "posts" && (
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
          )}
          {chosen === "comments" && (
            <div className="sr-r-left">
              {dataRender(comments).length ? (
                <>
                  {dataRender(comments).map((ele) => (
                    <SingleComment comment={ele} name="comment-search" />
                  ))}
                </>
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
          )}
          {/* {dataRender(comments).map((ele) => (
                  <SingleComment comment={ele} />
                ))} */}

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
