import { url, token } from "../helper";

const GET_COMMENT = "comments/GET_COMMENT";
const GET_COMMENTS = "comments/GET_COMMENTS";
const GET_USER_COMMENTS = "comments/GET_USER_COMMENTS";
const GET_POST_COMMENTS = "comments/GET_POST_COMMENTS";
const POST_COMMENT = "comments/POST_COMMENT";
const VOTE_COMMENT = "comments/VOTE_COMMENT";
const EDIT_COMMENT = "comments/EDIT_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";
const CLEAR = "comments/CLEAR";

const getComment = (comment) => {
  return {
    type: GET_COMMENT,
    payload: comment,
  };
};
const getComments = (comments) => {
  return {
    type: GET_COMMENTS,
    payload: comments,
  };
};
const getUserComments = (comments) => {
  return {
    type: GET_USER_COMMENTS,
    payload: comments,
  };
};
const getPostComments = (comments) => {
  return {
    type: GET_POST_COMMENTS,
    payload: comments,
  };
};
const postComment = (comment) => {
  return {
    type: POST_COMMENT,
    payload: comment,
  };
};
const voteComment = (comment, vote) => {
  return {
    type: VOTE_COMMENT,
    payload: { comment, vote },
  };
};
const editComment = (comment) => {
  return {
    type: EDIT_COMMENT,
    payload: comment,
  };
};
const deleteComment = (comment) => {
  return {
    type: DELETE_COMMENT,
    payload: comment,
  };
};
const clearComments = () => {
  return {
    type: CLEAR,
  };
};

export const getTheComment = (commentId) => async (dispatch) => {
  const response = await fetch(`${url}/api/comments/commentId/${commentId}`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getComment(data));
    return data;
  }
};
export const getTheComments = (search, sort) => async (dispatch) => {
  const response = await fetch(
    `${url}/api/comments/search/${search}/?sort=${sort}`,
    {
      method: "GET",
    }
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(getComments(data));
    return data;
  }
};
export const getTheUserComments = (userId, sort) => async (dispatch) => {
  const response = await fetch(
    `${url}/api/comments/user/${userId}/?sort=${sort}`,
    {
      method: "GET",
    }
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(getUserComments(data));
    return data;
  }
};
export const getThePostComments = (postId, sort) => async (dispatch) => {
  const response = await fetch(
    `${url}/api/comments/post/${postId}/?sort=${sort}`,
    {
      method: "GET",
    }
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(getPostComments(data));
    return data;
  }
};
export const postTheComment = (content, post) => async (dispatch) => {
  const response = await fetch(`${url}/api/comments/post/${post._id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(postComment(data));
    return data;
  } else {
    const data = await response.json();
    return data;
  }
};
export const upvoteTheComment = (commentId, vote) => async (dispatch) => {
  const response = await fetch(`${url}/api/comments/upvote/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: vote }),
  });
  if (response.ok) {
    const data = await response.json();

    dispatch(voteComment(data.comment, data.voteStatus));
  }
};
export const downvoteTheComment = (commentId, vote) => async (dispatch) => {
  const response = await fetch(`${url}/api/comments/downvote/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: vote }),
  });
  if (response.ok) {
    const data = await response.json();

    dispatch(voteComment(data.comment, data.voteStatus));
  }
};
export const editTheComment = (content, commentId) => async (dispatch) => {
  const response = await fetch(`${url}/api/comments/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(editComment(data));
  } else {
    const data = await response.json();
    return data;
  }
};
export const deleteTheComment = (commentId) => async (dispatch) => {
  const response = await fetch(`${url}/api/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteComment(data));
    return data;
  } else {
    const data = await response.json();
    return data;
  }
};
export const clearTheComments = () => async (dispatch) => {
  dispatch(clearComments());
};

const initialState = {};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENT: {
      let newState = {};
      newState[action.payload._id] = action.payload;
      return newState;
    }
    case GET_COMMENTS: {
      let newState = {};
      action.payload.forEach((ele) => {
        newState[ele._id] = ele;
      });
      return newState;
    }
    case GET_USER_COMMENTS: {
      let newState = {};
      action.payload.forEach((ele) => {
        newState[ele._id] = ele;
      });
      return newState;
    }
    case GET_POST_COMMENTS: {
      let newState = {};
      action.payload.forEach((ele) => {
        newState[ele._id] = ele;
      });
      return newState;
    }
    case POST_COMMENT: {
      let newState = { ...state };
      newState[action.payload._id] = action.payload;
      return newState;
    }
    case VOTE_COMMENT: {
      let newState = { ...state };
      newState[action.payload.comment._id].upVotes += action.payload.vote.up;
      newState[action.payload.comment._id].downVotes +=
        action.payload.vote.down;
      return newState;
    }
    case EDIT_COMMENT: {
      let newState = { ...state };
      newState[action.payload._id] = action.payload;
      return newState;
    }
    case DELETE_COMMENT: {
      let newState = { ...state };
      delete newState[action.payload._id];
      return newState;
    }
    case CLEAR: {
      let newState = {};
      return newState;
    }
    default:
      return state;
  }
};

export default commentsReducer;
