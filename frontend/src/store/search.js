import { csrfFetch } from "./csrf";

const SEARCH_COMMUNITY = "search/SEARCH_COMMUNITY";
const SEARCH_USER = "search/SEARCH_USER";

const searchCommunity = (communities) => {
  return {
    type: SEARCH_COMMUNITY,
    payload: communities,
  };
};
const searchUser = (users) => {
  return {
    type: SEARCH_USER,
    payload: users,
  };
};

export const searchTheCommunity = (search) => async (dispatch) => {
  const response = await csrfFetch(`/api/communities/search/${search}`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(searchCommunity(data));
    return data;
  }
};
export const searchTheUser = (search) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/search/${search}`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(searchUser(data));
    return data;
  }
};

const initialState = { community: {}, user: {} };
const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_COMMUNITY: {
      let newState = { ...state };
      newState.community = {};
      if (action.payload?.length) {
        action.payload.forEach((ele) => {
          newState[`community`][ele.name] = ele;
        });
        return newState;
      } else {
        newState[`community`] = {};
        return newState;
      }
    }
    case SEARCH_USER: {
      let newState = { ...state };
      newState.user = {};
      if (action.payload?.length) {
        action.payload.forEach((ele) => {
          newState[`user`][ele.username] = ele;
        });
        return newState;
      } else {
        newState[`user`] = {};
        return newState;
      }
    }

    default:
      return state;
  }
};

export default searchReducer;
