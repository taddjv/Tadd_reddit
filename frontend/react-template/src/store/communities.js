import { csrfFetch } from "./csrf";

const GET_COMMUNITY = "communities/GET_COMMUNITY";
const GET_COMMUNITIES = "communities/GET_COMMUNITIES";
const POST_COMMUNITY = "communities/POST_COMMUNITY";
const DELETE_COMMUNITY = "communities/DELETE_COMMUNITY";
const PATCH_COMMUNITY = "communities/PATCH_COMMUNITY";

const getCommunity = (community) => {
  return {
    type: GET_COMMUNITY,
    payload: community,
  };
};
const getCommunities = (communities) => {
  return {
    type: GET_COMMUNITIES,
    payload: communities,
  };
};
const postCommunity = (community) => {
  return {
    type: POST_COMMUNITY,
    payload: community,
  };
};
const deleteCommunity = (community) => {
  return {
    type: DELETE_COMMUNITY,
    payload: community,
  };
};
const patchCommunity = (community) => {
  return {
    type: PATCH_COMMUNITY,
    payload: community,
  };
};

export const getTheCommunity = (name) => async (dispatch) => {
  const response = await csrfFetch(`/api/communities/${name}`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getCommunity(data));
    return data;
  }
};
export const getTheCommunities = () => async (dispatch) => {
  const response = await csrfFetch(`/api/communities`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getCommunities(data));
  }
};
export const postTheCommunity = (communityCredentials) => async (dispatch) => {
  const response = await csrfFetch(`/api/communities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(communityCredentials),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(postCommunity(data));
  }
};
export const deleteTheCommunity = () => async (dispatch) => {
  const response = await csrfFetch(`/api/communities`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteCommunity());
  }
};
export const patchTheCommunity =
  (name, communityCredentials) => async (dispatch) => {
    const response = await csrfFetch(`/api/communities/${name}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(communityCredentials),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(patchCommunity(data));
    }
  };

const initialState = { community: null };
const communitiesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_COMMUNITY:
      newState = Object.assign({}, state);
      newState.community = action.payload;
      return newState;
    case GET_COMMUNITIES:
      newState = Object.assign({}, state);
      newState.community = action.payload;
      return newState;
    case POST_COMMUNITY:
      newState = Object.assign({}, state);
      newState.community = action.payload;
      return newState;
    case DELETE_COMMUNITY:
      newState = Object.assign({}, state);
      newState.community = null;
      return newState;
    case PATCH_COMMUNITY:
      newState = Object.assign({}, state);
      newState.community = action.payload;
      return newState;
    default:
      return state;
  }
};

export default communitiesReducer;
