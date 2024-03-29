import { url, token } from "../helper";

const GET_POSTS = "posts/GET_POSTS";
const GET_USER_POSTS = "posts/GET_USER_POSTS";
const GET_COMMUNITY_POSTS = "posts/GET_COMMUNITY_POSTS";
const GET_SINGLE_POST = "posts/GET_SINGLE_POST";
const POST_POST = "posts/POST_POST";
const EDIT_POST = "posts/EDIT_POST";
const DELETE_POST = "post/DELETE_POST";
const UPVOTE_POST = "post/UPVOTE_POST";
const DOWNVOTE_POST = "post/DOWNVOTE_POST";
const SEARCH_POSTS = "post/SEARCH_POSTS";
const GET_HOME_POSTS = "posts/GET_HOME_POSTS";
const CLEAR = "posts/CLEAR";

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
const searchPosts = (posts) => {
  return {
    type: SEARCH_POSTS,
    payload: posts,
  };
};
const getHomePosts = (posts) => {
  return {
    type: GET_HOME_POSTS,
    payload: posts,
  };
};
const clearPosts = () => {
  return {
    type: CLEAR,
  };
};

export const getThePosts = (sort) => async (dispatch) => {
  const response = await fetch(`${url}/api/posts/all/?sort=${sort}`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getPosts(data));
    return data;
  }
};
export const getTheUserPosts = (userId, sort) => async (dispatch) => {
  const response = await fetch(
    `${url}/api/posts/user/${userId}/?sort=${sort}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  if (response.ok) {
    dispatch(getUserPosts(data));
    return data;
  }
};
export const getTheCommunityPosts = (communityId, sort) => async (dispatch) => {
  const response = await fetch(
    `${url}/api/posts/community/${communityId}/?sort=${sort}`,
    {
      method: "GET",
    }
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(getCommunityPosts(data));
    return data;
  }
};
export const getTheSinglePost = (postId) => async (dispatch) => {
  const response = await fetch(`${url}/api/posts/${postId}`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getSinglePost(data));
    return data;
  }
};
export const upvoteThePost = (postId, vote) => async (dispatch) => {
  const cookie = document.cookie.split(";")[0].slice(6);
  const response = await fetch(`${url}/api/posts/upvote/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authentication: cookie,
    },
    body: JSON.stringify({ status: vote }),
  });
  if (response.ok) {
    const data = await response.json();

    dispatch(upvotePost(data.post, data.voteStatus));
  }
};
export const downvoteThePost = (postId, vote) => async (dispatch) => {
  const cookie = document.cookie.split(";")[0].slice(6);
  const response = await fetch(`${url}/api/posts/downvote/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authentication: cookie,
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
    const cookie = document.cookie.split(";")[0].slice(6);
    const { title, content } = postData;
    const response = await fetch(`${url}/api/posts/community/${communityId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: cookie,
      },
      body: JSON.stringify({ title: title, content: content, type: type }),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(postPost(data));
    } else {
      return data;
    }
  };
export const searchThePosts =
  ({ search }) =>
  async (dispatch) => {
    const response = await fetch(`${url}/api/posts/search/${search}`, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(searchPosts(data));
    }
  };
export const getTheHomePosts = (sort) => async (dispatch) => {
  const cookie = document.cookie.split(";")[0].slice(6);
  const response = await fetch(`${url}/api/posts/home/?sort=${sort}`, {
    method: "GET",
    headers: {
      Authentication: cookie,
    },
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getHomePosts(data));
    return data;
  }
};
export const deleteThePost = (postId) => async (dispatch) => {
  const cookie = document.cookie.split(";")[0].slice(6);
  const response = await fetch(`${url}/api/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authentication: cookie,
    },
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(deletePost(postId));
  }
  return data;
};
export const clearThePosts = () => async (dispatch) => {
  dispatch(clearPosts());
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
    case GET_HOME_POSTS: {
      let newState = { ...state };
      if (action.payload.length) {
        newState = {};
        action.payload.forEach((ele) => {
          newState[ele._id] = ele;
        });
      }
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
    case SEARCH_POSTS: {
      let newState = {};
      action.payload.forEach((ele) => {
        newState[ele._id] = ele;
      });
      return newState;
    }
    case DELETE_POST: {
      let newState = { ...state };
      delete newState[action.payload];
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

export default postsReducer;
