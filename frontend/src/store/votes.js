import { csrfFetch } from "./csrf";

const GET_USER_VOTES = "votes/GET_USER_VOTES";
const UPVOTE_POST = "votes/UPVOTE_POST";
const DOWNVOTE_POST = "votes/DOWNVOTE_POST";
const UPVOTE_COMMENT = "votes/UPVOTE_COMMENT";
const DOWNVOTE_COMMENT = "votes/DOWNVOTE_COMMENT";

const getUserVotes = (votes) => {
  return {
    type: GET_USER_VOTES,
    payload: votes,
  };
};
const upvotePost = (id) => {
  return {
    type: UPVOTE_POST,
    payload: id,
  };
};
const downvotePost = (id) => {
  return {
    type: DOWNVOTE_POST,
    payload: id,
  };
};
const upvoteComment = (id) => {
  return {
    type: UPVOTE_COMMENT,
    payload: id,
  };
};
const downvoteComment = (id) => {
  return {
    type: DOWNVOTE_COMMENT,
    payload: id,
  };
};

export const getTheUserVotes = (userId) => async (dispatch) => {
  const response = await csrfFetch(
    `https://greenit-api.onrender.com/api/votes/user/${userId}`,
    {
      method: "GET",
    }
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(getUserVotes(data));
  }
};
export const upvoteThePost = (post, user) => async (dispatch) => {
  const postId = post._id;
  const response = await csrfFetch(
    `https://greenit-api.onrender.com/api/votes/post/${postId}/upvote/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user }),
    }
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(upvotePost(data, post._id));
    return data;
  }
};
export const downvoteThePost = (post, user) => async (dispatch) => {
  const postId = post._id;
  const response = await csrfFetch(
    `https://greenit-api.onrender.com/api/votes/post/${postId}/downvote/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user }),
    }
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(downvotePost(data, post._id));
    return data;
  }
};
export const upvoteTheComment = (comment, user) => async (dispatch) => {
  const response = await csrfFetch(
    `https://greenit-api.onrender.com/api/votes/comment/${comment._id}/upvote/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user }),
    }
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(upvoteComment(data, comment._id));
    return data;
  }
};
export const downvoteTheComment = (comment, user) => async (dispatch) => {
  const response = await csrfFetch(
    `https://greenit-api.onrender.com/api/votes/comment/${comment._id}/downvote/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user }),
    }
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(downvoteComment(data, comment._id));
    return data;
  }
};

const initialState = {};
const votesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_VOTES: {
      let newState = {};
      if (action.payload.message) {
        return newState;
      } else {
        action.payload.forEach((ele, i) => {
          newState[ele._id] = ele;
        });
        return newState;
      }
    }
    case UPVOTE_POST: {
      let newState = { ...state };
      if (action.payload.removed) {
        delete newState[action.payload.removed];
        return newState;
      } else if (action.payload.edited) {
        newState[action.payload.edited._id] = action.payload.edited;
        return newState;
      } else {
        newState[action.payload._id] = action.payload;
        return newState;
      }
    }
    case DOWNVOTE_POST: {
      let newState = { ...state };
      if (action.payload.removed) {
        delete newState[action.payload.removed];
        return newState;
      } else if (action.payload.edited) {
        newState[action.payload.edited._id] = action.payload.edited;
        return newState;
      } else {
        newState[action.payload._id] = action.payload;
        return newState;
      }
    }
    case UPVOTE_COMMENT: {
      let newState = { ...state };
      if (action.payload.removed) {
        delete newState[action.payload.removed];
        return newState;
      } else if (action.payload.edited) {
        newState[action.payload.edited._id] = action.payload.edited;
        return newState;
      } else {
        newState[action.payload._id] = action.payload;
        return newState;
      }
    }
    case DOWNVOTE_COMMENT: {
      let newState = { ...state };
      if (action.payload.removed) {
        delete newState[action.payload.removed];
        return newState;
      } else if (action.payload.edited) {
        newState[action.payload.edited._id] = action.payload.edited;
        return newState;
      } else {
        newState[action.payload._id] = action.payload;
        return newState;
      }
    }
    default:
      return state;
  }
};

export default votesReducer;
