import { faListSquares } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataRender } from "../../../helper";
import SingleComment from "../../Comments/SingleComment";
import { usePop } from "../../../context/UserPopcontext";

const CommentSort = () => {
  const comments = useSelector((state) => state.comments);

  const [drop, setDrop] = useState(false);

  const { commentSort, setCommentSort } = usePop();
  return (
    <>
      <div className="sp-comments-sort">
        <div onClick={() => setDrop(!drop)} className="sp-c-s-button">
          Sort By: {commentSort}
          {drop && (
            <div className="sp-c-s-drop">
              <div
                onClick={() => setCommentSort("Newest")}
                className="sp-c-s-drop-button"
              >
                Newest
              </div>
              <div
                onClick={() => setCommentSort("Best")}
                className="sp-c-s-drop-button"
              >
                Best
              </div>
            </div>
          )}
        </div>
      </div>
      {dataRender(comments).map((ele) => (
        <SingleComment comment={ele} />
      ))}
    </>
  );
};

export default CommentSort;
