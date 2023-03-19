import { csrfFetch } from "./csrf";

const GET_POSTS = "posts/GET_POSTS";
const GET_USER_POSTS = "posts/GET_USER_POSTS";
const GET_COMMUNITY_POSTS = "posts/GET_COMMUNITY_POSTS";
const GET_SINGLE_POST = "posts/GET_SINGLE_POST";
const POST_POST = "posts/POST_POST";
const EDIT_POST = "posts/EDIT_POST";
const DELETE_POST = "post/DELETE_POST";
const UPVOTE_POST = "post/UPVOTE_POST";
const DOWNVOTE_POST = "post/DOWNVOTE_POST";

const getPosts = (posts) => {
  return {
    type: GET_POSTS,
    payload: posts,
  };
};
const getUserPosts = (posts) => {
  return {
    type: GET_USER_POSTS,
    payload: posts,
  };
};
const getCommunityPosts = (posts) => {
  return {
    type: GET_COMMUNITY_POSTS,
    payload: posts,
  };
};
const getSinglePost = (post) => {
  return {
    type: GET_SINGLE_POST,
    payload: post,
  };
};
const postPost = (post) => {
  return {
    type: POST_POST,
    payload: post,
  };
};
const editPost = (post, id) => {
  return {
    type: EDIT_POST,
    payload: { post, id },
  };
};
const deletePost = (id) => {
  return {
    type: DELETE_POST,
    payload: id,
  };
};
const upvotePost = (post, vote) => {
  return {
    type: UPVOTE_POST,
    payload: { post, vote },
  };
};
const downvotePost = (post, vote) => {
  return {
    type: DOWNVOTE_POST,
    payload: { post, vote },
  };
};

export const getThePosts = () => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getPosts(data));
  }
};
export const getTheUserPosts = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/user/${userId}`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getUserPosts(data));
  }
};
export const getTheCommunityPosts = (communityId) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/community/${communityId}`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getCommunityPosts(data));
  }
};
export const getTheSinglePost = (postId) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/${postId}`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getSinglePost(data));
  }
};
export const upvoteThePost = (postId, vote) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/upvote/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: vote }),
  });
  if (response.ok) {
    const data = await response.json();

    dispatch(upvotePost(data.post, data.voteStatus));
  }
};
export const downvoteThePost = (postId, vote) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/downvote/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: vote }),
  });
  if (response.ok) {
    const data = await response.json();

    dispatch(downvotePost(data.post, data.voteStatus));
  }
};
export const postThePost =
  (postData, type, communityId) => async (dispatch) => {
    const { title, content } = postData;
    const response = await csrfFetch(`/api/posts/community/${communityId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, content: content, type: type }),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(postPost(data));
    } else {
      const data = await response.json();
      return data;
    }
  };

const initialState = {};
const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS: {
      let newState = {};
      action.payload.forEach((ele) => {
        newState[ele._id] = ele;
      });
      return newState;
    }
    case GET_USER_POSTS: {
      let newState = {};
      action.payload.forEach((ele) => {
        newState[ele._id] = ele;
      });
      return newState;
    }
    case GET_COMMUNITY_POSTS: {
      let newState = {};
      action.payload.forEach((ele) => {
        newState[ele._id] = ele;
      });
      return newState;
    }
    case GET_SINGLE_POST: {
      let newState = {};
      newState[action.payload._id] = action.payload;
      return newState;
    }
    case UPVOTE_POST: {
      let newState = { ...state };
      newState[action.payload.post._id].upVotes += action.payload.vote.up;
      newState[action.payload.post._id].downVotes += action.payload.vote.down;
      return newState;
    }
    case DOWNVOTE_POST: {
      let newState = { ...state };
      newState[action.payload.post._id].upVotes += action.payload.vote.up;
      newState[action.payload.post._id].downVotes += action.payload.vote.down;
      return newState;
    }
    case POST_POST: {
      let newState = { ...state };
      newState[action.payload._id] = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

export default postsReducer;
