import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchedData2 from "../../SearchResults/SearchedData2";
import { dataRender } from "../../../helper";
import * as communityActions from "../../../store/communities";
import "./Communities.css";

function Communities() {
  const dispatch = useDispatch();
  const communities = useSelector((state) => state.communities);

  useEffect(() => {
    dispatch(communityActions.getTheCommunities());

    return () => {
      dispatch(communityActions.clearTheCommunities());
    };
  }, []);

  return (
    <>
      {dataRender(communities).length ? (
        <SearchedData2 type="Top" data={communities} />
      ) : null}
    </>
  );
}

export default Communities;
