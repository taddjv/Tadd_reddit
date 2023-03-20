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

const initialState = { data: false };
const searchReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SEARCH_COMMUNITY: {
      if (action.payload) {
        newState = { data: true };
        action.payload.forEach((ele) => {
          newState[`Community/${ele.name}`] = ele;
        });
        return newState;
      } else {
        return { data: false };
      }
    }
    case SEARCH_USER: {
      if (action.payload) {
        newState = { ...state };
        action.payload.forEach((ele) => {
          newState[`User/${ele.username}`] = ele;
        });
        return newState;
      } else if (!newState.data) {
        newState = { data: false };
        return newState;
      }
    }

    default:
      return state;
  }
};

export default searchReducer;
